// Pull the Take 10 & Rolled perception of each token in the current scene and whisper the results to the GM.
// Does not work with old style Starfinder NPC sheets.
// Author: @Drunemeton#7955. Based on the original macro by author @Erogroth#7134. Modified for Starfinder by Iankid.

// Initalize variables.
let pcArray = [];
let npcArray = [];
let messageContentPC = "";
let messageContentNPC = "";
let messageHeaderPC = "<b>PC Take 10 & Rolled Perception</b><br>";
let messageHeaderNPC = "<b>NPC Take 10 & Rolled Perception</b><br>";

// Gather tokens in the current scene into an array.
let tokens = canvas.tokens.placeables.filter((token) => token.data && token.actor);

// From the tokens array sort into PC and NPC arrays.
for (let count of tokens) {

  let tokenType = count.actor.data.type;
  let tokenName = count.data.name;
  const perMod = count.actor.data.data.skills.per.mod;
  const result = await new Roll(`1d20+${perMod}`).roll({async: true});
  let tokenPassive = perMod+10;
  let tokenRolled = result.total;

  
  if(tokenType === "character") {
    pcArray.push({ name: tokenName, passive: tokenPassive, rolled: tokenRolled });
  } 
  if(tokenType === "npc2") {
    npcArray.push({ name: tokenName, passive: tokenPassive, rolled: tokenRolled });
  }
}

// Sort each array.
sortArray(pcArray);
sortArray(npcArray);

// Build chat message, with PCs first, then NPCs.
for (let numPC of pcArray) {
  messageContentPC += `${numPC.name}: <b>${numPC.passive} / ${numPC.rolled}</b><br>`;
}
for (let numNPC of npcArray) {
  messageContentNPC += `${numNPC.name}: <b>${numNPC.passive} / ${numNPC.rolled}</b><br>`;
}

let chatMessage = (messageHeaderPC + messageContentPC + `<br>` + messageHeaderNPC + messageContentNPC);

let chatData = {
  user: game.user._id,
  speaker: ChatMessage.getSpeaker(),
  content: chatMessage,
  whisper: game.users.filter((u) => u.isGM).map((u) => u._id),
};

// Display chat message.
ChatMessage.create(chatData, {});

// Sort each array by Name.
  function sortArray(checkArray) {
    checkArray.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    // Sort array by Passive Perception.
    checkArray.sort(function (a, b) {
      return b.passive - a.passive;
    });
  }
