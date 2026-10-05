let boxes =document.querySelectorAll(".box");
let resetBtn =document.querySelector("#reset-btn");

let newGameBtn=document.querySelector("#new-game");
let msg=document.querySelector("#msg");
let msgCont=document.querySelector(".msg-container");

let scoreBoard =document.querySelector("#score-board");
let playerXName =document.querySelector("#playerX-name");
let playerOName =document.querySelector("#playerO-name");

let scX=document.querySelector("#scoreX");
let scO=document.querySelector("#scoreO");


let playerO=prompt("Enter the name of player O");
let playerX=prompt("Enter the name of player X");

let endGameBtn=document.querySelector(".end-game");

let finalContainer=document.querySelector(".final-winner");
let finalMsg=document.querySelector("#msg-final");

let tieBreaker=document.querySelector(".tie-breaker");

playerXName.innerText=`${playerX}`;
playerOName.innerText=`${playerO}`;

let turnO =true;

let winPlayer="";

let scoreX=0;
let scoreO=0;

let isTieBreaker=false;

 const winPatt =[
    [0,1,2] ,
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
 ];

 boxes.forEach((box)=>{
    box.addEventListener("click" ,()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
 });

const disableBoxes =()=>{
for(let box of boxes){
    box.disabled=true;
}
}

const enableBoxes =()=>{
for(let box of boxes){
    box.disabled=false;
    box.innerText="";
}
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    winPlayer = "";
    isTieBreaker = false;

    msgCont.classList.add("hide");
    scoreBoard.classList.add("hide");
    endGameBtn.classList.add("hide");
    finalContainer.classList.add("hide");
    tieBreaker.classList.add("hide");
};

const newGame = () => {
    turnO = true;
    enableBoxes();
    winPlayer = "";
    isTieBreaker = false;

    scoreO = 0;
    scoreX = 0;

    scX.innerText = 0;
    scO.innerText = 0;

    msgCont.classList.add("hide");
    scoreBoard.classList.add("hide");
    endGameBtn.classList.add("hide");
    finalContainer.classList.add("hide");
    tieBreaker.classList.add("hide");
};

const showWinner =(winner)=>{
    msg.innerText=`Congratulations the winner of this round is ${winner}`;
    msgCont.classList.remove("hide");
    scoreBoard.classList.remove("hide");
    endGameBtn.classList.remove("hide");
    disableBoxes();
}

const drawCase= ()=>{
    msg.innerText=`Oops. Draw match!`;
    msgCont.classList.remove("hide");
    scoreBoard.classList.remove("hide");
    endGameBtn.classList.remove("hide");
    disableBoxes();
}

 const checkWinner =() =>{
for(let patt of winPatt){
   let pos1=boxes[patt[0]].innerText;
  let  pos2=boxes[patt[1]].innerText;
    let pos3=boxes[patt[2]].innerText;

    if(pos1 !="" && pos2!="" && pos3!=""){
        if(pos1 === pos2 && pos2 === pos3){

    if (isTieBreaker) {
        if (pos1 === "X") {
            finalMsg.innerText = `The final winner is ${playerX}`;
        }
        else {
            finalMsg.innerText = `The final winner is ${playerO}`;
        }

        finalContainer.classList.remove("hide");
        disableBoxes();
        isTieBreaker = false;

        return;
    }

    if(pos1 === "X") {
        winPlayer = playerX;
        scoreX++;
        scX.innerText = scoreX;
    }
    else {
        winPlayer = playerO;
        scoreO++;
        scO.innerText = scoreO;
    }

    showWinner(winPlayer);
    return;
}
}

}
let isDraw = true;

    for(let box of boxes){
        if(box.innerText === ""){
            isDraw = false;
            break;
        }
    }

   if(isDraw){
    if(isTieBreaker){
        enableBoxes();
        turnO = true;
        return;
    }

    drawCase();
}
 };

const endGame = () => {
    turnO = true;
    enableBoxes();

    if (scoreO > scoreX) {
        winPlayer = playerO;
    }
    else if (scoreX > scoreO) {
        winPlayer = playerX;
    }
    

    msgCont.classList.add("hide");
    scoreBoard.classList.add("hide");
    endGameBtn.classList.add("hide");

    finalContainer.classList.remove("hide");
    if(scoreO===scoreX) {
        finalMsg.innerText = `It's a tie!`;
        tieBreaker.classList.remove("hide");
    }
    else{
        tieBreaker.classList.add("hide");
    finalMsg.innerText = `The final winner is ${winPlayer}`;
    }
};

// const tieRound =()=>{
//     turnO = true;
//     enableBoxes();
//     scoreX=0;
//     scoreO=0;
//     checkWinner();
// }


const tieRound = () => {
    turnO = true;
    enableBoxes();

    isTieBreaker = true;

    finalContainer.classList.add("hide");
    tieBreaker.classList.add("hide");
};

 newGameBtn.addEventListener("click" , resetGame);
 resetBtn.addEventListener("click" , newGame);
 endGameBtn.addEventListener("click",endGame);
tieBreaker.addEventListener("click",tieRound);