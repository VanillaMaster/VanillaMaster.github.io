function getCookieValue(name) {
    return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
}

function showBigCard(src){
  document.getElementById("bigImage").src = src;
  document.getElementById('body').setAttribute('style','overflow: hidden;');
  document.getElementById("background").style.display = "block";
  document.getElementById('settingsBackground').style.display='block';
  document.getElementById('BackgroundColor').style.opacity='0.5';
}

function hideBigCard(allowScroll){
  if (allowScroll) {
    document.getElementById('body').setAttribute('style','');
  }
  document.getElementById("background").style.display = "none";
  document.getElementById('settingsBackground').style.display='none';
  document.getElementById('BackgroundColor').style.opacity='0';
}

function changeTheme() {
  if (getCookieValue("theme") == "black") {
    document.getElementById("html").setAttribute("class","ThemeWhite");
    document.cookie = "theme=white";
  } else {
    document.getElementById("html").setAttribute("class","ThemeBlack");
    document.cookie = "theme=black";
  }
}

function loadTheme() {
  if (getCookieValue("theme") == "black") {
    document.getElementById("html").setAttribute("class","ThemeBlack");
  } else {
    document.getElementById("html").setAttribute("class","ThemeWhite");
  }

}

function hideAllPopUp() {
  document.getElementById('body').setAttribute('style','');
  hideBigCard(false);
  hidePopUp("filter",false);
  hidePopUp("profile",false);
  hidePopUp("settings",false);
}

function showPopUp(id) {
  document.getElementById('body').setAttribute('style','overflow: hidden;');
  document.getElementById('settingsBackground').style.display='block';
  document.getElementById('BackgroundColor').style.opacity='0.5';
  document.getElementById(id).style.height='280px';
}

function hidePopUp(id,allowScroll) {
  if (allowScroll) {
    document.getElementById('body').setAttribute('style','');
  }
  document.getElementById('settingsBackground').style.display='none';
  document.getElementById('BackgroundColor').style.opacity='0';
  document.getElementById(id).style.height='0px';
}

function resetFilters() {
  let tags = document.getElementsByClassName("checkBox");
  for (var i = 0; i < tags.length; i++) {
    tags[i].checked = false;
  }
}

function resetAllFilters() {
  resetFilters();
  applyFilters();
}

function applyFilters() {
  matchFilter();
  hidePopUp("filter",true);
}

async function matchFilter() {
  let tags = document.getElementsByClassName("checkBox");
  let selectedTags = [];

  for (var i = 0; i < tags.length; i++) {
    if (tags[i].checked) {
      selectedTags.push(tags[i].getAttribute("data"));
    }
  }

  console.log(selectedTags);

  let cards = document.getElementsByClassName("card");

  for (var i = 0; i < cards.length; i++) {
    let cardTags = cards[i].getAttribute("tags");

    let displayStatus = "block";

    for (var j = 0; j < selectedTags.length; j++) {
      if (cardTags.indexOf(selectedTags[j],0) == -1) {
        displayStatus = "none";
      }
    }

    cards[i].style.display = displayStatus;

  }

}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function generateCard(jsonConfig,id){
  let card = document.createElement("div");
  card.setAttribute("class","card");
  card.setAttribute("tags",jsonConfig["tags"]);

  let discription = document.createElement("div");
  discription.setAttribute("style","padding: 5px;");
  discription.textContent=jsonConfig["name"];

  card.appendChild(discription);

  let image = document.createElement("img");
  image.setAttribute("class","image");
  image.setAttribute("src",jsonConfig["mainLink"]);
  image.setAttribute("onclick",`showBigCard('${jsonConfig["mainLink"]}')`);

  card.appendChild(image);

  let subImageContainer = document.createElement("div");
  subImageContainer.setAttribute("class","subImageContainer");

  let links = jsonConfig["subLinks"].split(";");

  for (var i = 0; i < links.length; i++) {

    let subImage = document.createElement("div");
    subImage.setAttribute("class","subImageHolder");
    subImage.setAttribute("style",`max-width: ${Math.floor(10000/links.length)/100}%`);

    let padding = document.createElement("div");
    padding.setAttribute("style","padding: 2.5px;");

    let subImageIMG = document.createElement("img");


    subImageIMG.setAttribute("class","subImage");
    subImageIMG.setAttribute("src",links[i]);
    subImageIMG.setAttribute("onclick",`showBigCard('${links[i]}')`);

    padding.appendChild(subImageIMG);

    subImage.appendChild(padding);

    subImageContainer.appendChild(subImage);

  }


  card.appendChild(subImageContainer);

  let tags = document.createElement("div");

  tags.setAttribute("style","padding: 5px;");
  //tags.textContent="tags";

  let tagsData = jsonConfig["tags"].split(";");

  for (var i = 0; i < tagsData.length; i++) {
    let tag = document.createElement("div");
    tag.textContent = tagsData[i];
    tag.setAttribute("class","tag");
    tags.appendChild(tag);
  }

  card.appendChild(tags);

  document.getElementById(id).appendChild(card);



}
