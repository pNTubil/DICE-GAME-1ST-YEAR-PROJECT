let randomNum, randomNum1, randomNum2, d1, d2, playerActive, scores, isGamePlaying;
let currentScore0, currentScore1, currentScoreSum, pGlobalScore0, pGlobalScore1;
let buttonResT, buttonRoll, buttonHold, buttonSetVal;
let player0Side, player1Side, playerName0, playerName1; 
let inputValue, limitValue, lmValue;
let Player1 = 'Player 1';
let Player2 = 'Player 2';
let buttonRule = document.getElementById("buttonRule");
let buttonRtn = document.getElementById("buttonReturn");
let holder = document.getElementById("holder");
const spin = new Audio();
const hold = new Audio();
const click = new Audio();
const  win = new Audio();
const backgroundMusic = new Audio();
spin.src = "sounds/Spinning.mp3";
hold.src = "sounds/hold1.mp3";
click.src = "sounds/click.mp3";
win.src = "sounds/Winner.mp3";
backgroundMusic.src = "sounds/backgroundM.mp3";

inputValue = document.querySelector(".input-value");
playerName0 = document.querySelector('#playerName-0');
playerName1 = document.querySelector('#playerName-1');
buttonResT = document.querySelector('.restart-btn');
buttonRoll = document.querySelector('.roll_Button');
buttonHold = document.querySelector('.hold_button');
buttonSetVal = document.querySelector('.setVal_Button');
d1 = document.querySelector('.die1');
d2 = document.querySelector('.die2');
limitValue = document.querySelector('.limit-score');
currentScore0 = document.getElementById('currentScore-0');
currentScore1 = document.getElementById('currentScore-1');
pGlobalScore0 = document.getElementById('playerScore-0');
pGlobalScore1 = document.getElementById('playerScore-1');
player0Side = document.querySelector('.player-0-side');
player1Side = document.querySelector('.player-1-side');

//FUNCTIONS

buttonRule.addEventListener("click", () => {
    holder.classList.toggle('show');
    if (buttonRule.innerText == "GAME RULES") {
        click.play();
        buttonRule.innerText = "QUIT";
    } else {
        buttonRule.innerText = "GAME RULES"
        click.play();
    }
})

const editNames = ()=>{
    click.play();
    Player1 = prompt("Change Player 1's name");
    Player2 = prompt("Change Player 2's name");
    document.querySelector("div.Player1").innerHTML = Player1;
    document.querySelector("div.Player2").innerHTML = Player2;
}

const initialise = (limitScoreValue=100)=>{
    d1.style.display = 'none';
    d2.style.display = 'none';
    isGamePlaying = true;
    lmValue = limitScoreValue;
    limitValue.textContent = lmValue;
    scores = [0,0];
    playerActive = 0;
    currentScoreSum = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    pGlobalScore0.textContent = 0;
    pGlobalScore1.textContent = 0;
    player0Side.classList.remove('active');
    player1Side.classList.remove('active');
    player0Side.classList.add('active');
    player0Side.classList.remove('winner');
    player1Side.classList.remove('winner');
    playerName0.textContent = 'Player 1';
    playerName1.textContent = 'Player 2';
}

const rollDice = ()=>{
    randomNum1 = Math.floor(Math.random()*6)+1;
    randomNum2 = Math.floor(Math.random()*6)+1;
    randomNum = randomNum1 + randomNum2;
    spin.play();
    d1.style.display = "block";
    d2.style.display = "block";
    d1.src = "die"+randomNum1+".gif";
    d2.src = "die"+randomNum2+".gif";
}

const switchRoles = ()=>{
    if(playerActive === 1){
        playerActive = 0;
        player1Side.classList.toggle('active');
        player0Side.classList.toggle('active');
        currentScore1.textContent = 0;
    }
    else{
        playerActive = 1;
        player0Side.classList.toggle('active');
        player1Side.classList.toggle('active');
        currentScore0.textContent = 0;
    }
    inputValue.classList.toggle('active');
    d1.style.display = 'none';
    d2.style.display = 'none';
    
}

//GAME FLOW//
initialise();

buttonSetVal.addEventListener('click', ()=>{
    if(inputValue.value!==null){
        initialise(inputValue.value);
        inputValue.value = '';
        click.play();
    }
})

buttonRoll.addEventListener('click', ()=>{
    if(isGamePlaying){
        rollDice(); 
        if(randomNum1 === 1 || randomNum2 === 1){
            switchRoles();
            currentScoreSum = 0; 
            spin.pause(); 
            spin.currentTime = 0;
        }
        else {
            currentScoreSum += randomNum;
            playerActive ? currentScore1.textContent = currentScoreSum : currentScore0.textContent = currentScoreSum;
        }
    }
});

buttonHold.addEventListener('click', ()=>{
    if(isGamePlaying){
        hold.play();
        scores[playerActive] += currentScoreSum;
        if(playerActive === 1) pGlobalScore1.textContent = scores[playerActive];
        else pGlobalScore0.textContent = scores[playerActive];
        currentScoreSum = 0;

        if(scores[playerActive] >= lmValue){
            document.querySelector('.player-'+playerActive+'-side').classList.add("winner");
            document.getElementById('playerName-'+playerActive).textContent = 'WINNER !';
            document.querySelector('.player-'+playerActive+'-side').classList.remove("active")
            win.play();
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            d1.style.display = 'none';
            d2.style.display = 'none';
            isGamePlaying = false;
        }
        else
            switchRoles();
    }
});

const startGame = () =>{
    click.play();
    backgroundMusic.loop = true;
    backgroundMusic.play();
    let startDiv = document.getElementById("start");
    let gameCanvas = document.getElementById("canvas");
    click.play();
    startDiv.style.display = "none";
    gameCanvas.style.display = "block";
    initialise();
}

buttonReturn.addEventListener("click", () =>{
        click.play();
        backgroundMusic.pause(); 
        backgroundMusic.currentTime = 0;
        let gameCanvas = document.getElementById("canvas");
        let startDiv = document.getElementById("start");
        click.play();
        gameCanvas.style.display = "none";
        startDiv.style.display = "block";
});

buttonResT.addEventListener('click', ()=>{
    initialise();
    click.play();
    backgroundMusic.play();
});
 



