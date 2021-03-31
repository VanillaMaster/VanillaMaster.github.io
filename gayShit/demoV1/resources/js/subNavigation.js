(function() {


let elements = document.getElementById('subNavigation').getElementsByClassName("subNavigationButton")
for (let item of elements) {
  item.addEventListener("click", function() {
    event.preventDefault()
    if(!this.classList.contains("active")){

      let elements = document.getElementById('subNavigation').getElementsByClassName("subNavigationButton");
      for (let item of elements) {
        item.classList.remove("active");
      }

      this.classList.add("active");


      let cards = document.getElementsByClassName("subNavigationCard");
      for (let card of cards){
        card.classList.remove("active");
      }

      console.log(this.getAttribute("src"));

      cards[this.getAttribute("src")].classList.add("active");

    }
  });
}

})();
