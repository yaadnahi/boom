/* 

Leaderboard Toggles


*/





let leaderBoard = document.getElementsByClassName("lb-wrapper")[0];
let menuBtn = document.getElementsByClassName("fa-bars")[0];
let closeBtn = document.getElementsByClassName("fa-times")[0];
menuBtn.addEventListener("click", showLeaderBoard);
closeBtn.addEventListener("click", closeLeaderBoard);



let p1NLB = document.getElementsByClassName("p1-name");
let p2NLB = document.getElementsByClassName("p2-name");



function showLeaderBoard() {
    leaderBoard.style.display = "block";
    leaderBoard.style.display = "grid";
}



function closeLeaderBoard() {
  leaderBoard.style.display = "none";

}














/* 


Game Start Button


*/


let gameStartBtn = document.getElementById("start");
let wrapperZero = document.getElementsByClassName("wrapper0")[0];
let wrapperOne = document.getElementsByClassName("wrapper1")[0];


// Target each container element using the index from the following array
let containerArray = document.getElementsByClassName("container");


gameStartBtn.addEventListener("click", startGame);



function startGame() {

  wrapperZero.style.display = "none";
  wrapperOne.style.display = "block";
  wrapperOne.style.display = "grid";
  menuBtn.style.display = "none";

  containerArray[0].style.display = "block";


}










/* 


PLAYER NAMES BUTTON


*/



let nameSubmitBtn = document.getElementById("submit");
nameSubmitBtn.addEventListener("click", playerNames);

let playerOneField = document.getElementById("field-1");
let playerTwoField = document.getElementById("field-2");


let playerOneName;
let playerTwoName;


let player1NameLB = document.getElementsByClassName("p1-name-lb")[0];
let player2NameLB = document.getElementsByClassName("p2-name-lb")[0];



function playerNames() {



  if(playerOneField.value != "" && playerTwoField.value != "") {



    /* 
    
              Local Storage Player Names (Key/Value pairs)
    
    */



    localStorage.setItem("player1Name", playerOneField.value);
    localStorage.setItem("player2Name", playerTwoField.value);


    playerOneName = localStorage.getItem("player1Name");
    playerTwoName = localStorage.getItem("player2Name");

    player1NameLB.innerText = playerOneName;
    player2NameLB.innerText = playerTwoName;


    containerArray[0].style.display = "none";
    containerArray[1].style.display = "block";


  } else if (playerOneField.value != "" || playerTwoField.value != "") {

    alert("Please enter names to Continue");

  }




}














/* 


  Select Symbols


*/

let playerOneSymbol;
let playerTwoSymbol;


let playerSymbols = document.getElementsByClassName("symbol");


let emojiWraps = document.getElementsByClassName("ewrap");

let symbolChoiceCounter = 0;


for(let i = 0; i < playerSymbols.length; i++) {

  playerSymbols[i].addEventListener("click", selectSymbols);


  function selectSymbols() {

   if(symbolChoiceCounter == 0) {

    playerOneSymbol = playerSymbols[i].innerText;

    emojiWraps[i].style.gridTemplateRows = "50px 50px";
    let chooserName = document.createElement("span");
    chooserName.classList.add("chooser-name");
    chooserName.innerText = playerOneName;
    emojiWraps[i].appendChild(chooserName);
    // console.log(`${playerOneName} your symbol is ${playerSymbols[i].innerText}`);

    playerSymbols[i].removeEventListener("click", selectSymbols);
    symbolChoiceCounter++;

   } else if (symbolChoiceCounter == 1) {


    playerTwoSymbol = playerSymbols[i].innerText;

    
    emojiWraps[i].style.gridTemplateRows = "50px 50px";
    let chooserName = document.createElement("span");
    chooserName.classList.add("chooser-name");
    chooserName.innerText = playerTwoName;
    emojiWraps[i].appendChild(chooserName);
    // console.log(`${playerTwoName} your symbol is ${playerSymbols[i].innerText}`);
    playerSymbols[i].removeEventListener("click", selectSymbols);

    setTimeout(loadNextPopUp, 200);


    symbolChoiceCounter++;

    
    

   } else if(symbolChoiceCounter == 2) {
   

    for(let i = 0; i < emojiWraps.length; i++) {
  
      emojiWraps[i].removeEventListener("click", selectSymbols);

    }

      
   }
            

  }


  function loadNextPopUp() {

    containerArray[1].style.display = "none";
    containerArray[2].style.display = "block";

  }


}










/* 


Choose Rounds 


*/



