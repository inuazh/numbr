let minValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || 0;
let maxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || 100;

const maxV = maxValue > 999 ? 999 : maxValue;
const minV = minValue < -999 ? -999 : minValue;

minValue = minV;
maxValue = maxV;

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);


function numberToWords(number) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const thousands = ["", 'тысяч', 'миллион', 'миллиард', 'триллион'];

    if (number === 0) return 'ноль';

    function toWords(number, index) {
        if (number === 0) return '';

        const numStr = number.toString();

        if (numStr.length === 1) {
            return units[number] + ' ';
        } else if (numStr.length === 2) {
            if (number < 20) {
                return teens[number - 10] + ' ';
            } else {
                return tens[Math.floor(number / 10)] + ' ' + toWords(number % 10, index) + ' ';
            }
        } else {
            return units[Math.floor(number / 100)] + ' сотен ' + toWords(number % 100, index) + ' ';
        }
    }

    let words = '';
    let chunkIndex = 0;

    while (number > 0) {
        const chunk = number % 1000;
        if (chunk !== 0) {
            words = toWords(chunk, chunkIndex) + thousands[chunkIndex] + ' ' + words;
        }
        number = Math.floor(number / 1000);
        chunkIndex++;
    }

    return words.trim();
}

let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

const phraseRandom = Math.round(Math.random() * 2);
const answerPhrase =
    phraseRandom === 1
        ? `Вы загадали число`
        : `я думаю это число`
            ? `Наверное это`
            : `я думаю это число`;
answerField.innerText = answerPhrase;


orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || 0;
    maxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || 100;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;

    gameRun = true;
    orderNumberField.innerText = orderNumber;
    const phraseRandom = Math.round(Math.random() * 2);
    const answerPhrase =
        phraseRandom === 1
            ? `Вы загадали число`
            : `я думаю это число`
                ? `Наверное это`
                : `я думаю это число`;
    answerField.innerText = answerPhrase + ` ${answerNumber}?`;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1)
                ?`Это число слишком огромное, чтобы быть реальным!\n\u{1F631}`
                :`Число не может быть больше\n\u{1F92F}`  
                    ? `Я сдаюсь..\n\u{1F92F}`
                    : `Вы загадали неправильное число!\n\u{1F914}`
                        ? `Вы загадали неправильное число!\n\u{1F914}`
                        : `Мы можем смотреть в конец Вселенной, но никогда не узнать точно это число...\n\u{1F52D}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            let phraseRandomA = Math.floor(Math.random() * 3);

            if (phraseRandomA == 1) {
                answerField.innerText = `Вы загадали число ${numberToWords(answerNumber)}?`;
            }

            else if (phraseRandomA == 2) {
                answerField.innerText = `Это ведь ${numberToWords(answerNumber)}?`;
            }

            else {
                answerField.innerText = `Похоже на ${numberToWords(answerNumber)}?`;
            }
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (answerNumber === minValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1)
                ? `Это число не может быть меньше \n\u{1F980}`
                : `Я сдаюсь..\n\u{1F92F}`
                    ? `Число не может быть меньше\n\u{1F92F}`
                    : `Вы загадали неправильное число!\n\u{1F914}`
                        ? `Это число слишком маленькое, чтобы быть реальным!\n\u{1F631}`
                        : `Мы можем смотреть в конец Вселенной, но никогда не узнать точно это число...\n\u{1F52D}`


            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let phraseRandomA = Math.floor(Math.random() * 3);

            if (phraseRandomA == 1) {
                answerField.innerText = `Вы загадали число ${numberToWords(answerNumber)}?`;
            }

            else if (phraseRandomA == 2) {
                answerField.innerText = `Это ведь ${numberToWords(answerNumber)}?`;
            }

            else {
                answerField.innerText = `Похоже на ${numberToWords(answerNumber)}?`;
            }
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {

        let phraseRandomA = Math.floor(Math.random() * 3);

        if (phraseRandomA == 1) {
            answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        }

        else if (phraseRandomA == 2) {
            answerField.innerText = `Это было просто\n\u{1F971}`;
        }

        else {
            answerField.innerText = `Угадал\n\u{1F973}`;
        }
        gameRun = false;
    }
})
