let touchDelay = 10;
let stage = 0;
let buttonTurn = true;
let buttonX = 50;
let buttonY = 50;
let redlineStart = 0;
let myFont;
let cnv;

function preload() {
  myFont = loadFont("Inconsolata-VariableFont_wdth,wght.ttf");
  nanumDahengFont = loadFont("NanumDaheng.ttf");
}

function setup() {
  cnv= createCanvas(window.innerWidth, window.innerHeight);
  cnv.elt.addEventListener('click', myTouchStarted)
}

function draw() {
  if(touchDelay > 0) touchDelay--;
  switch (stage) {
    case 0:
      introDisplay();
      break;
    case 1:
      backgroundDisplay();
      introTextbox("아 오늘은 집 가서 뭐 먹지..?", false);
      break;
    case 2:
      backgroundDisplay();
      introTextbox("Excuse me,", true);
      break;
    case 3:
      backgroundDisplay();
      introTextbox("네? 저요?",false);
      break;
    case 4:
      backgroundDisplay();
      introTextbox("How do I get to Seoul National University?", true);
      break;
    case 5:
      backgroundDisplay();
      introTextbox("어... 음... 죄송합니다!! (후다닥)", false);
      break;
    case 6:
      backgroundDisplay();
      introTextbox(
        "하... 이 나이가 되서 영어 한마디를 못하다니... \n나도 영어 공부좀 해야겠어", false
      );
      break;
    case 7:
      //게임시작화면
      gameIntro();
      break;
    case 8:
      //게임 설명
      textFont(myFont);
      gameExplain();
      break;
    case 9:
      questionDisplay();
      break;
    case 10:
      //성공
      
  background(255, 179, 193);
      textAlign(CENTER, CENTER);
      textSize(20);
      textStyle(BOLD);
      fill(0, 0, 0);
      text("Congratulations!\n You improved your English!",width/2,height/2);

      textFont('Georgia');
      textSize(15);
      textStyle(NORMAL);
      fill(50);
      text("힌트를 얻으려면 클릭하세요", width / 2, height - 100);
      redlineStart = 0;
      break;
    case 11:
      //체크리스트 1번 지워지기
      checklistDisplay();
      break;

    default:
  }
}

function myTouchStarted() {
  if(touchDelay == 0){
    touchDelay = 10;
  switch (stage) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      stage++;
      break;
    case 8:
      buttons = [];
      q = QUESTIONS[QUESTION_ID - 1];
      options = q[1];
      for (let i = 0; i < 3; i++) {
        buttons.push(new Button(50, height/2 - 30 + 60*(i), 50, width - 100, options[i]));
      }
      stage++;
      break;
    case 9:
      afterAnswer();
      checkAnswer();
      break;
      case 10:
      stage++;
      break;
    default:
  }
  }
}

function introDisplay() {
  background(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  textSize(25);
  fill(255);
  text("때는 몇 달 전...", width / 2, height / 2);

  textSize(15);
  fill(150);
  text("터치하여 다음 단계로...", width / 2, (height / 4) * 3);
  
  
}

function backgroundDisplay() {
  background(0);
  fill(255);
  textAlign(LEFT, TOP);
  text("터치하여 다음 단계로...", 10, 10);
}

function introTextbox(message, isForeigner) {
  let boxX = 20;
  let boxY = (height * 4) / 5;

  //바깥 박스
  stroke(0, 150);
  strokeWeight(1);
  if(isForeigner){
    fill(200, 150, 150)
  } else {
    fill(255, 150);
  }
  rect(boxX, boxY, width - boxX * 2, 80);
  //안쪽 박스
  noFill();
  rect(boxX + 5, boxY + 5, width - boxX * 2 - 10, 70);
  fill(0);
  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(12);
  text(message, boxX + 20, boxY + 25);
}

function gameIntro() {
  background(255, 179, 193);
  textAlign(CENTER, CENTER);
  textSize(30);
  textStyle(BOLD);
  noStroke();
  fill(0);
  text("Let's study English!", width / 2, (height * 2) / 5);

  textSize(20);
  textStyle(NORMAL);
  fill(100);
  text("Touch to start", width / 2, (height * 3) / 5 + 20);
}

function gameExplain() {
  background(255, 179, 193);

  fill(255, 0, 0);
  //strokeWeight(1);
  textSize(35);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Game Explanation", width / 2, (height * 3) / 20);

  textAlign(LEFT, TOP);
  textSize(20);
  textStyle(NORMAL);
  fill(30);
  text(
    "Solve three English quizzes. Choose the right answer to fill in the blanks.",
    width / 2 - 100,
    (height * 2) / 5,
    200,
    300
  );

  fill(50, 100);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("시작하려면 클릭하세요", width / 2, (height * 9) / 10);

  strokeWeight(3);
  line(
    width / 2 - 55,
    (height * 3) / 20 + 15,
    width / 2 + 55,
    (height * 3) / 20 + 15
  );
}
function buttonDisplay() {
  noStroke();
  fill(255, 0, 0);
  rect(buttonX, buttonY, 80, 30);

  fill(255);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("신청하기", buttonX + 40, buttonY + 15);
}
function checklistDisplay() {
  background(255, 255, 179);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(50);
  noStroke();
  fill(102, 51, 0);
  textFont(nanumDahengFont);
  text("체크리스트", width / 2, 50);

  textAlign(LEFT, CENTER);
  textSize(30);
  fill(102, 51, 0);
  text("1.영어공부하기", 30, 150);
  text("2.봉사활동", 30, 200);
  text("3.한국사시험 신청", 30, 250);
  textFont('Noto Sans KR');

  strokeWeight(5);
  stroke(255, 0, 0, 200);

  strokeWeight(5);
  stroke(255, 0, 0, 200);
  line(20, 155, 20 + redlineStart, 155);

  if (frameCount % 5 == 0) {
    if (redlineStart <= 230) {
      redlineStart += 5;
    } else {
      redlineStart = 240;
    }
  }

  if (redlineStart == 240) {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    noStroke();
    text("비밀번호", width / 2, (height * 2) / 3);

    for (let i = 0; i < 4; i++) {
      fill(255, 200);
      noStroke();
      rect(
        (width * 1) / 13 + width * ((3 * i) / 13),
        (height * 2) / 3 + 60,
        (width * 2) / 15,
        80
      );
    }
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("1", (width * 2) / 13, (height * 2) / 3 + 100);
    text("7", (width * 5) / 13, (height * 2) / 3 + 100);
    text("8", (width * 8) / 13, (height * 2) / 3 + 100);
    textSize(80);
    text("2", (width * 11) / 13, (height * 2) / 3 + 100);

    noFill();
    strokeWeight(1);
    stroke(30, 150);
    rectMode(CENTER);
    textSize(20);
    textStyle(NORMAL);
    fill(30, 150);
    rectMode(CORNER);
  }
}
