function addClass(el,name){
el.className += ' '+name;
}

function removeClass(el,name) {
el.className = el.className.replace(name,'');
}


const words = 'emerged during this period and influenced China and its neighbors for centuries to come. In the third century BCE, Qins wars of unification created the first Chinese empire, the short-lived Qin dynasty'.split(" ");
wordcount = words.length;
function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join(`</span><span class='letter'>`)}</div>`;
}


function newGame() {
    adder = 0
    document.getElementById('words').innerHTML = '';
    for (let i=0; i<wordcount; i++) {
        document.getElementById('words').innerHTML += formatWord(words[adder]);
        adder++;
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
}
document.getElementById('game').addEventListener('keyup', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current')
    const currentLetter = document.querySelector('.letter.current')
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';

    console.log({key,expected});

    if (isLetter) {
        if(currentLetter) {
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
    if(expected !== ' ') {
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

// move cursor
const nextLetter = document.querySelector('.letter.current');
const nextWord = document.querySelector('.word.current');
const cursor = document.getElementById('cursor');
cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top+ 2+  'px';
cursor.style.left =  (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right']+  'px';

})


newGame()
