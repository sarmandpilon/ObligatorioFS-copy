const usuarioDto = (usuario) => {
    return {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        plan: usuario.plan,
        fotoUrl: usuario.fotoUrl,
        createdAt: usuario.createdAt
    }
}

export { usuarioDto }
