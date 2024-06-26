import {
    getFilterType,
    getFilterYear,
    getPostersContainer,
    getPreviewList,
    getSearchElement
} from "./helpers/getElements";
import {createCollectionList} from "./helpers/createCollectionList";
import {createPreviewItem, createTile, renderMainComponent, renderMediaInfo, renderNotFound} from "./components";
import {createDetailedInfoUrl, createPreviewUrl} from "./helpers/urls";
import {app} from "./app.js";

function hidePreview() {
    const previewList = getPreviewList();
    previewList.classList.add('hidden');
    previewList.innerHTML = '';
}

function getMediaInfo(event, closestObj) {
    const item = event.target.closest(closestObj);
    if(item) {
        const id = item.dataset.id;
        history.pushState(null, null, `/media?id=${id}`);
        renderMediaPage();
    }
}

function hidePreviewAndCreatePosters(previewResponse) {
    hidePreview();
    const collection = createCollectionList(previewResponse.data, createTile);
    const list = getPostersContainer();
    list.innerHTML = collection;
    list.addEventListener('click', (event) => {
        getMediaInfo(event, '.movie-card');
    });
}

function handleInputSearch(previewResponse) {
    return async function (event) {
        const value = event.target.value;
        const filterByType = getFilterType();
        const filterByYear = getFilterYear();
        if (value.length > 2) {
            const data = await fetch(createPreviewUrl({value, filterByType, filterByYear}));
            const response = await data.json();
            previewResponse.data = response;
            const collection = createCollectionList(response, createPreviewItem, true, 5);
            const previewList = getPreviewList();
            previewList.classList.remove('hidden');
            previewList.innerHTML = collection;
        } else {
            hidePreview();
        }
    }
}

function handleSearch(previewResponse) {
    return function (event) {
        event.stopImmediatePropagation();
        const value = event.target.value;
        if(!value) {
            hidePreview();
        }
        hidePreviewAndCreatePosters(previewResponse);
    }
}

function handleSearchButton(previewResponse) {
    return function () {
        const search = getSearchElement();
        const value = search.value;
        if(!value) {
            return false
        }
        hidePreviewAndCreatePosters(previewResponse);
    }
}

function previewMediaInfo() {
    const previewList = document.getElementById('preview-list');
    previewList.addEventListener('click', (event) => {
        getMediaInfo(event, '.preview-item');
    });
}

function handleReturnToHome() {
    history.pushState(null, null, `/`);
    renderMainPage();
}

async function renderMediaPage() {
    try {
        const id = location.search.slice(4);
        const data = await fetch(createDetailedInfoUrl(id));
        const response = await data.json();
        const {
            Title: title,
            Released: released,
            Country: country,
            Actors: actors,
            Plot: plot,
            Poster: poster,
            Genre: genre,
            Writer: writer,
            imdbRating: rating,
            imdbVotes: votes
        } = response;
        renderMediaInfo({
            title, released, country, actors, plot, poster, genre, writer, rating, votes
        });
        document.getElementById("back-to-home").addEventListener('click', handleReturnToHome)
    } catch (error) {
        renderNotFound();
    }
}

function renderMainPage() {
    renderMainComponent();
    app();
    previewMediaInfo();
}

export { handleInputSearch, handleSearch, handleSearchButton, renderMediaPage, renderMainPage };