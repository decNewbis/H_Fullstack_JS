// task 2

function moveOver(valueArr=[], position='') {
    const positions = ['start', 'end']
    if((valueArr instanceof Array) && (typeof position === 'string') && positions.includes(position.toLowerCase())) {
        let tempElement;
        if (position === 'start') {
            tempElement = valueArr.shift();
            valueArr.push(tempElement);
        } else if (position === 'end') {
            tempElement = valueArr.pop();
            valueArr.unshift(tempElement);
        }
        console.log(valueArr);
    } else {
        console.log('Incorrect params!');
    }
}

moveOver([1,2,3,4], 'end') // [2,3,4,1]
moveOver([1,2,3,4], 'start') // [4,1,2,3]