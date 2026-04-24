import { Sesion } from "../models/sesion.model.js"
import { Usuario } from "../models/usuario.model.js"
import { SesionNoEncontradaError } from "../errors/SesionNoEncontradaError.js"
import { UsuarioNoEncontradoError } from "../errors/UsuarioNoEncontradoError.js"
import { GoogleGenerativeAI } from "@google/generative-ai"

const obtenerSesiones = async (page, limit, alumnoEmail, tipoEntrenamiento) => {
    const query = {}

    if (alumnoEmail) {
        query.alumnoEmail = alumnoEmail
    }
    if (tipoEntrenamiento) {
        query.tipoEntrenamiento = { $regex: tipoEntrenamiento, $options: "i" }
    }

    if (page && limit) {
        page = Number(page)
        limit = Number(limit)
        const skip = (page - 1) * limit
        const total = await Sesion.countDocuments(query)
        const sesiones = await Sesion.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
        return { sesiones, limit, total, totalPaginas: Math.ceil(total / limit) }
    }

    const sesiones = await Sesion.find(query).sort({ createdAt: -1 })
    return sesiones
}

const obtenerPorId = async (id) => {
    const sesion = await Sesion.findById(id)
    if (!sesion) {
        throw new SesionNoEncontradaError()
    }
    return sesion
}

const crear = async (body) => {
    const alumno = await Usuario.findOne({ email: body.alumnoEmail, rol: "alumno" })
    if (!alumno) {
        throw new UsuarioNoEncontradoError()
    }
    return await Sesion.create(body)
}

const modificar = async (id, body) => {
    const sesion = await Sesion.findByIdAndUpdate(
        id,
        body,
        { returnDocument: "after", runValidators: true }
    )
    if (!sesion) {
        throw new SesionNoEncontradaError()
    }
    return sesion
}

const eliminar = async (id) => {
    const sesion = await Sesion.findByIdAndDelete(id)
    if (!sesion) {
        throw new SesionNoEncontradaError()
    }
}

const generarConIA = async (alumnoEmail) => {
    const alumno = await Usuario.findOne({ email: alumnoEmail, rol: "alumno" })
    if (!alumno) {
        throw new UsuarioNoEncontradoError()
    }

    const sesionesRecientes = await Sesion.find({ alumnoEmail })
        .sort({ createdAt: -1 })
        .limit(5)

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: "Eres un entrenador de running experto. Genera planes de entrenamiento en formato JSON válido. Solo devuelve el JSON, sin explicaciones ni markdown."
    })

    const historial = sesionesRecientes.length > 0
        ? sesionesRecientes.map(s => `- ${s.tipoEntrenamiento}: ${s.descripcion || "sin descripción"}`).join("\n")
        : "Sin historial previo"

    const prompt = `Genera una sesión de entrenamiento de running para el alumno ${alumno.nombre}.
Historial reciente:
${historial}

Devuelve un JSON con esta estructura exacta:
{
  "fecha": "YYYY-MM-DD",
  "tipoEntrenamiento": "nombre del tipo",
  "descripcion": "descripción general",
  "calentamiento": { "duracion": número_en_minutos },
  "trabajoPrincipal": { "descripcion": "texto", "distancia": número, "unidad": "metros|km", "cantidad": número },
  "vueltaCalma": { "duracion": número_en_minutos }
}`

    const result = await model.generateContent(prompt)
    const texto = result.response.text().trim()

    const jsonMatch = texto.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
        throw new Error("La IA no devolvió un JSON válido")
    }

    const sesionGenerada = JSON.parse(jsonMatch[0])
    sesionGenerada.alumnoEmail = alumnoEmail

    return sesionGenerada
}

export { obtenerSesiones, obtenerPorId, crear, modificar, eliminar, generarConIA }
