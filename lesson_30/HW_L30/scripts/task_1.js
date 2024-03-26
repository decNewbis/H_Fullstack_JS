// task 1

function startApp() {
    const vehicle = {
        start() {
            console.log('Movement started');
        },
        stop() {
            console.log('Movement stopped');
        }
    }

    console.log('vehicle', vehicle);
    console.log('vehicle.__proto__', vehicle.__proto__);

    const car = {
        engineKey() {
            console.log('Starting engine');
        },
        petrolTank() {
            console.log('Checking petrol level');
        }
    }

    const bike = {
        bell() {
            console.log('Ding-ding');
        },
        pedal() {
            console.log('Creak-creak');
        }
    }

    car.__proto__ = vehicle;
    bike.__proto__ = vehicle;
    console.log('car', car);
    console.log('car.__proto__', car.__proto__);
    console.log('bike', bike);
    console.log('bike.__proto__', bike.__proto__);

    const truck = {
        mountTruckTrailer() {
            console.log('Mounting truck trailer');
        },
        unmountTruckTrailer() {
            console.log('Unmounting truck trailer');
        }
    }
    const sedan = {
        turnOnCruiseControl() {
            console.log('Cruise control "On"');
        },
        turnOffCruiseControl() {
            console.log('Cruise control "Off"');
        }
    }

    truck.__proto__ = car;
    sedan.__proto__ = car;
    console.log('truck', truck);
    console.log('truck.__proto__', truck.__proto__);
    console.log('sedan', sedan);
    console.log('sedan.__proto__', sedan.__proto__);

    const sportBike = {
        switchToHigherSpeed(){
            console.log('Speed Up');
        },
        switchToLowerSpeed() {
            console.log('Speed Down');
        }
    }

    const scooter = {
        electricDriveMode() {
            console.log('Mode: Electric drive On');
        },
        mechanicalDriveMode() {
            console.log('Mode: Pedal drive On');
        }
    }

    sportBike.__proto__ = bike;
    scooter.__proto__ = bike;
    console.log('sportBike', sportBike);
    console.log('sportBike.__proto__', sportBike.__proto__);
    console.log('scooter', scooter);
    console.log('scooter.__proto__', scooter.__proto__);
}

startApp();