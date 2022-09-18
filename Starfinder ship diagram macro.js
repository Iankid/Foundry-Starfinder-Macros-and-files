// Created by @mao
// Values auto-update when you change the ship Actor's hull points or shields.
// Create the labels and get their ids, as well as change the ship name
// Ship diagram inspired by /u/Low_on_Mana's Starfinder combat tool

Hooks.on("updateActor", async (actor, data) => {
console.log('Running Diagram Update');
 
const shipName = 'Kevolari Venture';
const hullPoints = 'Uh5lWrfo2MyaXrDK';
const forwardShield = 'vAeZ3k0qaAYW3N6x';
const aftShield = 'uYrrl3byanftfj7c';
const portShield = 'NVKaFshipEeUhmmpxL';
const starboardShield = 'KrQWB0Y4d8IPWwJd';
 
if(canvas.drawings.get(hullPoints) === undefined) {
    // didn't find the drawing, remove the hook
    console.log('Removing Hook for Diagram Update');
    for (let f of Hooks._hooks.updateActor.filter(f=>f.toString().includes('Running Diagram Update')))
        Hooks.off('updateActor', f)
}
else {
    const ship = game.actors.getName(shipName);
    hp     = ship.data.data.attributes.hp.value;
    maxhp  = ship.data.data.attributes.hp.max;
    fsp    = ship.data.data.quadrants.forward.shields.value;
    maxfsp = ship.data.data.attributes.shields.evenDistribution;
    asp    = ship.data.data.quadrants.aft.shields.value;
    maxasp = ship.data.data.attributes.shields.evenDistribution;
    psp    = ship.data.data.quadrants.port.shields.value;
    maxpsp = ship.data.data.attributes.shields.evenDistribution;
    ssp    = ship.data.data.quadrants.starboard.shields.value;
    maxssp = ship.data.data.attributes.shields.evenDistribution;
 
    await canvas.drawings.get(hullPoints).data.document.update({text: hp + '/' + maxhp});
    if(hp <= 0) {
        await canvas.drawings.get(hullPoints).document.update({textColor: "#FF0000"});
    }
    else if(hp <= maxhp/2) {
        await canvas.drawings.get(hullPoints).document.update({textColor: "#FFA500"});
    }
    else {
        await canvas.drawings.get(hullPoints).document.update({textColor: "#FFFFFF"});
    }
 
    await canvas.drawings.get(forwardShield).data.document.update({text: fsp + '/' + maxfsp});
    if(fsp <= 0) {
        await canvas.drawings.get(forwardShield).document.update({textColor: "#FF0000"});
    }
    else if(fsp <= maxfsp/2) {
        await canvas.drawings.get(forwardShield).document.update({textColor: "#FFA500"});
    }
    else {
        await canvas.drawings.get(forwardShield).document.update({textColor: "#FFFFFF"});
    }
 
    await canvas.drawings.get(aftShield).data.document.update({text: asp + '/' + maxasp});
    if(asp <= 0) {
        await canvas.drawings.get(aftShield).document.update({textColor: "#FF0000"});
    }
    else if(asp <= maxasp/2) {
        await canvas.drawings.get(aftShield).document.update({textColor: "#FFA500"});
    }
    else {
        await canvas.drawings.get(aftShield).document.update({textColor: "#FFFFFF"});
    }
 
    await canvas.drawings.get(portShield).data.document.update({text: psp + '/' + maxpsp});
    if(psp <= 0) {
        await canvas.drawings.get(portShield).document.update({textColor: "#FF0000"});
    }
    else if(psp <= maxpsp/2) {
        await canvas.drawings.get(portShield).document.update({textColor: "#FFA500"});
    }
    else {
        await canvas.drawings.get(portShield).document.update({textColor: "#FFFFFF"});
    }
 
    await canvas.drawings.get(starboardShield).data.document.update({text: ssp + '/' + maxssp});
    if(ssp <= 0) {
        await canvas.drawings.get(starboardShield).document.update({textColor: "#FF0000"});
    }
    else if(ssp <= maxssp/2) {
        await canvas.drawings.get(starboardShield).document.update({textColor: "#FFA500"});
    }
    else {
        await canvas.drawings.get(starboardShield).document.update({textColor: "#FFFFFF"});
    }
}
});
