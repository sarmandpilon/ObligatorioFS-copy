import * as sesionesService from "../services/sesiones.service.v1.js"

const obtenerSesiones = async (req, res) => {
    try {
        const { page, limit, alumnoEmail, tipoEntrenamiento } = req.query
        const resultado = await sesionesService.obtenerSesiones(page, limit, alumnoEmail, tipoEntrenamiento)
        res.status(200).json(resultado)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const obtenerPorId = async (req, res) => {
    try {
        const sesion = await sesionesService.obtenerPorId(req.params.id)
        res.status(200).json(sesion)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const crear = async (req, res) => {
    try {
        const sesion = await sesionesService.crear(req.body)
        res.status(201).json(sesion)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const modificar = async (req, res) => {
    try {
        const sesion = await sesionesService.modificar(req.params.id, req.body)
        res.status(200).json(sesion)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const eliminar = async (req, res) => {
    try {
        await sesionesService.eliminar(req.params.id)
        res.status(204).send()
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const generarConIA = async (req, res) => {
    try {
        const sesion = await sesionesService.generarConIA(req.params.alumnoEmail)
        res.status(200).json(sesion)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { obtenerSesiones, obtenerPorId, crear, modificar, eliminar, generarConIA }
