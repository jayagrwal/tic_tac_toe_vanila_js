var board, blocks;
 
var otherguy = false; // A variable for if condition.
 
 
function switchMove(){ //A Function for printing "X" & "O"
    var character; // A variable for storing character "X" & "O"
 
 
    if (otherguy) { // If else condition for Switching Move.
        otherguy= false;
        character="O"   
    }
    else{
        otherguy= true;
        character="X"
    }
    this.innerHTML ="<h1>"+character+"</h1>"; //'this' will return the DOM object and changes its content.

    var currentId = this.id; // A variable for storing Id of the Html element returned by 'this'.
    board [currentId] = character;  // Pushing characters in our Array

    this.removeEventListener("click", switchMove,false); // Remove listener as character is printed.
    checkForWinner(); // check the winner.
}
 
function blocksLeft(){   // A Function for checking number of blocks if empty.
    var blocks_left = false; // flag
    for (var i=0; i<9 ; i++){ // A 'For' loop for checking all the blocks.
        if(board[i] == undefined){
                        blocks_left = true
        }
    }
    return blocks_left;
}
 
function theWinner(result){ // A function for displaying result on our html page.
    document.getElementById("winis").innerHTML = "We have a "+result+"!!"
}
 
function getRandomColor(){ // A function for getting random color.//stackoverflow.com
    var brightness = 3;
    // Six levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
}
 
function highlightWinner(pattern){ //A function for highlighting the winner pattern.
                var winning_clr = getRandomColor();  // A variable for storing the random color.
 
                pattern.forEach(function(box){  // As pattern is an our array we need to use forEach method of array for changing background by our random color function.
                 document.getElementById(box).style.backgroundColor = winning_clr;
                })
 
                return winning_clr;
}
 
function resetGame (){
    board = []; //An Empty Array for collecting input of characters.
    blocks = document.getElementsByClassName("square"); // A variable for storing html Elements by their class name.
     
    for (var i=0; i < 9; i++) // For loop for adding Event Listener on all the 9 Blocks.
    {
        var block = blocks[i];
        block.innerHTML = ''
        block.style.backgroundColor = 'white'
        block.addEventListener("click", switchMove,false);
    };
    
    document.getElementById("winis").innerHTML = ''
}

function checkForWinner(){ //A function for checking Winner and returning result to theWinner function.
    var index = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]] //A variable for storing winning patterns
    var winner = false; // flag
    index.forEach(function(pattern){ // A forEach method for placing the pattern on the index of the board array
        var currentPatternValues = [board[pattern[0]],board[pattern[1]],board[pattern[2]]];

        // A 'if' condition for checking whether the first character is equal to second character and the second character is equal to third character and none of these should be undefined.
        if (currentPatternValues[0]==currentPatternValues[1]&&currentPatternValues[1]==currentPatternValues[2]&&currentPatternValues[0]!=undefined){
            highlightWinner(pattern)
            theWinner("Winner")
            winner = true;
            stopGame();
        }
    })
    var moves_left = blocksLeft (); // A variable for storing function to check the blocks left to fill.
    //A 'if' condition for checking if the blocks are full and there is no winning pattern then send a 'Tie' argument to theWinner function.
    if (moves_left == false && winner == false)
    {
                    theWinner("Tie")
                }
}
 
function stopGame () { 
    for (var i=0; i < 9; i++){ //For loop for removing the event listener in from the blocks as the winner is declared.
        var block = blocks[i];
        block.removeEventListener("click", switchMove,false)
    }
}

//start game
resetGame()
document.getElementById("btn").addEventListener("click",resetGame,false);