// pulls the save of every player listed in the folder named "Player Characters" within the Actors directory, then whisper the GM with the results
// Original author - @Erogroth#7134
// Edited for Starfinder by Iankid
// Fixed by LebombJames ;)

let fid = game.folders.getName('Player Characters').id;
let actors = game.actors.filter(e => e.data.folder === fid);

// pull each player's save
let messageContent = '';
let messageHeader = '<p><b>Will Saves:</b><hr />';
for (let actor of actors) {
    if (!["character","npc","npc2","drone"].includes(actor.type)) continue //skip non-PCs, NPCs and Drones
    const will = actor.data.data.attributes.will.bonus; // this gives the save mod
    const roll = await new Roll(`1d20+${will}`);
    const eval = await roll.evaluate({async: true});
    const total = eval.total;
    messageContent += `<b>${actor.name}:</b> ${total}<br>`; // creating the output string
}

// create the message
if (messageContent !== '') {
    let chatData = {
        user: game.user.id,
        speaker: ChatMessage.getSpeaker(),
        content: messageHeader + messageContent,
        whisper: game.users.filter(u => u.isGM).map(u => u.id)
    };
    
    ChatMessage.create(chatData, {});
}