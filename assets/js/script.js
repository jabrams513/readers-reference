
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

let inputEl = document.querySelector("#term-input");
var termCatalogEl = $(".term-catalog");
termCatalogEl.attr('class', "card");
let buttonEl = document.querySelector("#search-btn"); //query select button
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []

function wordSearch(word) {
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
};

buttonEl.addEventListener("click", function(event) {
    termCatalogEl.empty();
    event.preventDefault();
    var word = inputEl.value;
    wordSearch(word);
    picSearch(word);
    console.log(word);
    if (!searchHistory.includes(word)) {
        searchHistory.push(word)
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    document.querySelector("#histList").innerHTML = ""
    for (let i = 0; i < searchHistory.length; i++) {
        let li = document.createElement("li")
        let btn = document.createElement("button")
        btn.textContent = searchHistory[i]
        document.querySelector("#histList").appendChild(li)
        li.appendChild(btn)
        btn.addEventListener("click", function(event){
            event.preventDefault();
            console.log(this.textContent)
            inputEl.value = this.textContent
        })
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

        var pic = data.images_results[0].thumbnail;
        console.log(pic);
        var picEl = $("<img>");

        picEl.attr('src', pic);
        termCatalogEl.append(picEl);
    })
}