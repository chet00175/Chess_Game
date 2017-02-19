// All possible chess pieces.
var CHESS_PIECES = { WHITE_PAWN : "WHITE_PAWN", WHITE_BISHOP : "WHITE_BISHOP", WHITE_KNIGHT : "WHITE_KNIGHT", WHITE_ROOK : "WHITE_ROOK", WHITE_KING : "WHITE_KING", WHITE_QUEEN : "WHITE_QUEEN",
	BLACK_PAWN : "BLACK_PAWN", BLACK_BISHOP : "BLACK_BISHOP", BLACK_KNIGHT : "BLACK_KNIGHT", BLACK_ROOK : "BLACK_ROOK", BLACK_KING : "BLACK_KING", BLACK_QUEEN : "BLACK_QUEEN" };


// The chess piece that the user currently selected. By default value is no_piece.
var selectedPiece = "no_piece";

// The current turn.
var turn = "WHITE";


// Declaring global variables to keep track of the position of the kings on the board.
var whiteKingPos;
var blackKingPos;




// Representing position on the board.
function BoardPosition(x, y) {
	this.x = x;
	this.y = y;
}

function createBoard() {
	var table = $("<table id='' cellspacing='0' cellpadding='0'></table>"); // might need cellspacing and cellpadding set to 0

	// Colours for the squares on the chess board.
	var black_square = "#3aaf3c";
	var white_square = "#e8d5a9";

	var colour = white_square;

	// Create first row containing the letter labels:
	var labelRow = $("<tr></tr>");
	var empty = $("<td></td>")
	$(labelRow).append(empty);
	var letters = "ABCDEFGH";
	for(var i = 0; i < letters.length; i++) {
		// Create label element in front marking the rows:
		var colLabel = $("<td></td>");
		$(colLabel).css('height',25);
		$(colLabel).css('textAlign','center');
		$(labelRow).append(colLabel);
		$(colLabel).html(letters[i]);
	}

	$(table).append(labelRow);
	
	// Creating table cells to represent the squares in the chess board. 64 in total.
	for(var i = 8; i >= 1; i--) {
		var row = $("<tr></tr>");
		
		// Create label element in front marking the rows:
		var rowLabel = $("<td></td>");
		$(rowLabel).css('width',25);
		$(row).append(rowLabel);
		$(rowLabel).html(i);
		
		for(var j = 1; j <= 8 ; j++) {
			var cell = $("<td></td>");
			$(cell).attr('id',i + '' + j);
			$(cell).attr('class','cell');
			$(cell).css('backgroundColor',colour);
			$(cell).css('width',100);
			$(cell).css('height',100);
			$(cell).css('textAlign', 'center'); // Ensure chess pieces are on the centre of the square.
			$(cell).data('piece', 'empty'); // indicates that the cell currently has no chess piece in it.
			$(cell).data('position', new BoardPosition(j,i));
			$(cell).data('backgroundColor', colour);
			
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

		// Create label element in front marking the rows:
		var rowLabel = $("<td></td>");
		$(rowLabel).css('width',25);
		$(rowLabel).css('textAlign','right');
		$(row).append(rowLabel);
		$(rowLabel).html(i);
	}

	// Create last row containing the letter labels:
	var labelRow = $("<tr></tr>");
	var empty = $("<td></td>")
	$(labelRow).append(empty);
	var letters = "ABCDEFGH";
	for(var i = 0; i < letters.length; i++) {
		// Create label element in front marking the rows:
		var colLabel = $("<td></td>");
		$(colLabel).css('height',25);
		$(colLabel).css('textAlign','center');
		$(labelRow).append(colLabel);
		$(colLabel).html(letters[i]);
	}
	
	$(table).append(labelRow);
	
	return table;
}

// Initial placement of chess pieces on the board.
function placePieces() {
	for (var i = 1; i <= 8; i++) {
		$('#2'+i).data('piece',CHESS_PIECES.WHITE_PAWN);
	}

	for (var i = 1; i <= 8; i++) {
		$('#7'+i).data('piece',CHESS_PIECES.BLACK_PAWN);
	}

	// White capital (non-pawn) pieces
	$('#18').data('piece',CHESS_PIECES.WHITE_ROOK);
	$('#11').data('piece',CHESS_PIECES.WHITE_ROOK);
	$('#17').data('piece',CHESS_PIECES.WHITE_KNIGHT);
	$('#12').data('piece',CHESS_PIECES.WHITE_KNIGHT);
	$('#13').data('piece',CHESS_PIECES.WHITE_BISHOP);
	$('#16').data('piece',CHESS_PIECES.WHITE_BISHOP);
	$('#15').data('piece',CHESS_PIECES.WHITE_KING);
	$('#14').data('piece',CHESS_PIECES.WHITE_QUEEN);

	// Black capital (non-pawn) pieces
	$('#88').data('piece',CHESS_PIECES.BLACK_ROOK);
	$('#81').data('piece',CHESS_PIECES.BLACK_ROOK);
	$('#87').data('piece',CHESS_PIECES.BLACK_KNIGHT);
	$('#82').data('piece',CHESS_PIECES.BLACK_KNIGHT);
	$('#83').data('piece',CHESS_PIECES.BLACK_BISHOP);
	$('#86').data('piece',CHESS_PIECES.BLACK_BISHOP);
	$('#85').data('piece',CHESS_PIECES.BLACK_KING);
	$('#84').data('piece',CHESS_PIECES.BLACK_QUEEN);

	whiteKingPos = $('#15').data('position');
	blackKingPos = $('#85').data('position');

	// Draw pieces onto board

	// Piece size:
	var pieceWidth = 50;
	var pieceHeight = 50;

	for (var i = 1; i <= 8; i++) {
		var img = $('<img>');
		img.attr('src', 'images/WHITE_PAWN.ico');
		$(img).width(pieceWidth);
		$(img).height(pieceHeight);
		img.appendTo('#2'+i);
	}

	for (var i = 1; i <= 8; i++) {
		var img = $('<img>');
		img.attr('src', 'images/BLACK_PAWN.ico');
		$(img).width(pieceWidth);
		$(img).height(pieceHeight);
		img.appendTo('#7'+i);
	}

	// White capital (non-pawn) pieces
	var img = $('<img>');
	img.attr('src', 'images/WHITE_ROOK.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#18');
	img = $('<img>');
	img.attr('src', 'images/WHITE_ROOK.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#11');

	img = $('<img>');
	img.attr('src', 'images/WHITE_KNIGHT.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#17');
	img = $('<img>');
	img.attr('src', 'images/WHITE_KNIGHT.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#12');

	img = $('<img>');
	img.attr('src', 'images/WHITE_BISHOP.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#13');
	img = $('<img>');
	img.attr('src', 'images/WHITE_BISHOP.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#16');

	img = $('<img>');
	img.attr('src', 'images/WHITE_KING.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#15');

	img = $('<img>');
	img.attr('src', 'images/WHITE_QUEEN.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#14');

	// Black capital (non-pawn) pieces
	img = $('<img>');
	img.attr('src', 'images/BLACK_ROOK.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#88');
	img = $('<img>');
	img.attr('src', 'images/BLACK_ROOK.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#81');

	img = $('<img>');
	img.attr('src', 'images/BLACK_KNIGHT.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#87');
	img = $('<img>');
	img.attr('src', 'images/BLACK_KNIGHT.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#82');

	img = $('<img>');
	img.attr('src', 'images/BLACK_BISHOP.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#83');
	img = $('<img>');
	img.attr('src', 'images/BLACK_BISHOP.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#86');

	img = $('<img>');
	img.attr('src', 'images/BLACK_KING.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#85');

	img = $('<img>');
	img.attr('src', 'images/BLACK_QUEEN.ico');
	$(img).width(pieceWidth);
	$(img).height(pieceHeight);
	img.appendTo('#84');

	// The click event function for each square on the board.
	$('.cell').click(function(){
		var cellPiece = $(this).data().piece;
		var position = $(this).data().position;

		if (cellPiece === "empty" && selectedPiece === "no_piece") {
			// Don't do anything if the square is empty and no piece has been selected
		}
		else if (cellPiece !== "empty" && selectedPiece === "no_piece") {
			// selecting a piece to move. Ensuring that the chess piece is selected according to the turn.
			if ((turn === "WHITE" && !isWhitePiece(cellPiece)) || (turn === "BLACK" && !isBlackPiece(cellPiece))) {
				alert('Wrong turn');
				return;
			}
			selectedPiece = cellPiece;
			selectedPiecePos = position; // Stores the current position of the selected piece.

			$('#'+selectedPiecePos.y+''+selectedPiecePos.x).css('backgroundColor', '#00FF00'); // highlight the cell
		}
		else if (selectedPiece !== "no_piece" && cellPiece !== "empty") {
			// Select another piece of your own colour.
			if ((isWhitePiece(selectedPiece) && isWhitePiece(cellPiece)) || (isBlackPiece(selectedPiece) && isBlackPiece(cellPiece))) {
				if (typeof selectedPiecePos !== 'undefined') {
					// Remove highlighting if required.	
					$('#'+selectedPiecePos.y+''+selectedPiecePos.x).css('backgroundColor', $('#'+selectedPiecePos.y+''+selectedPiecePos.x).data().backgroundColor);
				}	 

				selectedPiece = cellPiece;
				selectedPiecePos = position; // Stores the current position of the selected piece.

				$('#'+selectedPiecePos.y+''+selectedPiecePos.x).css('backgroundColor', '#00FF00'); // highlight the cell
			}
			else {
				var validMove = movePiece(selectedPiece, selectedPiecePos, position, true); // Determine if the move is a valid one
				if (validMove) {
					$('#'+selectedPiecePos.y+''+selectedPiecePos.x).find('img').remove();
					$('#'+selectedPiecePos.y+''+selectedPiecePos.x).data('piece','empty');
					$('#'+selectedPiecePos.y+''+selectedPiecePos.x).css('backgroundColor', $('#'+selectedPiecePos.y+''+selectedPiecePos.x).data().backgroundColor); // Remove highlighting

					var oldPiece = $('#'+position.y+''+position.x).data().piece;
					$('#'+position.y+''+position.x).data('piece',selectedPiece);
					$('#'+position.y+''+position.x).find('img').attr('src', 'images/' + selectedPiece + '.ico');

					if (selectedPiece === CHESS_PIECES.WHITE_KING) {
						whiteKingPos = position;
					}
					if (selectedPiece === CHESS_PIECES.BLACK_KING) {
						blackKingPos = position;
					}

					// Determine if either the white king or black king has been checkmated.

					if (isWhiteCheckMate()) {
						alert('Checkmate! Black Wins.');
						$('#board').css('pointer-events','none');
						return;
					}

					if (isBlackCheckMate()) {
						alert('Checkmate! White Wins.');
						$('#board').css('pointer-events','none');
						return;
					}

					var whiteCheck = isWhiteCheck(whiteKingPos);
					var blackCheck = isBlackCheck(blackKingPos);
					
					if (whiteCheck) {
						alert('Check');

						if (turn === "WHITE") {
							alert('White king checked! Move again!');
							$('#'+position.y+''+position.x).data('piece',oldPiece);
							$('#'+position.y+''+position.x).find('img').attr('src', 'images/' + oldPiece + '.ico');

							$('#'+selectedPiecePos.y+''+selectedPiecePos.x).data('piece',selectedPiece);
							$('#'+selectedPiecePos.y+''+selectedPiecePos.x).find('img').attr('src', 'images/' + selectedPiece + '.ico');
							selectedPiece = "no_piece";

							if (selectedPiece === CHESS_PIECES.WHITE_KING) {
								whiteKingPos = selectedPiecePos;
							}

							return;
						}
					}
					else if (blackCheck) {
						alert('Check');

						if (turn === "BLACK") {
							alert('Black king checked! Move again!');
							$('#'+position.y+''+position.x).data('piece',oldPiece);
							$('#'+position.y+''+position.x).find('img').attr('src', 'images/' + oldPiece + '.ico');

							$('#'+selectedPiecePos.y+''+selectedPiecePos.x).data('piece',selectedPiece);
							$('#'+selectedPiecePos.y+''+selectedPiecePos.x).find('img').attr('src', 'images/' + selectedPiece + '.ico');

							if (selectedPiece === CHESS_PIECES.BLACK_KING) {
								blackKingPos = selectedPiecePos;
							}

							selectedPiece = "no_piece";
							return;
						}
					}

					turn = turn === "WHITE" ? "BLACK" : "WHITE";

					selectedPiece = "no_piece"; // set selected piece back to no piece again.
				}
				else alert("Cant move");
			}
		}
		else if (selectedPiece !== "no_piece" && cellPiece === "empty") {
			var validMove = movePiece(selectedPiece, selectedPiecePos, position, false);
			if (validMove) {
				$('#'+selectedPiecePos.y+''+selectedPiecePos.x).find('img').remove();
				$('#'+selectedPiecePos.y+''+selectedPiecePos.x).data('piece','empty');
				$('#'+selectedPiecePos.y+''+selectedPiecePos.x).css('backgroundColor', $('#'+selectedPiecePos.y+''+selectedPiecePos.x).data().backgroundColor); // Remove highlighting

				$('#'+position.y+''+position.x).data('piece',selectedPiece);
				var img = $('<img>');
				img.attr('src', 'images/' + selectedPiece + '.ico');
				$(img).width(pieceWidth);
				$(img).height(pieceHeight);
				img.appendTo('#'+position.y+''+position.x);

				if (selectedPiece === CHESS_PIECES.WHITE_KING) {
						whiteKingPos = position;
				}
				if (selectedPiece === CHESS_PIECES.BLACK_KING) {
					blackKingPos = position;
				}

				// Determine if either the white king or black king has been checkmated.

				if (isWhiteCheckMate()) {
					alert('Checkmate! Black Wins.');
					$('#board').css('pointer-events','none');
					return;
				}

				if (isBlackCheckMate()) {
					alert('Checkmate! White Wins.');
					$('#board').css('pointer-events','none');
					return;
				}


				// Determine if either the white king or black king has been checked.

				var whiteCheck = isWhiteCheck(whiteKingPos);
				var blackCheck = isBlackCheck(blackKingPos);
				
				if (whiteCheck) {
					alert('Check');

					if (turn === "WHITE") {
						alert('White king checked! Move again!');

						$('#'+position.y+''+position.x).find('img').remove();
						$('#'+position.y+''+position.x).data('piece','empty');

						$('#'+selectedPiecePos.y+''+selectedPiecePos.x).data('piece',selectedPiece);
						var img = $('<img>');
						img.attr('src', 'images/' + selectedPiece + '.ico');
						$(img).width(pieceWidth);
						$(img).height(pieceHeight);
						img.appendTo('#'+selectedPiecePos.y+''+selectedPiecePos.x);

						if (selectedPiece === CHESS_PIECES.WHITE_KING) {
							whiteKingPos = selectedPiecePos;
						}

						selectedPiece = "no_piece";

						return;
					}
				}
				else if (blackCheck) {
					alert('Check');

					if (turn === "BLACK") {
						alert('Black king checked! Move again!');

						$('#'+position.y+''+position.x).find('img').remove();
						$('#'+position.y+''+position.x).data('piece','empty');

						$('#'+selectedPiecePos.y+''+selectedPiecePos.x).data('piece',selectedPiece);
						var img = $('<img>');
						img.attr('src', 'images/' + selectedPiece + '.ico');
						$(img).width(pieceWidth);
						$(img).height(pieceHeight);
						img.appendTo('#'+selectedPiecePos.y+''+selectedPiecePos.x);

						if (selectedPiece === CHESS_PIECES.BLACK_KING) {
							blackKingPos = selectedPiecePos;
						}

						selectedPiece = "no_piece";

						return;
					}
				}

				turn = turn === "WHITE" ? "BLACK" : "WHITE";

				selectedPiece = "no_piece";
			}
			else alert("Cant move");
		}
	});

}

// Method for determining whether given chess piece move is valid. 
// 'piece' is the given piece to be moved, 'startPos' is the starting position of the piece
// 'endPos' is the position that the piece has to be moved to.
// 'otherPiece' is true if there is another piece at endPos or false otherwise.
function movePiece(piece, startPos, endPos, otherPiece) {
	if (piece === CHESS_PIECES.WHITE_PAWN || piece === CHESS_PIECES.BLACK_PAWN) {
		if (otherPiece === true) {
			if (isWhitePiece(piece)) {
				if (endPos.y === startPos.y + 1 && (startPos.x+1 === endPos.x || startPos.x-1 === endPos.x)) return true;
			}
			else {
				if (endPos.y === startPos.y - 1 && (startPos.x+1 === endPos.x || startPos.x-1 === endPos.x)) return true;
			}
		}
		else {
			if (isWhitePiece(piece)) {
				if (startPos.y === 2 && endPos.y === 4 && startPos.x === endPos.x) return true;
				else if (endPos.y === startPos.y + 1 && startPos.x === endPos.x) return true;
			}
			else {
				if (startPos.y === 7 && endPos.y === 5 && startPos.x === endPos.x) return true;
				else if (endPos.y === startPos.y - 1 && startPos.x === endPos.x) return true;
			}
		}
	}
	else if (piece === CHESS_PIECES.WHITE_KING || piece === CHESS_PIECES.BLACK_KING) {
		if ((Math.abs(startPos.x - endPos.x) === 1 && startPos.y - endPos.y === 0) || (Math.abs(startPos.y - endPos.y) === 1 && startPos.x - endPos.x === 0) 
			|| (Math.abs(startPos.y - endPos.y) === 1 && Math.abs(startPos.x - endPos.x) === 1)) return true;
	}
	else if (piece === CHESS_PIECES.WHITE_KNIGHT || piece === CHESS_PIECES.BLACK_KNIGHT) {
		if ((Math.abs(startPos.y - endPos.y) === 2 && Math.abs(startPos.x - endPos.x) === 1) || (Math.abs(startPos.y - endPos.y) === 1 && Math.abs(startPos.x - endPos.x) === 2)) return true;
	}
	else if (piece === CHESS_PIECES.WHITE_ROOK || piece === CHESS_PIECES.BLACK_ROOK) {
		if ((startPos.x === endPos.x || startPos.y === endPos.y)  && checkPath("rook", startPos, endPos)) return true;
	}
	else if (piece === CHESS_PIECES.WHITE_BISHOP || piece === CHESS_PIECES.BLACK_BISHOP) {
		if ((Math.abs(startPos.y - endPos.y) === Math.abs(startPos.x - endPos.x)) && checkPath("bishop", startPos, endPos)) return true;
	}
	else if (piece === CHESS_PIECES.WHITE_QUEEN || piece === CHESS_PIECES.BLACK_QUEEN) {
		if (movePiece(CHESS_PIECES.WHITE_ROOK, startPos, endPos, otherPiece) || movePiece(CHESS_PIECES.WHITE_BISHOP, startPos, endPos, otherPiece)) return true;
	}

	return false;
}

// Check if any pieces come in the path of a rook, queen or bishop while making a move.
function checkPath(type, start, end) {
	if (type === "rook") {
		if (start.x === end.x) {
			if (end.y > start.y) {
				for (i = start.y+1; i < end.y; i++) {
					var isPiece = $('#'+i+''+start.x).data().piece === "empty" ? false : true;
					if (isPiece) return false;
				}
			}
			else {
				for (i = start.y-1; i > end.y; i--) {
					var isPiece = $('#'+i+''+start.x).data().piece === "empty" ? false : true;
					if (isPiece) return false;
				}
			}
		}
		else {
			if (end.x > start.x) {
				for (i = start.x+1; i < end.x; i++) {
					var isPiece = $('#'+start.y+''+i).data().piece === "empty" ? false : true;
					if (isPiece) return false;
				}
			}
			else {
				for (i = start.x-1; i > end.x; i--) {
					var isPiece = $('#'+start.y+''+i).data().piece === "empty" ? false : true;
					if (isPiece) return false;
				}
			}
		}
	}
	else if (type === "bishop") {
		if (end.x > start.x && end.y > start.y) {
			var j = start.y+1;
			for (i = start.x+1; i < end.x; i++) {
				var isPiece = $('#'+j+''+i).data().piece === "empty" ? false : true;
				if (isPiece) return false;
				j++;
			}
		}
		else if (end.x > start.x && end.y < start.y) {
			var j = start.y-1;
			for (i = start.x+1; i < end.x; i++) {
				var isPiece = $('#'+j+''+i).data().piece === "empty" ? false : true;
				if (isPiece) return false;
				j--;
			}
		}
		else if (end.x < start.x && end.y > start.y) {
			var j = start.y+1;
			for (i = start.x-1; i > end.x; i--) {
				var isPiece = $('#'+j+''+i).data().piece === "empty" ? false : true;
				if (isPiece) return false;
				j++;
			}
		}
		else {
			var j = start.y-1;
			for (i = start.x-1; i > end.x; i--) {
				var isPiece = $('#'+j+''+i).data().piece === "empty" ? false : true;
				if (isPiece) return false;
				j--;
			}
		}
	}

	return true;
}

function isWhiteCheck(pos) {
	// First check pawns
	if ($('#'+(pos.y+1)+''+(pos.x+1)).data('piece') === CHESS_PIECES.BLACK_PAWN || $('#'+(pos.y+1)+''+(pos.x-1)).data('piece') === CHESS_PIECES.BLACK_PAWN) {
		return true;
	}

	// Checking for opponent's rook or queen on left, right, straight and back directions.

	for (i = pos.y+1; i <= 8; i++) {
		var piece = $('#'+i+''+pos.x).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_ROOK || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}
	for (i = pos.y-1; i >= 1; i--) {
		var piece = $('#'+i+''+pos.x).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_ROOK || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}
	for (i = pos.x+1; i <= 8; i++) {
		var piece = $('#'+pos.y+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_ROOK || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}
	for (i = pos.x-1; i >= 1; i--) {
		var piece = $('#'+pos.y+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_ROOK || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}

	// Checking for opponent's bishop or queen on left, right, straight and back directions.

	var j = pos.y+1;
	for (i = pos.x+1; i <= 8 && j <= 8; i++) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_BISHOP || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j += 1;
	}
	j = pos.y+1;
	for (i = pos.x-1; i >= 1 && j <= 8; i--) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_BISHOP || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j += 1;
	}
	j = pos.y-1;
	for (i = pos.x-1; i >= 1 && j >= 1; i--) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_BISHOP || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j -= 1;
	}
	j = pos.y-1;
	for (i = pos.x+1; i <= 8 && j >= 1; i++) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.BLACK_BISHOP || piece === CHESS_PIECES.BLACK_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j -= 1;
	}

	// Check for opponent's knight in all directions around the king:
	if ($('#'+(pos.y+2)+''+(pos.x+1)).data('piece') === CHESS_PIECES.BLACK_KNIGHT || $('#'+(pos.y+2)+''+(pos.x-1)).data('piece') === CHESS_PIECES.BLACK_KNIGHT || 
			$('#'+(pos.y-2)+''+(pos.x+1)).data('piece') === CHESS_PIECES.BLACK_KNIGHT || $('#'+(pos.y-2)+''+(pos.x-1)).data('piece') === CHESS_PIECES.BLACK_KNIGHT ||
			$('#'+(pos.y+1)+''+(pos.x+2)).data('piece') === CHESS_PIECES.BLACK_KNIGHT || $('#'+(pos.y-1)+''+(pos.x+2)).data('piece') === CHESS_PIECES.BLACK_KNIGHT ||
			$('#'+(pos.y+1)+''+(pos.x-2)).data('piece') === CHESS_PIECES.BLACK_KNIGHT || $('#'+(pos.y-1)+''+(pos.x-2)).data('piece') === CHESS_PIECES.BLACK_KNIGHT) {
		return true;
	}

	// Check for opponent's king in all directions around the king:
	if ($('#'+(pos.y+1)+''+(pos.x)).data('piece') === CHESS_PIECES.BLACK_KING || $('#'+(pos.y-1)+''+(pos.x)).data('piece') === CHESS_PIECES.BLACK_KING ||
		$('#'+(pos.y)+''+(pos.x+1)).data('piece') === CHESS_PIECES.BLACK_KING || $('#'+(pos.y)+''+(pos.x-1)).data('piece') === CHESS_PIECES.BLACK_KING || 
		$('#'+(pos.y+1)+''+(pos.x+1)).data('piece') === CHESS_PIECES.BLACK_KING || $('#'+(pos.y+1)+''+(pos.x-1)).data('piece') === CHESS_PIECES.BLACK_KING || 
		$('#'+(pos.y-1)+''+(pos.x-1)).data('piece') === CHESS_PIECES.BLACK_KING || $('#'+(pos.y-1)+''+(pos.x+1)).data('piece') === CHESS_PIECES.BLACK_KING) {
		return true;
	}

	return false;
}

