var currentModal = "none";
var history = [];
const invetoryDict = {	
'ignoreLadder': 'Количество лестниц, которые не будут использованы',
'ignoreSnake': 'Количество спасений от змей',
'additionalDice': 'Количество дополнительных кубиков',
'additionalMove': 'Ход будет увеличен на',
'reducedMove': 'Ход будет уменьшен на' }

export function writeHistory(text){
    history.push(text);
    localStorage.setItem('history', JSON.stringify(history));
}

export function flushHistory(){
    history = [];
}

export function loadHistory(){
    JSON.parse(localStorage.getItem('history'));
}
function printHistory(){
  var i = 1;
  var result = "";
  history.forEach(str => {
  result += `${i}. ${str}\n`;
  i++;
});
 return result;
}

function printInventory(){
  var result = "";
    for (let [key, value] of window.inventory) {
        result += `${invetoryDict[key]}: ${value}\n`;
    }
 return result;
}
// Выбираем элемент, который будет открывать модальное окно
const historyButton = document.getElementById("history");
const rulesButton = document.getElementById("rules");
const inventoryButton = document.getElementById("inventory");
// Создаем элемент модального окна
const modal = document.createElement("div");
modal.id = "modal";
modal.classList.add("modal");
const textArea = document.createElement("div");

function openHistory(){
  document.body.appendChild(modal);
  modal.style.top = "5%";
  modal.style.left= "5%";
  modal.style.width = "30%";
  modal.style.height = "90%";
  modal.style.float = "left";
  console.log(printHistory());
  console.log(history);
  textArea.innerText = printHistory();
  textArea.scrollTop = textArea.scrollHeight;
  modal.appendChild(textArea);
}
function openRules(){
  document.body.appendChild(modal);
  modal.style.top = "33%";
  modal.style.left= "33%";
  modal.style.width = "33%";
  modal.style.height = "33%";
  modal.style.float = "center";
  textArea.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique eros ac semper scelerisque. Donec non semper odio. Sed quis erat rhoncus, bibendum libero ac, commodo nisi. Cras euismod justo et velit gravida, in gravida mi consectetur. Pellentesque eget risus porta, aliquam justo a, vestibulum ex. In cursus mi at tortor vehicula, et efficitur nunc egestas Integer lacinia sagittis lorem, sit amet vestibulum purus gravida sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris turpis nisl, suscipit sed ornare non, volutpat varius nisi. Aenean nec semper velit. Aliquam eget nisl ut dolor tincidunt posuere. Aliquam erat volutpat. In nec mi a ligula dictum porttitor. Suspendisse in velit sit amet nisi faucibus pretium. Quisque vulputate, risus eu pulvinar consectetur, lectus justo egestas augue, vel lobortis sapien tellus nec orci. Maecenas faucibus, purus ut feugiat tempor, nunc est blandit augue, eu pretium nibh nunc quis eros.";
  textArea.scrollTop = textArea.scrollHeight;
  modal.appendChild(textArea);
}

function openInventory(){
  document.body.appendChild(modal);
  modal.style.top = "10%";
  modal.style.left= "66%";
  modal.style.width = "33%";
  modal.style.height = "33%";
  modal.style.float = "center";
  textArea.innerText = printInventory();
  textArea.scrollTop = textArea.scrollHeight;
  modal.appendChild(textArea);
}
// Привяжем обработчик события на кнопку, которая открывает модальное окно
rulesButton.addEventListener("click", () => {
    if(currentModal === "rules") {
        currentModal = "none";
        modal.remove();
    } else {
        openRules();
        currentModal = "rules";
    }

});

inventoryButton.addEventListener("click", () => {
    if(currentModal === "inventory") {
        currentModal = "none";
        modal.remove();
    } else {
        openInventory();
        currentModal = "inventory";
    }

});

// Привяжем обработчик события на кнопку, которая открывает модальное окно
historyButton.addEventListener("click", () => {
if(currentModal === "history") {
        currentModal = "none";
        modal.remove();
    } else {
        openHistory();
        currentModal = "history";
    }
});
