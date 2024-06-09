var floorCount = 5;
var liftCount = 5;
var recentLift = -1;

var workingLifts = new Array(liftCount).fill(false);
var liftsCurrentFloor = new Array(liftCount).fill(0);

$(document).ready(function () {
  initializeLifts();

  $("#lift_count").blur(function () {
    var floorCount1 = $("#floor_count").val();
    var liftCount1 = $("#lift_count").val();
    if ($(this).val() === "") $(this).val(5);
    else updateCounts(floorCount1, liftCount1);
  });

  $("#lift_count").keypress(function (event) {
    if (event.which === 13) {
      var floorCount1 = $("#floor_count").val();
      var liftCount1 = $("#lift_count").val();
      if ($(this).val() === "") $(this).val(5);
      else updateCounts(floorCount1, liftCount1);
    }
  });

  $("#floor_count").blur(function () {
    var floorCount1 = $("#floor_count").val();
    var liftCount1 = $("#lift_count").val();
    if ($(this).val() === "") $(this).val(5);
    else updateCounts(floorCount1, liftCount1);
  });

  $("#floor_count").keypress(function (event) {
    if (event.which === 13) {
      var floorCount1 = $("#floor_count").val();
      var liftCount1 = $("#lift_count").val();
      if ($(this).val() === "") $(this).val(5);
      else updateCounts(floorCount1, liftCount1);
    }
  });
});

const updateCounts = (floorCount1, liftCount1) => {
  if (liftCount1 * 1 > floorCount1 * 1) {
    alert("Lift count should not be greater than floor count");
    $("#floor_count").val(floorCount);
    $("#lift_count").val(liftCount);
  } else {
    floorCount = floorCount1;
    liftCount = liftCount1;
    recentLift = -1;

    workingLifts.fill(false);
    liftsCurrentFloor.fill(0);
    initializeLifts();
    highlightCurrentLifts();
  }
};

const blockLifts = () => {
  for (var i = 1; i < floorCount + 1; i++) {
    $("#lift_" + i + "_" + ((i - 1) % liftCount)).css(
      "backgroundColor",
      "#f557"
    );
  }
};

const getAvailableLiftNumber = (floorNumber) => {
  var result = -1;
  for (
    var j = (recentLift + 1) % liftCount, l = 0;
    l <= liftCount;
    j = (j + 1) % liftCount, l++
  ) {
    if (j === (floorNumber - 1) % liftCount) continue;
    if (workingLifts[j] === false) {
      result = j;
      recentLift = j;
      break;
    }
  }
  return result;
};

const initializeLifts = () => {
  var result = "";

  for (var i = floorCount; i >= 0; i--) {
    result += "<div class='floor'>";

    result += "<div class='lift no-bg'>";
    result += `<div class='floor-number'>${i}</div>`;
    result += "</div>";

    for (var j = 0; j < liftCount; j++) {
      result += `<div id='lift_${i}_${j}' class='lift'>`;
      result += `<input type='number' class='lift-button' name='lift_number_${i}_${j}' id='lift_number_${i}_${j}'
                  min='0' max='${floorCount}' value='${i}' disabled/></div>`;
    }

    result += "<div class='lift no-bg'>";
    if (i !== floorCount)
      result += `<div id='up_${i}' class='up-button' onclick='moveLift(getAvailableLiftNumber(${i}), ${i}, "up")'>ᐅ</div>`;
    if (i !== 0)
      result += `<div id='down_${i}' class='down-button' onclick='moveLift(getAvailableLiftNumber(${i}), ${i}, "down")'>ᐅ</div>`;

    result += "</div></div>";
  }
  $("#liftContainer").html(result);

  liftsCurrentFloor.fill(0);
  highlightCurrentLifts();

  $(".lift-button").focus(function () {
    $(this).val("");
  });

  $(".lift-button").blur(function () {
    var floorNumber = $(this).attr("id").split("_")[2];
    var liftNumber = $(this).attr("id").split("_")[3];
    var destinationFloor = $(this).val();
    if ($(this).val() === "") $(this).val(floorNumber);
    else moveLift(liftNumber, destinationFloor);
  });

  $(".lift-button").keypress(function (event) {
    if (event.which === 13) {
      var liftNumber = $(this).attr("id").split("_")[3];
      var destinationFloor = $(this).val();
      moveLift(liftNumber, destinationFloor);
    }
  });
  blockLifts();
};

const highlightCurrentLifts = () => {
  for (var j = 0; j < liftCount; j++) {
    highlightLift(liftsCurrentFloor[j], j);
  }
};

const highlightLift = (i, j) => {
  $("#lift_" + i * 1 + "_" + j * 1).css("backgroundColor", "#5ff");
  $("#lift_number_" + i * 1 + "_" + j * 1).prop("disabled", false);
};

const resetLift = (i, j) => {
  $("#lift_" + i * 1 + "_" + j * 1).css("backgroundColor", "#fff1");
  $("#lift_number_" + i * 1 + "_" + j * 1).prop("disabled", true);
  $("#lift_number_" + i * 1 + "_" + j * 1).val(i);
};

const moveLift = (liftNumber, destinationFloor, liftDirection) => {
  if (
    destinationFloor < 0 ||
    destinationFloor > floorCount ||
    liftNumber == (destinationFloor - 1) % liftCount
  ) {
    $("#lift_number_" + liftsCurrentFloor[liftNumber] + "_" + liftNumber).val(
      liftsCurrentFloor[liftNumber]
    );
    alert("Invalid Floor");
    return 0;
  }
  if (liftNumber == -1) {
    alert("All Lifts are busy. please wait and try again");
    return 0;
  }
  if (liftDirection)
    $("#" + liftDirection + "_" + destinationFloor).css("color", "#5f57");
  workingLifts[liftNumber] = true;

  if (destinationFloor > liftsCurrentFloor[liftNumber]) {
    var moveUpInterval = setInterval(() => {
      liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] + 1;

      if (liftsCurrentFloor[liftNumber] > destinationFloor) {
        clearInterval(moveUpInterval);
        liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] - 1;
        if (liftDirection)
          $("#" + liftDirection + "_" + destinationFloor).css("color", "#fff5");
        workingLifts[liftNumber] = false;
      }
      resetLift(liftsCurrentFloor[liftNumber] - 1, liftNumber);
      highlightLift(liftsCurrentFloor[liftNumber], liftNumber);
      blockLifts();
    }, 500);
  } else {
    var moveDownInterval = setInterval(() => {
      liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] - 1;

      if (liftsCurrentFloor[liftNumber] < destinationFloor) {
        clearInterval(moveDownInterval);
        liftsCurrentFloor[liftNumber] = liftsCurrentFloor[liftNumber] + 1;
        if (liftDirection)
          $("#" + liftDirection + "_" + destinationFloor).css("color", "#fff5");
        workingLifts[liftNumber] = false;
      }
      resetLift(liftsCurrentFloor[liftNumber] + 1, liftNumber);
      highlightLift(liftsCurrentFloor[liftNumber], liftNumber);
      blockLifts();
    }, 500);
  }
  return 1;
};
