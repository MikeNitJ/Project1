const $form = $("form");
const $start = $("input[name='start']");
const $result = $("input[name='result']");
const $solution = $("input[name='solution']");
const $timer = $("input[name='timer']");
const $point = $("#point")
const $time = $("#time")

let boardArray 
let solutionArray 
let score = 0;
let seconds = 0;
let minutes = 0;
let timerrr = 0
let intervalId

     $start.on("click", function(event) {
        event.preventDefault(); // Prevent form submission
              
          $.ajax("https://sudoku-api.vercel.app/api/dosuku")
              .then((data) => {
                 boardArray = data.newboard.grids[0].value;
                 solutionArray = data.newboard.grids[0].solution;
           
                console.log(boardArray);
                console.log(solutionArray)
                
                createGrid();
                // callingBoard(boardArray)
                createNum();
                // addClickHandlers(); ตรงนี้ย้ายไปข้างล่างทำให้ฟังชันทำงาน ถาม?



                // $result.on("click", function(event) {
                //   event.preventDefault();
                  
                //   if (boardArray) {
                //     callingBoard();
                //   } else {
                //     console.log("Start button not clicked yet");
                //   }
                // });

                $result.on("click", function(event) {
                  event.preventDefault()
                  
                  callingBoard()
                  addClickHandlers();
                  timer()

                  

                });

                $solution.on("click", function(event) {
                  event.preventDefault()
                  
                  callingSolution()
                  addClickHandlers();
                  
                });
                
                $timer.on("click", function(event) {
                  event.preventDefault()
                  stopTimer()
                });

              })  
              .catch((error) => {
                console.error('Error:', error);
              });  
            });  
            


           


     // on click generate 9*9 grid
 function createGrid() {
   for (let i = 0; i < 9; i++) {
     for (let j = 0; j < 9; j++) {
      let grid = document.createElement("div");
      grid.id = i.toString() + "-" + j.toString();
      grid.classList.add("grid");
      document.getElementById("board-base").append(grid);

      
    }
  }
}

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



// generate Number 1-9 to put in the grid
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
    const selectedValue = $(".selected").attr("id"); //button selected at the bottom attr is the thing that I get from the object in this case is id
    
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
    // อาจจะต้องใช้splice แยก0-0ออก แล้วเอา0ไปใส่iกับj
    // 
    
    if (selectedValue) {
      const value = selectedValue.slice(0, 1);
      selectedGrid.text(value);
    } else {
      selectedGrid.text("");
      
      
    }
      
      if(selectedValue == solutionArray[A][B]){

        score = score 
        
      }else{
        
        score = score +1
      }


      $point.empty(score)
      $point.append(score)



  });
  
  $(".num").click(function() {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
  });
  
  
}

// function timer(){
//   seconds++;
//   if (seconds == 60){
//     seconds = 0;
//     minutes++;
//     if(minutes == 60){
//       minutes = 0;
//     }
//   }


// }

function timer() {
  intervalId = setInterval(() => {
    console.log(timerrr);
    timerrr++;
    $time.empty().append(timerrr);
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  timerrr = 0; // Reset the timer value
  // $time.empty().append(timerrr);
}