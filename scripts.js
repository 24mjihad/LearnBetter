const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')


function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(Response => Response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote= await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
    const characterSpan = document.createElement('spam')
    characterSpan.innerText= character
    quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = none
}

renderNewQuote()

