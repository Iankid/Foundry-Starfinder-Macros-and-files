
(async function(){

    if (!token) {
        ui.notifications.info("Select a token on the active scene!");
        return;
    }

    const itemLength = token.document._actor.items._source.length;
    const playerItems = token.document._actor.items._source;
    let overloadList = []; 

    console.log(playerItems);
    console.log(itemLength);

    for (let i = itemLength - 1; i > 0; i--){
        if (playerItems[i].type == "weapon" && playerItems[i].system.ammunitionType == "charge" && playerItems[i].system.equipped){
            console.log(playerItems[i].name);
            overloadList.push([playerItems[i].name, listId = i]);
        }
    }

    if (overloadList.length < 1){
        ui.notifications.info("You have no valid weapons equipped!");
        return;
    }

    console.log(overloadList);
    console.log(overloadList[1][1]);
    
    let i = 0;
    let textFormDialogue = "";
    for (;overloadList[i];){
        textFormDialogue = textFormDialogue + `<option value="`+ i + `">` + overloadList[i][0] + `</option>`;
        i++;
    }
    console.log(textFormDialogue);
    console.log(overloadList);

    new Dialog({
        title: `Overcharge Weapon`,
        content: `
      <form>
        <div class="form-group">
          <label>Battery Weapons:</label>
          <select id="weapon-name" name="weapon-name">`
            + textFormDialogue + 
          `</select>
        </div>
      </form>
      `,
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: `Overcharge`,
                callback: (html) => { applyChanges(html);}
            },
            no: {
                icon: "<i class='fas fa-times'></i>",
                label: `Cancel`
            },
        }
    }).render(true);

    function applyChanges(html) {
        let overchargeWeapon = html.find('[name="weapon-name"]')[0].value;
        let indexValue = overloadList[overchargeWeapon][1];

        console.log(playerItems[indexValue]);

        let costPerShot = playerItems[indexValue].system.usage.value * 3;
        let currentAmmo = playerItems[indexValue].system.capacity.value;

        if (currentAmmo < costPerShot){
            ui.notifications.info("Not enough ammo!");
        }

        console.log(costPerShot);
        console.log(currentAmmo);

    }

})()