const $form = $("form");
const $setGame = $("input[name='setgame']");
const $start = $("input[name='start']");
const $solve = $("input[name='solve']");
const $timer = $("input[name='timer']");
const $point = $("#point")
const $time = $("#time")

let boardArray 
let solutionArray 
let score = 0;
let timeCount = 0
let intervalId

     $setGame.on("click", function(event) {
        event.preventDefault(); // Prevent form submission
              
          $.ajax("https://sudoku-api.vercel.app/api/dosuku") 
              .then((data) => {
                 boardArray = data.newboard.grids[0].value;
                 solutionArray = data.newboard.grids[0].solution;
           
                console.log(boardArray);
                console.log(solutionArray)
                
                createGrid();
                createNum();
                removeSetgameButton();

                $start.on("click", function(event) {
                  event.preventDefault()
                  
                  callingBoard()
                  addClickHandlers();
                  timer()

                });

                $solve.on("click", function(event) {
                  event.preventDefault()
                  
                  callingSolution()
                  addClickHandlers();
                  stopTimer()
                  
                });
                


              })  
              .catch((error) => {
                console.error('Error:', error);
              });  
            });  
            


           


     // create 9*9 grid
 function createGrid() {
   for (let i = 0; i < 9; i++) {
     for (let j = 0; j < 9; j++) {
      let grid = document.createElement("div");
      grid.id = i.toString() + "-" + j.toString();
      grid.classList.add("grid");
      document.getElementById("board-base").append(grid);
      
      if(i == 2 || i == 5){
        grid.classList.add("horizontal-line");
      }
      if(j == 2 || j == 5){
        grid.classList.add("vertical-line");  
      }
      
    }
  }
}
// get and add number from API to set up the board
function callingBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let gridId = i.toString() + "-" + j.toString();
      let cellValue = boardArray[i][j];

      if (cellValue !== 0) {
        let cellElement = document.getElementById(gridId);
        cellElement.textContent = cellValue;
          cellElement.classList.add("cellElement-background");
          cellElement.classList.remove("grid");

      }
    }
  }
}

// get solution of the game
function callingSolution() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let gridId = i.toString() + "-" + j.toString();
      let cellValue = solutionArray[i][j];

      if (cellValue !== 0) {
        let cellElement = document.getElementById(gridId);
        cellElement.textContent = cellValue;
          cellElement.classList.add("cellElement-background");
          cellElement.classList.remove("grid");

      }
    }
  }
}



// create Number 1-9 to put in the grid
function createNum(){
  for(let i = 1; i <= 9; i++){
    
    let num = document.createElement("div")
    num.id = i.toString()
    num.classList.add("num")
    document.getElementById("board-base").append(num);
    
    let numValue = i
    document.getElementById(num.id).textContent = numValue
  }
}


function addClickHandlers() {
  
  $(".grid").click(function() {
    const selectedGrid = $(this); //sudoku box that I click on
    const selectedValue = $(".selected").attr("id"); // to get id of the selected class which is number
    //button selected at the bottom attr is the thing that I get from the object in this case is id
    
    console.log(selectedGrid.attr("id"))
    let selectedGridId = selectedGrid.attr("id")
    let A = selectedGridId.slice(0, 1)
    let B = selectedGridId.slice(2)

    // let C = selectedValue.toString()
    // console.log(A);
    // console.log(B);
    // console.log(C);
    console.log(solutionArray[A][B],selectedValue)


    // console.log(solutionArray[i][j],selectedValue)
    //i and j should be the id(0-1 or 1-1) from selected grid
 
    if (selectedValue) { //take id of number and add it into a grid 
      const value = selectedValue.slice(0, 1);
      selectedGrid.text(value);
    } else {
      selectedGrid.text("");
      
      
    }
      // compare value of grid and solution 
      if(selectedValue == solutionArray[A][B]){

        score = score
        selectedGrid.removeClass("grid").addClass("correct");
        // selectedGridId.removeClass("grid")
        // selectedGridId.addClass("cellElement-background")
      }else{
        
        score = score +1
      }

      $point.empty(score)
      $point.append(score)


  });
  // on click class with num it will remove the previous selected class and add the new one
  $(".num").click(function() {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
  });
  
  
}
// time count up
function timer() {
  intervalId = setInterval(() => {
    console.log(timeCount);
    timeCount++;
    $time.empty().append(timeCount);
  }, 1000);
}
// stop time count up
function stopTimer() {
  clearInterval(intervalId);
  timeCount = 0; // Reset the timer value
  // $time.empty().append(timerrr);
}
// remove setgame button
function removeSetgameButton(){
    $setGame.remove()
}

