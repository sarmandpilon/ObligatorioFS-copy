class TipoNoEncontradoError extends Error {
    constructor() {
        super("Tipo de entrenamiento no encontrado")
        this.code = 404
    }
}

export { TipoNoEncontradoError }
