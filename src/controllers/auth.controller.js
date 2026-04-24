import * as authService from "../services/auth.service.v1.js"

const login = async (req, res) => {
    try {
        const resultado = await authService.login(req.body)
        res.status(200).json(resultado)
    } catch (e) {
        res.status(401).json({ message: e.message })
    }
}

const registrarAlumno = async (req, res) => {
    try {
        const usuario = await authService.registrarAlumno(req.body)
        res.status(201).json(usuario)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

const registrarProfesor = async (req, res) => {
    try {
        const usuario = await authService.registrarProfesor(req.body)
        res.status(201).json(usuario)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

export { login, registrarAlumno, registrarProfesor }
