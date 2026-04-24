import * as usuariosService from "../services/usuarios.service.v1.js"

const cambiarPlan = async (req, res) => {
    const email = req.params.email

    if (req.emailUsu !== email) {
        res.status(403).json({ message: "No tienes permiso para modificar el plan de otro usuario" })
        return
    }

    try {
        const usuario = await usuariosService.cambiarPlan(email)
        res.status(200).json(usuario)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

const subirFoto = async (req, res) => {
    const email = req.params.email
    const img = req.file

    if (!img) {
        res.status(400).json({ message: "No se envió imagen" })
        return
    }

    if (!img.mimetype.startsWith("image/")) {
        res.status(400).json({ message: "El archivo debe ser una imagen" })
        return
    }

    try {
        const usuario = await usuariosService.subirFoto(email, img)
        res.status(200).json(usuario)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { cambiarPlan, subirFoto }
