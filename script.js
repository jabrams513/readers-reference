const apiKey = 'STo8Iixrm9DQ6x1bW1iNsgGcU4pPbQCjgvgdXi95Rj52yx1K2ZZeMaeD'

import { createClient } from 'pexels';

const client = createClient(apiKey);
const query = 'Nature';

client.photos.search({ query, per_page: 1 }).then(photos => {...});
