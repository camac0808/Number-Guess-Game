// 레벨 단계
// 레벨 오르면 rangenumber 곱하기

let computerNum = 0;
const playButton = document.getElementById("play-button");
const userInput = document.getElementById("user-input");
const resultArea = document.getElementById("result-area");
const resetButton = document.getElementById("reset-button");
const guessArea = document.getElementById("guess-area");
const levelArea = document.getElementById("level-area");

let enterPress = true;
let history = [];

let RANGENUMBER = 50;
let LEVEL = 1;
let CHANCE = 5 * LEVEL;

// 랜덤값
function pickNumber() {
  computerNum = Math.floor(Math.random() * RANGENUMBER * LEVEL) + 1;

  console.log(computerNum);
}
pickNumber();

// 레벨단계 표현
levelArea.innerHTML = `LEVEL : ${LEVEL}`;

// 게임 실행
function play() {
  let userValue = userInput.value;
  // 1~100 범위밖 숫자 입력했을때
  if (userValue < 1 || userValue > RANGENUMBER * LEVEL) {
    resultArea.innerHTML = `1부터 ${RANGENUMBER * LEVEL}사이의 값을 입력해 주세요! ${CHANCE}번 남았습니다`;
    userInput.value = "";
    return;
  }
  // 중복된 숫자를 입력했을 경우
  if (history.includes(userValue)) {
    resultArea.innerHTML = `같은 숫자를 입력하셨습니다. ${CHANCE}번 남았습니다`;
    userInput.value = "";
    return;
  }
  // 기회 하나씩 차감
  CHANCE--;
  // 1~100 사이 숫자 쳤을때 
  if (userValue < computerNum) {
    resultArea.innerHTML = `UP!! ${CHANCE}번 기회가 남았습니다`;
  } else if (userValue > computerNum) {
    resultArea.innerHTML = `DOWN!! ${CHANCE}번 기회가 남았습니다`;
  } else {
    userInput.value = "";
    if (LEVEL === 3) {
      resultArea.innerHTML = `CONGRATULATION! YOU WON!!`;
      playButton.disabled = true;
      enterPress = false;
    } else {
      LEVEL += 1;
      CHANCE = 5 * LEVEL;
      levelArea.innerHTML = `LEVEL : ${LEVEL}`;
      resultArea.innerHTML = `CORRECT!! 1부터 ${RANGENUMBER * LEVEL}사이의 값을 입력해 주세요! ${CHANCE}번 남았습니다`;
      pickNumber();
    }
    return;
  }

  // guess한 기록
  history.push(userValue);
  guessArea.innerHTML = `Your Guess Number is: ${history}`;

  // 못맞출 시
  if (CHANCE < 1) {
    resultArea.innerHTML = `GAME OVER... THE NUMBER WAS <span>${computerNum}</span>.. TRY AGAIN`;
    playButton.disabled = true;
    enterPress = false;
  }
  userInput.value = "";
}

// 엔터키 쳤을때 게임실행
function playKeyUp(event) {
  if (event.keyCode == 13) {
    if (enterPress) {
      play();
    } else {
      event.preventDefault();
    }
  }
}

// reset 하기
function reset() {
  playButton.disabled = false;
  enterPress = true;
  CHANCE = 5;
  LEVEL = 1;
  history = [];
  pickNumber();
  userInput.value = "";
  levelArea.innerHTML = `LEVEL : ${LEVEL}`;
  resultArea.innerHTML = `숫자를 맞춰보세요 1부터 ${RANGENUMBER * LEVEL}까지`;
  guessArea.innerHTML = "Your Guess Number is:";
}

//레벨업 함수
function levelUp() {
  
}

playButton.addEventListener("click", play);
userInput.addEventListener("keyup", playKeyUp);
resetButton.addEventListener("click", reset);
