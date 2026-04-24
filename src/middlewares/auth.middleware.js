import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({ message: 'Token no enviado' })
        return
    }
    //verifica el token enviado por el cliente y si es valido manda la info al 
    //controlador para que la use
    try {
        const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET)
        req.email = tokenVerificado.email
        req.rol = tokenVerificado.rol
        req.plan = tokenVerificado.plan
        next()
        console.log('contenido token:', tokenVerificado)
    } catch (e) {
        console.log('token invalido')
        res.status(401).json({ message: 'Token inválido' })
    }
}

export { authMiddleware }