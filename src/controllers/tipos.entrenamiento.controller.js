import * as tiposService from "../services/tipos.entrenamiento.service.v1.js"

const obtenerTodos = async (req, res) => {
    try {
        const tipos = await tiposService.obtenerTodos()
        res.status(200).json(tipos)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const obtenerPorId = async (req, res) => {
    try {
        const tipo = await tiposService.obtenerPorId(req.params.id)
        res.status(200).json(tipo)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const crear = async (req, res) => {
    try {
        const tipo = await tiposService.crear(req.body)
        res.status(201).json(tipo)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const modificar = async (req, res) => {
    try {
        const tipo = await tiposService.modificar(req.params.id, req.body)
        res.status(200).json(tipo)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const eliminar = async (req, res) => {
    try {
        await tiposService.eliminar(req.params.id)
        res.status(204).send()
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { obtenerTodos, obtenerPorId, crear, modificar, eliminar }
