// Open a dialog for quickly changing token vision parameters of the controlled tokens.
// This macro was written by @Sky#9453 and edited for Starfinder by Iankid, further editted by Kek.
// https://github.com/Sky-Captain-13/foundry
  
(async ()=> {
  let macro_token = canvas.tokens.controlled !== 0 ? token : canvas.tokens.placeables.find(i=> i.data.actorId === character.id);

  if(!macro_token) return;
  
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

  function applyChanges(html)
  {
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
        break;
      case "dark60":
        update.brightSight = 60;
        break;
      case "dark120":
        update.brightSight = 120;
        break;
      case "dark180":
        update.brightSight = 180;
        break;
    }
    switch (lightSource) {
      case "none":
        update.dimLight = 0;
        update.brightLight = 0;
        break;
      case "commlight":
        update.dimLight = 15;
        update.brightLight = 13.5;
        update.lightAngle = 45;
        break;
      case "flashlight":
        update.dimLight = 20;
        update.brightLight = 18.5;
        update.lightAngle = 45;
        break;
      case "lantern":
        update.dimLight = 10;
        update.brightLight = 8.5;
        break;
      case "spotlight":
        update.dimLight = 100;
        update.brightLight = 98.5;
        update.lightAngle = 45;
        break;
      case "beacon":
        update.dimLight = 50;
        update.brightLight = 48.5;
        break;
    }

    switch (blinded) {
      case "yes":
update["flags.perfect-vision.sightLimit"] = 0;
        break;
      case "no":
update["flags.perfect-vision.-=sightLimit"] = null;
        break;
    }

    macro_token.update(update);
  }
})();
