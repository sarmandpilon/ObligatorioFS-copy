const sesionDto = (sesion) => {
    return {
        id: sesion._id,
        fecha: sesion.fecha,
        alumnoEmail: sesion.alumnoEmail,
        profesorEmail: sesion.profesorEmail,
        tipoEntrenamiento: sesion.tipoEntrenamiento,
        descripcion: sesion.descripcion,
        calentamiento: sesion.calentamiento,
        trabajoPrincipal: sesion.trabajoPrincipal,
        vueltaCalma: sesion.vueltaCalma,
        createdAt: sesion.createdAt
    }
}

export { sesionDto }