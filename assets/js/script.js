
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

var word = 'dog' //document.querySelector("#term-input").value;

var dictionaryQueryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    fetch(dictionaryQueryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    });

const apiKey = '831783c2c912c2560933d03a2494016a2a485315dc6abe60d43bdfbfcb3ee525'
var userWord = `https://serpapi.com/search.json?engine=google_images&q=${word}&google_domain=google.com&gl=us&hl=en&api_key=${apiKey}`

