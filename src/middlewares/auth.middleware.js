import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({ message: "Token no enviado" })
        return
    }

    try {
        const tokenUsu = jwt.verify(token, process.env.JWT_SECRET)
        req.idUsu = tokenUsu.idUsu
        req.rolUsu = tokenUsu.rolUsu
        req.emailUsu = tokenUsu.emailUsu
        next()
    } catch (e) {
        res.status(401).json({ message: "Token inválido" })
    }
}

export { authMiddleware }
