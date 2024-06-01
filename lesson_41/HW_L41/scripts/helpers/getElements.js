export function getSearchElement() {
    return document.getElementById("search-box");

}export function getSearchButton() {
    return document.getElementById("search-button");
}

export function getPostersContainer() {
    return document.getElementById("posters");
}

export function getPreviewList() {
    return document.querySelector('.preview-list');
}

export function getFilterType() {
    const filterType = document.getElementsByName('type');
    for (let elementIndex = 0; elementIndex < filterType.length; elementIndex++) {
        if (filterType[elementIndex].type === 'radio' && filterType[elementIndex].checked) {
            return `&type=${filterType[elementIndex].value}`;
        }
    }
}

export function getFilterYear() {
    const filterYear = document.getElementById('year');
    let filterYearValue = +filterYear.value;
    if (filterYearValue) {
        if ((+filterYear.getAttribute('min')) <= (filterYearValue)
            && (filterYearValue) <= (+filterYear.getAttribute('max'))) {
            return `&y=${filterYearValue}`;
        }
        if ((filterYearValue) > (+filterYear.getAttribute('max'))) {
            return `&y=${filterYear.getAttribute('max')}`;
        }
        if ((filterYearValue) < (+filterYear.getAttribute('min'))) {
            return `&y=${filterYear.getAttribute('min')}`;
        }
    }
    return '';
}
