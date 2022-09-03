function addClass(el, name) {
    el.className += ' ' + name;
}

function removeClass(el, name) {
    el.className = el.className.replace(name, '');
}


var words = 'emerged during this period and influenced China and its neighbors for centuries to come. In the third century BCE, Qins wars of unification created the first Chinese empire, the short-lived Qin dynasty'.split(" ");
wordcount = words.length;
const gameTime = 30 * 1000;
window.timer = null;
window.gameStart = null;


function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join(`</span><span class='letter'>`)}</div>`;
}


function newGame() {
    adder = 0
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < wordcount; i++) {
        document.getElementById('words').innerHTML += formatWord(words[adder]);
        adder++;
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
}

function getWpm() {
    var words = [...document.querySelectorAll('.word')];
    var lastTypeWord = document.querySelector('.word.current');
    var lastTypeWordIndex = words.indexOf(lastTypeWord);
    var typedWords = words.slice(0, lastTypeWordIndex)
    var correctWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctLetters = letters.filter(letter => letter.className.includes('correct'));
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    })
    return correctWords.length / gameTime * 60000;
}

function gameOver() {
    clearInterval(window.timer);
    addClass(document.getElementById('game'), 'over');
    document.getElementById("info").innerHTML = `WPM: ${getWpm()}`;
}
document.getElementById('game').addEventListener('keyup', ev => {
    const key = ev.key;
    var currentWord = document.querySelector('.word.current')
    var currentLetter = document.querySelector('.letter.current')
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackSpace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;


    if (document.querySelector('#game.Over')) {
        return;
    }


    console.log({ key, expected });

    if (!window.timer && isLetter) {
        window.timer = setInterval(() => {
            if (!window.gameStart) {
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed / 1000);
            document.getElementById('info').innerHTML = sPassed + '';
        }, 1000)
    }

    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            if (currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling, 'current')
            }
        } else {
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }
    if (isSpace) {
        if (expected !== ' ') {
            const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')]
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect');
            });
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if (currentLetter) {
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current');
    }

    if (isBackSpace) {
        if (currentLetter && isFirstLetter) {
            removeClass(currentWord, 'current');
            addClass(currentWord.previousSibling, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentWord.previousSibling.lastChild, 'current')
            removeClass(currentWord.previousSibling.lastChild, 'incorrect');
            removeClass(currentWord.previousSibling.lastChild, 'correct');
        }
        if (currentLetter && !isFirstLetter) {
            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, 'current');
            removeClass(currentLetter.previousSibling, 'incorrect');
            removeClass(currentLetter.previousSibling, 'correct');
        }
        if (!currentLetter) {
            addClass(currentWord.lastChild, 'current');
            removeClass(currentWord.lastChild, 'incorrect');
            removeClass(currentWord.lastChild, 'correct');
        }
    }

    // move cursor
    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.word.current');
    const cursor = document.getElementById('cursor');
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';

})


newGame()
