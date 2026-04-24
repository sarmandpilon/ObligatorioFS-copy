import { TipoEntrenamiento } from '../models/tipo.entrenamiento.model.js'
import { TipoEntrenamientoNoEncontradoError } from '../errors/TipoEntrenamientoNoEncontradoError.js'

const doCrearTipoEntrenamiento = async (body) => {
    const { nombre } = body

    const tipoExistente = await TipoEntrenamiento.findOne({ nombre })
    if (tipoExistente) {
        throw new Error('Ya existe un tipo de entrenamiento con ese nombre')
    }

    const nuevoTipo = await TipoEntrenamiento.create(body)
    return nuevoTipo
}

const doObtenerTiposEntrenamiento = async () => {
    return await TipoEntrenamiento.find()
}

const doObtenerTipoEntrenamientoPorId = async (id) => {
    const tipo = await TipoEntrenamiento.findById(id)
    if (!tipo) {
        throw new TipoEntrenamientoNoEncontradoError()
    }
    return tipo
}

const doModificarTipoEntrenamiento = async (id, body) => {
    const tipo = await TipoEntrenamiento.findByIdAndUpdate(
        id,
        body,
        { returnDocument: 'after', runValidators: true }
    )
    if (!tipo) {
        throw new TipoEntrenamientoNoEncontradoError()
    }
    return tipo
}

const doEliminarTipoEntrenamiento = async (id) => {
    const tipo = await TipoEntrenamiento.findByIdAndDelete(id)
    if (!tipo) {
        throw new TipoEntrenamientoNoEncontradoError()
    }
}

export { 
    doCrearTipoEntrenamiento, 
    doObtenerTiposEntrenamiento, 
    doObtenerTipoEntrenamientoPorId, 
    doModificarTipoEntrenamiento, 
    doEliminarTipoEntrenamiento 
}