/*
Intended Use:
Click on the token of the thrower, mouse over where you intend to throw the grenade, and then press the macro hotkey button on your keyboard.

Macro will inform you if you do not have a token selected, or have nothing it sees as a valid grenade and by default includes support
for all published versions of cluster grenade launchers as of 7/20/2023.
*/

(async function(){

    //const gridSize = game.scenes.current.grid.size;
    //const gridDistance = game.scenes.current.grid.distance;

    //checks to see if a token is selected
    if (!token) {
      ui.notifications.info("Select a token on the active scene!");
      return;
    }

    //grabs the actor based on token controlled in the scene, then gets the name of that actor
    const actorName = canvas.tokens.controlled[0].document.name;

    let grenadeChucker = game.actors.getName(actorName);

    //grabs their inventory, the length of their inventory array, and where they're moused over (to throw grenade)
    let actorInventory = grenadeChucker.items._source;
    let actorInventoryLength = grenadeChucker.items._source.length;
    const mouseX = canvas.mousePosition.x;
    const mouseY = canvas.mousePosition.y;

    //defines empty set to store full list of found grenades in
    let grenadeList = [];

    //iterates through inventory, looking for anything that has both the "thrown" and "explode" property, and adds the name into the grenadeList
    for (let i = actorInventoryLength - 1; i > 0; i--){

        //console.log(actorInventory[i]);
        //in a try/catch block because these aren't valid properties for a lot of items, if it fails to define either or both, just move on because it's not a grenade
        try {
            let canExplode = actorInventory[i].system.properties.explode;
            let canThrow = actorInventory[i].system.properties.thrown;
            if (canExplode && canThrow){
                grenadeList.push(actorInventory[i].name);
            }
        } catch(e) {

        }
        
    }

    if (grenadeList.length < 1){
      ui.notifications.info("You have no grenades!");
      return;
    }

    //generates the necessary text dialogue by iterating through the now-populated grenadeList
    let i = 0;
    let textFormDialogue = "";
    for (;grenadeList[i];){
        textFormDialogue = textFormDialogue + `<option value="`+ i + `">` + grenadeList[i] + `</option>`;
        i++;
    }

    //creates dialog box, using the dynamically generated list of grenades in the actor's inventory as well as offering to choose cluster modifiers if appropriate
    new Dialog({
        title: `Select Grenade Weapon`,
        content: `
      <form>
        <div class="form-group">
          <label>Grenades:</label>
          <select id="grenade-name" name="grenade-name">`
            + textFormDialogue + 
          `</select>
        </div>
        <div class="form-group">
          <label>Cluster? </label>
          <select id="cluster-value" name="cluster-value">
            <option value="0">No</option>
            <option value="5">Tactical (5ft)</option>
            <option value="10">Advanced/Elite (10ft)</option>
            <option value="15">Paragon (15ft)</option>
          </select>
        </div>
      </form>
      `,
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: `Throw`,
                callback: (html) => { applyChanges(html);}
            },
            no: {
                icon: "<i class='fas fa-times'></i>",
                label: `Cancel`
            },
        }
    }).render(true);

    //the function called by the form when submitted
    async function applyChanges(html) {
        //marks out the user's selection, both the value of the grenade in the index and the value associated with the cluster range bonus
        //no reason this couldn't have used the name of the grenade instead, just took the value of the index of the array because I already had it and should be inconsequentially faster
        let formSelection = html.find('[name="grenade-name"]')[0].value;
        let clusterValue = html.find('[name="cluster-value"]')[0].value;

        //console.log(formSelection);

        //selects the grenade name string from the list, then finds the associated object, and pulls the range from the object, adding the already-selected cluster bonus
        let selectedGrenade = grenadeList[formSelection];

        let grenadeObject = grenadeChucker.items.getName(selectedGrenade);
        let grenadeRange = Number(grenadeObject.system.area.value) + Number(clusterValue);
        
        //console.log(selectedGrenade);
        //console.log(grenadeObject);
        //console.log(grenadeRange);

        //creates the actual measured template document, type circle, with all the pre-determined criteria, owned by the user invoking the macro
        await canvas.scene.createEmbeddedDocuments('MeasuredTemplate', [{
            t:'circle',
            user: game.user,
            x: mouseX,
            y: mouseY,
            direction: 0,
            distance: grenadeRange,
            borderColor: "#800000",
            fillColor: "#800000",
        }]);

    }

})()