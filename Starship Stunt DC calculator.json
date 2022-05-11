/*****************************************************
 ** /r 10/15/20 + (@details.tier * 1.5)
 ******************************************************/

(async function () {
  if (!token) {
    ui.notifications.error("Select a ship token on the active scene!");
    return;
  }

  const starshipTier = token.actor.data.data.details.tier;
  console.log(starshipTier);

  new Dialog({
    title: `Calculate DC`,
    content: `
        <div>
            <div style="margin: 10px 0">
            <b>Back off</b>: ${ 10 + 1.5 * starshipTier } <small>(DC10 + (1.5 x Tier))</small>
            </div>
            <div style="margin: 10px 0">
            <b>Barrel Roll</b>: ${ 10 + 1.5 * starshipTier } <small>(DC10 + (1.5 x Tier))</small>
            </div>
            <div style="margin: 10px 0">
            <b>Evade</b>: ${ 10 + 1.5 * starshipTier } <small>(DC10 + (1.5 x Tier))</small>
            </div>
            <div style="margin: 10px 0">
            <b>Flip and Burn</b>: ${ 15 + 1.5 * starshipTier } <small>(DC15 + (1.5 x Tier))</small>
            </div>
            <div style="margin: 10px 0">
            <b>Flyby</b>: ${ 15 + 1.5 * starshipTier } <small>(DC15 + (1.5 x Tier))</small>
            </div>
            <div style="margin: 10px 0">
            <b>Slide</b>: ${ 10 + 1.5 * starshipTier } <small>(DC10 + (1.5 x Tier))</small>
            </div>
            <div style="margin: 10px 0">
            <b>Turn in Place</b>: Not applicable
            </div>
        </div>
        `,
    buttons: {
      no: {
        label: `Close`,
      },
    },
  }).render(true);
})();
