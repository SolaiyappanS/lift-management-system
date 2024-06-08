const floorCount = 5;
const liftCount = 5;
var recentLift = -1;

const workingLifts = new Array(liftCount).fill(false);
const liftsCurrentFloor = new Array(liftCount).fill(0);

$(document).ready(function () {
  resetLifts();
  blockLifts();
});

const upFunction = (floorNumber) => {
  $("#up_" + floorNumber).css("color", "#5f57");
  const liftNumber = getAvailableLiftNumber(floorNumber);
  if (liftNumber === -1)
    alert("No lifts available now. Please try after some time.");
  else {
    workingLifts[liftNumber] = true;

    if (floorNumber > liftsCurrentFloor[liftNumber]) {
      var moveUpInterval = setInterval(() => {
        liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] + 1;

        if (liftsCurrentFloor[liftNumber] > floorNumber) {
          clearInterval(moveUpInterval);
          liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] - 1;
          $("#up_" + floorNumber).css("color", "#fff5");
          workingLifts[liftNumber] = false;
        }
        $(
          "#lift_" + (liftsCurrentFloor[liftNumber] - 1) + "_" + liftNumber
        ).css("backgroundColor", "#fff1");
        $("#lift_" + liftsCurrentFloor[liftNumber] + "_" + liftNumber).css(
          "backgroundColor",
          "#5ff"
        );
        blockLifts();
      }, 500);
    } else {
      var moveDownInterval = setInterval(() => {
        liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] - 1;

        if (liftsCurrentFloor[liftNumber] < floorNumber) {
          clearInterval(moveDownInterval);
          liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] + 1;
          $("#up_" + floorNumber).css("color", "#fff5");
          workingLifts[liftNumber] = false;
        }
        $(
          "#lift_" + (liftsCurrentFloor[liftNumber] + 1) + "_" + liftNumber
        ).css("backgroundColor", "#fff1");
        $("#lift_" + liftsCurrentFloor[liftNumber] + "_" + liftNumber).css(
          "backgroundColor",
          "#5ff"
        );
        blockLifts();
      }, 500);
    }
  }
};

const downFunction = (floorNumber) => {
  $("#down_" + floorNumber).css("color", "#5f57");
  const liftNumber = getAvailableLiftNumber(floorNumber);
  if (liftNumber === -1)
    alert("No lifts available now. Please try after some time.");
  else {
    workingLifts[liftNumber] = true;

    if (floorNumber > liftsCurrentFloor[liftNumber]) {
      var moveUpInterval = setInterval(() => {
        liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] + 1;

        if (liftsCurrentFloor[liftNumber] > floorNumber) {
          clearInterval(moveUpInterval);
          liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] - 1;
          $("#down_" + floorNumber).css("color", "#fff5");
          workingLifts[liftNumber] = false;
        }
        $(
          "#lift_" + (liftsCurrentFloor[liftNumber] - 1) + "_" + liftNumber
        ).css("backgroundColor", "#fff1");
        $("#lift_" + liftsCurrentFloor[liftNumber] + "_" + liftNumber).css(
          "backgroundColor",
          "#5ff"
        );
        blockLifts();
      }, 500);
    } else {
      var moveDownInterval = setInterval(() => {
        liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] - 1;

        if (liftsCurrentFloor[liftNumber] < floorNumber) {
          clearInterval(moveDownInterval);
          liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] + 1;
          $("#down_" + floorNumber).css("color", "#fff5");
          workingLifts[liftNumber] = false;
        }
        $(
          "#lift_" + (liftsCurrentFloor[liftNumber] + 1) + "_" + liftNumber
        ).css("backgroundColor", "#fff1");
        $("#lift_" + liftsCurrentFloor[liftNumber] + "_" + liftNumber).css(
          "backgroundColor",
          "#5ff"
        );
        blockLifts();
      }, 500);
    }
  }
};

const blockLifts = () => {
  for (var i = 1; i < floorCount + 1; i++) {
    $("#lift_" + i + "_" + (i - 1)).css("backgroundColor", "#f557");
  }
};

const getAvailableLiftNumber = (floorNumber) => {
  var result = -1;
  for (
    var j = (recentLift + 1) % liftCount;
    j < liftCount;
    j = (j + 1) % liftCount
  ) {
    if (j === floorNumber - 1) continue;
    if (workingLifts[j] === false) {
      result = j;
      recentLift = j;
      break;
    }
  }
  return result;
};

const resetLifts = () => {
  var result = "";

  for (var i = floorCount; i >= 0; i--) {
    result += "<div class='floor'>";

    result += "<div class='lift'>";
    result += `<div class='floor-number'>${i}</div>`;
    result += "</div>";

    for (var j = 0; j < liftCount; j++) {
      result += `<div id='lift_${i}_${j}' class='lift'>`;
      result += "<div class='lift-button'></div></div>";
    }

    result += "<div class='lift'>";
    if (i !== floorCount)
      result += `<div id='up_${i}' class='up-button' onclick='upFunction(${i})'>ᐅ</div>`;
    if (i !== 0)
      result += `<div id='down_${i}' class='down-button' onclick='downFunction(${i})'>ᐅ</div>`;

    result += "</div></div>";
  }
  $("#liftContainer").html(result);

  liftsCurrentFloor.fill(0);
  highlightLifts();
};

const highlightLifts = () => {
  for (var j = 0; j < liftCount; j++) {
    $("#lift_" + liftsCurrentFloor[j] + "_" + j).css("backgroundColor", "#5ff");
  }
};
