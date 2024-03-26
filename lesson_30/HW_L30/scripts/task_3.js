// task 3

function Vehicle () {
    this.start = function() {
        console.log('start: Movement started');
    };
    this.stop = function() {
        console.log('stop: Movement stopped');
    };
}

function Car() {
    this.engineKey = function() {
        console.log('Starting engine');
    };
    this.petrolTank = function() {
        console.log('Checking petrol level');
    };
}

function Bike() {
    this.bell = function() {
        console.log('Ding-ding');
    };
    this.pedal = function() {
        console.log('Creak-creak');
    };
}

function Truck() {
    this.mountTruckTrailer = function() {
        console.log('Mounting truck trailer');
    };
    this.unmountTruckTrailer = function() {
        console.log('Unmounting truck trailer');
    };
}
function Sedan() {
    this.turnOnCruiseControl = function() {
        console.log('Cruise control "On"');
    };
    this.turnOffCruiseControl = function() {
        console.log('Cruise control "Off"');
    };
}

function SportBike() {
    this.switchToHigherSpeed = function(){
        console.log('Speed Up');
    };
    this.switchToLowerSpeed = function() {
        console.log('Speed Down');
    };
}

function Scooter() {
    this.electricDriveMode = function() {
        console.log('Mode: Electric drive On');
    };
    this.mechanicalDriveMode = function() {
        console.log('Mode: Pedal drive On');
    };
}

function consoleOutput(objName, obj) {
    console.log(`${objName}:`, obj);
    console.log(`Object.getPrototypeOf(${objName}):`, Object.getPrototypeOf(obj));
}

function setNewLogic(constructorObj) {
    constructorObj.prototype.start = function () { console.log('[new] start: Driving started')};
    constructorObj.prototype.stop = function () { console.log('[new] stop: Driving stopped')};
}

function startApp() {
    const vehicle = new Vehicle();

    consoleOutput('vehicle', vehicle);

    Car.prototype = vehicle;
    Bike.prototype = vehicle;

    const car = new Car();
    const bike = new Bike();

    consoleOutput('car', car);
    consoleOutput('bike', bike);

    Truck.prototype = car;
    Sedan.prototype = car;

    const truck = new Truck();
    const sedan = new Sedan();

    consoleOutput('truck', truck);
    consoleOutput('sedan', sedan);

    SportBike.prototype = bike;
    Scooter.prototype = bike;

    const sportBike = new SportBike();
    const scooter = new Scooter();

    consoleOutput('sportBike', sportBike);
    consoleOutput('scooter', scooter);

    console.log('***  test first implementation  ***');

    scooter.start();
    scooter.stop();

    console.log('***  test new implementation  ***');

    const constructorsObjArr = [Vehicle, Car, Bike, Truck, Sedan, SportBike, Scooter];

    for (let element of constructorsObjArr) {
        setNewLogic(element);
    }

    scooter.start();
    scooter.stop();
}

startApp();