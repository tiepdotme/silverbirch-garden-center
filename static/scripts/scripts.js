document.documentElement.className = "js";

var today = new Date();
if (today.getDay() == 6 || today.getDay() == 0) {
  document.getElementById("openingTimes").innerHTML = "09:00 - 17:30";
} else {
  document.getElementById("openingTimes").innerHTML = "09:00 - 17:30";
}
