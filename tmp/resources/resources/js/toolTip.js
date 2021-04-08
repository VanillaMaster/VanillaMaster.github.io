(function() {

  const toolTip = document.getElementById("toolTip");

  const processToolTipData = {
    "weapon":showItem,
    "artifact":showItem
  }

  async function mousemove(e) {
    // TODO: auto select position using coordinats and tooltip size
    toolTip.style.left = `${e.clientX+20}px`;

    if ((window.innerHeight - e.clientY - 20) >= toolTip.offsetHeight) {
      toolTip.style.top = `${e.clientY+20}px`;
    } else {
      toolTip.style.top = `${e.clientY-20-toolTip.offsetHeight}px`;
    }

  }

  async function reposition() {
    if (!(window.innerHeight - parseInt(toolTip.style.top) >= toolTip.offsetHeight)) {
      toolTip.style.top = `${parseInt(toolTip.style.top)-40-toolTip.offsetHeight}px`;
    }
  }

  async function hover(elem) {

    const t = setTimeout(async function() {

      let xhr = new XMLHttpRequest();

      xhr.open("GET", elem.dataset.tooltipSrc, true);
      xhr.onload = function (e) {
        if (xhr.status === 200) {

          let data = JSON.parse(xhr.responseText);

          if (data.type in processToolTipData) {
            processToolTipData[data.type](data.data);
            document.getElementById('toolTip').classList.add("active");
          } else {
            console.error("unexpected data type (tooltip)");
          }


          //elem.dispatchEvent(new Event("mousemove"))
          reposition();

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

  function showItem(json) {

    while (toolTip.lastElementChild) {
      toolTip.removeChild(toolTip.lastElementChild);
    }
    //=================================================
    let template = document.getElementById("weapon").content.cloneNode(true);
    //=================================================
    template.querySelector(".name").innerText=json.name || "";
    template.querySelector(".itemClass").innerText=json.itemClass || "";
    template.querySelector(".subStat").innerText=json.subStat || "";
    if ("subStatValue" in json && "subStatUnits" in json)
      template.querySelector(".subStatValue").innerText= `${(json.subStatValue || [""])[0]}/${(json.subStatValue || [""])[(json.subStatValue || [""]).length-1]}${json.subStatUnits}`;
    template.querySelector(".mainStat").innerText = json.mainStat || "";
    if ("mainStatValue" in json)
      template.querySelector(".mainStatValue").innerText = `${(json.mainStatValue || [""])[0]}/${(json.mainStatValue || [""])[(json.mainStatValue || [""]).length-1]}`;
    template.querySelector("img").src=json.img;
    template.querySelector(".rarity").innerText='\u2605'.repeat(json.rarity) || "";
    template.querySelector(".weaponCard").classList.add(`r${json.rarity}`);

    for (let i = 0; i < json.passives.length; i++) {

      let pn = document.createElement('p');
      pn.classList.add("passiveName");
      pn.innerText=`${json.passives[i].passiveName}:`;
      template.querySelector(".passives").append(pn);

      let descript = json.passives[i].passiveDescript;
      for (let item in json.passives[i].passiveDescriptValues) {
        descript = descript.replaceAll(`#${item}`,`<b>${json.passives[i].passiveDescriptValues[item].replaceAll("/","/<wbr>")}</b>`)
      }

      let pd = document.createElement('p');
      pd.classList.add("passiveDescript");
      pd.innerHTML=descript;
      template.querySelector(".passives").append(pd);

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
