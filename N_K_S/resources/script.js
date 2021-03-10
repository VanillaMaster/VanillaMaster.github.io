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

      let elements = document.getElementById('subNavigation').getElementsByClassName("subNavigationButton");
      for (let item of elements) {
        item.classList.remove("active");
      }

      item.classList.add("active");

      let cards = document.getElementsByClassName("card")
      for (let card of cards){
        card.style.display = "none";
      }

      console.log(item.getAttribute("searchtag"));

      cards = document.getElementsByClassName(item.getAttribute("searchtag"))
      for (let card of cards){
        card.style.display = "block";
      }
    }
  });
}


elements = document.getElementsByClassName('navButton');
for (let item of elements) {
  item.addEventListener("click", function() {
    event.preventDefault();
    if(!item.classList.contains("active")){
      let elements = document.getElementsByClassName("navButton");
      for (let item of elements) {
        item.classList.remove("active");
      }

      item.classList.add("active");

      let containers = document.getElementsByClassName("content");
      for (let item of containers) {
        item.style.display="none";
      }

      console.log(item.getAttribute("searchid"));

      document.getElementById(item.getAttribute("searchid")).style.display="block";
    }
  });
}
