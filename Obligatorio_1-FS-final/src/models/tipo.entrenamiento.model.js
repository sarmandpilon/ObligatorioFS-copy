import mongoose from 'mongoose'

const tipoEntrenamientoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String }
}, {
    timestamps: true,
    collection: 'tipos_entrenamiento'
})

const TipoEntrenamiento = mongoose.model('TipoEntrenamiento', tipoEntrenamientoSchema)

export { TipoEntrenamiento }