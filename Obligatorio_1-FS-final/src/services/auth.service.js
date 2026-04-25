import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Usuario } from '../models/usuario.model.js'
import { usuarioDto } from '../dtos/usuario.dto.js'
import { cloudinary } from '../config/cloudinary.config.js'

const doRegistro = async (body, rol) => {
    const { nombre, email, password } = body

    // Verificar que no exista un usuario con ese email
    const usuarioExistente = await Usuario.findOne({ email })
    if (usuarioExistente) {
        throw new Error('Ya existe un usuario con ese email')
    }

    // Hasheamos el password antes de guardar
    const passwordHasheada = await bcrypt.hash(password, 10)

    const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        password: passwordHasheada,
        rol,
        ...(rol === 'profesor' && { plan: 'plus' })
    })

    // Generamos el token para que el frontend pueda redirigir directamente
    const token = jwt.sign(
        { email: nuevoUsuario.email, rol: nuevoUsuario.rol, plan: nuevoUsuario.plan },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { usuario: usuarioDto(nuevoUsuario), token }
}

const doLogin = async ({ email, password }) => {
    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
        throw new Error('Credenciales inválidas')
    }

    const esValida = await bcrypt.compare(password, usuario.password)
    if (!esValida) {
        throw new Error('Credenciales inválidas')
    }

    const token = jwt.sign(
        { email: usuario.email, rol: usuario.rol, plan: usuario.plan },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { token }
}

const doCambiarPlan = async (email) => {
    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
        throw new Error('Usuario no encontrado')
    }

    if (usuario.rol !== 'profesor') {
        throw new Error('Solo los profesores pueden cambiar de plan')
    }

    if (usuario.plan !== 'plus') {
        throw new Error('El usuario ya tiene el plan premium')
    }

    usuario.plan = 'premium'
    await usuario.save()

    return usuarioDto(usuario)
}

const doSubirFotoPerfil = async (email, img) => {
    const imgBase64 = Buffer.from(img.buffer).toString("base64")
    const uri = "data:" + img.mimetype + ";base64," + imgBase64

    let result
    try {
        result = await cloudinary.uploader.upload(uri)
    } catch (e) {
        console.log("error al subir la imagen a cloudinary", e)
        throw new Error("Error al subir la imagen")
    }

    const usuario = await Usuario.findOneAndUpdate(
        { email },
        { fotoPerfil: result.secure_url },
        { new: true }
    )
    if (!usuario) {
        throw new Error('Usuario no encontrado')
    }
    return usuarioDto(usuario)
}

export { doRegistro, doLogin, doCambiarPlan, doSubirFotoPerfil }