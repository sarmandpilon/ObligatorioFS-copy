import mongoose from "mongoose";

const sesionSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    alumnoEmail: { type: String, required: true },
    tipoEntrenamiento: { type: String, required: true },
    descripcion: { type: String },
    calentamiento: {
        duracion: { type: Number }
    },
    trabajoPrincipal: {
        descripcion: { type: String },
        distancia: { type: Number },
        unidad: { type: String },
        cantidad: { type: Number }
    },
    vueltaCalma: {
        duracion: { type: Number }
    }
}, {
    timestamps: true,
    collection: "sesiones"
})

const Sesion = mongoose.model("Sesion", sesionSchema)

export { Sesion }
