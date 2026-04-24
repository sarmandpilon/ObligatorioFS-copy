const obtenerClima = async (ciudad) => {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`

    const response = await fetch(url)

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Ciudad no encontrada")
        }
        throw new Error("Error al obtener el clima")
    }

    const data = await response.json()

    return {
        ciudad: data.name,
        pais: data.sys.country,
        temperatura: data.main.temp,
        sensacionTermica: data.main.feels_like,
        descripcion: data.weather[0].description,
        humedad: data.main.humidity,
        viento: data.wind.speed
    }
}

export { obtenerClima }
