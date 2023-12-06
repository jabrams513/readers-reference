// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

var word = "dog"

var dictionaryQueryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    fetch(dictionaryQueryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    });