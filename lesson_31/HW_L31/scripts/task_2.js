// task 2

function consoleOutput(objName, obj) {
    console.log(`${objName}:`, obj);
    console.log(`Object.getPrototypeOf(${objName}):`, Object.getPrototypeOf(obj));
}

class Vehicle {
    start() {
        console.log('start: Movement started');
    }

    stop() {
        console.log('stop: Movement stopped');
    }
}

class Car extends Vehicle {
    engineKey() {
        console.log('Starting engine');
    }

    petrolTank() {
        console.log('Checking petrol level');
    }
}

class Bike extends Vehicle {
    bell() {
        console.log('Ding-ding');
    }

    pedal() {
        console.log('Creak-creak');
    }
}

class Truck extends Car {
    start() {
        console.log(`[new] ${this.constructor.name} start: truck headlights on`);
    }

    stop() {
        console.log(`[new] ${this.constructor.name} stop: truck headlights off`);
    }

    mountTruckTrailer() {
        console.log('Mounting truck trailer');
    }

    unmountTruckTrailer() {
        console.log('Unmounting truck trailer');
    }
}
class Sedan extends Car {
    start() {
        console.log(`[new] ${this.constructor.name} start: hazard lights flash`);
    }

    stop() {
        console.log(`[new] ${this.constructor.name} stop: hazard lights do not flash`);
    }

    turnOnCruiseControl() {
        console.log('Cruise control "On"');
    }

    turnOffCruiseControl() {
        console.log('Cruise control "Off"');
    }
}

class SportBike extends Bike {
    start() {
        console.log(`[new] ${this.constructor.name} start: front wheel broke`);
    }

    stop() {
        console.log(`[new] ${this.constructor.name} stop: back wheel broke`);
    }

    switchToHigherSpeed(){
        console.log('Speed Up');
    }

    switchToLowerSpeed() {
        console.log('Speed Down');
    }

}

class Scooter extends Bike {
    start() {
        console.log(`[new] ${this.constructor.name} start: battery is 25% charged`);
    }

    stop() {
        console.log(`[new] ${this.constructor.name} stop: battery is low`);
    }

    electricDriveMode() {
        console.log('Mode: Electric drive On');
    }

    mechanicalDriveMode() {
        console.log('Mode: Pedal drive On');
    }

}

function startApp() {
    const vehicle = new Vehicle();

    consoleOutput('vehicle', vehicle);

    const car = new Car();
    const bike = new Bike();

    consoleOutput('car', car);
    consoleOutput('bike', bike);

    const truck = new Truck();
    const sedan = new Sedan();

    consoleOutput('truck', truck);
    consoleOutput('sedan', sedan);

    const sportBike = new SportBike();
    const scooter = new Scooter();

    consoleOutput('sportBike', sportBike);
    consoleOutput('scooter', scooter);

    console.log('***  test first implementation  ***');
    console.log(car.constructor.name)
    car.start();
    car.stop();
    console.log(bike.constructor.name)
    bike.start();
    bike.stop();

    console.log('***  test new implementation  ***');

    truck.start();
    truck.stop();
    sedan.start();
    sedan.stop();
    sportBike.start();
    sportBike.stop();
    scooter.start();
    scooter.stop();
}

startApp();