Sean Diaz 
sean_diaz@student.uml.edu
Wenjin Zhou GUI Programming HW5
https://github.com/SeanPlatinum/HW5
https://seanplatinum.github.io/HW5/
Overall In my opiniion, I satisfied the requirements to the assignment with the following features. The game isn't interesting but it works!
Features:
1. Tile Distribution and Random Tile Selection
Feature: The game uses a predefined distribution of letter tiles, similar to the official Scrabble game.
Implementation:
A tileDistribution array is populated based on the tile data (letter, value, amount).
The getRandomTiles function selects a specified number of random tiles from the tileDistribution array.


3. Draggable Tiles
Feature: Letter tiles can be dragged from the tile rack to the board.
Implementation:
Tiles are draggable using jQuery UI's draggable method.
The revert option is set to invalid, causing tiles to revert to their original position if not dropped on a valid target.


4. Tile Placement Rules
Feature: Ensures tiles can only be placed according to specific rules.
Implementation:
The canPlaceTile function checks if the tile can be placed at the specified index based on game rules.
The first tile can be placed anywhere, but subsequent tiles must be adjacent to an existing tile.
Bonus squares are defined in an object with their indices and types (double-letter, double-word).
The calculateScore function applies these bonuses when computing the score.

5. Score Calculation
Feature: Calculates the score based on the placed tiles and bonus squares.
Implementation:
The calculateScore function iterates over the board squares to compute the total score.
Takes into account double-letter and double-word bonus squares.


6. Restart and New Tiles
Implementation:
The restart button resets the board and tile rack and sets the score to zero.
The new-tiles button generates a new set of random tiles for the rack.
