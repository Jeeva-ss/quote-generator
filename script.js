const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const left = document.getElementsByClassName("fa-quote-left");

function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// get quote API
async function getQuote() {
    showLoader();
    const proxyURL = "https://morning-dawn-88138.herokuapp.com/";
    const apiURL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // Authour
        if (data.quoteAuthor === " ") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Quote
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        hideLoader();
    } catch (error) {
        quoteText.innerText = "Oops, Try again later!";
        authorText.innerText = "---";
        hideLoader();
    }
}

// tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, "_blank");
}

// event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuote();
