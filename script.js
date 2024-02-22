async function fetchData() {
    const response = await(fetch("http://api.weatherapi.com/v1/forecast.json?key=bf935812ebbc4fa584420600242401&q=Sydney&days=7&aqi=yes&alerts=no"));
    const data = await response.json();
    const conditions_json = await(fetch("https://www.weatherapi.com/docs/weather_conditions.json"));
    const conditions = await conditions_json.json()
    let icon_code = data.current.condition.code;
    let day_night = data.current.is_day;
    let icon = 0;
    for (let i = 0; i < conditions.length; i++)
    {
        if (conditions[i].code == icon_code)
        {
            icon = conditions[i].icon;
        }
    }

    let right_icon = "day/113.png"
    if (day_night = 1)
    {
        right_icon = "day/" + icon + ".png";
    }
    else {
        right_icon = "night/" + icon + ".png";
    }

    document.getElementById("localtime").innerHTML += data.location.localtime.split(" ")[0];
    document.getElementById("temperature").innerHTML += data.current.temp_c + "° C";
    document.getElementById("condition").innerHTML += `<img src =\"${right_icon}\" alt= "Current Weather Condition"></img><br>`;
    document.getElementById("condition").innerHTML += data.current.condition.text;
    document.getElementById("humidity").innerHTML += data.current.humidity + "%";
    document.getElementById("precip_mm").innerHTML += data.current.precip_mm + " mm";
    document.getElementById("uv").innerHTML += data.current.uv;
    document.getElementById("feels_like").innerHTML += data.current.feelslike_c + "° C";
    document.getElementById("wind_kph").innerHTML += "Wind Speed: " + data.current.wind_kph + " km/h";
    document.getElementById("gust_kph").innerHTML += "Gust Speed: " + data.current.gust_kph + " km/h";
    document.getElementById("wind_dir").innerHTML += "Wind Direction: " + data.current.wind_degree +"° ("  + data.current.wind_dir + ")";
    document.getElementById("pressure_mb").innerHTML += "Air Pressure: " + data.current.pressure_mb + " mbar";
    document.getElementById("co").innerHTML += data.current.air_quality.co + " μg/m3";
    document.getElementById("no2").innerHTML += data.current.air_quality.no2 + " μg/m3";
    document.getElementById("o3").innerHTML += data.current.air_quality.o3 + " μg/m3";
    document.getElementById("so2").innerHTML += data.current.air_quality.so2 + " μg/m3";
    document.getElementById("pm2_5").innerHTML += data.current.air_quality.pm2_5 + " μg/m3";
    document.getElementById("pm10").innerHTML += data.current.air_quality.pm10 + " μg/m3";
    document.getElementById("sunrise").innerHTML += data.forecast.forecastday[0].astro.sunrise;
    document.getElementById("sunset").innerHTML += data.forecast.forecastday[0].astro.sunset;
    document.getElementById("moonrise").innerHTML += data.forecast.forecastday[0].astro.moonrise;
    document.getElementById("moonset").innerHTML += data.forecast.forecastday[0].astro.moonset;
    document.getElementById("moon_phase").innerHTML += data.forecast.forecastday[0].astro.moon_phase;
    for (let i = 6; i < 22; i = i + 3)
    {
        this_icon = await(get_icon(i))
        element = "time" + i;
        console.log(element)
        console.log(this_icon[0])
        document.getElementById(element).innerHTML += data.forecast.forecastday[0].hour[i].temp_c + "° C" + "</br>";
        document.getElementById(element).innerHTML += `<img src =\"${this_icon[0]}\" alt= "Current Weather Condition"></img><br>` +  this_icon[1];
    }
}

async function get_icon(hour) {
    const response = await(fetch("http://api.weatherapi.com/v1/forecast.json?key=bf935812ebbc4fa584420600242401&q=Sydney&days=7&aqi=yes&alerts=no"));
    const data = await response.json();
    const conditions_json = await(fetch("https://www.weatherapi.com/docs/weather_conditions.json"))
    const conditions = await conditions_json.json();
    let condition_text = data.forecast.forecastday[0].hour[hour].condition.text;
    let icon_code = data.forecast.forecastday[0].hour[hour].condition.code;
    let day_night = data.forecast.forecastday[0].hour[hour].is_day;
    let icon = 0;
    for (let i = 0; i < conditions.length; i++)
    {
        if (conditions[i].code == icon_code)
        {
            icon = conditions[i].icon;
        }
    }

    let right_icon = "day/113.png"
    if (day_night = 1)
    {
        right_icon = "day/" + icon + ".png";
    }
    else {
        right_icon = "night/" + icon + ".png";
    }
    return [right_icon, condition_text];
}

fetchData()

// when doing future days, i can index into the data because there are only 7 days