let numberOfRounds;

let roundsArray = document.getElementsByClassName("round");

let roundChoiceCounter = 0;

for(let i = 0; i < roundsArray.length; i++) {


  roundsArray[i].addEventListener("click", selectRounds);

  function selectRounds() {

    if(roundChoiceCounter < 1) {

      numberOfRounds = roundsArray[i].innerText;
      // console.log(numberOfRounds);
      roundChoiceCounter++;

      setTimeout(loadInstructionPopUp, 200);

    } else if(roundChoiceCounter == 1) {

      for(let i = 0; i < roundsArray.length; i++) {

        roundsArray[i].removeEventListener("click", selectRounds);

      }

    }
        

  }


  function loadInstructionPopUp() {

    containerArray[2].style.display = "none";
    containerArray[3].style.display = "block";

  }

}








/* 


  GO Button - To actually start the game




*/


let goBtn = document.getElementById("go-btn");
goBtn.addEventListener("click", addGrid);


let wrapperGrid = document.getElementsByClassName("mwrap-3")[0];

// window.addEventListener("load", addGrid);










let bombNumber;
let genericCounter = 0;
let ultimateWinnerName = document.getElementById("ultimate-winner-name");
let finalP1Counter = 0;
let finalP2Counter = 0;
let playAgainBtn = document.getElementById("play-again");
let boomSound = document.querySelector("audio");




let p1StreakArray = document.getElementsByClassName("p1-streak");
let p2StreakArray = document.getElementsByClassName("p2-streak");

let leaderBoardCounter = 0;



function addGrid() {

  menuBtn.style.display = "block";


  if(genericCounter < numberOfRounds) {

    // console.log(`Counter is ${genericCounter}`);
    genericCounter++;
    // console.log(`Counter is ${genericCounter}`);

  }else if(genericCounter == numberOfRounds) {

    if(finalP1Counter > finalP2Counter) {
      containerArray[5].style.display = "block";
      wrapperGrid.style.display = "none";
      ultimateWinnerName.innerText = playerOneName;
      

    } else if(finalP1Counter < finalP2Counter) {
      containerArray[5].style.display = "block";
      wrapperGrid.style.display = "none";
      ultimateWinnerName.innerText = playerTwoName;
     

    }

    // console.log("Game Over");
    playAgainBtn.addEventListener("click", () => {
      location.reload();
    });

  }


  let cellArray = [];

  if(window.innerWidth > 450) {

    loadGrid();

    bombNumber = Math.ceil(Math.random() * 81);   // Gives a random number between and including 1-81


    for(let i = 1; i <= 81; i++) {



      let newCell = document.createElement("div");
      newCell.style.width = "50px";
      newCell.style.height = "50px";
      newCell.classList.add(`wrap-${i}`);
      newCell.classList.add(`wrap`);
      let newSpan = document.createElement("span");
      newSpan.classList.add(`wrap-1-${i}`);
      newSpan.classList.add(`w-content`);
      newSpan.innerText = i;


      newCell.style.color = "#051d41";
      newCell.style.backgroundColor = "#ffc30b";

      cellArray.push(newCell);
      newCell.appendChild(newSpan);
      wrapperGrid.appendChild(newCell);



      // addBtn.removeEventListener("click", addCell);
    }



    // for(let i = 0; i < cellArray.length; i++) {

    //   cellArray[i].addEventListener("click", clickedCell);



    //   function clickedCell() {
    //     cellArray[i].style.backgroundColor = "#666a6d";
    //     cellArray[i].style.color = "#fff";
    //     cellArray[i].removeEventListener("click", clickedCell);
    //   }
    


    // }



  } else if(window.innerWidth < 450)  {

    loadGrid();


    bombNumber = Math.ceil(Math.random() * 36);   // Gives a random number between and including 1-36


    for(let i = 1; i <= 36; i++) {

      



      let newCell = document.createElement("div");
      newCell.style.width = "50px";
      newCell.style.height = "50px";
      newCell.classList.add(`wrap-${i}`);
      newCell.classList.add(`wrap`);
      let newSpan = document.createElement("span");
      newSpan.classList.add(`wrap-1-${i}`);
      newSpan.classList.add(`w-content`);
      newSpan.innerText = i;
    
      // newCell.style.border = "1px solid #fff";
      newCell.style.color = "#051d41";
      newCell.style.backgroundColor = "#ffc30b";
      cellArray.push(newCell);
      newCell.appendChild(newSpan);
      wrapperGrid.appendChild(newCell);
      // addBtn.removeEventListener("click", addCell);
      // Event listener hatane se pehle color diffuse kr de uss cell ka -- taa ke pata lagay kon se khel liye hen

    }



  }

  

function loadGrid() {

  containerArray[3].style.display = "none";
  
  }

  gameLogic(cellArray);

return cellArray;




}








