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

let elements = document.getElementById('subNavigation').getElementsByClassName("subNavigationButton")
for (let item of elements) {
  item.addEventListener("click", function() {
    event.preventDefault()
    if(!item.classList.contains("active")){
      removeActive();
      item.classList.add("active");
    }
  });
}


function removeActive() {
  let elements = document.getElementById('subNavigation').getElementsByClassName("subNavigationButton");
  for (let item of elements) {
    item.classList.remove("active");
  }
}
