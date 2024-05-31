const createPreviewItem = ({ poster, title, year, id }) => `
    <li data-id="${id}" class="preview-item">
        <img class="preview-poster" src="${poster}" alt="poster for ${title}">
        <span class="preview-title">
            ${title}
        </span>
        <span class="preview-year">
            ${year}
        </span>
    </li>
`


const createTile = ({ poster, title, year, id }) => `
    <div data-id="${id}" class="movie-card">
        <img src="${poster}"></img>
        <h3>${title} (${year})</h3>
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
                    <input type="number" id="year" placeholder="2023" min="1900" max="2023">
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

const renderMediaInfo = ({title, released, country, actors, plot, poster}) => {
    document.getElementById('app').innerHTML = `
    <head>Header</head>
    <main>
        <img src="${poster}" alt="poster for ${title}">
        <h1>${title}</h1>
        <p>${released}</p>
        <p>${country}</p>
        <p>${actors}</p>
        <p>Description: ${plot}</p>
    </main>
    <button id="back-to-home">Back</button>
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
