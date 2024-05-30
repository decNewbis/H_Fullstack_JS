import { API_KEY } from "../constants.js"

export function createPreviewUrl(value) {
    return `https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}`
}

export function createDetailedInfoUrl(id) {
    return `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`
}
