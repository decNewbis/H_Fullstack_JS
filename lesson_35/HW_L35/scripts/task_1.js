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

function toCapitalize(str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function fillSection(images) {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery__wrapper';
    wrapper.innerHTML = `
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
    `;
    const sectionGallery = document.getElementById('gallery');
    sectionGallery.append(wrapper);

    wrapper.addEventListener('click', (event) => {
        if (event.target.matches('h2')) {
            sectionGallery.innerHTML = '';
            shuffle(images);
            fillSection(images);
        }
        if (event.target.matches('img')) {
            modal.style.display = 'inline-block';
            // modal.querySelector('.modal__content').style.display = 'inline-block';
            const modalContent = modal.querySelector('.modal__content');
            const modalImg = modal.querySelector('.modal__content > img');
            const modalAlt = modal.querySelector('.modal__content > h2');
            const modalDate = modal.querySelector('.modal__content > p');
            modalContent.style.display = 'inline-block';
            modalImg.setAttribute('src', event.target.getAttribute('src'));
            modalAlt.textContent = toCapitalize(event.target.getAttribute('alt'));
            modalDate.textContent = `Publication date: ${event.target.dataset.publicDate}`;
        }
    });

    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close');

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
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

    fillSection(images);
}

startApp();