let randomNumber1 = Math.floor((Math.random() * 6)) + 1;
let randomNumber2 = Math.floor((Math.random() * 6)) + 1;

const x = document.getElementsByClassName("img1");
const y = document.getElementsByClassName("img2");

x[0].setAttribute("src", "./images/dice" + randomNumber1 + ".png");
y[0].setAttribute("src", "./images/dice" + randomNumber2 + ".png");

if (randomNumber1 > randomNumber2){
    document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
} else if (randomNumber1 < randomNumber2){
    document.querySelector("h1").innerHTML = "Play 2 Wins! 🚩";
} else{
    document.querySelector("h1").innerHTML = "Draw!";
}
