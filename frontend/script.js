const video = document.getElementById('video');
const videoDiv = document.getElementById('video-div');
const canvas = document.getElementById('canvas');
const nextBtn = document.getElementById('nextBtn');
const pred = document.getElementById('prediction');
const userScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const resultElement = document.getElementById('result');
const roundElement = document.querySelector('#round-title span');
const computerChose = document.querySelector('.computer-card p span');
const userChose = document.querySelector('.player-card p span')
const userEmojiImage = document.getElementById('user-emoji-img');
const computerEmojiImage = document.getElementById('computer-emoji-img');
const userChoseSentence = document.getElementById('userChoseSentence');

const options = ["paper", "rock", "scissors"];

let user_score = 0;
let computer_score = 0;

let round = 0;

function get_random_option() {
    const randomElement = options[Math.floor(Math.random() * options.length)];
    return randomElement
}

async function predict(input_image) {
    const formData = new FormData();
    formData.append('file', input_image, 'captured_image.png');

    const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    console.log(data);

    return data
}

function webcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing webcam: ', error);
        });
}

function take_picture() {
    return new Promise(resolve => {
        const context = canvas.getContext('2d');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function (blob) {
            resolve(blob);
        }, 'image/png');
    });
}

async function rps_game() {

    const input_image = await take_picture();

    const result = await predict(input_image);

    const user_chose = result.prediction;
    const computer_chose = get_random_option();

    computerChose.innerText = computer_chose;
    userChose.innerText = user_chose;

    const imagePaths = {
        rock: "./images/fist-em-removebg-preview.png",
        paper: "./images/hand-em-removebg-preview.png",
        scissors: "./images/scissor-em-removebg-preview.png",
    };

    userEmojiImage.src = imagePaths[user_chose];
    computerEmojiImage.src = imagePaths[computer_chose];

    if (computer_chose == "rock" && user_chose == "paper" || computer_chose == "scissors" && user_chose == "rock" || computer_chose == "paper" && user_chose == "scissors") {
        resultElement.innerText = "Player 1 wins!";
        user_score += 1;
    } else if (computer_chose == "paper" && user_chose == "rock" || computer_chose == "rock" && user_chose == "scissors" || computer_chose == "scissors" && user_chose == "paper") {
        computer_score += 1;
        resultElement.innerText = "Computer wins!";
    } else {
        resultElement.innerText = "Tie!";
    } 
    

    userScore.innerText = user_score;
    computerScore.innerText = computer_score;

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdown() {
    for (let i = 3; i >= 1; i--) {
        resultElement.innerText = i;
        await sleep(1000); 
    }
    await sleep(1000);
    resultElement.innerText = "Shoot!";
    await sleep(1000);
}


function main() {
    webcam();

    roundElement.innerText = round;

    nextBtn.addEventListener('click', async () => {

        videoDiv.style.display = "block";
        userEmojiImage.style.display = "none";
        userChoseSentence.style.display = "none";
        computerEmojiImage.src = "./images/pc.png";
        computerChose.innerText = ""

        round += 1;

        if (round == 0) {
            nextBtn.innerText = "Start Game";
        } else {
            nextBtn.innerText = "Next Round";
        }

        
        roundElement.innerText = round;
        await countdown();

        await rps_game();
        userEmojiImage.style.display = "inline";
        userChoseSentence.style.display = "block";

        videoDiv.style.display = "none";
    });
}

main();





