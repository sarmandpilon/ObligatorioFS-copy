import mongoose from "mongoose";

const tipoEntrenamientoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true }
}, {
    timestamps: true,
    collection: "tipos-entrenamiento"
})

const TipoEntrenamiento = mongoose.model("TipoEntrenamiento", tipoEntrenamientoSchema)

export { TipoEntrenamiento }
