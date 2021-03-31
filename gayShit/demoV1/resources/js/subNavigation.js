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

      /*
      let cards = document.getElementsByClassName("card")
      for (let card of cards){
        card.style.display = "none";
      }

      console.log(this.getAttribute("searchtag"));

      cards = document.getElementsByClassName(this.getAttribute("searchtag"))
      for (let card of cards){
        card.style.display = "block";
      }
      */
    }
  });
}

})();
