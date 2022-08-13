// get the references
const floorInput = document.getElementById("floor-input");
const LiftInput = document.getElementById("lift-input");
const submitButton = document.getElementById("submit-btn");
const container = document.getElementById("container");
const liftContainer = document.createElement("div");

let floorVal = "";
let liftVal = "";

document.getElementById("floor-input").addEventListener("input", (e) => {
  floorVal = e.target.value;
  updateDisabled();
});

document.getElementById("lift-input").addEventListener("input", (e) => {
  liftVal = e.target.value;
  updateDisabled();
});

function updateDisabled() {
  if (liftVal.length === 0 || floorVal.length === 0) {
    submitButton.setAttribute("disabled", true);
  } else {
    submitButton.removeAttribute("disabled");
  }
}

updateDisabled();

//on Submit button add values
submitButton.addEventListener("click", () => {
  // Check if lift should not be greater than 4
  if (LiftInput.value > 3 && floorInput.value > 15) {
    alert("Max Limit");
    LiftInput.value = "";
    floorInput.value = "";
  }

  // for loop to generate the floors
  for (let i = floorInput.value; i > 0; i--) {
    //Function to genereate floors
    createFloors(i, LiftInput.value);
  }

  //remove the values after submitting
  LiftInput.value = "";
  floorInput.value = "";
});

// Function To Create Floors

function createFloors(floors, lifts) {
  const floorContainer = document.createElement("div");
  floorContainer.classList.add("floor");
  floorContainer.dataset.floor = floors;

  //  button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btn-div");

  const UpButton = document.createElement("button");
  const DownButton = document.createElement("button");

  UpButton.classList.add("up-down");
  DownButton.classList.add("up-down");

  UpButton.setAttribute("id", floors);
  DownButton.setAttribute("id", floors);

  UpButton.innerText = "UP";
  DownButton.innerText = "Down";

  UpButton.dataset.floor = floors;
  DownButton.dataset.floor = floors;

  buttonContainer.append(UpButton);
  buttonContainer.append(DownButton);

  let floorNumber = document.createElement("p");

  floorNumber.innerText = `Floor No ${floors}`;

  buttonContainer.append(floorNumber);

  floorContainer.append(buttonContainer);

  console.log(floorContainer, "floors");

  container.append(floorContainer);

  //Logic to generate Lifts

  for (let j = 0; j < lifts; j++) {
    //Check all lifts should be on 1st
    if (floors === 1) {
      let Lifts = document.createElement("div");

      Lifts.classList.add("lift-div");

      Lifts.dataset.currentLocation = 0;

      leftDoor = document.createElement("div");
      RightDoor = document.createElement("div");

      leftDoor.classList.add("left-door");
      RightDoor.classList.add("right-door");

      Lifts.appendChild(leftDoor);
      Lifts.appendChild(RightDoor);

      liftContainer.appendChild(Lifts);

      liftContainer.classList.add("lift");

      // buttonContainer.append(liftContainer);

      Lifts.setAttribute("pos", j);

      Lifts.setAttribute("onFloor", 0);

      // container.append(liftContainer);

      floorContainer.append(liftContainer);

      console.log(Lifts, "these are the Lifts");
    }
  }
}

let x = 0;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("up-down")) {
    if (e.target.dataset.floor === x) {
      return;
    } else {
      LiftStatus(e.target.dataset.floor);
    }

    x = e.target.dataset.floor;
  }
});

function LiftStatus(clickedFloor) {
  let LiftArr = Array.from(document.getElementsByClassName("lift-div"));

  for (let i = 0; i < LiftArr.length; i++) {
    if (!LiftArr[i].classList.contains("engaged")) {
      console.log("lift started", "go up");
      MoveLift(clickedFloor, LiftArr[i]);

      return;
    }
  }
}

function MoveLift(clickedFloor, move) {
  // First take the current location of the lift;

  const currentLocation = move.dataset.currentLocation;

  const timing = Math.abs(clickedFloor - currentLocation) * 2;

  let LiftMove = (clickedFloor - 1) * -232;
  move.style.transition = `transform ${timing}s linear`;
  move.style.transform = "translateY(" + LiftMove + "px)";
  move.classList.add("engaged");
  move.dataset.currentlocation = clickedFloor;

  //Opening the lift doors
  setTimeout(() => {
    move.children[0].style.transform = "translateX(-25%)";
    move.children[1].style.transform = "translateX(25%)";
  }, timing * 1000 + 1000);

  setTimeout(() => {
    move.children[0].style.transform = "none";
    move.children[1].style.transform = "none";
  }, timing * 1000 + 4000);

  //  Remove the bust status
  setTimeout(() => {
    move.classList.remove("engaged");
  }, timing * 1000 + 5000);
}