function gameLogic(arr) {



/*

  Player Turns and Symbol Placement




*/



  


let randomTurnNumber = (Math.floor(Math.random() * 10)) % 2;    // To generate either 0 or 1
let winnerName = document.getElementById("winner-name");
let redoBtn = document.getElementsByClassName("fa-redo-alt")[0];






for(let i = 0; i < arr.length; i++) {

arr[i].addEventListener("click", clickedCell);

arr[i].addEventListener("mouseover", changeColor);
arr[i].addEventListener("mouseout", revertColor);

function changeColor() {

  arr[i].style.transform = "scale(1.1)";
  arr[i].style.transitionDuration = "0.1s";
  arr[i].style.backgroundColor = "#ff0800";
  arr[i].style.color = "#fff";

}

function revertColor() {


  arr[i].style.transform = "none";
  arr[i].style.transitionDuration = "0.1s";    
  arr[i].style.backgroundColor = "#ffc30b";
  arr[i].style.color = "#051d41";

  


}

function clickedCell() {
  



  if(randomTurnNumber == 0) {



  arr[i].removeEventListener("mouseover", changeColor);
  arr[i].removeEventListener("mouseout", revertColor);
  arr[i].style.transform = "none";
  arr[i].style.backgroundColor = "#666a6d";
  arr[i].style.color = "#fff";
  arr[i].removeEventListener("click", clickedCell);




    if(arr[i].innerText == bombNumber) {

      // console.log(`${playerTwoName} wins.`);
      containerArray[4].style.display = "block";
      wrapperGrid.style.display = "none";
      finalP2Counter++;

      p1StreakArray[leaderBoardCounter].innerText = "0";
      p2StreakArray[leaderBoardCounter].innerText = "1";
      wrapperOne.style.backgroundImage = "url('https://i.giphy.com/media/HhTXt43pk1I1W/giphy.webp')";
      wrapperOne.style.backgroundRepeat = "no-repeat";
      wrapperOne.style.backgroundSize = "100vw 100vh";


      boomSound.play();
      winnerName.innerText = playerTwoName;
      leaderBoardCounter++;


       

        setTimeout(addGrid, 2200);
    
        wrapperGrid.innerText = "";
        wrapperGrid.style.display = "block";
        wrapperGrid.style.display = "grid";

        setTimeout(() => {
         containerArray[4].style.display = "none";
        }, 2000);

        finalP2Counter++;
        // console.log("Player 2 wins");
        // console.log(`P2 Counter is ${finalP2Counter}`);

        


 

    

    }

    arr[i].innerText = playerOneSymbol;
    arr[i].style.fontSize = "36px";

    randomTurnNumber++;

  } else if(randomTurnNumber == 1) {

    


  arr[i].removeEventListener("mouseover", changeColor);
  arr[i].removeEventListener("mouseout", revertColor);
  arr[i].style.transform = "none";
  arr[i].style.backgroundColor = "#666a6d";
  arr[i].removeEventListener("click", clickedCell);



  if(arr[i].innerText == bombNumber) {



    containerArray[4].style.display = "block";
    wrapperGrid.style.display = "none";
    finalP1Counter++;

    p1StreakArray[leaderBoardCounter].innerText = "1";
    p2StreakArray[leaderBoardCounter].innerText = "0";
    wrapperOne.style.backgroundImage = "url('https://i.giphy.com/media/HhTXt43pk1I1W/giphy.webp')";
    wrapperOne.style.backgroundRepeat = "no-repeat";
    wrapperOne.style.backgroundSize = "100vw 100vh";

    boomSound.play();
    winnerName.innerText = playerOneName;

    leaderBoardCounter++;

    setTimeout(addGrid, 2200);

    wrapperGrid.innerText = "";
    wrapperGrid.style.display = "block";
    wrapperGrid.style.display = "grid";




    setTimeout(() => {
      containerArray[4].style.display = "none";
     }, 2000);



    finalP1Counter++;
    // console.log("player 1 wins");
    // console.log(`P1 Counter is ${finalP1Counter}`);



  }

  arr[i].innerText = playerTwoSymbol;
    arr[i].style.fontSize = "36px";

  randomTurnNumber--;

  }
}





}









}














