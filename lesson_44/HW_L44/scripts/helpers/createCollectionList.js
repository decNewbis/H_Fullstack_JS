import { movieNotFound } from "../components.js"

export function createCollectionList(data, createItem, showDefaultMessage, numberOfElements) {
    const searchedCollection = data.Search
    if (!searchedCollection) {
        return showDefaultMessage ? movieNotFound : [];
    }

    return searchedCollection
        .slice(0, numberOfElements)
        .map(({ Title: title, Year: year, Poster: poster, imdbID: id }) => createItem({poster, title, year, id}))
        .join('')
}
