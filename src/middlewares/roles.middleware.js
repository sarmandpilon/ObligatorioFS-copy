const soloProfesor = (req, res, next) => {
    if (req.rol !== 'profesor') {
        res.status(403).json({ message: 'No tenés permiso para realizar esta acción' })
        return
    }
    next()
}

const soloAlumno = (req, res, next) => {
    if (req.rol !== 'alumno') {
        res.status(403).json({ message: 'No tenés permiso para realizar esta acción' })
        return
    }
    next()
}

export {soloProfesor, 
        soloAlumno }