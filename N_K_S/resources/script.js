document.getElementById('app').addEventListener("click", function() {
  document.getElementById("checkBoxMail").checked = false;
  document.getElementById("checkBoxShowMore").checked = false;
});

document.getElementById('mailButton').addEventListener("click", function() {
  event.stopPropagation();
  document.getElementById("checkBoxShowMore").checked = false;
});

document.getElementById('showMoreButton').addEventListener("click", function() {
  event.stopPropagation();
  document.getElementById("checkBoxMail").checked = false;
});
