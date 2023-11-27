// надписи и цвета на секторах

let prizes = [];

//Создаём окно рулетки
const roulette = document.createElement("div");
roulette.id = "roulette";
roulette.classList.add("roulette");
const wheel = document.createElement("div");
wheel.classList.add("deal-wheel");
const spinner = document.createElement("ul");
spinner.classList.add("spinner");
const ticker = document.createElement("div");
ticker.classList.add("ticker");
const descriptionArea = document.createElement("div");
descriptionArea.classList.add("descriptionArea");
const description = document.createElement("h1");
description.classList.add("description");
const div = document.createElement("div");
const closeButton = document.createElement("button");
closeButton.classList.add("spinnerButton");
closeButton.textContent = "Закрыть колесо";
const removeAndcloseButton = document.createElement("button");
removeAndcloseButton.classList.add("spinnerButton");
removeAndcloseButton.textContent = "Удалить помеху и закрыть колесо";
const spinButton = document.createElement("button");
spinButton.classList.add("spinnerButton"); 
spinButton.textContent = "Крутить колесо ещё раз";
const removeAndSpinButton = document.createElement("button");
removeAndSpinButton.classList.add("spinnerButton");
removeAndSpinButton.textContent = "Удалить помеху и крутить колесо ещё раз";
const buttonArea = document.createElement("div");
buttonArea.classList.add("buttonArea");

// на сколько секторов нарезаем круг
let prizeSlice = 360 / prizes.length;
// на какое расстояние смещаем сектора друг относительно друга
let prizeOffset = Math.floor(180 / prizes.length);
// прописываем CSS-классы, которые будем добавлять и убирать из стилей
const spinClass = "is-spinning";
const selectedClass = "selected";
let selected = 0;
// получаем все значения параметров стилей у секторов
const spinnerStyles = window.getComputedStyle(spinner);
let startWheel = true; //Первое открытие окна
let wheelType = "none"; 
// переменная для анимации
let tickerAnim;
// угол вращения
let rotation = 0;
// текущий сектор
let currentSlice = 0;
// переменная для текстовых подписей
let prizeNodes;
var isBlocked = false;

