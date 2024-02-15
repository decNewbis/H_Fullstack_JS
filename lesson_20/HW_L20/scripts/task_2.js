// Task 2. The fairy story

// create node
function createNode (value, choiceList) {
    return {
        value: value,
        choicesList: choiceList
    }
}

// msg - message and question, maxAnswer - max of answers to questions
function getAnswer(msg, maxAnswer) {
    let answer = NaN;
    while (isNaN(+answer) || (1 > +answer || +answer > maxAnswer)) {
        answer = prompt(msg);
        if ((!isNaN(+answer) && (1 <= +answer && +answer <= maxAnswer)) || answer === null) {
            return answer;
        }
    }
}

// ending story and breacking the loop
function endStory() {
    isAlive = false;
    alert(MSG_STORY_OVER);
}

// agree or disagree to start the story
let isAgree = confirm('Ты готов начать нашу увлекательную историю путешестви рыцаря?');

// isAlive: yes or not
let isAlive = true;

const INTRO = "В королевстве, где легенды оживают, молодой оруженосец по имени Люк мечтает стать рыцарем. " +
    "Он служит сир Роберту, рыцарю, который считает, что честь - это наивысшая благотворительность. " +
    "Сир Роберт и король Альберт решили дать шанс юному Скайвокеру и предложили ему выбор пути к столь желанному " +
    "чину.";
const MSG_STORY_OVER = 'Возможно в другой раз. До скорой встречи!';

// NODES
const SIXTH_NODE_CONSEQUENCES = [
    'Люк ведет войска против врага, демонстрируя свою отвагу.',
    'Люк отправляется за древней реликвией, которая может спасти королевство от будущих бед.'
];
const SIXTH_NODE = createNode(
    'Испытание короля. \nКороль, впечатленный действиями Люка, предлагает ему последние испытание.' +
    '\n1. Защиту королевства.\n2. Поиск затерянной реликвии.',
    SIXTH_NODE_CONSEQUENCES
);

const FIFTH_NODE_CONSEQUENCES = [
    'Люк демонстрирует свои способности, получая уважение от народа.',
    'Люк помогает пораненому рыцарю-сопернику, показывае свое благородное сердце.',
    'Люк отказывается учавствовать в турнире, утверждая, что настоящий рыцарь знает, ' +
    'когда не стоит оголять мечи из ножн и воевать.'
];
const FIFTH_NODE = createNode(
    'Турнир. \nПосле возвращения из путешествий, Люка вызывают на турнир.' +
    '\n1. Борьба за честь.\n2. Помощь другому участкику.\n3. Отказ от участия в турнире.',
    FIFTH_NODE_CONSEQUENCES
);

const FOURTH_NODE_CONSEQUENCES = [
    'Люк погибает в неравном бою, но его поступок считается героическим.',
    'Люк узнает, что дракон не хочет воевать и они заключают мир.'
];
const FOURTH_NODE = createNode('Люк решается испытать себя, вызвав дракона на нераный бой.' +
    '\n1. Бой с драконом.\n2. Задумавшись, попробовать переговоры.',
    FOURTH_NODE_CONSEQUENCES
);

const THIRD_NODE_CONSEQUENCES = [
    'Люк использует силушку свою для защиты селян, но получает ранение в ожесточенном бою.',
    'Люк решает весь конфликт миным путем, обретая уважение и признание как лидера.'
];
const THIRD_NODE = createNode(
    'Люк помогает жителям села, которые страдают от главаря разбойников Тюрк Гарина.' +
    '\n1. Помочь силой.\n2. Найти мирное решение.',
    THIRD_NODE_CONSEQUENCES
);

const SECOND_NODE_CONSEQUENCES = [
    'Люк получает сверхестественную силу, но остается в долгу перез волшебницей.',
    'Люк выбираетчестный честный путь, отказавшись от легкого успеха.'
];
const SECOND_NODE = createNode(
    'Люк встречает вольшебницу, которая предлагает зелье силы в обмен на неприложный обет. ' +
    '\n1. Принять зелье\n2. Отказаться от зелья',
    SECOND_NODE_CONSEQUENCES
);

