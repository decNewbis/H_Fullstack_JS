// task_1

function startApp() {
    const categoriesList = document.querySelector('ul#categories');
    const categoriesItems = categoriesList.querySelectorAll('.categories__item');

    console.log('Numbers of categories:', categoriesItems.length);
    console.log('---');
    categoriesItems.forEach((element) => {
        console.log('Category:', element.querySelector('.categories__category-title').textContent);
        const categoryList = element.querySelector('.categories__category-list').children;
        console.log('Elements:', categoryList.length);

        let longestElement = '';
        Array.from(categoryList).forEach((element) => {
            const content = element.querySelector('span').textContent;
            if(content.length > longestElement.length) {
                longestElement = content;
            }
        })
        console.log('LongestElement:', longestElement);
        console.log('---');
    });
}

startApp();