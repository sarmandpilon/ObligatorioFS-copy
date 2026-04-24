import { v2 as cloudinary } from "cloudinary"
import { Usuario } from "../models/usuario.model.js"
import { UsuarioNoEncontradoError } from "../errors/UsuarioNoEncontradoError.js"
import { usuarioDto } from "../dtos/usuario.dto.js"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cambiarPlan = async (email) => {
    const profesor = await Usuario.findOne({ email, rol: "profesor" })
    if (!profesor) {
        throw new UsuarioNoEncontradoError()
    }
    profesor.plan = "premium"
    await profesor.save()
    return usuarioDto(profesor)
}

const subirFoto = async (email, img) => {
    const alumno = await Usuario.findOne({ email, rol: "alumno" })
    if (!alumno) {
        throw new UsuarioNoEncontradoError()
    }

    const imgBase64 = Buffer.from(img.buffer).toString("base64")
    const uri = "data:" + img.mimetype + ";base64," + imgBase64

    let result
    try {
        result = await cloudinary.uploader.upload(uri, { folder: "running-api/fotos" })
    } catch (e) {
        console.log("error al subir la imagen a cloudinary", e)
        throw new Error("Error al subir la imagen")
    }

    alumno.fotoUrl = result.secure_url
    await alumno.save()
    return usuarioDto(alumno)
}

export { cambiarPlan, subirFoto }
