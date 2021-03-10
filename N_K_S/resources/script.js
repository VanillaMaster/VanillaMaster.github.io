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

//====================

elements = document.getElementsByClassName('topBarButton');
for (let item of elements) {
  item.addEventListener("click", function() {
    event.preventDefault();
    if(!item.classList.contains("active")){
      event.stopPropagation();

      console.log(item.getAttribute("searchid"));

      let elements = document.getElementsByClassName("topBarButton");
      for (let item of elements) {
        item.classList.remove("active");

        document.getElementById(item.getAttribute("searchid")).style.display = "none";
      }

      item.classList.add("active");

      document.getElementById(item.getAttribute("searchid")).style.display = "block";

    }
  });
}

document.getElementById('app').addEventListener("click", function() {

  let elements = document.getElementsByClassName("topBarButton");
  for (let item of elements) {
    item.classList.remove("active");

    document.getElementById(item.getAttribute("searchid")).style.display = "none";
  }

});

elements = document.getElementsByClassName('popUpList');
for (let item of elements) {
  item.addEventListener("click", function() {
    event.stopPropagation();
    event.preventDefault();
  });
}

//==================
