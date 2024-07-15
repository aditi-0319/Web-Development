let n = document.querySelectorAll(".drum");

for (var i = 0; i < n.length; i++) {
    n[i].addEventListener("click", play_sound);
}

function play_sound() {
    let buttonText = this.innerHTML;
    make_sound(buttonText);  
    buttonAnimation(buttonText);  
}

document.addEventListener("keydown", function(event){
    make_sound(event.key);
    buttonAnimation(event.key);
})

function make_sound(key) {
    switch (key) {
        case "w":
            let crash = new Audio("./sounds/crash.mp3");
            crash.play();
            break;

        case "a":
            let kick = new Audio("./sounds/kick-bass.mp3");
            kick.play();
            break;

        case "s":
            let snare = new Audio("./sounds/snare.mp3");
            snare.play();
            break;

        case "d":
            let tom1 = new Audio("./sounds/tom-1.mp3");
            tom1.play();
            break;

        case "j":
            let tom2 = new Audio("./sounds/tom-2.mp3");
            tom2.play();
            break;

        case "k":
            let tom3 = new Audio("./sounds/tom-3.mp3");
            tom3.play();
            break;

        case "l":
            let tom4 = new Audio("./sounds/tom-4.mp3");
            tom4.play();
            break;

        default:
            console.log(buttonText);
            break;
    }
}

function buttonAnimation(currentKey){
    let activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    const timeout = setTimeout(removeStyle, 1000);

    function removeStyle(){
        activeButton.classList.remove("pressed");
    }
}
