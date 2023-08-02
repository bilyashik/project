//CHECK GMAIL

const gmailInput = document.querySelector('#gmail_input')
const gmailCheck = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailCheck.addEventListener('click', () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'NOT OK'
        gmailResult.style.color = 'red'
    }
})

//MOVE BLOCK

const childBlock = document.querySelector('.child_block');

let positionX = 0
let positionY = 0

const move = () => {
    if (positionX < 449 && positionY === 0) {
        positionX++
        childBlock.style.left = `${positionX}px`
        setTimeout(move, 10)
    } else if (positionX >= 449 && positionY < 449) {
        positionY++
        childBlock.style.top = `${positionY}px`
        setTimeout(move, 10)
    } else if (positionX > 0 && positionY === 449) {
        positionX--
        childBlock.style.left = `${positionX}px`
        setTimeout(move, 10)
    } else if (positionX === 0 && positionY > 0) {
        positionY--
        childBlock.style.top = `${positionY}px`
        setTimeout(move, 10)
    }
}

move ()


//COUNTER


let counterValue = 0;
let intervalId = null;
let isRunning = false;

const updateCounter = () => {
    const counterElement = document.getElementById("seconds");
    counterElement.textContent = counterValue;
};

const incrementCounter = () => {
    counterValue++;
    updateCounter();
};

document.getElementById("start").addEventListener("click", () => {
    if (!isRunning) {
        intervalId = setInterval(incrementCounter, 1000);
        isRunning = true;
    }
});

document.getElementById("stop").addEventListener("click", () => {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
});


document.getElementById("resume").addEventListener("click", () => {
    if (!isRunning) {
        intervalId = setInterval(incrementCounter, 1000);
        isRunning = true;
    }
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(intervalId);
    counterValue = 0;
    isRunning = false;
    updateCounter();
});