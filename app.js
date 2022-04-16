const board = document.querySelector(".sketch-board");
const eraseBtn = document.querySelector(".erase");
const sizeBtns = document.querySelectorAll(".size");
const modeBtns = document.querySelectorAll(".mode");
let currentMode = "";

eraseBtn.addEventListener("click", reset);

function createBoard(size = 20 * 20, cssClass = "medium-grid") {
  const board = document.querySelector(".sketch-board");

  board.innerHTML = "";

  board.classList.remove("small-grid", "medium-grid", "big-grid");
  board.classList.add(cssClass);

  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    div.classList.add("eachDiv");
    board.appendChild(div);
  }
}

function paintGrid(mode) {
  const boxes = board.querySelectorAll(".eachDiv");
  boxes.forEach((box) => {
    box.addEventListener("mouseover", (e) => {
      if (mode === "black" || currentMode === "black" || currentMode === "") {
        e.target.style.backgroundColor = "black";
      } else if (mode === "random" || currentMode === "random") {
        let color = chroma.random();
        box.style.backgroundColor = color;
      }
    });
  });
}

function selectButton(button) {
  if (button.classList.contains("mode")) {
    modeBtns.forEach((selection) => {
      selection.classList.remove("active-button");
    });
  } else {
    sizeBtns.forEach((selection) => {
      selection.classList.remove("active-button");
    });
  }
  button.classList.add("active-button");
}

function changeSize() {
  const small = 10 * 10;
  const medium = 20 * 20;
  const big = 30 * 30;

  sizeBtns[1].classList.add("active-button");

  sizeBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("small")) {
        reset();
        createBoard(small, "small-grid");
        paintGrid();
        selectButton(button);
      } else if (button.classList.contains("medium")) {
        reset();
        createBoard(medium, "medium-grid");
        paintGrid();
        selectButton(button);
      } else {
        reset();
        createBoard(big, "big-grid");
        paintGrid();
        selectButton(button);
      }
    });
  });
}

function changeMode() {
  modeBtns[0].classList.add("active-button");
  modeBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("black")) {
        paintGrid("black");
        selectButton(button);
        currentMode = "black";
      } else {
        paintGrid("random");
        selectButton(button);
        currentMode = "random";
      }
    });
  });
}

function reset() {
  const boxes = board.querySelectorAll(".eachDiv");
  boxes.forEach((box) => (box.style.backgroundColor = "rgb(206, 206, 206)"));
}

function startGame() {
  createBoard();
  changeSize();
  paintGrid("black");
  changeMode();
  reset();
}

startGame();
