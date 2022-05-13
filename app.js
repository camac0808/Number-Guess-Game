//유저가 1~100밖의 숫자를 입력하면 기회를 깎지 않고 알려준다
//유저가 입력한 숫자를 또 입력하면 알려주고 기회를 안깎는다

let computerNum = 0;
const playButton = document.getElementById("play-button");
const userInput = document.getElementById("user-input");
const resultArea = document.getElementById("result-area");
const resetButton = document.getElementById("reset-button");
const guessArea = document.getElementById("guess-area");
let history = [];
let chance = 5;

// 랜덤값
function pickNumber() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log(computerNum);
}

pickNumber();

// 게임 실행
function play() {

  let userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
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
  }

  history.push(userValue);
  guessArea.innerHTML = `Your Guess Number is: ${history}`;

  if (chance < 1) {
    resultArea.innerHTML = "GAME OVER... TRY AGAIN";
    playButton.disabled = true;
  }
  userInput.value = "";
}


// 엔터키 쳤을때 게임실행
function playKeyUp(event) {
  if (event.keyCode == 13) {
    play();
  }
}

// reset 하기
function reset() {
  history = [];
  userInput.value = "";
  pickNumber();
  resultArea.innerHTML = "숫자를 맞춰보세요 1부터 100까지";
  chance = 5;
}

playButton.addEventListener("click", play);
userInput.addEventListener("keyup", playKeyUp);
resetButton.addEventListener("click", reset);
