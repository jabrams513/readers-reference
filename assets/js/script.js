
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

var word = "dog"

var dictionaryQueryURL = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    fetch(dictionaryQueryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    });

const apiKey = 'STo8Iixrm9DQ6x1bW1iNsgGcU4pPbQCjgvgdXi95Rj52yx1K2ZZeMaeD'

import { createClient } from 'pexels';

const client = createClient(apiKey);
const query = 'Nature';

client.photos.search({ query, per_page: 1 })
.then(photos => {
    console.log(photos)
});


