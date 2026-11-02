/* =========================================================
   로또 6/45 번호 생성기
   - [번호 뽑기] 1~45 중 중복 없는 번호 6개를 무작위로 뽑는다.
   - [통계 추천] 역대 당첨번호에서 많이 나온 번호 중에서 6개를 뽑는다.
   - 결과는 항상 오름차순으로 보여준다.
   ========================================================= */

/** 로또 규칙 상수 */
const MIN_NUMBER = 1;   // 뽑을 수 있는 가장 작은 번호
const MAX_NUMBER = 45;  // 뽑을 수 있는 가장 큰 번호
const PICK_COUNT = 6;   // 한 번에 뽑는 번호 개수

/**
 * 역대 1등 당첨번호 출현 횟수 (번호 → 나온 횟수)
 * - 범위: 1회 ~ 1248회 (2002.12 ~ 2026.10.31 추첨), 보너스 번호 제외
 * - 출처: pyony.com 연도별 통계를 합산 (합계 7,488 = 1248회 × 6개로 검증)
 * - 새 회차가 나오면 이 표와 STATS_LAST_ROUND만 고치면 된다.
 */
const STATS_LAST_ROUND = 1248;
const FREQUENCY = {
   1: 171,  2: 157,  3: 172,  4: 164,  5: 154,  6: 166,  7: 171,  8: 159,  9: 137,
  10: 163, 11: 168, 12: 180, 13: 184, 14: 173, 15: 170, 16: 172, 17: 171, 18: 181,
  19: 171, 20: 172, 21: 168, 22: 148, 23: 150, 24: 169, 25: 154, 26: 166, 27: 183,
  28: 159, 29: 156, 30: 158, 31: 171, 32: 147, 33: 175, 34: 187, 35: 163, 36: 166,
  37: 174, 38: 175, 39: 168, 40: 174, 41: 151, 42: 161, 43: 167, 44: 166, 45: 176,
};

/** [통계 추천]에서 후보로 쓸 '많이 나온 번호' 개수 (상위 12개 중에서 6개를 고름) */
const HOT_POOL_SIZE = 12;

/** 1~45 전체 번호 배열: [1, 2, ..., 45] */
const ALL_NUMBERS = Array.from({ length: MAX_NUMBER - MIN_NUMBER + 1 }, (_, i) => i + MIN_NUMBER);

/** 출현 횟수가 많은 순서로 정렬한 번호 배열 (횟수가 같으면 작은 번호 먼저) */
const RANKED_NUMBERS = [...ALL_NUMBERS].sort((a, b) => FREQUENCY[b] - FREQUENCY[a] || a - b);

/** 화면 요소 참조 */
const ballsEl = document.getElementById("balls");     // 공이 표시될 영역
const modeEl = document.getElementById("mode");       // 추천 방식 안내 문구
const countEl = document.getElementById("count");     // 생성 횟수 숫자
const drawBtn = document.getElementById("drawBtn");   // 번호 뽑기 버튼
const hotBtn = document.getElementById("hotBtn");     // 통계 추천 버튼
const resetBtn = document.getElementById("resetBtn"); // 초기화 버튼

/** 처음(빈) 상태일 때 보여줄 안내 문구 HTML */
const PLACEHOLDER_HTML = ballsEl.innerHTML;

/** 지금까지 번호를 생성한 횟수 */
let drawCount = 0;

/**
 * 후보 번호(pool) 중에서 중복 없이 6개를 뽑아 오름차순으로 돌려준다.
 * 방법: 후보 배열 복사본을 피셔-예이츠(Fisher–Yates) 방식으로 앞에서 6칸만 섞은 뒤 잘라낸다.
 *       같은 번호가 두 번 나올 수 없고, 후보 안의 모든 번호가 뽑힐 확률이 같다.
 * @param {number[]} pool 후보 번호 배열 (기본값: 1~45 전체)
 * @returns {number[]} 정렬된 번호 6개
 */
function drawNumbers(pool = ALL_NUMBERS) {
  const arr = [...pool]; // 원본 배열이 바뀌지 않도록 복사

  for (let i = 0; i < PICK_COUNT; i++) {
    // j: i번째부터 끝까지 중에서 무작위로 고른 위치
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // i와 j 자리를 맞바꿈
  }

  // 앞의 6개를 잘라 숫자 크기순(오름차순)으로 정렬
  return arr.slice(0, PICK_COUNT).sort((a, b) => a - b);
}

/**
 * 역대 가장 많이 나온 번호 상위 12개 중에서 6개를 뽑는다.
 * 매번 같은 번호만 나오지 않도록 상위권 안에서 무작위로 고른다.
 * @returns {number[]} 정렬된 번호 6개
 */
function recommendHotNumbers() {
  return drawNumbers(RANKED_NUMBERS.slice(0, HOT_POOL_SIZE));
}

