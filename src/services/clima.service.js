const doObtenerClima = async (ciudad) => {
    const apiKey = process.env.OPENWEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
        throw new Error('No se pudo obtener el clima para esa ciudad')
    }

    return {
        ciudad: data.name,
        temperatura: data.main.temp,
        sensacionTermica: data.main.feels_like,
        humedad: data.main.humidity,
        descripcion: data.weather[0].description,
        viento: data.wind.speed,
        aptoPararCorrer: data.main.temp >= 5 && 
                         data.main.temp <= 35 && 
                         data.wind.speed < 10 &&
                         !data.weather[0].description.includes('lluvia') &&
                         !data.weather[0].description.includes('tormenta')
    }
}

export { doObtenerClima }