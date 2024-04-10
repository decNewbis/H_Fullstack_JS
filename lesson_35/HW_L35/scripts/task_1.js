// task_2

function shuffle(tempList) {
    for (let currentIndex = tempList.length - 1; currentIndex >= 1; currentIndex--) {
        const futureIndex = Math.floor(Math.random() * (currentIndex + 1));
        [tempList[currentIndex], tempList[futureIndex]] = [tempList[futureIndex], tempList[currentIndex]];
    }
}

function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return `${
        String(date.getDate()).padStart(2, '0')
    }-${
        String(date.getMonth()+1).padStart(2, '0')
    }-${
        String(date.getFullYear()).padStart(4, '0')
    }`;
}

function createSection(images) {
    const section = document.createElement('section');
    section.className = 'gallery';
    section.innerHTML = `
        <div class="gallery__wrapper">
            <h2>Grid of gallery</h2>
            <ul class="gallery__list">
            ${images.map((element) => {
                return (`
                    <li class="gallery__item">
                        <img src="${element.src}"  alt="${element.alt}" data-public-date="${
                            getRandomDate(new Date(2023, 0, 1), new Date())
                        }">
                    </li>
                `);
            }).join('')}
            </ul>
        </div>
    `;
    const main = document.querySelector('main');
    main.append(section);
    const h2Title = document.querySelector('.gallery__wrapper > h2');
    h2Title.addEventListener('click', () => {
        main.innerHTML = '';
        shuffle(images);
        createSection(images);
    });
}

function startApp() {
    const images = [
        {src: './assets/1.jpg', alt: 'photo of leopard 1'}, {src: './assets/2.jpg', alt: 'photo of leopard 2'},
        {src: './assets/3.jpg', alt: 'photo of leopard 3'}, {src: './assets/4.jpg', alt: 'photo of leopard 4'},
        {src: './assets/5.jpg', alt: 'photo of leopard 5'}, {src: './assets/6.jpg', alt: 'photo of leopard 6'},
        {src: './assets/7.jpg', alt: 'photo of leopard 7'}, {src: './assets/8.jpg', alt: 'photo of leopard 8'},
        {src: './assets/9.jpg', alt: 'photo of leopard 9'}, {src: './assets/10.jpg', alt: 'photo of leopard 10'},
        {src: './assets/11.jpg', alt: 'photo of leopard 11'}, {src: './assets/12.jpg', alt: 'photo of leopard 12'},
        {src: './assets/13.jpg', alt: 'photo of leopard 13'}, {src: './assets/14.jpg', alt: 'photo of leopard 14'},
        {src: './assets/15.jpg', alt: 'photo of leopard 15'}, {src: './assets/16.jpg', alt: 'photo of leopard 16'}
    ]

    createSection(images);
}

startApp();