function isBlackCheck(pos) {
	// First check pawns
	if ($('#'+(pos.y-1)+''+(pos.x+1)).data('piece') === CHESS_PIECES.WHITE_PAWN || $('#'+(pos.y-1)+''+(pos.x-1)).data('piece') === CHESS_PIECES.WHITE_PAWN) {
		return true;
	}

	// Checking for opponent's rook or queen on left, right, straight and back directions.

	for (i = pos.y+1; i <= 8; i++) {
		var piece = $('#'+i+''+pos.x).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_ROOK || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}
	for (i = pos.y-1; i >= 1; i--) {
		var piece = $('#'+i+''+pos.x).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_ROOK || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}
	for (i = pos.x+1; i <= 8; i++) {
		var piece = $('#'+pos.y+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_ROOK || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}
	for (i = pos.x-1; i >= 1; i--) {
		var piece = $('#'+pos.y+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_ROOK || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
	}

	// Checking for opponent's bishop or queen on left, right, straight and back directions.

	var j = pos.y+1;
	for (i = pos.x+1; i <= 8 && j <= 8; i++) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_BISHOP || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j += 1;
	}
	j = pos.y+1;
	for (i = pos.x-1; i >= 1 && j <= 8; i--) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_BISHOP || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j += 1;
	}
	j = pos.y-1;
	for (i = pos.x-1; i >= 1 && j >= 1; i--) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_BISHOP || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j -= 1;
	}
	j = pos.y-1;
	for (i = pos.x+1; i <= 8 && j >= 1; i++) {
		var piece = $('#'+j+''+i).data().piece;
		if (piece !== "empty") {
			if (piece === CHESS_PIECES.WHITE_BISHOP || piece === CHESS_PIECES.WHITE_QUEEN) {
				return true;
			}
			else {
				break;
			}
		}
		j -= 1;
	}

	// Check for opponent's knight in all directions around the king:
	if ($('#'+(pos.y+2)+''+(pos.x+1)).data('piece') === CHESS_PIECES.WHITE_KNIGHT || $('#'+(pos.y+2)+''+(pos.x-1)).data('piece') === CHESS_PIECES.WHITE_KNIGHT || 
			$('#'+(pos.y-2)+''+(pos.x+1)).data('piece') === CHESS_PIECES.WHITE_KNIGHT || $('#'+(pos.y-2)+''+(pos.x-1)).data('piece') === CHESS_PIECES.WHITE_KNIGHT ||
			$('#'+(pos.y+1)+''+(pos.x+2)).data('piece') === CHESS_PIECES.WHITE_KNIGHT || $('#'+(pos.y-1)+''+(pos.x+2)).data('piece') === CHESS_PIECES.WHITE_KNIGHT ||
			$('#'+(pos.y+1)+''+(pos.x-2)).data('piece') === CHESS_PIECES.WHITE_KNIGHT || $('#'+(pos.y-1)+''+(pos.x-2)).data('piece') === CHESS_PIECES.WHITE_KNIGHT) {
		return true;
	}

	// Check for opponent's king in all directions around the king:
	if ($('#'+(pos.y+1)+''+(pos.x)).data('piece') === CHESS_PIECES.WHITE_KING || $('#'+(pos.y-1)+''+(pos.x)).data('piece') === CHESS_PIECES.WHITE_KING ||
		$('#'+(pos.y)+''+(pos.x+1)).data('piece') === CHESS_PIECES.WHITE_KING || $('#'+(pos.y)+''+(pos.x-1)).data('piece') === CHESS_PIECES.WHITE_KING || 
		$('#'+(pos.y+1)+''+(pos.x+1)).data('piece') === CHESS_PIECES.WHITE_KING || $('#'+(pos.y+1)+''+(pos.x-1)).data('piece') === CHESS_PIECES.WHITE_KING || 
		$('#'+(pos.y-1)+''+(pos.x-1)).data('piece') === CHESS_PIECES.WHITE_KING || $('#'+(pos.y-1)+''+(pos.x+1)).data('piece') === CHESS_PIECES.WHITE_KING) {
		return true;
	}

	return false;
}

