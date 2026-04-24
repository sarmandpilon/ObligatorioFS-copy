import {doCrearTipoEntrenamiento, 
        doObtenerTiposEntrenamiento, 
        doObtenerTipoEntrenamientoPorId, 
        doModificarTipoEntrenamiento, 
        doEliminarTipoEntrenamiento } from '../services/tipos.entrenamiento.service.js'

const crearTipoEntrenamiento = async (req, res) => {
    try {
        const nuevoTipo = await doCrearTipoEntrenamiento(req.body)
        res.status(201).json(nuevoTipo)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const obtenerTiposEntrenamiento = async (req, res) => {
    try {
        const tipos = await doObtenerTiposEntrenamiento()
        res.status(200).json(tipos)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const obtenerTipoEntrenamientoPorId = async (req, res) => {
    try {
        const tipo = await doObtenerTipoEntrenamientoPorId(req.params.id)
        res.status(200).json(tipo)
    } catch (e) {
        res.status(e.code || 404).json({ message: e.message })
    }
}

const modificarTipoEntrenamiento = async (req, res) => {
    try {
        const tipoModificado = await doModificarTipoEntrenamiento(req.params.id, req.body)
        res.status(200).json(tipoModificado)
    } catch (e) {
        res.status(e.code || 404).json({ message: e.message })
    }
}

const eliminarTipoEntrenamiento = async (req, res) => {
    try {
        await doEliminarTipoEntrenamiento(req.params.id)
        res.status(204).send()
    } catch (e) {
        res.status(e.code || 404).json({ message: e.message })
    }
}

export {crearTipoEntrenamiento, 
        obtenerTiposEntrenamiento, 
        obtenerTipoEntrenamientoPorId, 
        modificarTipoEntrenamiento, 
        eliminarTipoEntrenamiento }