(function() {

  const processInfoCardData = {
    "weapon":fillInfoCard
  }

  const processAscensionTable = {

  }

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "data/weapon/homa_staff.json", true);
  xhr.onload = function (e) {
    if (xhr.status === 200) {

      let data = JSON.parse(xhr.responseText);

      if (data.type in processInfoCardData) {
        processInfoCardData[data.type](data.data);
      } else {
        console.error("unexpected data type (InfoCard)");
      }

      fillAscensionTable(data.data);

    } else {
      console.error(xhr.statusText);
    }
    onEnd();
  };
  xhr.send();



  function fillInfoCard(json){

    const card = document.querySelector(".infoCard");

    card.querySelector(".name").innerText = json.name || "";
    card.querySelector("img").src = json.img || "";
    card.querySelector(".rarity").innerText='\u2605'.repeat(json.rarity) || "";
    card.querySelector(".itemClass").innerText=json.itemClass || "";
    card.querySelector(".series").innerText=json.series || "";
    card.querySelector(".obtain").innerText=json.obtain || "";
    card.querySelector(".subStat").innerText=`${json.subStat} (Lv.1)` || "";
    card.querySelector(".mainStat").innerText=`${json.mainStat} (Lv.1)` || "";
    card.querySelector(".mainStatValue").innerText=(json.mainStatValue || [""])[0];
    card.querySelector(".subStatValue").innerText=`${(json.subStatValue || [""])[0]}${json.subStatUnits || ""}`;

    for (let i = 0; i < json.passives.length; i++) {

      let pn = document.createElement('p');
      pn.classList.add("passiveName");
      pn.innerText=`${json.passives[i].passiveName}:`;
      card.querySelector(".passives").append(pn);

      let descript = json.passives[i].passiveDescript;
      for (let item in json.passives[i].passiveDescriptValues) {
        descript = descript.replaceAll(`#${item}`,`<b>${json.passives[i].passiveDescriptValues[item].replaceAll("/","/<wbr>")}</b>`)
      }

      let pd = document.createElement('p');
      pd.classList.add("passiveDescript");
      pd.innerHTML=descript;
      card.querySelector(".passives").append(pd);

    }
  }

  function fillAscensionTable(json) {

    const table = document.getElementById(`ascensionsTableR${json.rarity}Template`).content.cloneNode(true);
    let a;

    a = table.querySelectorAll(".primeMaterial");
    for (var item of a) {
      let img = item.querySelector("img");
      img.src = img.src.replace("#type",json.ascension.primeMaterial);
    }

    a = table.querySelectorAll(".mainMaterial");
    for (var item of a) {
      let img = item.querySelector("img");
      img.src = img.src.replace("#type",json.ascension.mainMaterial);
    }

    a = table.querySelectorAll(".subMaterial");
    for (var item of a) {
      let img = item.querySelector("img");
      img.src = img.src.replace("#type",json.ascension.subMaterial);
    }

    document.querySelector('.infoTables').append(table);
  }

  function onEnd(){
    console.log("page loaded");

    let scripts = document.getElementById("scripts").content.cloneNode(true);
    document.querySelector("body").append(scripts)
  }


})();
