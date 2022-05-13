// 레벨 단계
// 레벨 오르면 rangenumber 곱하기

let computerNum = 0;
const playButton = document.getElementById("play-button");
const userInput = document.getElementById("user-input");
const resultArea = document.getElementById("result-area");
const resetButton = document.getElementById("reset-button");
const guessArea = document.getElementById("guess-area");
const levelArea = document.getElementById("level-area");
const RANGENUMBER = 50;
const LEVEL = 1;
let enter = true;
let history = [];
let chance = 5;

// 랜덤값
function pickNumber() {
  computerNum = Math.floor(Math.random() * RANGENUMBER) + 1;
  console.log(computerNum);
}
pickNumber();
// 레벨단계 표현
levelArea.innerHTML = `LEVEL : ${LEVEL}`;


// 게임 실행
function play() {
  let userValue = userInput.value;
  if (userValue < 1 || userValue > RANGENUMBER) {
    resultArea.innerHTML = `1부터 100사이의 값을 입력해 주세요! ${chance}번 남았습니다`;
    return;
  }

  if (history.includes(userValue)) {
    resultArea.innerHTML = `같은 숫자를 입력하셨습니다. ${chance}번 남았습니다`;
    return;
  }
  chance--;

  if (userValue < computerNum) {
    resultArea.innerHTML = `UP!! ${chance}번 기회가 남았습니다`;
  } else if (userValue > computerNum) {
    resultArea.innerHTML = `DOWN!! ${chance}번 기회가 남았습니다`;
  } else {
    resultArea.innerHTML = `CORRECT!!`;
    playButton.disabled = true;
    enter = false;
  }

  history.push(userValue);
  guessArea.innerHTML = `Your Guess Number is: ${history}`;

  if (chance < 1) {
    resultArea.innerHTML = `GAME OVER... THE NUMBER WAS ${computerNum}.. TRY AGAIN`;
    playButton.disabled = true;
    enter = false;
  }
  userInput.value = "";
}

// 엔터키 쳤을때 게임실행
function playKeyUp(event) {
  if (event.keyCode == 13) {
    if (enter == true) {
      play();
    } else if (enter == false) {
      event.preventDefault();
    }
  }
}

// reset 하기
function reset() {
  playButton.disabled = false;
  enter = true;
  chance = 5;
  history = [];
  userInput.value = "";
  pickNumber();
  resultArea.innerHTML = `숫자를 맞춰보세요 1부터 ${RANGENUMBER}까지`;
  guessArea.innerHTML = "Your Guess Number is:";
}

playButton.addEventListener("click", play);
userInput.addEventListener("keyup", playKeyUp);
resetButton.addEventListener("click", reset);
