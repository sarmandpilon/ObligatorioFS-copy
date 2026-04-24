import {doRegistro,
        doLogin,
        doCambiarPlan,
        doSubirFotoPerfil } from '../services/auth.service.js'

const registro = async (req, res) => {
    try {
        const nuevoUsuario = await doRegistro(req.body, req.params.rol)
        res.status(201).json(nuevoUsuario)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const login = async (req, res) => {
    try {
        const token = await doLogin(req.body)
        res.status(200).json(token)
    } catch (e) {
        res.status(401).json({ message: e.message })
    }
}

const cambiarPlan = async (req, res) => {
    if (req.email !== req.params.email) {
        res.status(403).json({ message: 'No tenés permiso para cambiar el plan de otro usuario' })
        return
    }
    try {
        const usuario = await doCambiarPlan(req.params.email)
        res.status(200).json({ message: 'Plan actualizado a premium', usuario })
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

const subirFotoPerfil = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se envió ninguna imagen' })
        }
        const usuario = await doSubirFotoPerfil(req.params.email, req.file.path)
        res.status(200).json(usuario)
    } catch (e) {
        res.status(e.code || 400).json({ message: e.message })
    }
}

export {registro,
        login,
        cambiarPlan,
        subirFotoPerfil }