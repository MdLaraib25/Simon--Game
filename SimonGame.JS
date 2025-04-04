let gameSeq = [];
let userSeq = [];
let btns = ["clr1", "clr2", "clr3", "clr4"];

let h2 = document.querySelector("h2");
let scoreEl = document.getElementById("score");
let started = false;
let level = 0;
let highScore = 0;

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 400);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 400);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  scoreEl.innerText = `Score: ${level - 1}`;
  let rndmIdx = Math.floor(Math.random() * 4);
  let rndmCol = btns[rndmIdx];
  let rndmBtn = document.querySelector(`.${rndmCol}`);
  gameSeq.push(rndmCol);
  btnFlash(rndmBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 600);
    }
  } else {
    if (level - 1 > highScore) {
      highScore = level - 1;
    }
    h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b><br>Press any key to play again`;
    scoreEl.innerText = `High Score: ${highScore}`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
