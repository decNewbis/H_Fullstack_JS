import {NO_IMG, N_A} from "./constants.js";

function checkNA(value) {
    return value && value !== N_A ? value : '-';
}

const createPreviewItem = ({ poster, title, year, id }) => `
    <li data-id="${checkNA(id)}" class="preview-item">
        <img class="preview-poster" src="${poster && poster !== N_A ? poster : NO_IMG}" 
        alt="poster for ${checkNA(title)}">
        <span class="preview-title">
            ${checkNA(title)}
        </span>
        <span class="preview-year">
            ${checkNA(year)}
        </span>
    </li>
`


const createTile = ({ poster, title, year, id }) => `
    <div data-id="${checkNA(id)}" class="movie-card">
        <img src="${poster && poster !== N_A ? poster : NO_IMG}" alt="poster for ${checkNA(title)}">
        <h3>${checkNA(title)} (${checkNA(year)})</h3>
    </div>
`

const movieNotFound = "<li class='preview-item'>Movie wasn't found</li>"


const renderMainComponent = () => {
    document.getElementById('app').innerHTML = `
        <div class="container">
            <aside class="filters">
                <h2>Filters</h2>
                <fieldset>
                    <div>
                        <input type="radio" id="both" name="type" value="" checked>
                        <label for="both">Movie and series</label>
                    </div>
                    <div>
                        <input type="radio" id="movie" name="type" value="movie">
                        <label for="movies">Movies</label>
                    </div>
                    <div>
                        <input type="radio" id="series" name="type" value="series">
                        <label for="series">Series</label>
                    </div>
                </fieldset>
                <div>
                    <label for="year">Release Year:</label>
                    <input type="number" id="year" placeholder="2023" min="1900" max="2024">
                </div>
            </aside>
            <main class="content">
                <div class="search-container">
                    <div class="search-wrapper">
                        <input type="search" class="search" id="search-box" placeholder="Enter a title...">
                        <ul id="preview-list" class="preview-list hidden"></ul>
                    </div>
                    <button id="search-button">Search</button>
                </div>
                <div id="posters" class="results-container"></div>
            </main>
        </div>    
    `
}

const renderMediaInfo = ({title, released, country, actors, plot, poster, genre, writer, rating, votes}) => {
    document.getElementById('app').innerHTML = `
        <main>
            <div class="media__wrapper">
                <ul class="media__list">
                    <li class="media__item">
                        <h1 class="media__title">${checkNA(title)}</h1>
                        <img class="media__poster" src="${poster && poster !== N_A ? poster : NO_IMG}" 
                        alt="poster for ${checkNA(title)}">
                        <div class="media__rating">
                            <img src="https://decnewbis.github.io/H_Fullstack_JS/lesson_41/HW_L41/assets/imdb-mini.png" 
                            alt="imdb logo">
                            <span>${checkNA(rating)} / ${checkNA(votes)}</span>
                        </div>
                    </li>
                    <li class="media__item">
                        <ul class="media__list-info">
                            <li class="media__item-info">
                                <h2 class="media__info-title">Released:</h2>
                                <p class="media__info-content">${checkNA(released)}</p>
                            </li>
                            <li class="media__item-info">
                                <h2 class="media__info-title">Country:</h2>
                                <p class="media__info-content">${checkNA(country)}</p>
                            </li>
                            <li class="media__item-info">
                                <h2 class="media__info-title">Genre:</h2>
                                <p class="media__info-content">${checkNA(genre)}</p>
                            </li>
                            <li class="media__item-info">
                                <h2 class="media__info-title">Writer:</h2>
                                <p class="media__info-content">${checkNA(writer)}</p>
                            </li>
                            <li class="media__item-info">
                                <h2 class="media__info-title">Actors:</h2>
                                <p class="media__info-content">${checkNA(actors)}</p>
                            </li>
                            <li class="media__item-info">
                                <h2 class="media__info-title">Description:</h2>
                                <p class="media__info-content">${checkNA(plot)}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <button class="media__button" id="back-to-home">Back</button>
            </div>
        </main>
    `
}

const renderNotFound = () => {
    return document.getElementById('app').innerHTML = movieNotFound;
}

export {
    createPreviewItem,
    createTile,
    movieNotFound,
    renderMainComponent,
    renderMediaInfo,
    renderNotFound,
};
