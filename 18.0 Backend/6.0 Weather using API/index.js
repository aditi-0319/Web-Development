import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_FORCAST = "http://api.openweathermap.org/data/2.5/forecast";
const API_COORDINATES = "http://api.openweathermap.org/geo/1.0/direct";
const API_KEY = "6ed0da5e1b9c52f082fb69c8ac03b4ca";
const LIMIT = 3;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.render("index.ejs");
});

app.post("/forecast", async (req, res) => {
    let cityName = req.body["cityName"];
    let stateName = req.body["stateName"];

    try {
        const result = await axios.get(API_COORDINATES, {
            params: {
                q: cityName,
                limit: LIMIT,
                appid: API_KEY
            }
        });        

        let LAT, LON;

        for (var i = 0; i < result.data.length; i++) {
            if (result.data[i].name === cityName && result.data[i].state === stateName) {
                LAT = result.data[i].lat;
                LON = result.data[i].lon;
                break;
            }
        }      
        
        const weatherResult = await axios.get(API_FORCAST, {
            params: {
                lat: LAT,
                lon: LON,
                appid: API_KEY,
                units: "metric"
            }
        });
        
        res.render("weather.ejs", {
            cityName: cityName,
            temp: weatherResult.data.list[0].main.temp,
            feelsLike: weatherResult.data.list[0].main.feels_like,
            maxTemp: weatherResult.data.list[0].main.temp_max,
            minTemp: weatherResult.data.list[0].main.temp_min,
            ft: weatherResult.data.list[0].dt_txt.split(" ")[1].slice(0, 5),
            curr_next_weather: weatherResult.data.list[1].weather[0].main,
            ft1: weatherResult.data.list[1].dt_txt.split(" ")[1].slice(0, 5),
            ft2: weatherResult.data.list[2].dt_txt.split(" ")[1].slice(0, 5),
            ft3: weatherResult.data.list[3].dt_txt.split(" ")[1].slice(0, 5),
            ft4: weatherResult.data.list[4].dt_txt.split(" ")[1].slice(0, 5),
            list: weatherResult.data.list,
        });
    } catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
