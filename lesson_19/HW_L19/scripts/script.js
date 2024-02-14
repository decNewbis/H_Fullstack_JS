// task 1_1: print without 'N' or 'n'
let sufStr = 'ami';
console.log('task 1_1 result:', sufStr / 0 + sufStr);

// task 1_2: print without any letters
console.log('task 1_2 result:', String.fromCharCode(0x004E, 0x0061, 0x004E, 0x0061, 0x006d, 0x0069));

// task 2: array of objects
function customUser(name, age, nickname, phoneNum, email, sex, hobby, isTrainee) {
    return {
        name: name,
        age: age,
        nickname: nickname,
        phoneNum: phoneNum,
        email: email,
        sex: sex,
        hobby: hobby,
        isTrainee: isTrainee,
    };
}

let hillelStudent1 = customUser(
    'Artem', 30, 'decodload', '+38(055)555-55-55',
    'decexample@gmail.com', 'male', 'AI, Machine Learning', true
);

let hillelStudent2 = customUser(
    'Misha', 29, 'Pepa', '+38(044)444-44-44',
    'pepaexample@gmail.com', 'male', 'codding, Back-End', true
);

let hillelStudent3 = customUser(
    'Elly', 28, 'elsi', '+38(099)999-99-99',
    'elsiexample@yahoo.org', 'female', 'UI, Front-End', false
);

let studentList = [hillelStudent1, hillelStudent2, hillelStudent3];

console.log('\ntask 2 result:\n', studentList);

for (let student in studentList) {
    console.log(`student: ${student}`);
    for (let prop in studentList[student]) {
        console.log('\t',prop, ':', studentList[student][prop])
    }
}