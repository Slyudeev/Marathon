// ������� � ����� �� ��������
const small = [
  {
    text: "��������� ������ 1",
	description: "��������� �� ����� ����",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "��������� ������ 2",
	description: "�����-�� ������ �� ������ �����",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "��������� ������ 3",
	description: "��������� ������ �����",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "��������� ������ 4",
	description: "���-�� �������� ��������",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "��������� ������ 5",
	description: "�������� ����������� �������� �� 5 ������",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "��������� ������ 6",
	description: "�����, ��� 6 �����, � � ��� ������ �� ��������",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "��������� ������ 7",
	description: "��������� �������� ��������� ������",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "��������� ������ 8",
	description: "���� ������ ������, � 8 ����� �������� ����������",
    color: "hsl(140 36% 74%)",
  }
];

const medium = [
  {
    text: "������� ������ 1",
	description: "��������� �� ����� ����",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "������� ������ 2",
	description: "�����-�� ������ �� ������ �����",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "������� ������ 3",
	description: "��������� ������ �����",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "������� ������ 4",
	description: "���-�� �������� ��������",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "������� ������ 5",
	description: "�������� ����������� �������� �� 5 ������",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "������� ������ 6",
	description: "�����, ��� 6 �����, � � ��� ������ �� ��������",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "������� ������ 7",
	description: "��������� �������� ��������� ������",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "������� ������ 8",
	description: "���� ������ ������, � 8 ����� �������� ����������",
    color: "hsl(140 36% 74%)",
  }
];

const big = [
  {
    text: "������� ������ 1",
	description: "��������� �� ����� ����",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "������� ������ 2",
	description: "�����-�� ������ �� ������ �����",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "������� ������ 3",
	description: "��������� ������ �����",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "������� ������ 4",
	description: "���-�� �������� ��������",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "������� ������ 5",
	description: "�������� ����������� �������� �� 5 ������",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "������� ������ 6",
	description: "�����, ��� 6 �����, � � ��� ������ �� ��������",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "������� ������ 7",
	description: "��������� �������� ��������� ������",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "������� ������ 8",
	description: "���� ������ ������, � 8 ����� �������� ����������",
    color: "hsl(140 36% 74%)",
  }
];

let prizes = [];

// ������ ���������� ��� �������� ������� �� ���� �������� �� �������� � ����� � �����, ������, ������ � ������
const roulette = document.querySelector(".roulette");
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const ticker = wheel.querySelector(".ticker");
const smallbtn = document.querySelector(".smallW");
const mediumbtn = document.querySelector(".mediumW");
const bigbtn = document.querySelector(".bigW");
const description = document.querySelector(".description");
// �� ������� �������� �������� ����
let prizeSlice = 360 / prizes.length;
// �� ����� ���������� ������� ������� ���� ������������ �����
let prizeOffset = Math.floor(180 / prizes.length);
// ����������� CSS-������, ������� ����� ��������� � ������� �� ������
const spinClass = "is-spinning";
const selectedClass = "selected";
// �������� ��� �������� ���������� ������ � ��������
const spinnerStyles = window.getComputedStyle(spinner);

// ���������� ��� ��������
let tickerAnim;
// ���� ��������
let rotation = 0;
// ������� ������
let currentSlice = 0;
// ���������� ��� ��������� ��������
let prizeNodes;

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
// ������ ������������ �������
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

// ������� ������ ��������� �������
const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
  console.log(prizes[selected]);
  console.log(prizes);
  //alert('������ ' + prizes[selected].text);
  //alert(prizes[selected].description)
  description.innerHTML = '';
  typeInterference(prizes[selected].description, 2000);
  spinner.innerHTML = '';
  
  prizes.splice(selected,1);
  setupWheel();
  
  console.log(prizes);

};

// ����������� ������� �� ������
spinner.addEventListener("click", () => {
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
});

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
	 description.innerText = 'ٸ������ �� ������ ��� ������ ������';
	 setupWheel();
    }
// �������������� �� � ������� �������
