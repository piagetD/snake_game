const width = 20;
const mapCount = 30; // 地图格子的个数
const direction = ["up", "down", "left", "right"]
const BORDER = width * mapCount;
let head;
let snake = [];
let x = 100;
let y = 100;
let isRun = false; // 按下按钮之后开始
let preDirection = "right"; // 默认自动的方向

function checkBorder() {
    if (x < 0 || x > BORDER || y < 0 || y > BORDER) {
        // TODO: 检查是否撞击自身
        isRun = false;
        if (window.confirm("hit the wall! keep playing?")) {
            resetGame();
        } else {
            resetGame();
        }
    }
}

function addBody(x, y) {
    let body = document.createElement("div");
    body.className = "block";
    body.style.setProperty("top", y + "px")
    body.style.setProperty("left", x + "px")
    document.getElementById("map").appendChild(body);
    snake.push(body);
    console.log(snake);
}

function resetGame() {
    head = document.getElementById('snake');
    x = 100;
    y = 100;
    head.style.setProperty("top", y + "px")
    head.style.setProperty("left", x + "px")
}
// 应该是无限循环的函数，除非游戏中止
function autoAction() {

}

// 根据方向前进，遍历整个body数组，依次更新
function snakeForward() {

}

function moveAction(el, direction) {
    let style = el.style;
    if (direction == "down") {
        y += width;
        checkBorder();
    } else if (direction == "up") {
        y -= width;
        checkBorder();
    } else if (direction == "left") {
        x -= width;
        checkBorder();
    } else if (direction == "right") {
        x += width;
        checkBorder();
    }
    if (isRun) {
        style.setProperty("top", y + "px")
        style.setProperty("left", x + "px")
    }
}

function onKeyPress(event) {
    // console.log(event);
    if (!isRun) {
        isRun = true;
    }
    switch (event.key) {
        case 'w':
            moveAction(head, "up");
            break;
        case 's':
            moveAction(head, "down");
            break;
        case 'a':
            moveAction(head, "left");
            break;
        case 'd':
            moveAction(head, "right");
            break;
    }
}

function init() {
    document.addEventListener('keypress', onKeyPress);
    window.onload = () => {
        head = document.getElementById('snake');
        map = document.getElementById('map');
        let mapStyle = map.style;
        addBody(x - width, y); // 第一个子body
        mapStyle.setProperty("width", width * mapCount + "px")
        mapStyle.setProperty("height", width * mapCount + "px")
    };
}

init();