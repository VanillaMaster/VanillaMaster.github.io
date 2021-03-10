document.getElementById('app').addEventListener("click", function() {
  document.getElementById("checkBoxMail").checked = false;
  document.getElementById("checkBoxMail2").checked = false;
});

document.getElementsByClassName('clickableList')[0].addEventListener("click", function() {
  event.stopPropagation();
  document.getElementById("checkBoxMail2").checked = false;
});

document.getElementsByClassName('clickableList')[1].addEventListener("click", function() {
  event.stopPropagation();
  document.getElementById("checkBoxMail").checked = false;
});
