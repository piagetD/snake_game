let isRun = false
let count = 0;

function loopFunc() {
    if (!isRun) {
        return;
    }
    doSomeAction();
    setTimeout(() => {
        loopFunc();
    }, 200)
}

function doSomeAction(){
    console.log(count);
    count++;
    if(count > 5){
        isRun = false;
    }
    setTimeout(() => {
        console.log("in action delay");
    }, 500)
}

isRun = true;
loopFunc()