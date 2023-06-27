const BASE_URL = 'http://localhost:5000'; // real domain adress should be here (for test its just localhost

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags'; // BASE_URL + '/api/foods/tags'; works too
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOODS_BY_ID_URL = FOODS_URL + '/'; // /api/foods/4