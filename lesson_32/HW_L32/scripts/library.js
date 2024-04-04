// task 1 Library

class idGen {
    constructor() {
        this.id = 0;
    }

    generateId() {
        this.id++;
        return this.id;
    }
}

class Library {
    constructor() {
        this.booksData = {};
    }

    addBook(book) {
        this.booksData[book.id] = book;
    }

    removeBook(id) {
        delete this.booksData[id];
    };

    findBookByTitle(title) {
        // use strict match
        return Object.values(this.booksData).filter((book) => book.title === title);
    }

    addUserReaderIdToBook(userId, bookId) {
        const foundBook = this.booksData[bookId].userReaderIdArr;
        if (!foundBook.includes(userId)) {
            foundBook.push(userId);
        }
    }

    addBorrower(userId, bookId) {
        const foundBook = this.booksData[bookId];
        if (foundBook) {
            foundBook.currentBorrower = userId;
            foundBook.available = false;
        } else {
            console.log('[addBorrower] Something went wrong');
        }
    }

    removeBorrower(userId, bookId) {
        const foundBook = this.booksData[bookId];
        if (foundBook && (foundBook.currentBorrower === userId)) {
            foundBook.currentBorrower = null;
            foundBook.available = true;
        } else {
            console.log('[removeBorrower] Something went wrong');
        }
    }

    findBooksByAuthor(author) {
        // use soft match
        return Object.values(this.booksData).filter((book) => book.author.includes(author));
    }

    listAvailableBooks() {
        return Object.values(this.booksData).filter((book) => book.available);
    }
}

class Book {
    constructor(title, author, year) {
        this.id = idBooks.generateId();
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
        this.rate = {};
        this.userReaderIdArr = [];
        this.currentBorrower = null;
    }

    addRating(userId, rate) {
        if (!isNaN(+rate) && rate !== null) {
            if (this.userReaderIdArr.includes(userId)) {
                if (rate > 5) rate = 5;
                if (rate < 0) rate = 0;
                this.rate[userId] = +rate;
            }
        } else {
            console.log('[addRating] Something went wrong');
        }
    }

    #roundValueToSecondNum(value) {
        return Math.round(value * 100) / 100;
    }

    getAverageRating() {
        const ratesArr = Object.values(this.rate);
        const sum = ratesArr.reduce((acc, currentValue) => acc + currentValue, 0);
        return this.#roundValueToSecondNum(sum /ratesArr.length);
    }
}

class User {
    constructor(name) {
        this.id = idUsers.generateId();
        this.name = name;
    }

    borrowBook(bookTitle, library) {
        const booksList = library.findBookByTitle(bookTitle) || [];
        const foundBook = booksList.find((book) => (book.title === bookTitle) && book.available);
        if (foundBook) {
            library.addUserReaderIdToBook(this.id, foundBook.id);
            library.addBorrower(this.id, foundBook.id);
        } else {
            console.log(`Unfortunately, available book "${bookTitle}" was not found in the library.`)
        }
    }

    returnBook(bookTitle, library) {
        const booksList = library.findBookByTitle(bookTitle) || [];
        const foundBook = booksList.find((book) => book.currentBorrower === this.id);
        if (foundBook) {
            library.removeBorrower(this.id, foundBook.id);
        } else {
            console.log(`Unfortunately, available book "${bookTitle}" was not found in the library.`)
        }
    }
}

function startApp() {
    // create users (their accounts)
    const user1 = new User('user1');
    const user2 = new User('user2');
    let booksList = [];
    // create books
    booksList[0] = new Book('To Kill a Mockingbird', 'Harper Lee', 1960);
    booksList[1] = new Book('To Kill a Mockingbird', 'Harper Lee', 1960);
    booksList[2] = new Book('1984', 'George Orwell', 1949);
    booksList[3] = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
    booksList[4] = new Book('Pride and Prejudice', 'Jane Austen', 1813);
    booksList[5] = new Book('The Catcher in the Rye', 'J.D. Salinger', 1951);
    booksList[6] = new Book('The Catcher in the Rye 2', 'J.D. Salinger', 1951);
    booksList[7] = new Book('The Catcher in the Rye', 'J.D. Salinger', 1951);

    // create library
    const worldLibrary = new Library();
    // add books into library DB
    booksList.forEach((book) => worldLibrary.addBook(book));
    // remove book from library DB and add new book, test id generator
    worldLibrary.removeBook(8);
    booksList[8] = new Book('Harry Potter', 'Joan Rowling', 1997);
    worldLibrary.addBook(booksList[8]);
    console.log('-- worldLibrary:', worldLibrary);

    console.log('-- listAvailableBooks:', worldLibrary.listAvailableBooks());
    console.log('-- findBooksByAuthor:', worldLibrary.findBooksByAuthor('J.D. Salinger'));

    // test functions - user1
    console.log('-- test functions - user1');
    booksList[2].addRating(user1.id, 5);
    user1.borrowBook('Harry Potter', worldLibrary);
    user1.borrowBook('фывфыв', worldLibrary); // wrong name
    user1.borrowBook('Pride and Prejudice', worldLibrary);
    user1.borrowBook('To Kill a Mockingbird', worldLibrary);
    user1.returnBook('To Kill a Mockingbird', worldLibrary);
    booksList[8].addRating(user1.id, 15);
    booksList[8].addRating(user1.id, '15');
    booksList[8].addRating(user1.id, null);
    booksList[8].addRating(user1.id, undefined);
    booksList[0].addRating(user1.id, 15);
    booksList[1].addRating(user1.id, -4);
    booksList[1].addRating(user1.id, '-4');
    booksList[1].addRating(user1.id, null);
    booksList[1].addRating(user1.id, undefined);

    // test functions - user2
    console.log('-- test functions - user2');
    booksList[4].addRating(user2.id, 5);
    user2.borrowBook('Harry Potter', worldLibrary);
    user2.borrowBook('Catcher', worldLibrary);
    user2.borrowBook('1984', worldLibrary);
    user2.borrowBook('To Kill a Mockingbird', worldLibrary);
    user2.returnBook('To Kill a Mockingbird', worldLibrary);
    booksList[8].addRating(user2.id, 2);
    booksList[0].addRating(user2.id, 3);
    booksList[1].addRating(user2.id, -4);

    // avg rates
    console.log('-- test function - get avg rating');
    for (let book of booksList) {
        console.log(`[ID: ${book.id}] Book title:${book.title}, rate: ${book.getAverageRating() || 'no rating'}`);
    }
}

const idUsers = new idGen();
const idBooks = new idGen();

startApp();
