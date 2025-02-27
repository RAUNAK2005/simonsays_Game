let gameSeq = [];
let userSeq = [];
let btns = ["red", "purple", "green", "yellow"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let start=document.querySelector("#start")

// Start the game on keypress
start.addEventListener("click", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        level = 0; // Reset level
        gameSeq = []; // Reset game sequence
        levelUp();
    }
});

function btnFlash(btn) {
    if (!btn) {
        console.error("Button not found for flashing.");
        return;
    }
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = []; // Reset user sequence for the new level
    level++;
    h2.innerText = "Level " + level;

    let randomIndex = Math.floor(Math.random() * 4); // Correct range (0-3)
    let colorRandom = btns[randomIndex];
    let randomBtn = document.querySelector("." + colorRandom);

    if (!randomBtn) {
        console.error(`Button with class "${colorRandom}" not found. Check your HTML.`);
        return;
    }

    console.log("Random Color:", colorRandom);

    gameSeq.push(colorRandom);
    console.log("Game Sequence:", gameSeq);

    // Flash the random button
    btnFlash(randomBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            // Move to the next level after a short delay
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game Over
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        started = false; // Reset the game state
      
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");

    console.log("User Clicked:", userColor);

    userSeq.push(userColor);
    checkAns(userSeq.length - 1); // Check the latest user input
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}













































