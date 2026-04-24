import * as climaService from "../services/clima.service.v1.js"

const obtenerClima = async (req, res) => {
    try {
        const clima = await climaService.obtenerClima(req.params.ciudad)
        res.status(200).json(clima)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { obtenerClima }
