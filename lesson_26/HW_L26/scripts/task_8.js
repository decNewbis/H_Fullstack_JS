// task 8

function startApp() {
    let order1 = {
        table: 1,
        dishes: [
            { name: "Кава", price: 30 },
            { name: "Чізкейк", price: 50 }
        ],
        status: "в обробці"
    };

    let order2 = {
        table: 2,
        dishes: [
            { name: "Лате", price: 40 },
            { name: "Тірамісу", price: 60 }
        ],
        status: "готується"
    };

    ordersModule.addOrder(order1);
    ordersModule.addOrder(order2);
    console.log('OrdersArray', ordersModule.getOrdersArray());  // checkpoint

    console.log('Сумма замовлення для столу 1:', ordersModule.getTotalAmount(1));
    console.log('Сумма замовлення для столу 2:', ordersModule.getTotalAmount(2));

    console.log(`статус для столу №1 оновлено: ${
        ordersModule.changeOrderStatus(1, 'готується')
    }`);
    console.log(`статус для столу №2 оновлено: ${
        ordersModule.changeOrderStatus(2, 'готове до видачі')
    }`);

    ordersModule.cancelOrder(1);
    console.log('OrdersArray', ordersModule.getOrdersArray());  // checkpoint
}

const ordersModule = function() {
    let orders = [];

    function getOrderIndex(tableNumber) {
        return orders.findIndex((order) => order.table === tableNumber);
    }

    return {
        addOrder: function(order) {
            orders.push(order);
        },
        getTotalAmount: function(tableNumber) {
            const foundOrder = orders.find((order) => order.table === tableNumber);
            return foundOrder.dishes.reduce((sum, dish) => {
                sum += dish.price;
                return sum;
            }, 0);
        },
        changeOrderStatus: function(tableNumber, status='') {
            const foundOrderIndex = getOrderIndex(tableNumber);
            return orders[foundOrderIndex]['status'] = status;
        },
        cancelOrder: function(tableNumber) {
            const foundOrderIndex = getOrderIndex(tableNumber);
            orders.splice(foundOrderIndex, 1);
        },
        getOrdersArray: function() {
            return orders;
        },
    };
}();

startApp();