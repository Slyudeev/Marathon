// надписи и цвета на секторах
const small = [
  {
    text: "Маленькая помеха 1",
	description: "попрыгать на одной ноге",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "Маленькая помеха 2",
	description: "Какая-то помеха за второй пункт",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "Маленькая помеха 3",
	description: "Придумать третий пункт",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "Маленькая помеха 4",
	description: "Что-то мешающее четвёртое",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "Маленькая помеха 5",
	description: "Памагити закончилась фантазия на 5 пункте",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "Маленькая помеха 6",
	description: "Жесть, уже 6 пункт, а я ещё ничего не придумал",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "Маленькая помеха 7",
	description: "Попросить зрителей придумать помеху",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "Маленькая помеха 8",
	description: "Одна голова хорошо, а 8 голов вызывают подозрения",
    color: "hsl(140 36% 74%)",
  }
];

const medium = [
  {
    text: "Средняя помеха 1",
	description: "попрыгать на одной ноге",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "Средняя помеха 2",
	description: "Какая-то помеха за второй пункт",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "Средняя помеха 3",
	description: "Придумать третий пункт",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "Средняя помеха 4",
	description: "Что-то мешающее четвёртое",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "Средняя помеха 5",
	description: "Памагити закончилась фантазия на 5 пункте",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "Средняя помеха 6",
	description: "Жесть, уже 6 пункт, а я ещё ничего не придумал",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "Средняя помеха 7",
	description: "Попросить зрителей придумать помеху",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "Средняя помеха 8",
	description: "Одна голова хорошо, а 8 голов вызывают подозрения",
    color: "hsl(140 36% 74%)",
  }
];

const big = [
  {
    text: "Большая помеха 1",
	description: "попрыгать на одной ноге",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "Большая помеха 2",
	description: "Какая-то помеха за второй пункт",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "Большая помеха 3",
	description: "Придумать третий пункт",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "Большая помеха 4",
	description: "Что-то мешающее четвёртое",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "Большая помеха 5",
	description: "Памагити закончилась фантазия на 5 пункте",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "Большая помеха 6",
	description: "Жесть, уже 6 пункт, а я ещё ничего не придумал",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "Большая помеха 7",
	description: "Попросить зрителей придумать помеху",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "Большая помеха 8",
	description: "Одна голова хорошо, а 8 голов вызывают подозрения",
    color: "hsl(140 36% 74%)",
  }
];

let prizes = [];

// создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
const roulette = document.querySelector(".roulette");
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const ticker = wheel.querySelector(".ticker");
const smallbtn = document.querySelector(".smallW");
const mediumbtn = document.querySelector(".mediumW");
const bigbtn = document.querySelector(".bigW");
const description = document.querySelector(".description");
// на сколько секторов нарезаем круг
let prizeSlice = 360 / prizes.length;
// на какое расстояние смещаем сектора друг относительно друга
let prizeOffset = Math.floor(180 / prizes.length);
// прописываем CSS-классы, которые будем добавлять и убирать из стилей
const spinClass = "is-spinning";
const selectedClass = "selected";
// получаем все значения параметров стилей у секторов
const spinnerStyles = window.getComputedStyle(spinner);

// переменная для анимации
let tickerAnim;
// угол вращения
let rotation = 0;
// текущий сектор
let currentSlice = 0;
// переменная для текстовых подписей
let prizeNodes;

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
// рисуем разноцветные секторы
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

// функция выбора призового сектора
const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
  console.log(prizes[selected]);
  console.log(prizes);
  //alert('Выпала ' + prizes[selected].text);
  //alert(prizes[selected].description)
  description.innerHTML = '';
  typeInterference(prizes[selected].description, 2000);
  spinner.innerHTML = '';
  
  prizes.splice(selected,1);
  setupWheel();
  
  console.log(prizes);

};

// отслеживаем нажатие на кнопку
spinner.addEventListener("click", () => {
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
});

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
	console.log(nextChar);
    description.innerHTML += nextChar;

    if (currentTime < text.length) {
      return;
    }

    clearInterval(timer);
  }, interval);
}


 function setprize(obj) {
	 switch(obj.id) {
	 case 'small': prizes = small; break;
	 case 'medium': prizes = medium; break;
	 case 'big': prizes = big; break;
	 }
	 spinner.innerHTML = '';
	 description.innerText = 'Щёлкнуть на колесо для выбора помехи';
	 setupWheel();
    }
// подготавливаем всё к первому запуску
