class SesionNoEncontradaError extends Error {
    constructor() {
        super('Sesión no encontrada')
        this.code = 404
    }
}

export { SesionNoEncontradaError }