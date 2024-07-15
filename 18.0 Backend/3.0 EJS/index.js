import express from "express";

const app = express();
const port = 3000;
const d = new Date();
let day = d.getDay();

app.get("/", (req, res) => {
    var dayType = "";
    var content = "";

    if (day === 0 || day === 6) {
        dayType = "weekend";
        content = "have fun";
    } else {
        dayType = "weekday";
        content = "work hard";
    }

    res.render("index.ejs", {
        type: dayType,
        advice: content
    });
});

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}.`);
});
