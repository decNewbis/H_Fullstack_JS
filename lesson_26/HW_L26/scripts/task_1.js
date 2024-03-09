// task 1

function getBookTitle(author, booksArray) {
    const bookObj = booksArray.find((element) => element.author === author);
    if (bookObj) {
        return bookObj.title;
    }
    return '';
}

function startApp() {
    const books = [
        {title: 'Гаррі Поттер', author: 'Дж.К. Ролінг'},
        {title: '1984', author: 'Джордж Орвелл'},
        {title: 'Хоббіт', author: 'Дж.Р.Р. Толкієн'}
    ];

    const targetValue = 'Джордж Орвелл';
    const bookTitle = getBookTitle(targetValue, books);

    if (bookTitle) {
        console.log(bookTitle);
    } else {
        console.log('Автор не найден в БД');
    }
}

startApp();