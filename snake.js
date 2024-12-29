/*
 * Snake in JavaScript
 * Author: [Akhmed]
 * Version: 1.0 beta
 * Email: gmail.com
 * Phone: +7(999) 311-20-61 Telegram,Whats
 * Github: https://github.com/akhmed555
 * Description:
 * A simple implementation of the game "Snake" in JavaScript using HTML and CSS.
 * Controls: keyboard arrows for movement, Esc for pause/continue.
 */
let direction;
let width = 25;
let height = 25;
let pause = true;
let headRotate;
let isFood = false;
let foodPos;
let bonusFood;
let arrPos = [51, 52, 53, 54, 55, 56];
let audio = new Audio();
audio.preload = 'auto';
audio.src = 'sound/apple.mp3';

function createCells(id, width, height) {
    let offsetLeft = 0;
    let offsetTop = 0;
    let cell = document.createElement(id);
    let field = document.getElementById(id);
    field.style.width = width * 24 + "px";
    field.style.height = height * 24 + "px";
    let count = 1;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let cell = document.createElement('div');
            cell.className = "cell"
            cell.style.left += offsetLeft + "px";
            cell.style.top += offsetTop + "px";
            //if(count % 2 == 0){
            //cell.style.backgroundColor = "#5e3a18";	
            //}
            //else{cell.style.backgroundColor = "#5b3818";}
            field.appendChild(cell);
            offsetLeft = offsetLeft + 24;
            count++;
        }
        offsetTop = offsetTop + 24;
        offsetLeft = 0;
    }
}

function randEmptyCell(max) {
    let rand = 1;
    do {
        rand = Math.floor(Math.random() * max);
    }
    while (arrPos.includes(rand) == true)
    return rand;
}

function addFood(n = 1) {
    let food = document.createElement('div');
    food.className = "food";
    let cell = document.querySelectorAll('#field .cell');
    cell[n].appendChild(food);
}

function checkCollSelf() {
    //
    for (let i = 0; i < arrPos.length - 1; i++) {
        if (arrPos[arrPos.length - 1] == arrPos[i]) {
            alert(" Game Over!!!");
        }
    }
}

function clear() {
    let cell = document.querySelectorAll('#field .cell');
    for (i = 0; i < arrPos.length; i++) {
        cell[arrPos[i]].innerHTML = "";
    }
}
createCells('field', width, height);
foodPos = randEmptyCell(width * height);
addFood(foodPos);
['keydown'].forEach(function(event) {
    window.addEventListener(event, function(event) {
        switch (event.code) {
            case "ArrowDown":
                if (direction !== "up") {
                    direction = "down"
                };
                break;
            case "ArrowRight":
                if (direction !== "left") {
                    direction = "right"
                };
                break;
            case "ArrowUp":
                if (direction !== "down") {
                    direction = "up"
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    direction = "left";
                    headRotate = "left";
                };
                break;
            case "Escape":
                pause == true ? pause = false : pause = true;
                break;
        }
    });
});
direction = "right";
window.setInterval(function() {
    if (pause) {
        clear();
        for (let i = 0; i < arrPos.length; i++) {
            arrPos[i] = arrPos[i + 1];
        }
        if (direction == "down") {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] + width;
            if (arrPos[arrPos.length - 1] + 1 > (height * width)) {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] - width * (height - 1);
            }
        }
        if (direction == "right") {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] + 1;
            if (arrPos[arrPos.length - 1] % width == 0) {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 1] - width;
            }
        }
        if (direction == "left") {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] - 1;
            if ((arrPos[arrPos.length - 1] + 1) % width == 0) {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 1] + width;
            }
        }
        if (direction == "up") {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] - width;
            if (arrPos[arrPos.length - 2] < width) {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 1] + (width * height);
            }
        }
        let cell = document.querySelectorAll('#field .cell');
        checkCollSelf();
        if (arrPos[arrPos.length - 1] == foodPos) {
            audio.play();
            addFood(foodPos = randEmptyCell(width * height));
            arrPos.unshift(arrPos[1]);
        }
        for (i = 0; i < arrPos.length; i++) {
            if (i == arrPos.length - 1) {
                cell[arrPos[i]].innerHTML = "<div class='snake " + headRotate + "'>00</div>";
            } else {
                cell[arrPos[i]].innerHTML = "<div class='snake'></div>";
            }
        }
    }
}, 100);