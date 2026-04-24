import mongoose from 'mongoose'

const conectarBD = async () => {
    const usuario = process.env.MONGO_DB_USER
    const password = process.env.MONGO_DB_PASSWORD
    const nombre = process.env.MONGO_DB_NAME
    const host = process.env.MONGO_DB_HOST
    const replicaSet = process.env.MONGO_DB_REPLICA_SET

    try {
        await mongoose.connect(`mongodb://${usuario}:${password}@${host}/${nombre}?replicaSet=${replicaSet}&authSource=admin&tls=true`)
        console.log('MongoDB conectado')
    } catch (e) {
        console.error('Error al conectar a MongoDB:', e.message)
        process.exit(1)
    }
}

export { conectarBD }