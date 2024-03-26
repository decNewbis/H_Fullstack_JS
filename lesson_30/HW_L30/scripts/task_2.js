// task 2

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
    console.log('Object.getPrototypeOf(vehicle)', Object.getPrototypeOf(vehicle));

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

    Object.setPrototypeOf(car, vehicle);
    Object.setPrototypeOf(bike, vehicle);
    console.log('car', car);
    console.log('Object.getPrototypeOf(car)', Object.getPrototypeOf(car));
    console.log('bike', bike);
    console.log('Object.getPrototypeOf(bike)', Object.getPrototypeOf(bike));

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

    Object.setPrototypeOf(truck, car);
    Object.setPrototypeOf(sedan, car);
    console.log('truck', truck);
    console.log('Object.getPrototypeOf(truck)', Object.getPrototypeOf(truck));
    console.log('sedan', sedan);
    console.log('Object.getPrototypeOf(sedan)', Object.getPrototypeOf(sedan));

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

    Object.setPrototypeOf(sportBike, bike);
    Object.setPrototypeOf(scooter, bike);
    console.log('sportBike', sportBike);
    console.log('Object.getPrototypeOf(sportBike)', Object.getPrototypeOf(sportBike));
    console.log('scooter', scooter);
    console.log('Object.getPrototypeOf(scooter)', Object.getPrototypeOf(scooter));
}

startApp();