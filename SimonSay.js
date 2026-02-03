let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// START GAME
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        gameSeq = [];
        level = 0;
        levelUp();
    }
});

// GAME FLASH
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// USER FLASH
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

// LEVEL UP
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * btns.length);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);

    gameSeq.push(ranColor);

    console.log("GAME SEQUENCE:", gameSeq);

    gameFlash(ranBtn);
}

// CHECK ANSWER
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

// BUTTON PRESS
function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    console.log("USER SEQUENCE:", userSeq);
    console.log("GAME SEQUENCE:", gameSeq);

    checkAns(userSeq.length - 1);
}

// GAME OVER
function gameOver() {
    h2.innerHTML = `Game Over!!<br>Your Score: <b>${level}</b><br>Press any key to restart`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 200);

    reset();
}

// RESET GAME
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// BUTTON EVENT LISTENERS
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
