(async ()=> {
// pulls the save of every player listed in the folder named "Player Characters" within the Actors directory, then whisper the GM with the results
// Original author - @Erogroth#7134
// Edited for Starfinder by Iankid

let fid = game.folders.getName('Player Characters').id;
let actors = game.actors.entities.filter(e => e.data.folder === fid);

// pull each player's save
let messageContent = '';
let messageHeader = '<b>Perception</b><br>';
for(let actor of actors) {
  const fort = actor.data.data.attributes.fort.bonus; // this gives the save mod
  const fs = new Roll(`1d20+${fort}`).roll().total;
   messageContent += `${actor.name}; <b>Fortitude</b> ${fs};<br>`; // creating the output string
}

// create the message
if(messageContent !== '') {
  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: messageHeader + messageContent,
    whisper: game.users.entities.filter(u => u.isGM).map(u => u._id)
  };
  ChatMessage.create(chatData, {});
}
})();
