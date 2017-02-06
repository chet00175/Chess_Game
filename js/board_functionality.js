function createBoard() {
	var table = $("<table id='' cellspacing='0' cellpadding='0'></table>"); // might need cellspacing and cellpadding set to 0

	// Colours for the squares on the chess board.
	var black_square = "#3aaf3c";
	var white_square = "#e8d5a9";

	var colour = white_square;
	
	// Creating table cells to represent the squares in the chess board. 64 in total.
	for(var i = 8; i >= 1; i--) {
		var row = $("<tr></tr>");
		
		// Create row element
		
		for(var j = 1; j <= 8 ; j++) {
			var cell = $("<td></td>");
			$(cell).attr('id',i + '' + j);
			$(cell).attr('class','cell');
			$(cell).css('backgroundColor',colour);
			$(cell).css('width',100);
			$(cell).css('height',100);
			$(cell).data('piece', 'empty'); // indicates that the cell currently has no chess piece in it.
			
			$(row).append(cell);
			// Switch between square colours on the board.
			if (colour === white_square) {
				colour = black_square;
			}
			else {
				colour = white_square;
			}
		}		
		$(table).append(row);

		if (colour === white_square) {
				colour = black_square;
			}
			else {
				colour = white_square;
			}
	}
	
	return table;
}


function initGame() {	
	// create chess board
	var table = createBoard();
	$('#board').append(table);
	
}