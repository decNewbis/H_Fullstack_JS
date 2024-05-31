import { API_KEY } from "../constants.js"

export function createPreviewUrl(settings) {
    const {value, filterTypeRequest: type} = settings;
    return `https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}${type}`;
}

export function createDetailedInfoUrl(id) {
    return `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`;
}
