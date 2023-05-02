function Seat(block, row, column, classSeat, passenger) {
    this.block = block;
    this.row = row;
    this.column = column;
    this.classSeat = classSeat;
    this.passenger = passenger;
}

var controller = {
    init: function() {
        let seats = document.getElementById("seats");
        let row, column, block, newSeat, i, j, z;
        let table, tr, td;
        let result = [];
        document.getElementById("button").addEventListener("click", function() {
            let queue = document.getElementById('queue').value;
            let stringRowsColumns = document.getElementById("rowsColumns").value;
            let inputArrayRowsColumns = controller.parseInput(stringRowsColumns);
            result = [];

            view.clearFromDOM(seats); // removing old result
            if (controller.isInputValid(inputArrayRowsColumns, queue) === false) {
                return false
            };
            view.addBackgroundImg();
            controller.sortSeat(inputArrayRowsColumns, result);
            result.sort(controller.comparator('column'));
            result.sort(controller.comparator('classSeat'));

            controller.seatPassengers(result, queue);
            result.sort(controller.comparator('row', 'column', 'block'));
            view.createTableResults(inputArrayRowsColumns, result);
        });
    },

    //get a string from input in the format '[[x,y],[x,y]]' and return an array [[x,y],[x,y]]
    parseInput: function(string) {
        string = string.replace(/\s/g, ''); //remove extra spaces
        string = string.substring(2, string.length - 2); //remove first and last 2 symbol

        let array = string.split("],[").map(function(x) { //transform string to array
            return x.split(",");
        });

        for (i = 0; i < array.length; i++) { //replace strings to numbers
            for (j = 0; j < array[i].length; j++) {
                array[i][j] = parseInt(array[i][j]);
            }
        };
        return array;
    },

    comparator: function(key) {
        return function(a, b) {
            return a[key] - b[key];
        }
    },

    isInputValid: function(arrayRowsColumns, que) {
        if (arrayRowsColumns.length > 8) {
            alert('Too many sections with the rows and columns!');
            document.getElementById("rowsColumns").focus();
            return false;
        }
        for (i = 0; i < arrayRowsColumns.length; i++) {
            for (j = 0; j < arrayRowsColumns[i].length; j++) {
                if (arrayRowsColumns[i][j] < 1 || Number.isNaN(arrayRowsColumns[i][j])) {
                    alert('The rows and columns must be more than 0!');
                    document.getElementById("rowsColumns").focus();
                    return false;
                }
            }
        }
        if (que < 1 || que % 1 != 0) {
            alert('Incorrect input!');
            document.getElementById("queue").focus();
            return false;
        }
    },

    sortSeat: function(inputArray, resultArr) {
        for (block = 1; block <= inputArray.length; block++) {
            for (column = 1; column <= inputArray[block - 1][0]; column++) {
                for (row = 1; row <= inputArray[block - 1][1]; row++) {
                    if (block === 1 && column === 1 && inputArray[block - 1][0] > 1) {
                        newSeat = new Seat(block, column, row, 2);
                        resultArr.push(newSeat);
                    } else if (block === inputArray.length &&
                        column === inputArray[block - 1][0] &&
                        inputArray[block - 1][0] > 1) {
                        newSeat = new Seat(block, column, row, 2);
                        resultArr.push(newSeat);
                    } else if (column === 1 || column === (inputArray[block - 1][0])) {
                        newSeat = new Seat(block, column, row, 1);
                        resultArr.push(newSeat);
                    } else {
                        newSeat = new Seat(block, column, row, 3);
                        resultArr.push(newSeat);
                    }
                }
            }
        }
    },

    seatPassengers: function(res, que) {
        if (res.length < que) {
            alert("Only the first " + res.length + " passengers will be able to fly away.");
            for (i = 0; i < res.length; i++) {
                res[i].passenger = i + 1;
            }
        } else {
            for (i = 0; i < que; i++) {
                res[i].passenger = i + 1;
            }
        }
    }
};

var view = {
    clearFromDOM: function(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },

    addBackgroundImg: function() {
        seats.style.background = 'url(\'img/img.png\') no-repeat center top';
        seats.style.backgroundSize = 'contain';
    },

    createTableResults: function(arrInput, arrResult) {
        for (i = 0; i < arrInput.length; i++) {
            table = document.createElement('table');
            table.setAttribute('class', 'table' + (i + 1));

            for (j = 0; j < arrInput[i][1]; j++) {
                tr = document.createElement('tr');
                tr.setAttribute('class', 'tr' + (j + 1));
                for (z = 0; z < arrResult.length; z++) {
                    if (arrResult[z].block === i + 1 && arrResult[z].column === j + 1) {
                        td = document.createElement('td');
                        td.setAttribute('class', 'class' + arrResult[z].classSeat);
                        if (isNaN(arrResult[z].passenger) === false) {
                            td.innerText = arrResult[z].passenger;
                        } else {
                            td.innerText = "";
                        }
                        tr.appendChild(td);
                    }
                }
                table.appendChild(tr);
            }
            seats.appendChild(table);
        }
    }
}

controller.init();