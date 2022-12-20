let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
})

let phrasesOver = [
    'Вы загадали неправильное число!\n\u{1F914}',
    'Я сдаюсь..\n\u{1F92F}',
    `Число не может быть больше\n\u{1F92F}`,
  ];
  
  function getRandomElementOver (){
  let randIndexOver = Math.floor(Math.random() * phrasesOver.length);
  console.log(randIndexOver);
  return(phrasesOver[randIndexOver]);
  }

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.floor(Math.random() * phrasesOver.length);
            const answerPhrase = getRandomElementOver(phrasesOver)

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber }?`;
        }
    }
})


let phrases = [
    'Вы загадали неправильное число!\n\u{1F914}',
    'Я сдаюсь..\n\u{1F92F}',
    'число не может быть меньше',
  ];
  
  function getRandomElement (){
  let randIndex = Math.floor(Math.random() * phrases.length);
  console.log(randIndex);
  return(phrases[randIndex]);
  }

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (maxValue === minValue){
            const phraseRandom = Math.floor(Math.random() * phrases.length);;
            const answerPhrase = getRandomElement(phrases);
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber }?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }
})

function refreshPage(){
    window.location.reload();
} 
