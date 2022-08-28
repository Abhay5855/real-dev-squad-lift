const floorInput = document.getElementById("floor-input");
const LiftInput = document.getElementById("lift-input");
const submitButton = document.getElementById("submit-btn");
const container = document.getElementById("container");
const liftContainer = document.createElement("div");

let floorVal = "";
let liftVal = "";
var prevFloor = 0;
document.getElementById("floor-input").addEventListener("input", (e) => {
  floorVal = e.target.value;
  updateDisabled();
});

document.getElementById("lift-input").addEventListener("input", (e) => {
  liftVal = e.target.value;
  updateDisabled();
});

// Disable function for submit
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
  const floorDiv = document.createElement("div");

  floorDiv.classList.add("floordiv");

  const floorContainer = document.createElement("div");
  floorContainer.classList.add("floor");
  floorContainer.dataset.floor = floors;

  // floorDiv.innerHTML = `<p class="floorName">Floor ${floors}</p>`;

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

  floorNumber.classList.add('floorName');

  floorNumber.innerText = `Floor No ${floors}`;

  buttonContainer.append(floorNumber);

  floorContainer.append(buttonContainer);

  floorDiv.append(floorContainer);

  container.append(floorDiv);

  //Logic to generate Lifts

  for (let j = 0; j < lifts; j++) {
    //Check all lifts should be on 1st
    if (floors === 1) {
      let Lifts = document.createElement("div");

      Lifts.classList.add("lift-div");

      Lifts.dataset.currentLocation = prevFloor;

      leftDoor = document.createElement("div");
      RightDoor = document.createElement("div");

      leftDoor.classList.add("left-door");
      RightDoor.classList.add("right-door");

      Lifts.appendChild(leftDoor);
      Lifts.appendChild(RightDoor);

      liftContainer.appendChild(Lifts);

      liftContainer.classList.add("lift");

      // buttonContainer.append(liftContainer);

      floorContainer.append(liftContainer);

      floorDiv.append(floorContainer);

      console.log(container);
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
      MoveLift(clickedFloor, LiftArr[i]);

      return;
    }
  }
}

function MoveLift(clickedFloor, move) {
  // First take the current location of the lift;

  // const currentLocation = parseInt(move.dataset.currentLocation);
  const currentFloor = parseInt(clickedFloor);
  prevFloor = parseInt(move.dataset.currentLocation);
  var timing = Math.abs(currentFloor - prevFloor) * 2;

  console.log({ currentFloor });
  console.log({ prevFloor });

  let LiftMove = (clickedFloor - 1) * 160;
  console.log(timing, "this is the time");

  move.dataset.currentLocation = clickedFloor;

  move.style.transform = `translateY(-${LiftMove}px)`;
  move.style.transitionDuration = `${timing}s`;
  move.classList.add("engaged");

  //function to open the lift doors
  LiftDoorsOpen(move, timing);
}

function LiftDoorsOpen(move, timing) {
  //Opening the lift doors
  setTimeout(() => {
    move.children[0].style.transform = "translateX(-100%)";
    move.children[1].style.transform = "translateX(100%)";
  }, timing * 1000 + 1000);

  setTimeout(() => {
    move.children[0].style.transform = "none";
    move.children[1].style.transform = "none";
  }, timing * 1000 + 4000);

  //  Remove the busy status
  setTimeout(() => {
    move.classList.remove("engaged");
  }, timing * 1000 + 6000);
}