// расставляем текст по секторам
const createPrizeNodes = () => {
  // обрабатываем каждую подпись
  prizes.forEach(({ text, color, reaction }, i) => {
    // каждой из них назначаем свой угол поворота
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    // добавляем код с размещением текста на страницу в конец блока spinner
    spinner.insertAdjacentHTML(
      "beforeend",
      // текст при этом уже оформлен нужными стилями
      `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};
const open_modal = ()  => {
$('.btn-spin').click(function(){
		$('.roulette').css({'visibility': 'visible', 'opacity': 1});
		$('.roulette').css({'visibility': 'visible', 'opacity': 1, 'top': '50%'});
});
}
// рисуем разноцветные секторыz
const createConicGradient = () => {
    
  // устанавливаем нужное значение стиля у элемента spinner
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        // получаем цвет текущего сектора
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()
      }
    );`
  );
};


// создаём функцию, которая нарисует колесо в сборе
const setupWheel = () => {
  // на сколько секторов нарезаем круг
  prizeSlice = 360 / prizes.length;
  // на какое расстояние смещаем сектора друг относительно друга
  prizeOffset = Math.floor(180 / prizes.length);
  createConicGradient();
  // потом текст
  createPrizeNodes();
  // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
  prizeNodes = wheel.querySelectorAll(".prize");
  wheel.style.fontSize = `calc(var(--size) / 26)`;
};

// определяем количество оборотов, которое сделает наше колесо
const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция запуска вращения с плавной остановкой
const runTickerAnimation = () => {
  // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];  
  let rad = Math.atan2(b, a);
  
  if (rad < 0) rad += (2 * Math.PI);
  
  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  // анимация язычка, когда его задевает колесо при вращении
  // если появился новый сектор
  if (currentSlice !== slice) {
    // убираем анимацию язычка
    ticker.style.animation = "none";
    // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
    setTimeout(() => ticker.style.animation = null, 10);
    // после того, как язычок прошёл сектор - делаем его текущим 
    currentSlice = slice;
  }
  // запускаем анимацию
  tickerAnim = requestAnimationFrame(runTickerAnimation);
};
function removeButton(){
removeAndcloseButton.remove();
closeButton.remove();
spinButton.remove();
removeAndSpinButton.remove();
}
// функция выбора призового сектора
const selectPrize = () => {
  selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
  description.innerHTML = '';
  typeInterference(prizes[selected].description, 2000);
  removeButton();
  if (wheelType === 'small' || prizes[selected].action === 'koalaHunter') {
      buttonArea.appendChild(removeAndSpinButton);
      buttonArea.appendChild(removeAndcloseButton);
  } else {
      buttonArea.appendChild(spinButton);
      buttonArea.appendChild(closeButton);
  }
  

};

closeButton.addEventListener("click", () => {
if(!isBlocked){
    isBlocked = true;
    removeButton();
    roulette.remove();
} else {
        console.log(isBlocked);
    }
});
removeAndSpinButton.addEventListener("click", () => {
    if(!isBlocked){
        isBlocked = true;
	    remove(selected);
	    spin();
    } else {
        console.log(isBlocked);
    }
});
spinButton.addEventListener("click", () => {
    if(!isBlocked){
        isBlocked = true;
	    spin();
} else{
    console.log(isBlocked);
}
});
removeAndcloseButton.addEventListener("click", () => {
    if(!isBlocked){
        isBlocked = true;
	    remove(selected);
	    removeButton();
	    roulette.remove();
} else{
    console.log(isBlocked);
}
}); 
// отслеживаем нажатие на кнопку
spinner.addEventListener("click", () => {
    if(startWheel){
        startWheel = false;
    if(!isBlocked){
        isBlocked = true;
	    spin();
} else{
    console.log(isBlocked);
}
        
    }
});

function remove(selected){
  description.innerHTML = 'Помеха ' + prizes[selected].text +' удалена';
  prizes.splice(selected,1);
  spinner.innerHTML = '';
  setupWheel();
  localStorage.setItem('small', JSON.stringify(small));
  localStorage.setItem('board', JSON.stringify(board));

}

function spin(){ 
  // делаем её недоступной для нажатия
  spinner.disabled = true;
  // задаём начальное вращение колеса
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // убираем прошлый приз
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
  wheel.classList.add(spinClass);
  // через CSS говорим секторам, как им повернуться
  spinner.style.setProperty("--rotate", rotation);
  // возвращаем язычок в горизонтальную позицию
  ticker.style.animation = "none";
  // запускаем анимацию вращение
  runTickerAnimation();
}

// отслеживаем, когда закончилась анимация вращения колеса
spinner.addEventListener("transitionend", () => {
  // останавливаем отрисовку вращения
  cancelAnimationFrame(tickerAnim);
  // получаем текущее значение поворота колеса
  rotation %= 360;
  // выбираем приз
  selectPrize();
  // убираем класс, который отвечает за вращение
  wheel.classList.remove(spinClass);
  // отправляем в CSS новое положение поворота колеса
  spinner.style.setProperty("--rotate", rotation);
  // делаем кнопку снова активной
  //trigger.disabled = false;
  
});
function typeInterference(text, time) {
  let currentTime = 0;
  let interval = time / text.length;
  
  const timer = setInterval(() => {
    let nextChar = text[currentTime];
    currentTime += 1;
    description.innerHTML += nextChar;

    if (currentTime < text.length) {
      return;
    }

    clearInterval(timer);
  }, interval);
  isBlocked = false;
}
function openWheelWindow(){
    
    // Создаем элемент модального окна

document.body.appendChild(roulette);
roulette.appendChild(div);
div.appendChild(wheel);
wheel.appendChild(spinner);
wheel.appendChild(ticker);
div.appendChild(descriptionArea);
descriptionArea.appendChild(description);
div.appendChild(buttonArea);
roulette.style.opacity = 1;
roulette.style.pointerEvents="auto";
}

function setprize(obj) {
	 switch(obj.id) {
	 case 'small': prizes = window.small; wheelType = 'small'; break;
	 case 'medium': prizes = window.medium; break;
	 case 'board': prizes = window.board; wheelType = 'board'; break;
	 }
	 openWheelWindow();
	 startWheel = true;
	 isBlocked = false;
	 spinner.innerHTML = '';
	 description.innerText = 'Щёлкнуть на колесо для выбора помехи';
	 setupWheel();
    }
// подготавливаем всё к первому запуску
