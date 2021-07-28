class MonkeyCarGame {
    constructor (games) {
        this.games = games;
        this.wins = 0;
        this.losses = 0;
        this.car = 'car';
        this.sheep = 'sheep';
        return this;
    }

    play () {
        for (let i = 0; i < this.games; i++) {
            const doors = this.getDoorsSetup();
            const chosenDoor = this.chooseDoor(doors);
            const { [chosenDoor]: x, ...remainingDoors } = doors;
            const sheepDoor = this.showSheepDoor(remainingDoors);
            const lastDoor = this.getLastDoor(remainingDoors, sheepDoor);
            this.determineWinner(doors, lastDoor);
        }

        const winPercentage = ((this.wins * 100) / this.games).toFixed(2);
        const losesPercentage = ((this.losses * 100) / this.games).toFixed(2);

        console.log(`wins: ${winPercentage}%`);
        console.log(`losses: ${losesPercentage}%`);
    };

    getDoorsSetup () {
        const init = this.getCarSheepPosition();
    
        const doors = {
            door1: null,
            door2: null,
            door3: null
        };
    
        for(const key in doors) {
            doors[key] = init.shift();
        }
    
        return doors;
    };

    getCarSheepPosition () {
        const choices = Array.from({ length: 3 }).fill(this.sheep);

        choices[Math.floor(Math.random() * choices.length)] = this.car;

        return choices;
    }

    chooseDoor (doors) {
        const doorsKeys = Object.keys(doors);
    
        return doorsKeys[Math.floor(Math.random() * doorsKeys.length)];
    };

    showSheepDoor (remainingDoors) {
        const isCarOneOfTheDoors = Object.values(remainingDoors).includes(this.car);

        if (isCarOneOfTheDoors) {
            return Object.keys(remainingDoors).find(key => remainingDoors[key] !== this.car);
        } else {
            const remainingDoorKeys = Object.keys(remainingDoors);

            return remainingDoorKeys[Math.floor(Math.random() * remainingDoorKeys.length)];
        }
    }

    getLastDoor (remainigDoors, sheepDoor) {
        const { [sheepDoor]: x, ...lastDoor } = remainigDoors;

        return Object.keys(lastDoor).pop();
    }

    determineWinner(doors, lastDoor) {
        doors[lastDoor] === this.car ? this.wins++ : this.losses++;
    }
}

new MonkeyCarGame(100000).play();
