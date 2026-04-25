import {doCrearSesion,
        doObtenerSesiones,
        doObtenerSesionPorId,
        doModificarSesion,
        doEliminarSesion,
        doGenerarSesionConIA } from '../services/sesiones.service.js'

const crearSesion = async (req, res) => {
    try {
        const nuevaSesion = await doCrearSesion(req.body, req.email, req.plan)
        res.status(201).json(nuevaSesion)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const obtenerSesiones = async (req, res) => {
    try {
        const resultado = await doObtenerSesiones(req.query)
        res.status(200).json(resultado)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const obtenerSesionPorId = async (req, res) => {
    try {
        const sesion = await doObtenerSesionPorId(req.params.id)
        res.status(200).json(sesion)
    } catch (e) {
        res.status(e.code || 404).json({ message: e.message })
    }
}

const modificarSesion = async (req, res) => {
    try {
        const sesionModificada = await doModificarSesion(req.params.id, req.body)
        res.status(200).json(sesionModificada)
    } catch (e) {
        res.status(e.code || 404).json({ message: e.message })
    }
}

const eliminarSesion = async (req, res) => {
    try {
        await doEliminarSesion(req.params.id)
        res.status(204).send()
    } catch (e) {
        res.status(e.code || 404).json({ message: e.message })
    }
}

const generarSesionConIA = async (req, res) => {
    try {
        const sesionSugerida = await doGenerarSesionConIA(req.params.alumnoEmail)
        res.status(200).json({ sesionSugerida })
    } catch (e) {
        res.status(200).json({ 
            message: 'No se pudo generar la sesión con IA, pero la aplicación sigue funcionando',
            sesionSugerida: null 
        })
    }
}

export {crearSesion, 
        obtenerSesiones, 
        obtenerSesionPorId, 
        modificarSesion, 
        eliminarSesion, 
        generarSesionConIA }