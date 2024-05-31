import { API_KEY } from "../constants.js"

export function createPreviewUrl(settings) {
    console.log('settings', settings);
    const {value, filterByType: type, filterByYear: year} = settings;
    return `https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}${type}${year}`;
}

export function createDetailedInfoUrl(id) {
    return `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`;
}
