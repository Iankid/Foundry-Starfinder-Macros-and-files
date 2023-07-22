/*
Intended Use:
Activate Overcharge macro -> do attack roll -> add Overcharge damage in the situational modifier portion of the damage

Macro will inform you if you do not have a token selected, you have no valid weapon, or your battery lacks enough ammo.
If other errors occur and your character sheet is very old, consider deleting and re-adding the weapons and batteries, there are some
niche issues with really old objects in the system having different settings that the macro can't account for.
*/

(async function(){

    //makes sure user has selected a token
    if (!token) {
        ui.notifications.info("Select a token on the active scene!");
        return;
    }

    //grabs the inventory and inventory length of the actor associated with the token, defines an empty set of weapons able to be overloaded to populate later
    const itemLength = token.actor.items._source.length;
    const playerItems = token.actor.items._source;
    let overloadList = []; 

    //console.log(playerItems);
    //console.log(itemLength);

    //iterates through character inventory, checking for items that have the type "weapon" and use "charge" as ammo, the requirements for using the Overcharge feature
    //adds the item name and indicates its position in the item array to refer to later
    for (let i = itemLength - 1; i > 0; i--){
        if (playerItems[i].type == "weapon" && playerItems[i].system.ammunitionType == "charge" && playerItems[i].system.equipped){
            //console.log(playerItems[i].name);
            overloadList.push([playerItems[i].name, listId = i]);
        }
    }

    //if the list is empty, inform the user they don't have the appropriate weapons, and quit
    if (overloadList.length < 1){
        ui.notifications.info("You have no valid weapons equipped!");
        return;
    }

    //console.log(overloadList);
    //console.log(overloadList[1][1]);
    
    //generates the necessary text to fill the dialog box with names of the found items
    let i = 0;
    let textFormDialogue = "";
    for (;overloadList[i];){
        textFormDialogue = textFormDialogue + `<option value="`+ i + `">` + overloadList[i][0] + `</option>`;
        i++;
    }
    //console.log(textFormDialogue);
    //console.log(overloadList);

    //creates the dialog box, using the generated text 
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

    //called when submitting dialog box
    function applyChanges(html) {

        //grabs the weapon name from the sheet
        let overchargeWeapon = html.find('[name="weapon-name"]')[0].value;
        let weaponName = overloadList[overchargeWeapon][0];
        //console.log(overloadList);
        //console.log(overchargeWeapon);
        //console.log(weaponName);

        //grabs the weapon object, and then finds the battery object stored inside the weapon object
        let mainWeapon = token.actor.items.getName(weaponName);
        let battery = mainWeapon.contents.find(i=>i.type==="ammunition");
        //console.log(mainWeapon);
        //console.log(mainWeapon.contents.find(i=>i.type==="ammunition"));

        //does the math to make sure the weapon has enough ammo, then determines how much 'extra' ammo is going to be expended
        let overchargeTax = mainWeapon.system.usage.value * 2;
        let totalNeeded = mainWeapon.system.usage.value * 3;
        let currentAmmo = battery.system.capacity.value;
        let ammoRemaining = currentAmmo - overchargeTax;

        //console.log(currentAmmo);
        // if they're short ammo, inform them and exit

        if (currentAmmo < totalNeeded){
            ui.notifications.info("Not enough ammo!");
            return;
        }

        //otherwise, create the update array for the battery object, modifying its capacity to the new value, and update the battery object with the new value
        let pathString = "system.capacity.value";
        
        let changeSet = {[pathString] : ammoRemaining};
        
        battery.update(changeSet);

    }

})()