import {throwDice} from './js/dice.js';
import {getDiceResult} from './js/dice.js';
import {loadInterference} from './js/interference.js';

var dice_button = document.getElementById("dice-btn");
var dice_number = 0;
var player_name = document.getElementById("koala");
var alerts = document.getElementById("alerts"); 
var dicetext = document.getElementById("score-result"); 
var dicearea = document.getElementById("dicearea"); 
var newGame_button = document.getElementById("new"); 
var continueGame_button = document.getElementById("continue"); 

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

var player1_coin = document.getElementById("koala");
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
loadInterference();
player_counter = [1, 1, 1];
var player_next_position = document.getElementById(player_counter[1]);
player_next_position.append(player1_coin);
    
}

function load(){
  window.small = JSON.parse(localStorage.getItem('small'));
  window.medium = JSON.parse(localStorage.getItem('medium'));
  window.big = JSON.parse(localStorage.getItem('big'));
  player_counter = JSON.parse(localStorage.getItem('player_counter'));
  var player_next_position = document.getElementById(player_counter[1]);
  player_next_position.append(player1_coin);
  
}


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

async function dice_rolled() {
  dicearea.style.opacity = 1;
  //console.log(throwD(1));
  throwDice();
  await sleep(2000);
  dice_number = getDiceResult();
  //random();
  //append_element(player_picker());
  append_element(1);
  
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
function id_creator(num) {
  return "box_" + num;
}

function coin_id_creator(num) {
  var string = "player_coin";
  string = string + num;
  return string;
}

function counter(player) {
  if (player_counter[player] + Number(dice_number) > 100) {
    /* do nothing */
  } else {
    player_counter[player] =
      player_counter[player] + Number(dice_number);
	  var tmp = player_counter[player] - Number(dice_number);
	  alerts.innerText = `Перешла с поля ${player_counter[player] - Number(dice_number)} на поле ${player_counter[player]}`;
  }
  
}

function append_element(player) {
  counter(player);
  
  var player_next_position = document.getElementById(player_counter[player]);
  if (player == 1) {
    player_next_position.append(player1_coin);
  } else {
    player_next_position.append(player2_coin);
  }
  snake_or_ladder(player_counter[player], player);
  localStorage.setItem('player_counter', JSON.stringify(player_counter));
}

function snake_or_ladder(counter, player) {
  for (var i = 0; i < snakePositions.length; i++) {
    const { start, end } = snakePositions[i];
    if (counter == start) {
      player_counter[player] = end;
      after_snake_or_ladder(player);
	  alerts.innerText = `Коала сползла по змее на поле ${end}`;
    }
  }

  for (var j = 0; j < ladderPositions.length; j++) {
    const { start, end } = ladderPositions[j];
    if (counter == start) {
      player_counter[player] = end;
      after_snake_or_ladder(player);
	  alerts.innerText = `Коала поднялась по лестнице на поле ${end}`;
    }
  }

  if (counter == 100) {
    alert(`Player ${player} won the game`);
  }
}

function after_snake_or_ladder(player) {
  var player_next_position = document.getElementById(player_counter[player]);
  if (player == 1) {
    player_next_position.append(player1_coin);
  } else {
    player_next_position.append(player2_coin);
  }
}
