import { doObtenerClima } from '../services/clima.service.js'

const obtenerClima = async (req, res) => {
    try {
        const clima = await doObtenerClima(req.params.ciudad)
        res.status(200).json(clima)
    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}

export { obtenerClima }