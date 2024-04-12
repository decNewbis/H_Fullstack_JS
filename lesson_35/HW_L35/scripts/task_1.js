// task_1

class Gallery {
    constructor(images) {
        this.imagesArr = images;
        this.modal = document.getElementById('modal');
        this.closeModalBtn = document.querySelector('.close');
        this.modalContent = this.modal.querySelector('.modal__content');
        this.modalImg = this.modal.querySelector('.modal__content > img.modal__img');
        this.modalAlt = this.modal.querySelector('.modal__content > h2.modal__title');
        this.modalDate = this.modal.querySelector('.modal__content > p.modal__date');
        this.sectionGallery = document.getElementById('gallery');
        this.wrapper = document.createElement('div');

    }

    shuffle(tempList) {
        for (let currentIndex = tempList.length - 1; currentIndex >= 1; currentIndex--) {
            const futureIndex = Math.floor(Math.random() * (currentIndex + 1));
            [tempList[currentIndex], tempList[futureIndex]] = [tempList[futureIndex], tempList[currentIndex]];
        }
    }

    getRandomDate(start, end) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return `${
            String(date.getDate()).padStart(2, '0')
        }-${
            String(date.getMonth() + 1).padStart(2, '0')
        }-${
            String(date.getFullYear()).padStart(4, '0')
        }`;
    }

    toCapitalize(str) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }

    fillSection() {
        this.wrapper.className = 'gallery__wrapper';
        this.wrapper.innerHTML = `
            <h2 id="randomizer">Grid of gallery</h2>
            <ul class="gallery__list">
            ${this.imagesArr.map((element) => {
            return (`
                    <li class="gallery__item">
                        <img src="${element.src}"  alt="${element.alt}" data-public-date="${
                this.getRandomDate(new Date(2023, 0, 1), new Date())
            }">
                    </li>
                `);
        }).join('')}
            </ul>
        `;

        this.sectionGallery.append(this.wrapper);
    }

    addWrapperEvent() {
        this.wrapper.addEventListener('click', (event) => {
            if (event.target.matches('h2#randomizer')) {
                this.sectionGallery.innerHTML = '';
                this.shuffle(this.imagesArr);
                this.fillSection(this.imagesArr);
                this.addCloseModalEvent();
            }
            if (event.target.matches('img')) {
                this.modal.style.display = 'inline-block';
                this.modalContent.style.display = 'inline-block';
                this.modalImg.setAttribute('src', event.target.getAttribute('src'));
                this.modalAlt.textContent = this.toCapitalize(event.target.getAttribute('alt'));
                this.modalDate.textContent = `Publication date: ${event.target.dataset.publicDate}`;
            }
        });
    }

    addCloseModalEvent() {
        this.closeModalBtn.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });
    }

    addAllEvents() {
        this.addWrapperEvent();
        this.addCloseModalEvent();
    }
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

    const gallery = new Gallery(images);
    gallery.fillSection();
    gallery.addAllEvents();
}

startApp();