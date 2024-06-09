import {getSearchButton, getSearchElement} from "./helpers/getElements";
import {debounce} from "./helpers/debounce";
import {handleSearchButton, handleSearch, handleInputSearch, renderMediaPage, renderMainPage} from "./functions.js";

function app() {
    let previewResponse = {};
    const search = getSearchElement();
    const searchButton = getSearchButton();
    searchButton.addEventListener('click', handleSearchButton(previewResponse));
    search.addEventListener('search', handleSearch(previewResponse));
    search.addEventListener('input', debounce(handleInputSearch(previewResponse), 500));
}

function router() {
    if (location.pathname.startsWith("/media")) {
        renderMediaPage();
    } else {
        renderMainPage();
    }
}

export { app, router };
