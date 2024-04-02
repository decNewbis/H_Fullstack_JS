// task 3

class System {
    constructor() {
        this.tables = [];
    }

    #findTable(tableNumber) {
        return this.tables.find((table) => table.number === tableNumber);
    }

    addTable(tableNumber) {
        this.tables.push(new Table(tableNumber));
    }

    addOrder(tableNumber, order) {
        const table = this.#findTable(tableNumber);
        if (table) {
            table.addOrder(order);
        } else {
            console.log(`Table ${tableNumber} not found`);
        }
    }

    getTotalAmountForTable(tableNumber) {
        const table = this.#findTable(tableNumber);
        if (table) {
            return table.getTotalAmount();
        } else {
            console.log(`Table ${tableNumber} not found`);
            return 0;
        }
    }

    getTotalAmountForOrder(tableNumber, orderIndex) {
        const table = this.#findTable(tableNumber);
        if (table && table.orders[orderIndex]) {
            return table.orders[orderIndex].getTotalAmount();
        } else {
            console.log(`Order index ${orderIndex} at table ${tableNumber} not found`);
            return 0;
        }
    }

    changeOrderStatus(tableNumber, orderIndex, newStatus) {
        const table = this.#findTable(tableNumber);
        if (table && table.orders[orderIndex]) {
            table.changeOrderStatus(orderIndex, newStatus);
        } else {
            console.log(`Order index ${orderIndex} at table ${tableNumber} not found`);
        }
    }

    cancelOrder(tableNumber, orderIndex) {
        const table = this.#findTable(tableNumber);
        if (table && table.orders[orderIndex]) {
            table.cancelOrder(orderIndex);
        }
    }
}

class Table {
    constructor(number) {
        this.number = number;
        this.orders = [];
    }

    addOrder(order) {
        this.orders.push(order);
    }

    getTotalAmount() {
        return this.orders.reduce((total, order) => total + order.getTotalAmount(), 0);
    }

    changeOrderStatus(orderIndex, newStatus) {
        this.orders[orderIndex].status = newStatus;
    }

    cancelOrder(orderIndex) {
        this.orders.splice(orderIndex, 1);
    }
}

class Order {
    constructor(table, dishes, status = 'In progress...') {
        this.table = table;
        this.dishes = dishes;
        this.status = status;
    }

    getTotalAmount() {
        return this.dishes.reduce((total, dish) => total + dish.price, 0);
    }
}

function startApp() {
    let order1 = new Order(1,[
            { name: "Кава", price: 30 },
            { name: "Чізкейк", price: 50 }
        ]
    );

    let order2 = new Order(2,[
            { name: "Лате", price: 40 },
            { name: "Тірамісу", price: 60 }
        ]
    );

    let order3 = new Order(2,[
            { name: "Піцца", price: 250 },
            { name: "Наполеон", price: 55 }
        ]
    );

    let system = new System();

    system.addTable(1);
    system.addTable(2);
    console.log('system.tables', system.tables);

    system.addOrder(order1.table, order1);
    system.addOrder(order2.table, order2);

    system.addOrder(order3.table, order3);
    console.log('system.getTotalAmountForTable(1)', system.getTotalAmountForTable(1));
    console.log('system.getTotalAmountForTable(2)', system.getTotalAmountForTable(2));


    console.log('system.getTotalAmountForOrder(1)', system.getTotalAmountForOrder(1, 0));
    console.log('system.getTotalAmountForOrder(2)', system.getTotalAmountForOrder(2, 0));
    console.log('system.getTotalAmountForOrder(3)', system.getTotalAmountForOrder(2, 1));

    console.log('[before changing] order2.status:', order3.status);
    system.changeOrderStatus(2,1, 'Ready to serve');
    console.log('[after changing] order2.status:', order3.status);

    system.cancelOrder(2, 3);
}

startApp();