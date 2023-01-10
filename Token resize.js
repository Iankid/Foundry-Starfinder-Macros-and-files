// Open a dialog for quickly changing token vision parameters of the controlled tokens.
// This macro was written by @Sky#9453 and edited for Starfinder by Iankid, further editted by Kek.
// https://github.com/Sky-Captain-13/foundry
  
(async ()=> {
  let macro_token = canvas.tokens.controlled !== 0 ? token : canvas.tokens.placeables.find(i=> i.data.actorId === character.id);

  if(!macro_token) return;
  
  new Dialog({
    title: `Token Resize`,
    content: `
      <form>
        <div class="form-group">
          <label>Full Resize:</label>
          <select id="full" name="Full">
            <option value="noChange">No change</option>
            <option value="0.5">2.5 ft. (Tiny or smaller)</option>
            <option value="1">5 ft. (Small or Medium)</option>
            <option value="2">10 ft. (Large)</option>
            <option value="3">15 ft. (Huge)</option>
            <option value="4">20 ft. (Gargantuan)</option>
            <option value="5">25 ft.</option>
            <option value="6">30 ft. (Colossal)</option>
          </select>
        </div>
      <form>
        <div class="form-group">
          <label>Horizontal Resize:</label>
          <select id="horizontal " name="Horizontal">
            <option value="noChange">No change</option>
            <option value="0.5">2.5 ft. (Tiny or smaller)</option>
            <option value="1">5 ft. (Small or Medium)</option>
            <option value="2">10 ft. (Large)</option>
            <option value="3">15 ft. (Huge)</option>
            <option value="4">20 ft. (Gargantuan)</option>
            <option value="5">25 ft.</option>
            <option value="6">30 ft. (Colossal)</option>
          </select>
        </div>
      <form>
        <div class="form-group">
          <label>Vertical Resize:</label>
          <select id="vertical" name="Vertical">
            <option value="noChange">No change</option>
            <option value="0.5">2.5 ft. (Tiny or smaller)</option>
            <option value="1">5 ft. (Small or Medium)</option>
            <option value="2">10 ft. (Large)</option>
            <option value="3">15 ft. (Huge)</option>
            <option value="4">20 ft. (Gargantuan)</option>
            <option value="5">25 ft.</option>
            <option value="6">30 ft. (Colossal)</option>
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
    let full = html.find('[name="Full"]')[0].value || "nochange";
    let horizontal = html.find('[name="Horizontal"]')[0].value || "nochange";
    let vertical = html.find('[name="Vertical"]')[0].value || "nochange";

    let update = {};

    switch (full) {
      case "noChange":
        break;
      case "0.5":
        update.height = 0.5;
        update.width = 0.5;
        break;
      case "1":
        update.height = 1;
        update.width = 1;
        break;
      case "2":
        update.height = 2;
        update.width = 2;
        break;
      case "3":
        update.height = 3;
        update.width = 3;
        break;
      case "4":
        update.height = 4;
        update.width = 4;
        break;
      case "5":
        update.height = 5;
        update.width = 5;
        break;
      case "6":
        update.height = 6;
        update.width = 6;
        break;
    }

    switch (horizontal) {
      case "noChange":
        break;
      case "0.5":
        update.width = 0.5;
        break;
      case "1":
        update.width = 1;
        break;
      case "2":
        update.width = 2;
        break;
      case "3":
        update.width = 3;
        break;
      case "4":
        update.width = 4;
        break;
      case "5":
        update.width = 5;
        break;
      case "6":
        update.width = 6;
        break;
    }

    switch (vertical) {
      case "noChange":
        break;
      case "0.5":
        update.height = 0.5;
        break;
      case "1":
        update.height = 1;
        break;
      case "2":
        update.height = 2;
        break;
      case "3":
        update.height = 3;
        break;
      case "4":
        update.height = 4;
        break;
      case "5":
        update.height = 5;
        break;
      case "6":
        update.height = 6;
        break;
    }

        macro_token.document.update(update);
        macro_token.updateSource();
  }
})();
