const canvas = document.getElementById('diceCanvas');
const ctx = canvas.getContext('2d');
const rollButton = document.getElementById('rollButton');

const diceSize = 100;

function drawDiceFace(x, y, number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(x, y, diceSize, diceSize);

    const dotRadius = 10;
    const dotPositions = [
        [],
        [{ x: 0.5, y: 0.5 }],
        [{ x: 0.2, y: 0.2 }, { x: 0.8, y: 0.8 }],
        [{ x: 0.2, y: 0.2 }, { x: 0.5, y: 0.5 }, { x: 0.8, y: 0.8 }],
        [{ x: 0.2, y: 0.2 }, { x: 0.8, y: 0.2 }, { x: 0.2, y: 0.8 }, { x: 0.8, y: 0.8 }],
        [{ x: 0.2, y: 0.2 }, { x: 0.8, y: 0.2 }, { x: 0.5, y: 0.5 }, { x: 0.2, y: 0.8 }, { x: 0.8, y: 0.8 }],
        [{ x: 0.2, y: 0.2 }, { x: 0.8, y: 0.2 }, { x: 0.2, y: 0.5 }, { x: 0.8, y: 0.5 }, { x: 0.2, y: 0.8 }, { x: 0.8, y: 0.8 }],
    ];

    dotPositions[number - 1].forEach(pos => {
        ctx.beginPath();
        ctx.arc(x + pos.x * diceSize, y + pos.y * diceSize, dotRadius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function rollDice() {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    const x = (canvas.width - diceSize) / 2;
    const y = (canvas.height - diceSize) / 2;

    drawDiceFace(x, y, diceNumber);
}

rollButton.addEventListener('click', rollDice);


rollDice();
