/*
Sean Diaz
sean_diaz@student.uml.edu
GUI Programming HW5 
*/
// Parsing the JSON data
const tileData = {
    "pieces": [
        {"letter":"A", "value":1, "amount":9},
        {"letter":"B", "value":3, "amount":2},
        {"letter":"C", "value":3, "amount":2},
        {"letter":"D", "value":2, "amount":4},
        {"letter":"E", "value":1, "amount":12},
        {"letter":"F", "value":4, "amount":2},
        {"letter":"G", "value":2, "amount":3},
        {"letter":"H", "value":4, "amount":2},
        {"letter":"I", "value":1, "amount":9},
        {"letter":"J", "value":8, "amount":1},
        {"letter":"K", "value":5, "amount":1},
        {"letter":"L", "value":1, "amount":4},
        {"letter":"M", "value":3, "amount":2},
        {"letter":"N", "value":1, "amount":5},
        {"letter":"O", "value":1, "amount":8},
        {"letter":"P", "value":3, "amount":2},
        {"letter":"Q", "value":10, "amount":1},
        {"letter":"R", "value":1, "amount":6},
        {"letter":"S", "value":1, "amount":4},
        {"letter":"T", "value":1, "amount":6},
        {"letter":"U", "value":1, "amount":4},
        {"letter":"V", "value":4, "amount":2},
        {"letter":"W", "value":4, "amount":2},
        {"letter":"X", "value":8, "amount":1},
        {"letter":"Y", "value":4, "amount":2},
        {"letter":"Z", "value":10, "amount":1}
    ],
    "creator": "Ramon Meza"
};

// Convert the JSON data into a usable array for da tiles  
const tileDistribution = []; // Initialize an empty array to hold the tile distribution
tileData.pieces.forEach(piece => { // Iterate over each piece of tile data from tileData.pieces
    for (let i = 0; i < piece.amount; i++) {
        tileDistribution.push({ letter: piece.letter, value: piece.value }); // Each tile has a letter and a value
    } //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
});
function getTileImage(letter) {
    return `Scrabble_Tiles/Scrabble_Tile_${letter}.jpg`;
}
function getRandomTiles(count) {
    const tiles = [];
    for (let i = 0; i < count; i++) {
        const tile = tileDistribution[Math.floor(Math.random() * tileDistribution.length)];
        tiles.push(tile);
    }
    return tiles;
}
