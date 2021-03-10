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

      let cards = document.getElementsByClassName("card")
      for (let card of cards){
        card.style.display = "none";
      }

      console.log(item.innerText.replace(/ /g,""));
      
      cards = document.getElementsByClassName(item.innerText.replace(/ /g,""))
      for (let card of cards){
        card.style.display = "block";
      }
    }
  });
}


function removeActive() {
  let elements = document.getElementById('subNavigation').getElementsByClassName("subNavigationButton");
  for (let item of elements) {
    item.classList.remove("active");
  }
}
