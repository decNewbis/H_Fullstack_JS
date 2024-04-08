// task_1

function startApp() {
    const categoriesList = document.querySelectorAll('.categories__list')[0];
    const categoriesItems = categoriesList.querySelectorAll('.categories__item');

    console.log('Numbers of categories:', categoriesItems.length);
    console.log('---');
    categoriesItems.forEach((element) => {
        console.log('Category:', element.querySelector('.categories__category-title').textContent);
        const categoryList = element.querySelectorAll('.categories__category-list')[0].children;
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