import mongoose from 'mongoose'

const sesionSchema = new mongoose.Schema({
    fecha: { type: String, required: true },
    alumnoEmail: { type: String, required: true },
    profesorEmail: { type: String, required: true },
    tipoEntrenamiento: { type: String, required: true },
    descripcion: { type: String },
    calentamiento: {
        duracion: { type: Number, required: true }
    },
    trabajoPrincipal: {
        descripcion: { type: String, required: true },
        distancia: { type: Number, required: true },
        unidad: { type: String, required: true, enum: ['metros', 'km', 'minutos'] },
        cantidad: { type: Number }
    },
    vueltaCalma: {
        duracion: { type: Number, required: true }
    }
}, {
    timestamps: true,
    collection: 'sesiones'
})

const Sesion = mongoose.model('Sesion', sesionSchema)

export { Sesion }