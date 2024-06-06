import { API_KEY } from "../constants.js"

export function createPreviewUrl(settings) {
    const {value, filterByType: type, filterByYear: year} = settings;
    return `https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}${type}${year}`;
}

export function createDetailedInfoUrl(id) {
    return `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;
}
