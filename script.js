import {throwDice} from './js/dice.js';
import {getDiceResult} from './js/dice.js';
import {loadInterference} from './js/interference.js';
import {writeHistory} from './js/main.js';
import {flushHistory} from './js/main.js';
import {loadHistory} from './js/main.js';

var dice_button = document.getElementById("dice-btn");
var dice_number = 0;
var player_name = document.getElementById("koala");
var alerts = document.getElementById("alerts"); 
var dicetext = document.getElementById("score-result"); 
var dicearea = document.getElementById("dicearea"); 
var newGame_button = document.getElementById("new"); 
var continueGame_button = document.getElementById("continue");
var dices = document.querySelector('#dices');
var isBlocked = false;


const snakePositions = [
  { start: 17, end: 13 },
  { start: 52, end: 19 },
  { start: 57, end: 40 },
  { start: 62, end: 22 },
  { start: 88, end: 19 },
  { start: 95, end: 51 },
  { start: 97, end: 79 },
];

const ladderPositions = [
  { start: 3, end: 21 },
  { start: 8, end: 30 },
  { start: 28, end: 84 },
  { start: 58, end: 77 },
  { start: 75, end: 86 },
  { start: 80, end: 100 },
  { start: 90, end: 91 },
];

var koala_coin = document.getElementById("koala");
/* Если нужен будет второй игрок
var player2_coin = document.createElement("div");
player2_coin.setAttribute("id", "player_coin2");
player2_coin.innerText = "P2";
*/
var current_player = true; //лучше число, если игроков будет больше 2
var player_counter = [1, 1, 1]; //Рассчитано на 3 игроков

window.addEventListener("load", start);
dice_button.addEventListener("click", dice_rolled);
newGame_button.addEventListener("click", start);
continueGame_button.addEventListener("click", load);

function start() {
    if(!isBlocked){
isBlocked = true;
loadInterference();
player_counter = [1, 1, 1];
var player_next_position = document.getElementById(player_counter[1]);
player_next_position.append(koala_coin);
flushHistory();
isBlocked = false;
}
}

function load(){
if(!isBlocked){
  isBlocked = true;
  window.small = JSON.parse(localStorage.getItem('small'));
  window.medium = JSON.parse(localStorage.getItem('medium'));
  window.big = JSON.parse(localStorage.getItem('big'));
  player_counter = JSON.parse(localStorage.getItem('player_counter'));
  var player_next_position = document.getElementById(player_counter[1]);
  player_next_position.append(koala_coin);
  loadHistory();
  
  isBlocked = false;
}
}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

async function dice_rolled() {
        if(!isBlocked){
isBlocked = true;
  dicearea.style.opacity = 1;
  throwDice();
  await sleep(3000);
  
  dice_number = getDiceResult();
  movePlayer(1, dice_number);
  isBlocked = false;
}
}
async function movePlayer(player, dice_number){
    writeHistory(dicetext.innerText);
    var startFrom = player_counter[player];
    for (let i = 0; i < dice_number; ++i) {
    player_counter[player] = player_counter[player] + 1;
    document.getElementById(player_counter[player]).append(koala_coin);
    await sleep(500);
    }
    writeHistory("Коала перешла с поля " + startFrom + " на поле " + player_counter[player]);
    snake_or_ladder(player_counter[player], player);
    localStorage.setItem('player_counter', JSON.stringify(player_counter));
}
function random() {
  var random_number = Math.ceil(Math.random() * 10);
  if (random_number > 6) {
    random_number = 11 - random_number;
  }
  dice_number = random_number;
  dicetext.innerText = `Выпало значение ${random_number}`;
  return random_number;
}
/*
function player_picker() {
  if (current_player) {
    current_player = false;
    player_name.innerHTML = "Player 2";
    return 1;
  } else {
    current_player = true;
    player_name.innerText = "Player 1";
    return 2;
  }
}
*/

function snake_or_ladder(counter, player) {
  for (var i = 0; i < snakePositions.length; i++) {
    const { start, end } = snakePositions[i];
    if (counter == start) {
      player_counter[player] = end;
      after_snake_or_ladder(player);
      alerts.innerText = `Коала сползла по змее с поля ${start} на поле ${end}`;
	  writeHistory(`Коала сползла по змее с поля ${start} на поле ${end}`);
    }
  }

  for (var j = 0; j < ladderPositions.length; j++) {
    const { start, end } = ladderPositions[j];
    if (counter == start) {
      player_counter[player] = end;
      after_snake_or_ladder(player);
	  alerts.innerText = `Коала поднялась по лестнице на поле ${end}`;
	  writeHistory(`Коала поднялась по лестнице с поля ${start} на поле ${end}`);
    }
  }

  if (counter == 100) {
    alert(`Player ${player} won the game`);
  }
}

async function after_snake_or_ladder(player) {
  await sleep(500);
  var player_next_position = document.getElementById(player_counter[player]);
  if (player == 1) {
    player_next_position.append(koala_coin);
  } else {
    player_next_position.append(player2_coin);
  }
}
