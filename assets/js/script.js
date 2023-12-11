//Global variables
let inputEl = document.querySelector("#term-input");
let sourceEl = document.querySelector("#source-input");
var termCatalogEl = $(".term-catalog");
termCatalogEl.attr('class', "card");
let buttonEl = document.querySelector("#search-btn"); 
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
var searchHistoryEl = document.querySelector(".search-history");

//Function to have search history display on page load
function loadPge() {
    for (let i = 0; i < searchHistory.length; i++) {
        let li = document.createElement("li")
        let btn = document.createElement("button")
        btn.setAttribute("data-search", searchHistory[i]);
        btn.innerHTML = searchHistory[i]
        document.querySelector("#histList").appendChild(li)
        li.appendChild(btn)
    }
};
loadPge();

//Function to go through dictionaryapi to pull the definition of user inputtede word 
function wordSearch(word) {
// if statement to ensure nothing is outputted if fields are left blank
if (word.trim() === "") {
    } else {
        var dictionaryQueryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    fetch(dictionaryQueryURL)
        .then((response) => {
            return response.json()
        }).then((data) => {
            var phonetic = data[0].phonetic;
            var partOfSpeech = data[0].meanings[0].partOfSpeech;
            var definition = data[0].meanings[0].definitions[0].definition;
            var example = data[0].meanings[0].definitions[0].example;

            var phoneticEl = $("<div>").text(phonetic);
            var partOfSpeechEl = $("<div>").text(partOfSpeech);
            var definitionEl = $("<div>").text(definition);
            var exampleEl = $("<div>").text(example);

            termCatalogEl.append(phoneticEl);
            termCatalogEl.append(partOfSpeechEl);
            termCatalogEl.append(definitionEl);
            termCatalogEl.append(exampleEl);
        });
    }
};

//Event Listener for Search button
buttonEl.addEventListener("click", function(event) {
    termCatalogEl.empty();
    event.preventDefault();
    var word = inputEl.value;
    var source = sourceEl.value;
    var btnText = (word + " " + `<i>${source}</i>`).trim();
    if (word != "") {
        
        if (!searchHistory.includes(btnText)) {
            searchHistory.push(btnText)
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
          
        }
        wordSearch(word);
        picSearch(word);
        document.querySelector("#histList").innerHTML = ""
        loadPge();  
        sourceEl.value = ""
    } else {
        console.log("please type a term")
    }
})

//Event Listener for previously searched terms
searchHistoryEl.addEventListener("click", function(event){
    event.preventDefault();
    
    if(event.target.matches('button')) {
        termCatalogEl.empty();
        var valueToSearch = event.target.getAttribute("data-search");
        var wordToSearch = valueToSearch.split(" ")[0];
        inputEl.value = wordToSearch;
        wordSearch(wordToSearch);
    }
})

//Image Api key
const apiKey = '831783c2c912c2560933d03a2494016a2a485315dc6abe60d43bdfbfcb3ee525'

//Function to search image through image api
function picSearch(word) {
    var picQueryUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://serpapi.com/search.json?engine=google_images&q=${word}&location=Austin,+TX,+Texas,+United+States&api_key=${apiKey}`);
    fetch(picQueryUrl)
    .then((response) => {
        return response.json()
    }).then((data) => {

        var pic = data?.images_results[0].thumbnail;
        console.log(pic);
        var picEl = $("<img>");

        picEl.attr('src', pic);
        termCatalogEl.append(picEl);
    })
}