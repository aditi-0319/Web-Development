import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var heading = "Enter your name below: ";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: heading
  });
});

app.post("/submit", (req, res) => {
  let firstName = req.body["fName"];
  let lastName =req.body["lName"];

  if (firstName === "" || lastName === "") {
    res.render("index.ejs", {
      title: heading 
    });
  } else {
    var totalLetters = firstName.length + lastName.length;
    var outputTitle = `There are ${totalLetters} letters in your name.`;

    res.render("index.ejs", {
      title: outputTitle
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