function isWhiteCheckMate() {
	if (!isWhiteCheck(whiteKingPos)) return false;

	if (whiteKingPos.y+1 <= 8) {
		if ($('#'+(whiteKingPos.y+1)+''+whiteKingPos.x).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y+1, whiteKingPos.x);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	if (whiteKingPos.y-1 >= 1) {
		if ($('#'+(whiteKingPos.y-1)+''+whiteKingPos.x).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y-1, whiteKingPos.x);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	if (whiteKingPos.x+1 <= 8) {
		if ($('#'+whiteKingPos.y+''+(whiteKingPos.x+1)).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y, whiteKingPos.x+1);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	if (whiteKingPos.x-1 >= 1) {
		if ($('#'+whiteKingPos.y+''+(whiteKingPos.x-1)).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y, whiteKingPos.x-1);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	if (whiteKingPos.x+1 <= 8 && whiteKingPos.y+1 <= 8) {
		if ($('#'+(whiteKingPos.y+1)+''+(whiteKingPos.x+1)).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y+1, whiteKingPos.x+1);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	if (whiteKingPos.x-1 >= 1 && whiteKingPos.y+1 <= 8) {
		if ($('#'+(whiteKingPos.y+1)+''+(whiteKingPos.x-1)).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y+1, whiteKingPos.x-1);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	if (whiteKingPos.x-1 >= 1 && whiteKingPos.y-1 >= 1) {
		if ($('#'+(whiteKingPos.y-1)+''+(whiteKingPos.x-1)).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y-1, whiteKingPos.x-1);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	if (whiteKingPos.x+1 >= 1 && whiteKingPos.y-1 >= 1) {
		if ($('#'+(whiteKingPos.y-1)+''+(whiteKingPos.x+1)).data().piece === "empty") {
			var pos = new BoardPosition(whiteKingPos.y-1, whiteKingPos.x+1);
			if (!isWhiteCheck(pos)) return false;
		}
	}

	return true;
}

function isBlackCheckMate() {
	if (!isBlackCheck(blackKingPos)) return false;

	if (blackKingPos.y+1 <= 8) {
		if ($('#'+(blackKingPos.y+1)+''+blackKingPos.x).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y+1, blackKingPos.x);
			if (!isBlackCheck(pos)) return false;
		}
	}

	if (blackKingPos.y-1 >= 1) {
		if ($('#'+(blackKingPos.y-1)+''+blackKingPos.x).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y-1, blackKingPos.x);
			if (!isBlackCheck(pos)) return false;
		}
	}

	if (blackKingPos.x+1 <= 8) {
		if ($('#'+blackKingPos.y+''+(blackKingPos.x+1)).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y, blackKingPos.x+1);
			if (!isBlackCheck(pos)) return false;
		}
	}

	if (blackKingPos.x-1 >= 1) {
		if ($('#'+blackKingPos.y+''+(blackKingPos.x-1)).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y, blackKingPos.x-1);
			if (!isBlackCheck(pos)) return false;
		}
	}

	if (blackKingPos.x+1 <= 8 && blackKingPos.y+1 <= 8) {
		if ($('#'+(blackKingPos.y+1)+''+(blackKingPos.x+1)).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y+1, blackKingPos.x+1);
			if (!isBlackCheck(pos)) return false;
		}
	}

	if (blackKingPos.x-1 >= 1 && blackKingPos.y+1 <= 8) {
		if ($('#'+(blackKingPos.y+1)+''+(blackKingPos.x-1)).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y+1, blackKingPos.x-1);
			if (!isBlackCheck(pos)) return false;
		}
	}

	if (blackKingPos.x-1 >= 1 && blackKingPos.y-1 >= 1) {
		if ($('#'+(blackKingPos.y-1)+''+(blackKingPos.x-1)).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y-1, blackKingPos.x-1);
			if (!isBlackCheck(pos)) return false;
		}
	}

	if (blackKingPos.x+1 >= 1 && blackKingPos.y-1 >= 1) {
		if ($('#'+(blackKingPos.y-1)+''+(blackKingPos.x+1)).data().piece === "empty") {
			var pos = new BoardPosition(blackKingPos.y-1, blackKingPos.x+1);
			if (!isBlackCheck(pos)) return false;
		}
	}

	return true;
}

// Helper functions to determine if a piece is black or white.

function isWhitePiece(piece) {
	return (piece === CHESS_PIECES.WHITE_PAWN || piece === CHESS_PIECES.WHITE_BISHOP || piece === CHESS_PIECES.WHITE_KNIGHT || piece === CHESS_PIECES.WHITE_QUEEN || piece === CHESS_PIECES.WHITE_KING || piece === CHESS_PIECES.WHITE_ROOK);
}

function isBlackPiece(piece) {
	return (piece === CHESS_PIECES.BLACK_KING || piece === CHESS_PIECES.BLACK_PAWN || piece === CHESS_PIECES.BLACK_QUEEN || piece === CHESS_PIECES.BLACK_BISHOP || piece === CHESS_PIECES.BLACK_KNIGHT || piece === CHESS_PIECES.BLACK_ROOK);
}


function initGame() {	
	// create chess board
	var table = createBoard();
	$('#board').append(table);

	// initial setup, place white and black pieces
	placePieces();
}