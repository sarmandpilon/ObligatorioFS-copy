import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Usuario } from "../models/usuario.model.js"
import { usuarioDto } from "../dtos/usuario.dto.js"

const login = async ({ email, password }) => {
    const u = await Usuario.findOne({ email })
    if (u) {
        const esValida = await bcrypt.compare(password, u.password)
        if (esValida) {
            const token = jwt.sign(
                { idUsu: u.id, rolUsu: u.rol, emailUsu: u.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )
            return { token }
        }
    }
    throw new Error("Credenciales inválidas")
}

const registrarAlumno = async ({ nombre, email, password }) => {
    const existe = await Usuario.findOne({ email })
    if (existe) {
        throw new Error("El email ya está registrado")
    }
    const passwordHasheada = await bcrypt.hash(password, 10)
    const usuarioGuardado = await Usuario.create({
        nombre,
        email,
        password: passwordHasheada,
        rol: "alumno"
    })
    return usuarioDto(usuarioGuardado)
}

const registrarProfesor = async ({ nombre, email, password }) => {
    const existe = await Usuario.findOne({ email })
    if (existe) {
        throw new Error("El email ya está registrado")
    }
    const passwordHasheada = await bcrypt.hash(password, 10)
    const usuarioGuardado = await Usuario.create({
        nombre,
        email,
        password: passwordHasheada,
        rol: "profesor",
        plan: "gratis"
    })
    return usuarioDto(usuarioGuardado)
}

export { login, registrarAlumno, registrarProfesor }
