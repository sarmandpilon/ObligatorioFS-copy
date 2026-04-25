import { GoogleGenerativeAI } from '@google/generative-ai'
import { Sesion } from '../models/sesion.model.js'
import { sesionDto } from '../dtos/sesion.dto.js'
import { SesionNoEncontradaError } from '../errors/SesionNoEncontradaError.js'
import { Usuario } from '../models/usuario.model.js'

const doCrearSesion = async (body, profesorEmail, profesorPlan) => {
    const { alumnoEmail } = body

    // Verificar que el alumno existe
    const alumno = await Usuario.findOne({ email: alumnoEmail })
    if (!alumno) {
        throw new Error('No existe un alumno con ese email')
    }

    // Verificar que el usuario encontrado es realmente un alumno
    if (alumno.rol !== 'alumno') {
        throw new Error('El usuario indicado no es un alumno')
    }

    // Verificar el límite del plan plus
    if (profesorPlan === 'plus') {
        const cantidadSesiones = await Sesion.countDocuments({ alumnoEmail })
        if (cantidadSesiones >= 4) {
            throw new Error('Ha llegado al límite de carga de sesiones, obtenga el plan premium para continuar')
        }
    }

    const nuevaSesion = await Sesion.create({
        ...body,
        profesorEmail
    })

    return sesionDto(nuevaSesion)
}

const doObtenerSesiones = async (query) => {
    const { alumnoEmail, tipoEntrenamiento, page = 1, limit = 10 } = query

    const filtro = {}

    if (alumnoEmail) {
        filtro.alumnoEmail = alumnoEmail
    }

    if (tipoEntrenamiento) {
        filtro.tipoEntrenamiento = tipoEntrenamiento
    }
    //paginacion, muestra de a 10 sesiones por pagina para no mostrar todo junto
    const total = await Sesion.countDocuments(filtro)
    const sesiones = await Sesion.find(filtro)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))

    return {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: sesiones.map(sesionDto)
    }
}

const doObtenerSesionPorId = async (id) => {
    const sesion = await Sesion.findById(id)
    if (!sesion) {
        throw new SesionNoEncontradaError()
    }
    return sesionDto(sesion)
}

const doModificarSesion = async (id, body) => {
    const sesion = await Sesion.findByIdAndUpdate(
        id,
        body,
        { returnDocument: 'after', runValidators: true }
    )
    if (!sesion) {
        throw new SesionNoEncontradaError()
    }
    return sesionDto(sesion)
}

const doEliminarSesion = async (id) => {
    const sesion = await Sesion.findByIdAndDelete(id)
    if (!sesion) {
        throw new SesionNoEncontradaError()
    }
}

const doGenerarSesionConIA = async (alumnoEmail) => {
    const alumno = await Usuario.findOne({ email: alumnoEmail })
    if (!alumno) {
        throw new Error('No existe un alumno con ese email')
    }

    const sesionesDelAlumno = await Sesion.find({ alumnoEmail })
    if (sesionesDelAlumno.length === 0) {
        throw new Error('El alumno no tiene sesiones registradas para generar una sugerencia')
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        systemInstruction: `Eres un entrenador de running experto. Tu objetivo es analizar el historial de entrenamientos de un atleta y sugerir la próxima sesión de entrenamiento. 
        Devolvé únicamente un objeto JSON con esta estructura, sin explicaciones ni texto adicional:
        {
            "fecha": "YYYY-MM-DD",
            "tipoEntrenamiento": "string",
            "descripcion": "string",
            "calentamiento": { "duracion": number },
            "trabajoPrincipal": {
                "descripcion": "string",
                "distancia": number,
                "unidad": "metros|km|minutos",
                "cantidad": number
            },
            "vueltaCalma": { "duracion": number }
        }`,
        requestOptions: {
            timeout: 10000
        }
    })

    try {
        const prompt = `Este es el historial de entrenamientos del atleta: ${JSON.stringify(sesionesDelAlumno)}. Sugerí la próxima sesión de entrenamiento.`
        const result = await model.generateContent(prompt)
        const texto = result.response.text().trim()
        const limpio = texto.replace(/```json|```/g, '').trim()
        return JSON.parse(limpio)
    } catch (e) {
        console.log('error con gemini', e)
        return null
    }
}


export {doCrearSesion, 
        doObtenerSesiones, 
        doObtenerSesionPorId, 
        doModificarSesion, 
        doEliminarSesion,
        doGenerarSesionConIA }