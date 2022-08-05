let apiQuotes = [];

// Show New Quote
function newQuote() {
    // use math.floor & math.random to return the largest whole number that is within our API number parameters

        // Pick a random quote from API Quotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
};

// Get quotes from API
    // We will use an asynch fetch request in a try catch statement
    // a try catch allows us to attempt to complete a fetch request. If it doesnt work we can catch the info and do something with it.
async function getQuotes() {
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

// On Load
    // run getQuotes function as soon as page loads
getQuotes();