//Global constants - arrays
const ARMY = ["armySelect1", "armySelect2", "armySelect3", "armySelect4"];
const ENEMY_ARMY = [
  "enemyArmySelect1",
  "enemyArmySelect2",
  "enemyArmySelect3",
  "enemyArmySelect4",
];
const CLASSES = [
  "same",
  "over65",
  "between65and55",
  "between55and45",
  "between45and35",
  "under35",
  "na"
];

//Importing a list of armies from .json file
import armyFilePath from "./data/armies.json" with { type: "json" };
const armyPath = armyFilePath;

//Select element data population
function populateSelectElement(selectElementId, data) {
  //Default option population
  const selectElement = document.getElementById(selectElementId);
  const defaultOption = document.createElement("option");
  defaultOption.value = "N/A";
  defaultOption.text = "Wybierz armię";
  defaultOption.hidden = true;
  selectElement.appendChild(defaultOption);

  //Populating data from the list
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const option = document.createElement("option");
      option.value = key;
      option.text = data[key];
      selectElement.appendChild(option);
    }
  }
}

//Function calls for populating all select elements with armies names data
for (let i in ARMY) {
  populateSelectElement(ARMY[i], armyPath);
}
for (let i in ENEMY_ARMY) {
  populateSelectElement(ENEMY_ARMY[i], armyPath);
}

//Function for conditional formatting of cells
function colorTableCells() {
  let table = document.getElementById("armiesTable");

  for (let row of table.rows) {
    for (let cell of row.cells) {
      cell.classList.remove(...CLASSES);

      if (cell.innerHTML == -1) {
        cell.classList.add("same");
        cell.innerHTML = "";
      } else if (cell.innerHTML == 0) {
        cell.classList.add("na");
        cell.innerHTML = "N/A";
      } else if (cell.innerHTML >= 65) {
        cell.classList.add("over65");
        cell.innerHTML = cell.innerHTML + "%";
      } else if (cell.innerHTML < 65 && cell.innerHTML >= 55) {
        cell.classList.add("between65and55");
        cell.innerHTML = cell.innerHTML + "%";
      } else if (cell.innerHTML < 55 && cell.innerHTML >= 45) {
        cell.classList.add("between55and45");
        cell.innerHTML = cell.innerHTML + "%";
      } else if (cell.innerHTML < 45 && cell.innerHTML >= 35) {
        cell.classList.add("between45and35");
        cell.innerHTML = cell.innerHTML + "%";
      } else if (cell.innerHTML < 35) {
        cell.classList.add("under35");
        cell.innerHTML = cell.innerHTML + "%";
      }
    }
  }
}
colorTableCells();

//Importing a list of % values for each pair of armies from .json file
import winData from "./data/winProbabilities.json" with { type: "json" };
let winRate = winData;

//Function to populate cells from select element data
function populateCells() {
  try {
    //Arrays initializers
    let army = ["army1", "army2", "army3", "army4"];
    let enemyArmy = ["enemyArmy1", "enemyArmy2", "enemyArmy3", "enemyArmy4"];
    let percentValue = [];
    let values = [];
    let armies = [];
    let cells = [];
    
    //army array constructor
    for (let i in army) {
      army[i] = document.getElementById(ARMY[i]).value;
    }

    //enemyArmy array constructor
    for (let i in enemyArmy) {
      enemyArmy[i] = document.getElementById(ENEMY_ARMY[i]).value;
    }

    //percentValue array constructor
    let j = 1;
    for (let i = 1; i < 5; i++) {
      if (j === 4 && i === 4) {
        percentValue.push(`percentValue${j}${i}`);
        break;
      } else if (i === 4) {
        percentValue.push(`percentValue${j}${i}`);
        j++;
        i = 0;
      } else if (j < 5) {
        percentValue.push(`percentValue${j}${i}`);
      }
    }

    //values array constructor
    let m = 0;
    let n = 0;
    let result = 0;
    for (let i = 0; i < percentValue.length; i++) {
      if (m === 3 && n === 3) {
        result = winRate[army[m]][0][enemyArmy[n]];
        values.push(result);
        break;
      } else if (n === 3) {
        result = winRate[army[m]][0][enemyArmy[n]];
        values.push(result);
        m++;
        n = 0;
      } else if (n < 4) {
        result = winRate[army[m]][0][enemyArmy[n]];
        values.push(result);
        n++;
      }
    }

    //armies array constructor for select elements id's
    let l = 1;
    for (let i = 1; i < 5; i++) {
      if (l === 4 && i === 4) {
        armies.push(`armies${l}${i}`);
        break;
      } else if (i === 4) {
        armies.push(`armies${l}${i}`);
        l++;
        i = 0;
      } else if (l < 5) {
        armies.push(`armies${l}${i}`);
      }
    }

    //cell array constructor for table cells id's
    let c = 1;
    for (let i = 1; i < 5; i++) {
      if (c === 4 && i === 4) {
        cells.push(`cell${c}${i}`);
        break;
      } else if (i === 4) {
        cells.push(`cell${c}${i}`);
        c++;
        i = 0;
      } else if (c < 5) {
        cells.push(`cell${c}${i}`);
      }
    }

    //cell population function
    for (let n in cells) {
      cells[n] = document.getElementById(armies[n]);
      cells[n].innerHTML = values[n];
    }

    //data formatting
    colorTableCells();
  } catch (error) {
    console.log(error);
  }
}

//onChange event listeners for select elements
for (let i in ARMY) {
  document.getElementById(ARMY[i]).addEventListener("change", populateCells);
}
for (let i in ENEMY_ARMY) {
  document
    .getElementById(ENEMY_ARMY[i])
    .addEventListener("change", populateCells);
}
