// ������� � ����� �� ��������

let prizes = [];

//������ ���� �������
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
closeButton.textContent = "������� ������";
const removeAndcloseButton = document.createElement("button");
removeAndcloseButton.classList.add("spinnerButton");
removeAndcloseButton.textContent = "������� ������ � ������� ������";
const spinButton = document.createElement("button");
spinButton.classList.add("spinnerButton"); 
spinButton.textContent = "������� ������ ��� ���";
const removeAndSpinButton = document.createElement("button");
removeAndSpinButton.classList.add("spinnerButton");
removeAndSpinButton.textContent = "������� ������ � ������� ������ ��� ���";
const buttonArea = document.createElement("div");
buttonArea.classList.add("buttonArea");

// �� ������� �������� �������� ����
let prizeSlice = 360 / prizes.length;
// �� ����� ���������� ������� ������� ���� ������������ �����
let prizeOffset = Math.floor(180 / prizes.length);
// ����������� CSS-������, ������� ����� ��������� � ������� �� ������
const spinClass = "is-spinning";
const selectedClass = "selected";
let selected = 0;
// �������� ��� �������� ���������� ������ � ��������
const spinnerStyles = window.getComputedStyle(spinner);
let startWheel = true; //������ �������� ����
let wheelType = "none"; 
// ���������� ��� ��������
let tickerAnim;
// ���� ��������
let rotation = 0;
// ������� ������
let currentSlice = 0;
// ���������� ��� ��������� ��������
let prizeNodes;
var isBlocked = false;

// ����������� ����� �� ��������
const createPrizeNodes = () => {
  // ������������ ������ �������
  prizes.forEach(({ text, color, reaction }, i) => {
    // ������ �� ��� ��������� ���� ���� ��������
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    // ��������� ��� � ����������� ������ �� �������� � ����� ����� spinner
    spinner.insertAdjacentHTML(
      "beforeend",
      // ����� ��� ���� ��� �������� ������� �������
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
// ������ ������������ �������z
const createConicGradient = () => {
    
  // ������������� ������ �������� ����� � �������� spinner
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        // �������� ���� �������� �������
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()
      }
    );`
  );
};


// ������ �������, ������� �������� ������ � �����
const setupWheel = () => {
  // �� ������� �������� �������� ����
  prizeSlice = 360 / prizes.length;
  // �� ����� ���������� ������� ������� ���� ������������ �����
  prizeOffset = Math.floor(180 / prizes.length);
  createConicGradient();
  // ����� �����
  createPrizeNodes();
  // � ����� �� ������� ������ ���� ������ �� ��������, ����� �������� � ���� ��� � ���������
  prizeNodes = wheel.querySelectorAll(".prize");
  wheel.style.fontSize = `calc(var(--size) / 26)`;
};

// ���������� ���������� ��������, ������� ������� ���� ������
const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ������� ������� �������� � ������� ����������
const runTickerAnimation = () => {
  // ����� ��� �������� ������: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];  
  let rad = Math.atan2(b, a);
  
  if (rad < 0) rad += (2 * Math.PI);
  
  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  // �������� ������, ����� ��� �������� ������ ��� ��������
  // ���� �������� ����� ������
  if (currentSlice !== slice) {
    // ������� �������� ������
    ticker.style.animation = "none";
    // � ����� 10 ����������� �������� ���, ����� �� �������� � �������������� ���������
    setTimeout(() => ticker.style.animation = null, 10);
    // ����� ����, ��� ������ ������ ������ - ������ ��� ������� 
    currentSlice = slice;
  }
  // ��������� ��������
  tickerAnim = requestAnimationFrame(runTickerAnimation);
};
function removeButton(){
removeAndcloseButton.remove();
closeButton.remove();
spinButton.remove();
removeAndSpinButton.remove();
}
// ������� ������ ��������� �������
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
// ����������� ������� �� ������
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
  description.innerHTML = '������ ' + prizes[selected].text +' �������';
  prizes.splice(selected,1);
  spinner.innerHTML = '';
  setupWheel();
  localStorage.setItem('small', JSON.stringify(small));
  localStorage.setItem('board', JSON.stringify(board));

}

function spin(){ 
  // ������ � ����������� ��� �������
  spinner.disabled = true;
  // ����� ��������� �������� ������
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // ������� ������� ����
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  // ��������� ������ ����� is-spinning, � ������� �������� ��������� ������ ���������
  wheel.classList.add(spinClass);
  // ����� CSS ������� ��������, ��� �� �����������
  spinner.style.setProperty("--rotate", rotation);
  // ���������� ������ � �������������� �������
  ticker.style.animation = "none";
  // ��������� �������� ��������
  runTickerAnimation();
}

// �����������, ����� ����������� �������� �������� ������
spinner.addEventListener("transitionend", () => {
  // ������������� ��������� ��������
  cancelAnimationFrame(tickerAnim);
  // �������� ������� �������� �������� ������
  rotation %= 360;
  // �������� ����
  selectPrize();
  // ������� �����, ������� �������� �� ��������
  wheel.classList.remove(spinClass);
  // ���������� � CSS ����� ��������� �������� ������
  spinner.style.setProperty("--rotate", rotation);
  // ������ ������ ����� ��������
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
    
    // ������� ������� ���������� ����

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
	 description.innerText = 'ٸ������ �� ������ ��� ������ ������';
	 setupWheel();
    }
// �������������� �� � ������� �������
