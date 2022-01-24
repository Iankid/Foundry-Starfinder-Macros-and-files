/**********************************************************************
 **********************************************************************
 **
 ** Common Calculations
 **
 ** Written by CptTwinkie
 **
 **********************************************************************
 v1.0******************************************************************/

let DcDialog = async function() {
    let macro_token = canvas.tokens.controlled !== 0 ? token : canvas.tokens.placeables.find(i=> i.data.actorId === character.id);
    if(!macro_token)
    {
        ui.notifications.error("Please select a token!", {permanent: true});
        return;
    }

    let data = macro_token.actor.data.data;

    // Type
    const tokenType = macro_token.actor.type;
    console.log(tokenType);
    let isShip = tokenType === "starship";
    let isPlayer = tokenType === "character";
    let isNpc = ["npc", "npc2"].includes(tokenType);

    if (!isShip && !isPlayer && !isNpc) {
        ui.notifications.error("Unknown actor type", {permanent: true});
        return;
    }

    // CR
    let cr = 0;
    if (isShip)
        cr = data.details.tier;
    else if (isPlayer)
        cr = data.details.level.value;
    else
        cr = data.details.cr;

    let cr15 = Math.floor(1.5 * cr);
    let x5  = 5 + cr15;
    let x10 = 5 + x5;
    let x15 = 5 + x10;
    let x20 = 5 + x15;

    let _dialog = {};
    if (isPlayer || isNpc) {
        let kac = data.attributes.kac.value;
        let eac = data.attributes.eac.value;
        let ref = data.attributes.reflex.bonus;
        let kac4 = 4 + kac;
        let kac8 = 8 + kac;
        let softCover = `${kac + 4} / ${eac + 4}`
        let partialCover  = `${kac + 2} / ${eac + 2}; REF: ${ref + 1}`
        let regularCover  = `${kac + 4} / ${eac + 4}; REF: ${ref + 2}`
        let improvedCover = `${kac + 8} / ${eac + 8}; REF: ${ref + 4}`

        _dialog = new Dialog({
            title: `${macro_token.name} Calculated Values`,
            content: `
          <form>
            <div class="form-group">
            <label><u>Difficulties</u></label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 5:</label>
              <label>${x5}</label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 10:</label>
              <label>${x10}</label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 15:</label>
              <label>${x15}</label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 20:</label>
              <label>${x20}</label>
            </div>
            <div>&nbsp;</div>
            <div class="form-group">
            <label><u>ACs</u></label>
            </div>
            <div class="form-group">
              <label>KAC + 4:</label>
              <label>${kac4}</label>
            </div>
            <div class="form-group">
              <label>KAC + 8:</label>
              <label>${kac8}</label>
            </div>
            <div>&nbsp;</div>
            <div class="form-group">
            <label><u>Cover (KAC / EAC)</u></label>
            </div>
            <div class="form-group">
              <label>Soft</label>
              <label>${softCover}</label>
            </div>
            <div class="form-group">
              <label>Partial</label>
              <label>${partialCover}</label>
            </div>
            <div class="form-group">
              <label>Regular</label>
              <label>${regularCover}</label>
            </div>
            <div class="form-group">
              <label>Improved</label>
              <label>${improvedCover}</label>
            </div>
          </form>`,
            buttons: {yes: {label: `OK`}}
        });
    } else {
        _dialog = new Dialog({
            title: `${macro_token.name} Calculated Values`,
            content: `
          <form>
            <div class="form-group">
            <label><u>Difficulties</u></label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 5:</label>
              <label>${x5}</label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 10:</label>
              <label>${x10}</label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 15:</label>
              <label>${x15}</label>
            </div>
            <div class="form-group">
              <label>1.5x CR + 20:</label>
              <label>${x20}</label>
            </div>`,
            buttons: {yes: {label: `OK`}}
        });
    }

    _dialog.render(true);
}

await DcDialog();