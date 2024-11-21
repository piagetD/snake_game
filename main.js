const width = 20;
const mapCount = 30; // 地图格子的个数
const direction = ["up", "down", "left", "right"]
const BORDER = width * mapCount;
let snakeList = [];
const INITIAL_X = 100; // 初始X
const INITIAL_Y = 100; // 初始Y
let isRun = false; // 按下按钮之后开始
let preDirection = "right"; // 默认自动的方向
let L = 0; // 长度
let foodPosition = [];

function setFood() {
    if (foodPosition.length > 0)
        try {
            document.getElementById("map").removeChild(document.getElementById("food"))
        } catch {
            foodPosition = [];
        }
    foodPosition = [];

    let food = document.createElement("div");
    food.className = "food";
    food.id = "food";
    let xValue = getRandomInteger() * 20;
    let yValue = getRandomInteger() * 20;
    while (checkHit([xValue, yValue])) {
        xValue = getRandomInteger() * 20;
        yValue = getRandomInteger() * 20;
    }

    food.style.setProperty("top", yValue + "px")
    food.style.setProperty("left", xValue + "px")
    foodPosition = [xValue, yValue];
    document.getElementById("map").appendChild(food);
    console.log("setFood:", food);
}

function getRandomInteger() {
    return Math.floor(Math.random() * mapCount);
}

function checkHit(foodPosition, containHead = true) {
    let isHit = false;
    if (snakeList.length < 1) {
        return false;
    }
    if (containHead) {
        snakeList.forEach(E => {
            if (E[0] == foodPosition[0] && E[1] == foodPosition[1]) {
                isHit = true;
            }
        })
    } else {
        for (let i = 1; i < snakeList.length; i++) {
            if (snakeList[i][0] == foodPosition[0] && snakeList[i][1] == foodPosition[1]) {
                isHit = true;
            }
        }
    }
    return isHit;
}

function checkIsEnd() {
    if (snakeList[0][0] <= 0 || snakeList[0][0] >= (BORDER - width) || snakeList[0][1] <= 0 || snakeList[0][1] >= (BORDER - width)) {
        isRun = false;
        if (window.confirm("hit the wall! keep playing?")) {
            resetGame();
        } else {
        }
    }
    if (checkHit(snakeList[0], false)) {
        isRun = false;
        if (window.confirm("hit snake self! keep playing?")) {
            resetGame();
        } else {
        }
    }
}

function addBody(x, y) {
    console.log("addBody in: ", snakeList, x, y);
    L++;
    snakeList.push([x, y]);
    let body = document.createElement("div");
    body.className = "block";
    body.id = "snake" + L;
    body.style.setProperty("top", y + "px")
    body.style.setProperty("left", x + "px")
    document.getElementById("map").appendChild(body);
    console.log("addBody: ", snakeList);
}

function resetGame() {
    // const element = document.getElementById("map");
    // while (element.firstChild) {
    //     console.log("while: ", element.firstChild);
    //     element.removeChild(element.firstChild);
    // }
    // console.log("resetGame: ", element);
    // snakeList = [];
    // L = 0;
    // setFood();
    // addBody(INITIAL_X, INITIAL_Y)
    // addBody(INITIAL_X - width, INITIAL_Y); // 第一个子body

    // isRun = true;
    // autoAction();
}
// 应该是无限循环的函数，除非游戏中止
function autoAction() {
    if (!isRun) {
        return;
    }
    moveAll();
    setTimeout(() => {
        autoAction();
    }, 500)
}

// 根据方向前进，遍历整个body数组，依次更新
function moveAll() {
    let first = snakeList[0].slice(0);
    moveAction(first, preDirection)
    let tail = snakeList.pop();
    // console.log(foodPosition, snakeList[0]);
    if (checkHit(foodPosition)) {
        console.log("is hit!");
        setFood();
        addBody(tail[0], tail[1]);
        snakeList.push(); // 如果刚好吃到food,最后个元素的位置就用来增加新节点
    }
    snakeList.unshift(first);

    renderList();
}

function renderList() {
    let snakeDoms = document.getElementsByClassName("block");
    if (snakeDoms.length == snakeList.length) {
        for (let i = 0; i < snakeDoms.length; i++) {
            snakeDoms[i].style.setProperty("top", snakeList[i][1] + 'px')
            snakeDoms[i].style.setProperty("left", snakeList[i][0] + 'px')
        }
    } else {
        console.log(snakeDoms.length, snakeList.length)
        throw Error("数据异常！")
    }
}

function moveAction(snakeNode, direction) {
    if (direction == "down") {
        snakeNode[1] += width;
    } else if (direction == "up") {
        snakeNode[1] -= width;
    } else if (direction == "left") {
        snakeNode[0] -= width;
    } else if (direction == "right") {
        snakeNode[0] += width;
    }
    checkIsEnd();
}

function onKeyPress(event) {
    // console.log(event);
    if (!isRun) {
        isRun = true;
    }
    switch (event.key) {
        case 'w':
            if (preDirection != "down") {
                preDirection = "up";
            }
            break;
        case 's':
            if (preDirection != "up") {
                preDirection = "down";
            }
            break;
        case 'a':
            if (preDirection != "right") {
                preDirection = "left";
            }
            break;
        case 'd':
            if (preDirection != "left") {
                preDirection = "right";
            }
            break;
    }
}

function init() {
    document.addEventListener('keypress', onKeyPress);
    window.onload = () => {
        map = document.getElementById('map');
        let mapStyle = map.style;
        L = 0;
        setFood();
        snakeList = [];
        addBody(INITIAL_X, INITIAL_Y);
        addBody(INITIAL_X - width, INITIAL_Y);
        mapStyle.setProperty("width", width * mapCount + "px")
        mapStyle.setProperty("height", width * mapCount + "px")

        isRun = true;
        autoAction();
    };
}

init();