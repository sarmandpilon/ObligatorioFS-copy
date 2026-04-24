import { TipoEntrenamiento } from "../models/tipo.entrenamiento.model.js"
import { TipoNoEncontradoError } from "../errors/TipoNoEncontradoError.js"

const obtenerTodos = async () => {
    return await TipoEntrenamiento.find()
}

const obtenerPorId = async (id) => {
    const tipo = await TipoEntrenamiento.findById(id)
    if (!tipo) {
        throw new TipoNoEncontradoError()
    }
    return tipo
}

const crear = async ({ nombre, descripcion }) => {
    const existe = await TipoEntrenamiento.findOne({ nombre })
    if (existe) {
        throw new Error("Ya existe un tipo de entrenamiento con ese nombre")
    }
    return await TipoEntrenamiento.create({ nombre, descripcion })
}

const modificar = async (id, body) => {
    const tipo = await TipoEntrenamiento.findByIdAndUpdate(
        id,
        body,
        { returnDocument: "after", runValidators: true }
    )
    if (!tipo) {
        throw new TipoNoEncontradoError()
    }
    return tipo
}

const eliminar = async (id) => {
    const tipo = await TipoEntrenamiento.findByIdAndDelete(id)
    if (!tipo) {
        throw new TipoNoEncontradoError()
    }
}

export { obtenerTodos, obtenerPorId, crear, modificar, eliminar }
