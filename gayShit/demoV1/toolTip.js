(function() {

  const processToolTipData = {
    "weapon":showWeapon,
    "artifact":showArtifact
  }

  async function mousemove(e) {
    // TODO: auto select position using coordinats and tooltip size
    document.getElementById('toolTip').style.left = `${e.clientX+20}px`;
    document.getElementById('toolTip').style.top = `${e.clientY+20}px`;
  }

  async function hover(elem) {

    const t = setTimeout(async function() {

      let xhr = new XMLHttpRequest();

      xhr.open("GET", elem.getAttribute("src"), true);
      xhr.onload = function (e) {
        if (xhr.status === 200) {

          let data = JSON.parse(xhr.responseText);

          if (data.type in processToolTipData) {
            processToolTipData[data.type](data.data);
            document.getElementById('toolTip').classList.add("active");
          } else {
            console.error("unexpected data type (tooltip)");
          }

        } else {
          console.error(xhr.statusText);
        }
      };
      xhr.send();
    }, 500);

    elem.onmouseout = function(){
      clearTimeout(t);
      document.getElementById('toolTip').classList.remove("active");
    }

  }

  function showWeapon(json) {

    const toolTip = document.getElementById("toolTip");
    while (toolTip.lastElementChild) {
      toolTip.removeChild(toolTip.lastElementChild);
    }
    //=================================================
    let template = document.getElementById("weapon").content.cloneNode(true);
    //=================================================
    template.querySelector(".name").innerText=json.name;
    template.querySelector(".itemClass").innerText=json.itemClass;
    template.querySelector(".subStat").innerText=json.subStat;
    template.querySelector(".subStatValue").innerText=json.subStatValue;
    template.querySelector(".atackValue").innerText=json.atackValue;
    template.querySelector("img").src=json.img;
    template.querySelector(".rarity").innerText='\u2605'.repeat(json.rarity);

    for (let i = 0; i < json.passives.length; i++) {

      let pn = document.createElement('span');
      pn.classList.add("passiveName");
      pn.innerText=`${json.passives[i].passiveName}:`;
      template.querySelector(".passives").append(pn);
      template.querySelector(".passives").append(document.createElement('br'));

      let descript = json.passives[i].passiveDescript;
      for (let item in json.passives[i].passiveDescriptValues) {
        descript = descript.replaceAll(`#${item}`,`<span>${json.passives[i].passiveDescriptValues[item].replaceAll("/","/<wbr>")}</span>`)
      }

      let pd = document.createElement('span');
      pd.classList.add("passiveDescript");
      pd.innerHTML=descript;
      template.querySelector(".passives").append(pd);
      template.querySelector(".passives").append(document.createElement('br'));

    }
    document.getElementById('toolTip').append(template);
  }

  function showArtifact(json) {
    while (toolTip.lastElementChild) {
      toolTip.removeChild(toolTip.lastElementChild);
    }
    //=================================================
    let template = document.getElementById("artifact").content.cloneNode(true);
    //=================================================
    template.querySelector(".name").innerText=json.name;
    template.querySelector(".itemClass").innerText=json.itemClass;
    template.querySelector(".rarity").innerText='\u2605'.repeat(json.rarity);
    template.querySelector("img").src=json.img;

    for (let i = 0; i < json.passives.length; i++) {

      let pn = document.createElement('span');
      pn.classList.add("passiveName");
      pn.innerText=`${json.passives[i].passiveName}:`;
      template.querySelector(".passives").append(pn);
      template.querySelector(".passives").append(document.createElement('br'));

      let descript = json.passives[i].passiveDescript;
      for (let item in json.passives[i].passiveDescriptValues) {
        descript = descript.replaceAll(`#${item}`,`<span>${json.passives[i].passiveDescriptValues[item].replaceAll("/","/<wbr>")}</span>`)
      }

      let pd = document.createElement('span');
      pd.classList.add("passiveDescript");
      pd.innerHTML=descript;
      template.querySelector(".passives").append(pd);
      template.querySelector(".passives").append(document.createElement('br'));

    }
    document.getElementById('toolTip').append(template);

  }

//==============================================================================

  let elements = document.getElementsByClassName("toolTip");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mouseover", function() {
      hover(this);
    });

    elements[i].addEventListener("mousemove", function(e) {
      mousemove(e);
    });
  }

})();
