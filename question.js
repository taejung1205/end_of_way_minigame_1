class Button{
  constructor(x, y, height, width, text) {
    this.height = height;
    this.width = width;
    this.x = x
    this.y = y
    this.text = text
    this.color = (255, 179, 193)
  }
  
  isPressed() {
    if (this.x< mouseX && mouseX < this.x+this.width){
      if (this.y< mouseY && mouseY < this.y+this.height){
        return true
      }
    }
    return false
  }
  show (){
    // 20
    fill (225, 179, 193)
    if (this.x< mouseX && mouseX < this.x+this.width){
      if (this.y< mouseY && mouseY < this.y+this.height){
        fill (200, 100, 100)
      }
    }
    
    textAlign(LEFT, CENTER);
    noStroke()
    // fill( this.color )
    rect(this.x, this.y, this.width, this.height);
    fill(0)
    textSize(20);
    text(this.text, this.x + this.width/10, this.y + this.height/2);
  } 
}

let CURRENT_QUESTION_ANSWERED = false;
let CURRENT_QUESTION_WRONG = false;
let QUESTION_ID = 1;
let DONE = false;

NUMBER_OF_QUESTIONS = 3;

QUESTIONS = [
  // [ questoin_text, [options], correct_answer_id ]

  ["Question 1. Fill the empty space in the word\n\nINTER_CTION",
    ["1) A", "2) O", "3) U"],1,],
  ["Question 2. Fill the empty space in the word\n\nANA_ONDA",
    ["1) K", "2) H", "3) C"],3,],
  ["Question 3. Fill the empty space in the word\n\nARTIFI_IAL",
    ["1) S", "2) C", "3) T"],2,],
];



let buttons = []


function questionDisplay() {
 
  background(255, 179, 193);
  q = QUESTIONS[QUESTION_ID - 1];
  text_question = q[0];
  options = q[1];
  right_answer = q[2];

  // design text
  textSize(20);
  textAlign(LEFT, TOP)
  fill(250, 30, 30);
  
  //text("Press 1st, 2nd, or 3rd option", 50, 50, width-100, 50);
  
  text(text_question, 50, 50, width-100, 200);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].show()
    // text(options[i], 100, 100 + 25 * (i + 1));
  }
  // design

  
  if (CURRENT_QUESTION_WRONG) {
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Incorrect!", width/2, height - 50);
  }

  if (CURRENT_QUESTION_ANSWERED) {
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0, 150, 0);
    text(
      "That's correct!",
      width/2,
      height - 50
    );
//     if (mouseIsPressed == true) {
//         CURRENT_QUESTION_ANSWERED = false;
//         QUESTION_ID += 1;
//         if (QUESTION_ID > NUMBER_OF_QUESTIONS) {
//           DONE = true;
//         }else {
//           buttons = []
//           q = QUESTIONS[QUESTION_ID - 1];
//           // text_question = q[0];
//           options = q[1];
  
//           for (let i = 0; i<3; i++){
//             buttons.push (new Button(100, 100 - 12 + 25*(i+1), 25, 125, options[i])) 
//           } 
//         }
//     }
  }
}

function checkAnswer(){
    pressed = 0
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].isPressed())
        {
          pressed = i+1;
        }
    }
    if (pressed == right_answer) {
      CURRENT_QUESTION_ANSWERED = true;
    } else if ( [1, 2, 3].includes(pressed) ) {
      
      CURRENT_QUESTION_WRONG = true;
    }
}

function afterAnswer(){
  if (CURRENT_QUESTION_ANSWERED) {
        CURRENT_QUESTION_ANSWERED = false;
        QUESTION_ID += 1;
        if (QUESTION_ID > NUMBER_OF_QUESTIONS) {
          DONE = true;
          stage++;
        }else {
          buttons = []
          q = QUESTIONS[QUESTION_ID - 1];
          // text_question = q[0];
          options = q[1];
  
          for (let i = 0; i<3; i++){
            buttons.push (new Button(50, height/2 - 30 + 60*(i), 50, width - 100, options[i])) 
          } 
        }
    
  }
  if (CURRENT_QUESTION_WRONG) {
    CURRENT_QUESTION_WRONG= false;
  }
}
//let GAME_STARTED = false;

// function draw() {
//   background(255, 179, 193);

//   if (!GAME_STARTED) {
//     // pre game picture
//     background(255, 179, 193);

//     //mini game show
//     textAlign(CENTER, CENTER);
//     textFont(myFont);
//     fill(230, 30, 30);
//     textSize(30);
//     text("Mini Game 1:\nCheck Your English", width/2, height/2);
//     //english
//     fill(0, 0, 0);
//     textSize(20);
//     text("Press Mouse to Start the Game", width/2 , height/2 + 60);

//     if (mouseIsPressed === true) {
//       GAME_STARTED = true;
      
//       buttons = []
//       q = QUESTIONS[QUESTION_ID - 1];
//       options = q[1];
//       for (let i = 0; i<3; i++){
//         buttons.push (new Button(50, 150 + 25*(i+1), 25, 125, options[i]))
//       }
      
//     }
//   }
  
//   else {
//     if (!DONE) {
//       question();
//     } else {
//       text("Congratulations! You won the Mini Game 1 and improved your english!",150,250);
//       text("Your first hint for the final stage is 2", 150, 300);
//     }
//   }
// }