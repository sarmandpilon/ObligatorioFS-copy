import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, enum: ['profesor', 'alumno'] },
    plan: { type: String, enum: ['plus', 'premium'] },
    fotoPerfil: { type: String, default: null }
}, {
    timestamps: true,
    collection: 'usuarios'
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export { Usuario }