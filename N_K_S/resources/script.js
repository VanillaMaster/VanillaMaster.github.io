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

      let cards = document.getElementsByClassName("card")
      for (let card of cards){
        card.style.display = "none";
      }

      console.log(this.getAttribute("searchtag"));

      cards = document.getElementsByClassName(this.getAttribute("searchtag"))
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
    if(!this.classList.contains("active")){
      let elements = document.getElementsByClassName("navButton");
      for (let item of elements) {
        item.classList.remove("active");
      }

      this.classList.add("active");

      let containers = document.getElementsByClassName("content");
      for (let item of containers) {
        item.style.display="none";
      }

      console.log(this.getAttribute("searchid"));

      document.getElementById(this.getAttribute("searchid")).style.display="block";
    }
  });
}

//====================

elements = document.getElementsByClassName('topBarButton');
for (let item of elements) {
  item.addEventListener("click", function() {
    event.preventDefault();
    if(!this.classList.contains("active")){
      event.stopPropagation();

      console.log(this.getAttribute("searchid"));

      let elements = document.getElementsByClassName("topBarButton");
      for (let item of elements) {
        item.classList.remove("active");

        document.getElementById(item.getAttribute("searchid")).style.display = "none";
      }

      this.classList.add("active");

      document.getElementById(this.getAttribute("searchid")).style.display = "block";

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

elements = document.getElementsByClassName("cardDisplayToggleItem");
for (let item of elements) {

  item.addEventListener("click", function() {
    event.preventDefault();
    if(!this.classList.contains("active")){

      let elements = document.getElementsByClassName("cardDisplayToggleItem");
      for (let item of elements) {
        item.classList.remove("active");
      }

      this.classList.add("active");

      console.log(this.getAttribute("toggletype"));


      document.getElementById("cardHolder").className = this.getAttribute("toggletype");
    }
  });
}

//=============

document.getElementById("overlay").addEventListener("click", function() {
  document.getElementById("overlay").classList.toggle("active");

  let elements = document.getElementsByClassName("overlayCard");
  for (let item of elements) {
    item.classList.remove("active");
  }

});

elements = document.getElementsByClassName("card");
for (let item of elements) {

  item.getElementsByTagName("img")[0].addEventListener("click", function() {

      document.getElementById("cardInfo").classList.add("active");

    document.getElementById("overlay").classList.toggle("active");
  });
}

//=========

elements = document.getElementsByClassName("topBarFSMenuButton");

for (let item of elements) {
  item.addEventListener("click", function() {
    event.preventDefault();

      document.getElementById(this.getAttribute("searchid")).classList.add("active");

    document.getElementById("overlay").classList.toggle("active");
  });
}

//=======

document.getElementById("tryLogIn").addEventListener("click", function() {

  let password = document.getElementById("passwordInput").value;
  let username = document.getElementById("usernameInput").value;

  document.getElementById("tryLogIn").disabled = true;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost/api/public/getValidation", true);
  //xhr.setRequestHeader('X-Auth', '123');
  xhr.onload = function (e) {
    document.getElementById("tryLogIn").disabled = false;
    if (xhr.status === 200) {
      let resp = JSON.parse(xhr.responseText)
      console.log(resp);
      if (resp.isloggedin) {
        // succsesfully logged in
        document.getElementById("profileButton").classList.toggle("active");
        document.getElementById("loginButton").classList.toggle("active");
        //====
        document.getElementById("overlay").classList.toggle("active");

        let elements = document.getElementsByClassName("overlayCard");
        for (let item of elements) {
          item.classList.remove("active");
        }
        //====

      }
    } else {
      console.error(xhr.statusText);
    }
  };

  if(username == undefined || password == undefined){
    console.error("no params");
    document.getElementById("tryLogIn").disabled = false;
  } else {
    xhr.send(JSON.stringify({"username":username,"password":password}));
  }

});
