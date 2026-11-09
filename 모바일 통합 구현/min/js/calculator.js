let currentNumber = "";   // 지금 입력하고 있는 숫자 (글자로 저장)
let firstNumber = null;   // 연산자를 누르기 전에 입력한 첫 번째 숫자
let operator = null;      // 사용자가 고른 연산자 (+, -, *, /)
const screen = document.getElementById("screen"); // 숫자를 보여줄 화면 요소

// 화면에 글자를 보여주는 함수
function show(text) {
  screen.textContent = text; // 화면 내용을 받은 글자로 바꿈
}

// 숫자를 한국어로 읽을 때 쓸 말
const numberWords = { "0": "영", "1": "일", "2": "이", "3": "삼", "4": "사", "5": "오", "6": "육", "7": "칠", "8": "팔", "9": "구" };

// 누른 숫자를 목소리로 읽어주는 함수 (브라우저 기본 음성 기능 사용)
function speakNumber(number) {
  speechSynthesis.cancel();                                         // 앞 숫자를 아직 읽는 중이면 끊음 (빠르게 눌러도 밀리지 않게)
  const voice = new SpeechSynthesisUtterance(numberWords[number]);  // 읽을 말 준비 (예: "칠")
  voice.lang = "ko-KR";                                             // 한국어 목소리로 읽기
  voice.rate = 1.3;                                                 // 말하는 속도 (1이 보통, 클수록 빠름)
  speechSynthesis.speak(voice);                                     // 소리 내어 읽기
}

// 숫자 버튼(0~9)을 눌렀을 때 실행되는 함수
function pressNumber(number) {
  speakNumber(number);                           // 누른 숫자를 목소리로 읽어줌
  if (currentNumber === "0") currentNumber = ""; // 맨 앞의 0은 지움 (예: 07 → 7)
  currentNumber += number;                       // 누른 숫자를 뒤에 이어 붙임
  show(currentNumber);                           // 화면에 지금 숫자를 보여줌
}

// 두 숫자를 연산자에 맞게 계산해서 결과를 돌려주는 함수
function calculate(a, b, op) {
  if (op === "+") return a + b; // 더하기
  if (op === "-") return a - b; // 빼기
  if (op === "*") return a * b; // 곱하기
  if (op === "/") return a / b; // 나누기
}

// 사칙연산 버튼(+, -, *, /)을 눌렀을 때 실행되는 함수
function pressOperator(op) {
  if (currentNumber !== "") {                    // 새로 입력한 숫자가 있으면
    if (firstNumber === null) firstNumber = Number(currentNumber); // 처음이면 첫 번째 숫자로 저장
    else firstNumber = calculate(firstNumber, Number(currentNumber), operator); // 이어서 계산 (예: 1+2+ → 3)
  }
  if (firstNumber === null) return;              // 숫자 없이 연산자만 누르면 무시
  operator = op;                                 // 고른 연산자 저장
  currentNumber = "";                            // 다음 숫자를 받을 준비
  show(firstNumber + " " + op);                  // 화면에 "첫 숫자 연산자" 표시
}

// = 버튼을 눌렀을 때 결과를 보여주는 함수
function pressEquals() {
  if (firstNumber === null || operator === null || currentNumber === "") return; // 계산할 게 부족하면 무시
  if (operator === "/" && Number(currentNumber) === 0) { // 0으로 나누려고 하면
    pressClear();                                // 전부 지우고
    return show("0으로 나눌 수 없음");             // 안내 문구 표시
  }
  const result = calculate(firstNumber, Number(currentNumber), operator); // 계산하기
  const roundedResult = Math.round(result * 1e10) / 1e10; // 소수점 오차 정리 (예: 0.30000000004 → 0.3)
  show(roundedResult);                           // 결과를 화면에 표시
  currentNumber = String(roundedResult);         // 결과에 이어서 계산할 수 있게 저장
  firstNumber = null;                            // 첫 번째 숫자 비우기
  operator = null;                               // 연산자 비우기
}

// C 버튼: 모든 값을 지우고 처음 상태로 되돌리는 함수
function pressClear() {
  currentNumber = ""; // 입력 중인 숫자 지움
  firstNumber = null; // 첫 번째 숫자 지움
  operator = null;    // 연산자 지움
  show("0");          // 화면을 0으로 되돌림
}
