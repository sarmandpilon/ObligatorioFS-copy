const usuarioDto = (usuario) => {
    return {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        plan: usuario.plan,
        fotoPerfil: usuario.fotoPerfil,
        createdAt: usuario.createdAt
    }
}

export { usuarioDto }