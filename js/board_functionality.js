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
			$(cell).css('textAlign', 'center'); // Ensure chess pieces are on the centre of the square.
			$(cell).data('piece', 'empty'); // indicates that the cell currently has no chess piece in it.
			$(cell).data('position', new BoardPosition(j,i));
			
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
	});

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