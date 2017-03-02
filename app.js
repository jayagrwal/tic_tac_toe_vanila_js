var game_board = []
// maintain turn of player 1  & 2.
var otherguy = false;

function userInput()
{
	var character; // Character to be printed
	if(otherguy) 
	{
		otherguy = false; // next turn of player 1
		character = 'O'
	}
	else
	{
		otherguy = true; // next turn of player 2
		character = 'X'
	}
	this.innerHTML="<h1>"+character+"</h1>";
	
  	var current_index = this.id
	game_board[current_index] = character // set the character in the game_board        
		
	this.removeEventListener("click", userInput,false); //ensure one box is filled only once
	checkForWinner() // check winner in each move
};

// get all the boxes with class square
var boxes = document.getElementsByClassName("square");

for (var i = 0 ; i < 9; i++) 
{	
	var box = boxes[i]; 
    box.addEventListener("click",userInput,false); // add click event listener to each box
};

function getRandColor(){ 
	// create array of 3 values between 0-255
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256].map(function(x){ return Math.round(x)})
    return "rgb(" + rgb.join(",") + ")";
}

function highlightWinner(pattern){
	var winnning_clr  = getRandColor(); 

	pattern.forEach(function(box){
		document.getElementById(box).style.backgroundColor = winnning_clr // show the winning row in winning color
	}) 
 
	document.getElementById('announce').innerHTML = "We have a winnner" // Announce winner

}

function checkForWinner(){
	// Array of all possible winning combinations
	var linear_indexes = [
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,4,8],
		[2,4,6]
	]

	linear_indexes.forEach(function(pattern){
		// get value of all the indexes in the current pattern
		// eg: pattern = [0,3,6]
		// then we will get values on index 0,3,6 from game_board array
		var current_pattern_values = [game_board[pattern[0]], game_board[pattern[1]], game_board[pattern[2]]]

		// check if all values in the current pattern are non-empty and of the same pattern
		if (current_pattern_values[0]==current_pattern_values[1]&&current_pattern_values[1]==current_pattern_values[2]&&current_pattern_values[0]!=undefined) {
			highlightWinner(pattern) // we have a winner
		}
	}) 
}

