
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

let inputEl = document.querySelector("#term-input");
var termCatalogEl = $(".term-catalog");
let buttonEl = document.querySelector("#search-btn"); //query select button

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
    event.preventDefault();
    var word = inputEl.value;
    wordSearch(word);
    console.log(word);
})
// add event listener to button 
// when button is pressed grab the value from the element you've stored in var word
// and then run your fetch

//const apiKey = '831783c2c912c2560933d03a2494016a2a485315dc6abe60d43bdfbfcb3ee525'
//var userWord = `https://serpapi.com/search.json?engine=google_images&q=${word}&google_domain=google.com&gl=us&hl=en&api_key=${apiKey}`

