
// 初始化数据，length: 方格大小
function getInitData(length = 5){
    const free = new Array();
    let data = new Array(length).fill("row");
    data = data.map((row, rowIdx) =>
        new Array(length).fill("cell").map((cell, colIdx) => {
            let location = `${rowIdx}-${colIdx}`;
            free.push(location);
            return { 
                num: "",
                location
            };
        })
    );
    // 设置两个初始元素
    data[0][0].num = data[0][1].num = 2;
    free.splice(0,2);
    return {
        data,
        max: 2, // 当前合成的最大值
        free, // 当前空闲方格位置记录
    };
}

// 添加：从空闲位置中随机取一个设值为2
function add(data, free){
    if(!free.length){
        alert("没有空位啦！");
        return data;
    }
    const index = Math.floor(Math.random()*(free.length - 1));
    const location = free[index].split("-");
    // 从空闲中删除该位置
    free.splice(index, 1);

    data[location[0]][location[1]].num = 2;
    return data;
}

function move(direction, data, free){
    if(!direction) return;

    let max = 0;
    if(direction === "left") {
        max = moveLeft(data, free);
    } else if(direction === "right"){
        max = moveLeft(data, free, true);
    } else if(direction === "up"){
        max = moveUp(data, free);
    } else if(direction === "down"){
        max = moveUp(data, free, true);
    }
    return max;
}

// 左移/右移(needReverse = true)
function moveLeft(data, free, needReverse = false){
    let max = 0;
    data.forEach((row, rowIdx) => {
        if(needReverse){
            row = row.reverse();
        }
        let preIdx = 0, // 当前可以被加的数的位置
            colIdx = 1;

        while (colIdx < row.length) {
            let cell = row[colIdx],
                preCell = row[preIdx];
            if(!cell.num) {
                //没有值，直接跳过
                colIdx++;
                continue;
            }

            if(cell.num === preCell.num) {
                // 与待加值相等，执行相加，清空当前位置
                max = Math.max(addNum(preCell, cell), max);
                //更新空闲位置
                updateFree(free, cell.location);
                preIdx++;
            } else {
                // 与待加值不相等，更新待加值
                if(preCell.num){
                    preIdx++;
                    preCell = row[preIdx];
                }
                if(!preCell.num){
                    exchangeValue(preCell, cell);
                    updateFree(free, cell.location, preCell.location);
                }
            }
            colIdx++;
        }
            
        if(needReverse){
            row = row.reverse();
        }
    });
    return max;
}
// 上移/下移(needReverse = true)
function moveUp(data, free, needReverse = false){
    if(needReverse){
        data = data.reverse();
    }
    let max = 0;
    data[0].forEach((item, colIdx) => {
        let preIdx = 0,
            rowIdx = 1;
        while (rowIdx < data.length) {
            let preCell = data[preIdx][colIdx],
                cell = data[rowIdx][colIdx];
            if(!cell.num) {
                rowIdx++;
                continue;
            }
            if(cell.num === preCell.num) {
                max = Math.max(addNum(preCell, cell), max);
                updateFree(free, cell.location);
                preIdx++;
            } else {
                if(preCell.num){
                    preIdx++;
                    preCell = data[preIdx][colIdx];
                }
                if(!preCell.num){
                    exchangeValue(preCell, cell);
                    updateFree(free, cell.location, preCell.location);
                }
            }
            rowIdx++;
        }
    });
    if(needReverse){
        data = data.reverse();
    }
       return max;
}

// 更新空闲位置
function updateFree(free, location, originLocation){
    if(originLocation){
        const index = free.indexOf(originLocation);
        if(index >= 0){
            free[index] = location;
        }
    } else{
        free.push(location);
    }
}

// 执行相加
function addNum(item1, item2){
    const temp = item1.num*2;
    item1.num = temp;
    item2.num = "";
    return temp;
}

// 交换值
function exchangeValue(item1, item2, key = "num"){
    const temp = item1[key];
    item1[key] = item2[key];
    item2[key] = temp;
}

export {
    getInitData,
    add,
    move
}