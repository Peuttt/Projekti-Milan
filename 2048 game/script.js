
let board;
let score = 0;
let rows = 4;
let columns = 4;

window.onload = () => {
    setGame();
}

function setGame() {
    
    board =  [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    // i -ROWS, j - COLUMNS
    for (let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            let tile = document.createElement('div');
            tile.id = i.toString() + '-' + j.toString();
            let num = board[i][j];
            updateTile(tile, num);
            document.getElementById('board').append(tile);
        } 
    }
    score -= 4;
    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; 
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    let moved = false;
    if(e.code == "ArrowLeft" && hasValidMovesLeft()){
        slideLeft();
        moved = true;
    } else if(e.code == "ArrowRight" && hasValidMovesRight()) {
        slideRight();
        moved = true;
    } else if(e.code == "ArrowUp" && hasValidMovesUp()) {
        slideUp();
        moved = true;
    } else if(e.code == "ArrowDown" && hasValidMovesDown()) {
        slideDown();
        moved = true;
    }

    if(!hasValidMovesUp() && !hasValidMovesDown() && !hasValidMovesLeft() && !hasValidMovesRight()) {
        alert(`You lose, your score was ${score}`);
        score = 0;
        resetBoard();
        score -= 4;
        setTwo();
        setTwo();
        document.getElementById("score").innerText = score;
    }
    if (moved) {
        setTwo();
        document.getElementById("score").innerText = score;
    }
});

function filterZeros(row) {
    return row.filter(num => num != 0);
};

function slide(row){
    row = filterZeros(row);

    for(let i = 0; i < row.length - 1; i++){ // 2 2 2 -> 4 0 2
        if(row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
        }
    }
    row = filterZeros(row);    // 4 0 2 -> 4 2 
    while(row.length < columns) { // 4 2 -> 4 2 0 0
        row.push(0);
    }     
    return row; 
}

function slideLeft() {
    for(let i = 0; i < rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row;
        for(let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + '-' + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let i = 0; i < rows; i++) {
        let row = board[i];        
        row.reverse();              
        row = slide(row)            
        board[i] = row.reverse();  
        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideUp () {
    for (let i = 0; i < columns; i ++){
        let row = [];
        for (let j = 0; j < columns; j ++){
            row[j] = board[j][i];
        }
        row = slide(row);
        for (let j = 0; j < rows; j++){
            board[j][i] = row[j];
            let tile = document.getElementById(j.toString() + "-" + i.toString());
            let num = board[j][i];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let i = 0; i < columns; i ++){
        let row = [];
        for (let j = 0; j < columns; j ++){
            row[j] = board[j][i];
        }
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let j = 0; j < rows; j++){
            board[j][i] = row[j];
            let tile = document.getElementById(j.toString() + "-" + i.toString());
            let num = board[j][i];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
        let found = false;
        let r, c;
        while (!found) {
            r = Math.floor(Math.random() * rows);
            c = Math.floor(Math.random() * columns);
            if (board[r][c] == 0) {
                board[r][c] = 2;
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.innerText = "2";
                tile.classList.add("x2");
                found = true;
            }
        }
        score += 2;
}

function hasValidMovesLeft() {
    for (let i = 0; i < rows; i++) {
        for (let j = 1; j < columns; j++) {
            if (board[i][j] !== 0 && (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function hasValidMovesRight() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns - 1; j++) {
            if (board[i][j] !== 0 && (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function hasValidMovesUp() {
    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (board[i][j] !== 0 && (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function hasValidMovesDown() {
    for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < columns; j++) {
            if (board[i][j] !== 0 && (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j])) {
                return true;
            }
        }
    }
    return false;
}

function resetBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            board[i][j] = 0;
            let tile = document.getElementById(i.toString() + '-' + j.toString());
            updateTile(tile, 0);
        }
    }
}