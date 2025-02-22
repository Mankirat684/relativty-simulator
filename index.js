// declaring variables
let isRunning = false;
let startTime = 0;
let earthTime = 0;
let spaceshipTime = 0;
let animationFrameId;
let v = 0;

const velocitySlider = document.getElementById('velocity');
const velocityValue = document.getElementById('velocityValue');
const earthTimeDisplay = document.getElementById('earthTime');
const spaceshipTimeDisplay = document.getElementById('spaceshipTime');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

velocitySlider.addEventListener('input', updateVelocity);
startStopButton.addEventListener('click', toggleSimulation);
resetButton.addEventListener('click', resetSimulation);

function updateVelocity() {
    v = parseFloat(velocitySlider.value);
    velocityValue.textContent = (v * 100).toFixed(0) + '%';
    updateSpaceshipSpeed(v);
}

function updateSpaceshipSpeed(v) {
    const spaceship = document.querySelector('.spaceship');
    spaceship.style.animationDuration =  `${v > 0 ? 0.3 / v : 0}s`;
}

function calculatelf(v) {
    return 1 / Math.sqrt(1 - v * v);
}

// stopwatch
function toggleSimulation() {
    isRunning = !isRunning;
    startStopButton.textContent = isRunning ? 'Stop' : 'Start';
    
    if (isRunning) {
        startTime = Date.now();
        animate();
    } else {
        cancelAnimationFrame(animationFrameId);
    }
}

function animate() {
    if (!isRunning) return;

    const currentTime = Date.now();
    const realTime = (currentTime - startTime) / 1000;
    startTime = currentTime;

    const v = parseFloat(velocitySlider.value);
    const lf = calculatelf(v);

    earthTime += realTime;
    spaceshipTime += realTime / lf;

    earthTimeDisplay.textContent = earthTime.toFixed(2);
    spaceshipTimeDisplay.textContent = spaceshipTime.toFixed(2);

    animationFrameId = requestAnimationFrame(animate);
}

function resetSimulation() {
    isRunning = false;
    startStopButton.textContent = 'Start';
    earthTime = 0;
    spaceshipTime = 0;
    earthTimeDisplay.textContent = '0.00';
    spaceshipTimeDisplay.textContent = '0.00';
    velocitySlider.value = 0;
    velocityValue.textContent = '0%';
    updateSpaceshipSpeed(0);
    cancelAnimationFrame(animationFrameId);
}

// length contraction
const lengthVelocitySlider = document.getElementById('lengthVelocity');
const lengthVelocityValue = document.getElementById('lengthVelocityValue');
const restLengthDisplay = document.getElementById('restLength');
const contractedLengthDisplay = document.getElementById('contractedLength');
const lengthBox = document.getElementById('lengthBox');

lengthVelocitySlider.addEventListener('input', updateLengthContraction);

function updateLengthContraction() {
    const v = parseFloat(lengthVelocitySlider.value);
    lengthVelocityValue.textContent = (v * 100).toFixed(0) + '%';

    const restLength = 200;
    const lf = calculatelf(v);
    const contractedLength = restLength / lf;

    restLengthDisplay.textContent = restLength.toFixed(2);
    contractedLengthDisplay.textContent = contractedLength.toFixed(2);

    //updating length
    lengthBox.style.width = `${contractedLength}px`;
    if(lengthBox.style.width==`0px`){
        // lengthBox.style.height = `0px`;
        lengthBox.style.opacity = `0`;
    }else{
         lengthBox.style.height = `50px`;
         lengthBox.style.opacity = `1`;
     }
    

}
updateVelocity();
updateLengthContraction();
