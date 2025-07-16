const cake = document.querySelector('.cake');
const addButton = document.createElement('button');
addButton.textContent = 'Add Candle';
document.body.appendChild(addButton);
addButton.addEventListener('click', addCandle);

function addCandle() {
    const candle = document.createElement('div');
    candle.classList.add('candle');
    
    // Randomly choose a color for the candle
    const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#32CD32', '#FF4500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    candle.style.background = randomColor;
    
    // Style the candle
    candle.style.width = '15px';
    candle.style.height = '50px';
    candle.style.borderRadius = '8px';
    candle.style.position = 'absolute';
    
    // Cone top: use clip-path for the candle's cone shape
    candle.style.clipPath = 'polygon(50% 0%, 0% 20%, 0% 100%, 100% 100%, 100% 20%)';
    
    // Position the candle randomly on the top layer of the cake
    const topLayer = document.querySelector('.layer-top');
    const cakeRect = cake.getBoundingClientRect();
    const layerRect = topLayer.getBoundingClientRect();
    
    // Random position for the candle on the top layer
    const left = Math.random() * (layerRect.width - 20) + layerRect.left - cakeRect.left;
    const top = layerRect.top - cakeRect.top - 50; // Place candle just above the top layer of the cake
    
    candle.style.left = `${left}px`;
    candle.style.top = `${top}px`;
    
    // Create and append the flame element
    const flame = document.createElement('div');
    flame.classList.add('flame');
    candle.appendChild(flame);
    
    // Append the candle to the cake
    cake.appendChild(candle);
}

// Optional: Blow out candles with mic
startBlowDetection();

function startBlowDetection() {
    if (!navigator.mediaDevices) return;
    
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const mic = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            mic.connect(analyser);
            analyser.fftSize = 512;
            const data = new Uint8Array(analyser.frequencyBinCount);

            function detectBlow() {
                analyser.getByteFrequencyData(data);
                let volume = data.reduce((a, b) => a + b) / data.length;
                
                // If volume exceeds threshold, blow out the flames
                if (volume > 40) {
                    document.querySelectorAll('.flame').forEach(f => {
                        f.classList.add('flame-blown');
                    });
                } else {
                    document.querySelectorAll('.flame').forEach(f => {
                        f.classList.remove('flame-blown');
                    });
                }
                requestAnimationFrame(detectBlow);
            }
            detectBlow();
        })
        .catch(err => console.log(err));
}
