/*
Sean Diaz
sean_diaz@student.uml.edu
GUI Programming HW5 

Hi Nuno and/or professor Zhou! I wanted to thank you for the content for this class. I learned so much especially in this last
homework, In my job I do a decent amount of web develoment, having learned jQuery, I know now the extent of what I can do is infinite with
web development

Thanks for everything I look forward to GUI 2 because I really want to learn react more and I know that class will only set me up for more success
one of my favorite classes so far at UML!

P.S I wanted to do the extra credit but even doing this took me almost two weeks...

some sources :
https://www.youtube.com/watch?v=LynjytfeY4U&ab_channel=Telusko
https://www.youtube.com/watch?v=NH7zLC3yC6Q&list=PLdE8ESr9Th_uPD8DDjeRyN7-BxGGGK6bO&ab_channel=ChidresTechTutorials --this whole playlist
https://www.w3schools.com/jquery/traversing_filter.asp

*/
$(document).ready(function() {
    function initBoard() { 
        $('#scrabble-board').empty(); //select the board html and remove teh children
        for (let i = 0; i < 15; i++) { // make 15 board squaresss
            const square = $('<div></div>').addClass('board-square').data('index', i).css({left: `${i * 50}px` }); // make a new div element and make sure that have the board square class so we can detect it later
            // we need to have the .css because each square acts as a droppable area where players can place their tiles. To makesure that tiles can be dropped onto specific positions on the board, each square needs to be positioned.
            $('#scrabble-board').append(square); // add it to the board 
        }
        $('.board-square').droppable({ //Selects all elements with the class and makes dems droppable
            accept: ".tile", // https://stackoverflow.com/questions/1444469/jquery-droppable-accept -- this super confused me so thank you for stack overflow 
            drop: function(event, ui) { // basically when drop do dis -->>>
                const index = $(this).data('index');
                if ($(this).data('tile')) { // check if tile is there already...so we dont have that bug again Sean !! 6/25/24
                    ui.draggable.draggable('option', 'revert', true); // is set to revert to its original position
                } 
                else if (canPlaceTile(index)) { //function in here is for the games rules that we forgot to friggin add..tiles have to be next to each other unless its the first
                    const tile = ui.helper.data('tile'); //from Jquery UI lets you follow the image on the mouse
                    const tileImage = $('<img>').attr('src', getTileImage(tile.letter)); //getTileImage will connect the image to thee right letter (hopefully when its done)
                    tileImage.addClass('tile-img');
                    $(this).append(tileImage).data('tile', tile); // https://www.geeksforgeeks.org/difference-between-this-and-this-in-jquery/
                    ui.helper.remove(); // removes the original dragged element 
                    calculateScore(); // eventually we need to fix this before submit *********
                } 
                else {
                    ui.draggable.draggable('option', 'revert', true); // If the tile cannot be placed according to the game's rules (canPlaceTile(index) returns false)
                }
            }
        });
    }
    const bonusSquares = {
        2: 'double-word',
        6: 'double-letter',
        8: 'double-letter', // specificy the locations of them squares, treating the board like an array
        12: 'double-word'
    };
    function initRack() {
        const tiles = getRandomTiles(7);
        $('#tile-rack').empty(); // clear any existing tiles that may be there 
        tiles.forEach(tile => {   // Loop through each tile and create tile elements
            const tileDiv = $('<div></div>').addClass('tile').data('tile', tile);
            const tileImg = $('<img>').attr('src', getTileImage(tile.letter)).addClass('tile-img');
            tileDiv.append(tileImg);
            $('#tile-rack').append(tileDiv);
            tileDiv.draggable({ // Make the tile draggable
                revert: "invalid"
            });
        });
        
    }

    function canPlaceTile(index) {
        // Check if no tiles have been placed yet
        const firstTilePlaced = $('.board-square').filter(function() { // https://api.jquery.com/filter/
            return $(this).data('tile') !== undefined; // The filter method iterates over each element in the jQuery object and
            // applies the provided callback function to determine if each element should be included in the filtered set.
        }).length === 0; //length returns number of items in the filtered set
    
        // Allow the first tile to be placed anywhere
        if (firstTilePlaced) {
            return true;
        }
        // Check for tiles in adjacent squares without using ternary operators
        let leftTile;
        if (index > 0) {
            leftTile = $('.board-square').eq(index - 1).data('tile');
        } else {
            leftTile = undefined;
        }
    
        let rightTile;
        if (index < 14) { // make sure we aint out of bounds 
            rightTile = $('.board-square').eq(index + 1).data('tile'); // Uses jQuery to select the board square at the position to the right of the current index (index + 1).
        } else {
            rightTile = undefined;
        }
    
        // Allow tile placement if it is adjacent to another tile
        return leftTile !== undefined || rightTile !== undefined;
    }

    function calculateScore() {
        let score = 0;
        let wordMultiplier = 1; // 6/24/24
        $('.board-square').each(function() { // https://api.jquery.com/each/
            const tile = $(this).data('tile');
            const index = $(this).data('index');
            if (tile) {
                if (bonusSquares[index]) {
                    if (bonusSquares[index] === 'double-letter') {
                        score += tile.value * 2; 
                    } else if (bonusSquares[index] === 'double-word') {
                        score += tile.value;
                        wordMultiplier *= 2;
                    }
                } else {
                    score += tile.value;
                }
            }
        });
        score *= wordMultiplier;
        $('#score').text('Score: ' + score); // update the score 
    }

    $('#new-tiles').click(initRack);
    $('#restart').click(function() {
        initBoard();
        initRack();
        $('#score').text('Score: 0');
    });
    initBoard();
    initRack();
    enableDroppable();
});
