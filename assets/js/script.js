
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

let inputEl = document.querySelector("#term-input");
let sourceEl = document.querySelector("#source-input");
var termCatalogEl = $(".term-catalog");
termCatalogEl.attr('class', "card");
let buttonEl = document.querySelector("#search-btn"); //query select button
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
var searchHistoryEl = document.querySelector(".search-history");

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

function wordSearch(word) {
if (word.trim() === "") {
    } else {
        var dictionaryQueryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    //console.log(dictionaryQueryURL);
    fetch(dictionaryQueryURL)
        .then((response) => {
            return response.json()
        }).then((data) => {
            //console.log(data)
            var phonetic = data[0].phonetic;
            //console.log(data[0].phonetic)
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


buttonEl.addEventListener("click", function(event) {
    termCatalogEl.empty();
    event.preventDefault();
    var word = inputEl.value;
    var source = sourceEl.value;
    var btnText = (word + " " + `<i>${source}</i>`).trim();
    // console.log(word);
    if (word != "") {
        console.log(searchHistory.includes(btnText), btnText, searchHistory);
        
        if (!searchHistory.includes(btnText)) {
            searchHistory.push(btnText)
            console.log(searchHistory);
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
    console.log(word);
})

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

const apiKey = '831783c2c912c2560933d03a2494016a2a485315dc6abe60d43bdfbfcb3ee525'
//var userWord = `https://serpapi.com/search.json?engine=google_images&q=${word}&google_domain=google.com&gl=us&hl=en&api_key=${apiKey}`

function picSearch(word) {
    // var apiKey = '831783c2c912c2560933d03a2494016a2a485315dc6abe60d43bdfbfcb3ee525';
    var picQueryUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://serpapi.com/search.json?engine=google_images&q=${word}&location=Austin,+TX,+Texas,+United+States&api_key=${apiKey}`);
    fetch(picQueryUrl)
    .then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);

        var pic = data?.images_results[0].thumbnail;
        console.log(pic);
        var picEl = $("<img>");

        picEl.attr('src', pic);
        termCatalogEl.append(picEl);
    })
}