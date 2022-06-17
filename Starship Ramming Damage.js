const starship = canvas.tokens.controlled[0]?.actor;

if (!starship || starship.type !== "starship") {
    ui.notifications.error("Please select a starship.");
    return;
}

//Get speed from starship
const speed = starship.items.find(i => i.type === "starshipThruster").data.data.speed;

//Get speed from starship
const size = starship.items.find(i => i.type === "starshipFrame").data.data.size;

//Get an array of starhsip sizes
const sizeArray = Object.keys(CONFIG.SFRPG.starshipSizes);

//Get the index of the starship's size from the size array, add 1 because arrays start at 0
const sizeValue = sizeArray.indexOf(size) + 1;

//Roll it!
const roll = new Roll(`1d4 * ${sizeValue} + 1d4 * ${Math.floor(speed/2)}`);
roll.toMessage({flavor: "Ramming Damage"});