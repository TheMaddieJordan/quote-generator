const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    // the hidden attribute will hide the div
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // use math.floor & math.random to return the largest whole number that is within our API number parameters

        // Pick a random quote from API Quotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // populate text content of author and quote elements to display in html
        // Check if author field is blank and replace with "unknown"
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // change font size to be smaller for longer quotes
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
     quoteText.textContent = quote.text;
     complete();
};

// Get quotes from API
    // We will use an asynch fetch request in a try catch statement
    // a try catch allows us to attempt to complete a fetch request. If it doesnt work we can catch the info and do something with it.
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        // set up fetch request
            // we cant get the response until we get the fetch data
        const response = await fetch(apiUrl);
        // getting json from api, and turning it into an object
            // pass into global variable apiQuotes
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text='${quoteText.textContent}' - ${authorText.textContent}`;
    // This will open the twitter window in a new tab
    window.open(twitterUrl, '_blank');
}

// Event Listeners
    // This will give us a new quote
newQuoteBtn.addEventListener('click', newQuote);
    // This will tweet the quote
twitterBtn.addEventListener('click', tweetQuote);


// On Load
    // run getQuotes function as soon as page loads
getQuotes();