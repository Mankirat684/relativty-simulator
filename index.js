// Time Dilation Simulation
let isRunning = false;
let startTime = 0;
let earthTime = 0;
let spaceshipTime = 0;
let animationFrameId;

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
    const v = parseFloat(velocitySlider.value);
    velocityValue.textContent = (v * 100).toFixed(0) + '%';
    updateSpaceshipSpeed(v);
}

function updateSpaceshipSpeed(v) {
    const spaceship = document.querySelector('.spaceship');
    spaceship.style.animationDuration = `${3 / (v + 0.1)}s`;
}

function calculateGamma(v) {
    return 1 / Math.sqrt(1 - v * v);
}

function toggleSimulation() {
    isRunning = !isRunning;
    startStopButton.textContent = isRunning ? 'Stop' : 'Start';
    
    if (isRunning) {
        startTime = Date.now() - (earthTime * 1000);
        animate();
    } else {
        cancelAnimationFrame(animationFrameId);
    }
}

function animate() {
    if (!isRunning) return;

    const currentTime = Date.now();
    const deltaTime = (currentTime - startTime) / 1000;
    startTime = currentTime;

    const v = parseFloat(velocitySlider.value);
    const gamma = calculateGamma(v);

    earthTime += deltaTime;
    spaceshipTime += deltaTime / gamma;

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

// Length Contraction Simulation
const lengthVelocitySlider = document.getElementById('lengthVelocity');
const lengthVelocityValue = document.getElementById('lengthVelocityValue');
const restLengthDisplay = document.getElementById('restLength');
const contractedLengthDisplay = document.getElementById('contractedLength');
const lengthBox = document.getElementById('lengthBox');

lengthVelocitySlider.addEventListener('input', updateLengthContraction);

function updateLengthContraction() {
    const v = parseFloat(lengthVelocitySlider.value);
    lengthVelocityValue.textContent = (v * 100).toFixed(0) + '%';

    const restLength = 100; // Rest length in meters
    const gamma = calculateGamma(v);
    const contractedLength = restLength / gamma;

    restLengthDisplay.textContent = restLength.toFixed(2);
    contractedLengthDisplay.textContent = contractedLength.toFixed(2);

    // Update the visual length of the box
    lengthBox.style.width = `${contractedLength}px`;
}

// Initial setup
updateVelocity();
updateLengthContraction();