/**
 * 뽑힌 번호가 규칙에 맞는지 검사한다. (확인 기준용)
 * - 정확히 6개인지 / 모두 1~45 범위인지 / 중복이 없는지 / 오름차순인지
 * 문제가 있으면 개발자 도구(F12) 콘솔에 오류를 남긴다.
 * @param {number[]} numbers 검사할 번호 배열
 * @returns {boolean} 모두 통과하면 true
 */
function validate(numbers) {
  const isSixNumbers = numbers.length === PICK_COUNT;
  const isInRange = numbers.every(n => Number.isInteger(n) && n >= MIN_NUMBER && n <= MAX_NUMBER);
  const isUnique = new Set(numbers).size === numbers.length;
  const isSorted = numbers.every((n, i) => i === 0 || numbers[i - 1] < n);

  const ok = isSixNumbers && isInRange && isUnique && isSorted;
  if (!ok) console.error("번호 검증 실패:", numbers, { isSixNumbers, isInRange, isUnique, isSorted });
  return ok;
}

/**
 * 번호 구간에 맞는 공 색상 이름을 돌려준다. (실제 로또 공 색 기준)
 * 1~10 노랑 / 11~20 파랑 / 21~30 빨강 / 31~40 회색 / 41~45 초록
 * @param {number} n 번호
 * @returns {string} CSS 클래스 이름
 */
function getBallColor(n) {
  if (n <= 10) return "yellow";
  if (n <= 20) return "blue";
  if (n <= 30) return "red";
  if (n <= 40) return "gray";
  return "green";
}

/**
 * 공 하나의 HTML을 만든다.
 * @param {number} n 번호
 * @param {number} i 순서 (CSS 애니메이션 지연 시간 계산용)
 * @param {boolean} showFreq true면 공 아래에 역대 출현 횟수를 표시
 * @returns {string} 공 HTML 문자열
 */
function ballHTML(n, i, showFreq) {
  const freq = showFreq ? ` data-freq="${FREQUENCY[n]}회"` : "";
  return `<div class="ball ${getBallColor(n)}" style="--i:${i}"${freq}>${n}</div>`;
}

/**
 * 번호 배열을 공 모양으로 화면에 그린다.
 * 공마다 --i 값(순서)을 넣어 CSS 애니메이션이 하나씩 차례로 나오게 한다.
 * @param {number[]} numbers 화면에 표시할 번호
 * @param {boolean} showFreq 출현 횟수 표시 여부
 */
function renderBalls(numbers, showFreq = false) {
  ballsEl.innerHTML = numbers.map((n, i) => ballHTML(n, i, showFreq)).join("");
}

/**
 * 공통 생성 처리: 검증 → 화면 표시 → 안내 문구 → 생성 횟수 증가.
 * 공이 다 나올 때까지 버튼을 잠깐 막아 연타로 애니메이션이 겹치지 않게 한다.
 * @param {number[]} numbers 뽑힌 번호
 * @param {string} modeText 추천 방식 안내 문구
 * @param {boolean} showFreq 출현 횟수 표시 여부
 */
function showResult(numbers, modeText, showFreq) {
  validate(numbers);
  renderBalls(numbers, showFreq);
  modeEl.textContent = modeText;

  drawCount++;
  countEl.textContent = drawCount;

  drawBtn.disabled = hotBtn.disabled = true;
  setTimeout(() => (drawBtn.disabled = hotBtn.disabled = false), PICK_COUNT * 120 + 300);
}

/** [번호 뽑기] 버튼: 1~45 전체에서 무작위로 6개 */
function handleDraw() {
  showResult(drawNumbers(), "무작위 추천", false);
}

/** [통계 추천] 버튼: 역대 많이 나온 번호 상위 12개 중에서 6개 */
function handleHot() {
  showResult(recommendHotNumbers(), `통계 추천 · 역대 최다 출현 ${HOT_POOL_SIZE}개 중에서`, true);
}

/**
 * [초기화] 버튼을 눌렀을 때 실행된다.
 * 공을 모두 지우고 안내 문구를 다시 보여주며, 생성 횟수를 0으로 되돌린다.
 */
function handleReset() {
  ballsEl.innerHTML = PLACEHOLDER_HTML;
  modeEl.textContent = "";
  drawCount = 0;
  countEl.textContent = drawCount;
  drawBtn.disabled = hotBtn.disabled = false;
}

/** 하단 통계 영역에 TOP 6 번호를 작은 공으로 그린다. (페이지 처음 열 때 한 번 실행) */
function renderTopList() {
  document.getElementById("statsRange").textContent = `(1~${STATS_LAST_ROUND}회)`;
  document.getElementById("topList").innerHTML = RANKED_NUMBERS.slice(0, PICK_COUNT)
    .map((n, i) => `<div class="mini"><div class="ball small ${getBallColor(n)}" style="--i:${i}">${n}</div><span>${FREQUENCY[n]}회</span></div>`)
    .join("");
}

/** 버튼에 클릭 이벤트 연결 + 초기 화면 준비 */
drawBtn.addEventListener("click", handleDraw);
hotBtn.addEventListener("click", handleHot);
resetBtn.addEventListener("click", handleReset);
renderTopList();