const FIRST_NODE_CONSEQUENCES = [
    SECOND_NODE,
    THIRD_NODE,
    FOURTH_NODE
];
const FIRST_NODE = createNode(
    'Начало пути. \nСир Роберт ставит перед Люклм Скайвокером испытание, ' +
    'решения в котором определят его судьбу.' +
    '\n1. Отправиться в лес.\n2. Пойти через село.\n3. Отправиться к замку дракона.' +
    '\n(Введите число от 1 до 3, соответствующее вашему ответу)',
    FIRST_NODE_CONSEQUENCES
);

// possible endings
const ENDING_OF_STORY = [
    'Люк становиться рыцарем, известным своей честностью и мужеством, выбирая путь служения королевству.',
    'Люк покидает турнир, становиться защитником селян и образцом для других, показывая, что настоящая сила кроетсяв ' +
    'мудрости и сочувствии.',
    'Люк доказывает, что можно найти мир даже с драконами и спасти королевство без насильства, становясь легендой.',
    'Люк погибает, но его имя на веки останеться в легендах его народа как символ непобедимой смелости и жертвенности.',
    'Люк Скайвокер получил свое звание рыцаря. Его жизнь наполнилась приключениями. В его честь слагали песни, ' +
    'затевали пиры и считали всегда желанным гостем на пороге каждого порога от простого люда до самых высоких чинов.'
];


alert('Приветствую!\nСейчас мы побываем в фентезийной истори "Загадочная история Скайвокера в эпоху рыцарства", ' +
    'в которой можно повлиять на ход событий.');

while (isAlive) {
    if (isAgree) {
        // start the story
        alert(INTRO);
        // choice 1
        let firstChoiceObj = FIRST_NODE;
        let firstChoice = +getAnswer(firstChoiceObj.value, 3);
        let secondChoice = NaN;
        if (1 <= firstChoice && firstChoice <= 3) {
            // choice 2
            let secondChoiceObj = firstChoiceObj.choicesList[firstChoice - 1];
            secondChoice = +getAnswer(secondChoiceObj.value, 2);
            if (1 <= secondChoice && secondChoice <= 2) {
                alert(secondChoiceObj.choicesList[secondChoice - 1]);
                //check isAlive
                if (firstChoice === 3 && secondChoice === 1) {
                    alert(ENDING_OF_STORY[3]);
                    endStory();
                    continue;
                }
            } else {
                // story over
                endStory();
                continue;
            }
        } else {
            // story over
            endStory();
            continue;
        }

        // choice 3
        let thirdChoice = +getAnswer(FIFTH_NODE.value, 3);
        if (1 <= thirdChoice && thirdChoice <= 3) {
            alert(FIFTH_NODE.choicesList[thirdChoice - 1]);
            if (thirdChoice === 3) {
                alert(ENDING_OF_STORY[1]);
                endStory();
                continue;
            }
        } else {
            // story over
            endStory();
            continue;
        }

        // choice 4
        let fourthChoice = +getAnswer(SIXTH_NODE.value, 2);
        if (1 <= fourthChoice && fourthChoice <= 2) {
            alert(SIXTH_NODE.choicesList[fourthChoice - 1]);
        } else {
            // story over
            endStory();
            continue;
        }

        console.log(firstChoice, secondChoice, thirdChoice, fourthChoice);
        // summarizing results
        if (firstChoice === 1 && secondChoice === 2 && thirdChoice === 1 && fourthChoice === 1) {
            alert(ENDING_OF_STORY[0]);
        } else if (firstChoice === 3 && secondChoice === 2 && thirdChoice === 2 && fourthChoice === 2) {
            alert(ENDING_OF_STORY[2]);
        } else {
            alert(ENDING_OF_STORY[4]);
        }
        endStory();
    } else {
        // story over
        endStory();
    }
}