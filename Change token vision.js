// Open a dialog for quickly changing token vision parameters of the controlled tokens.
// This macro was written by @Sky#9453 and edited for Starfinder by Iankid, further edited by Kek, then CptTwinkie fixed it.
// https://github.com/Sky-Captain-13/foundry

let visionDialog = async function() {
    let macro_token = canvas.tokens.controlled !== 0 ? token : canvas.tokens.placeables.find(i=> i.data.actorId === character.id);
    if(!macro_token)
        return;

    new Dialog({
        title: `Token Vision Configuration`,
        content: `
      <form>
        <div class="form-group">
          <label>Vision Type:</label>
          <select id="vision-type" name="vision-type">
            <option value="nochange">No Change</option>
            <option value="dark0">Self</option>
            <option value="low0">Low-light Vision</option>
            <option value="dark60">Darkvision (60 ft)</option>
            <option value="dark120">Darkvision (120 ft)</option>
            <option value="dark180">Darkvision (180 ft)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Light Source:</label>
          <select id="light-source" name="light-source">
            <option value="nochange">No Change</option>
            <option value="none">None</option>
            <option value="commlight">Comm Light (15 ft.)</option>
            <option value="flashlight">Flashlight (20 ft.)</option>
            <option value="lantern">Lantern (10 ft. Radius)</option>
            <option value="spotlight">Spotlight (100 ft.)</option>
            <option value="beacon">Beacon (50 ft. Radius)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Blinded:</label>
          <select id="blinded" name="blinded">
            <option value="nochange">No Change</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </form>
      `,
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: `Apply Changes`,
                callback: (html) => { applyChanges(html);}
            },
            no: {
                icon: "<i class='fas fa-times'></i>",
                label: `Cancel Changes`
            },
        }
    }).render(true);

    function applyChanges(html)  {
        let visionType = html.find('[name="vision-type"]')[0].value || "nochange";
        let lightSource = html.find('[name="light-source"]')[0].value || "nochange";
        let blinded = html.find('[name="blinded"]')[0].value || "nochange";

        let update = {};

        switch (visionType) {
            case "dark0":
                update.dimSight = 1;
                update.brightSight = 0;
                break;
            case "low0":
                update.dimSight = 200;
                update.brightSight = 0;
                break;
            case "dark60":
                update.dimSight = 1;
                update.brightSight = 60;
                break;
            case "dark120":
                update.dimSight = 1;
                update.brightSight = 120;
                break;
            case "dark180":
                update.dimSight = 1;
                update.brightSight = 180;
                break;
        }

        switch (lightSource) {
            case "none":
                update.light = {};
                update.light.dim = 0;
                update.light.bright = 0;
                update.light.angle = 360;
                break;
            case "commlight":
                update.light = {};
                update.light.dim = 15;
                update.light.bright = 13.5;
                update.light.angle = 45;
                break;
            case "flashlight":
                update.light = {};
                update.light.dim = 20;
                update.light.bright = 18.5;
                update.light.angle = 45;
                break;
            case "lantern":
                update.light = {};
                update.light.dim = 10;
                update.light.bright = 8.5;
                update.light.angle = 360;
                break;
            case "spotlight":
                update.light = {};
                update.light.dim = 100;
                update.light.bright = 100;
                update.light.angle = 45;
                break;
            case "beacon":
                update.light = {};
                update.light.dim = 50;
                update.light.bright = 48.5;
                update.light.angle = 360;
                break;
        }

        switch (blinded) {
            case "yes":
                update.vision = false;
                break;
            case "no":
                update.vision = true;
                break;
        }

        macro_token.document.update(update);
        macro_token.updateSource();
    }
}

await visionDialog();