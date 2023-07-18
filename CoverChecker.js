/*
Cover Checker by Nezix on V10
Set a target and select your token
Normal Click: Draws four lines from your token's corner that is closest to the center of the target.
Shift or Alt or Ctrl + Click: The same as above except it cycles between each of your corners, as there are some edge cases where the closest corner isn't the best.
*/

if (!token)
{
    ui.notifications.info("Select your token in the scene.");
    return;
}

if (!game.user.targets.first())
{
    ui.notifications.info("You must set a target.");
    return;
}

let sfDrawingIDs = [];
let cornerIndex = -1;

const delay = ms => new Promise(res => setTimeout(res, ms));
const documentType = "Drawing";
const flagType = "world";
const flagName = "LosMacro";
const time = 2000; // in milliseconds
const targetToken = game.user.targets.first().document;
const scene = game.scenes.current;
const hexSize = game.scenes.current.grid.size;
const usingAlt = event.altKey;
const usingCtrl = event.ctrlKey;
const usingShift = event.shiftKey;
const noModifiers = !usingAlt && !usingCtrl && !usingShift;

const targetCenter = 
{
	x: targetToken.x + targetToken.width / 2,
	y: targetToken.y + targetToken.height / 2
};

const targetCorners = 
[
    { 
        x:targetToken.x, 
        y:targetToken.y                               // top left
    },
    { 
        x:targetToken.x + targetToken.width * hexSize, // bottom right
        y:targetToken.y + targetToken.height * hexSize
    },
    { 
        x:targetToken.x, 
        y:targetToken.y + targetToken.height * hexSize  // bottom left
    },
    { 
        x:targetToken.x + targetToken.width * hexSize, // top right
        y:targetToken.y
    }
];

const originTokenCorners = 
[
    { 
        x:token.x, 
        y:token.y            // top left
    },
    { 
        x:token.x + token.w, // bottom right
        y:token.y + token.h
    },
    { 
        x:token.x, 
        y:token.y + token.h // bottom left
    },
    { 
        x:token.x + token.w, // top right
        y:token.y
    }
];

// Calculate the distance between two points
function getDistance(x1, y1, x2, y2) 
{
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}

// No modifiers, just a regular mode of using the closest corner of your token
if (noModifiers)
{
    let leastDistance = 99999;
    // find which of our token's corners is closest to the target's center
    for (let i = 0; i < originTokenCorners.length; i++)
    {
        let distance = getDistance(originTokenCorners[i].x, originTokenCorners[i].y, targetCenter.x, targetCenter.y);
        if (distance < leastDistance)
        {
            leastDistance = distance;
            cornerIndex = i;
        }
    }

    displayLines(cornerIndex);
}
// Cycle between all of your tokens corners automatically over time
else if (!noModifiers) // potentially use more specific modifiers for other modes in the future
{
    for (let i = 0; i < originTokenCorners.length; i++)
    {
        cornerIndex = i;
        await displayLines(cornerIndex);
        await delay(time);
        sfDrawingIDs = [];
    }

}

// display lines from a corner of our token to each of the target's corners
async function displayLines(originCornerIndex)
{
    let rays = [];
    for (let k = 0; k < targetCorners.length; k++)
    {
        let polyPointX = targetCorners[k].x - originTokenCorners[originCornerIndex].x;
        let polyPointY = targetCorners[k].y - originTokenCorners[originCornerIndex].y;

        rays.push(
            {
                "shape": {
                    "type": "p",
                    "points": [
                        0,
                        0,
                        polyPointX,
                        polyPointY
                    ]
                },
                "strokeColor": "#00ff00",
                "strokeWidth": 3,
                "strokeAlpha": 1,
                "x": originTokenCorners[originCornerIndex].x,
                "y": originTokenCorners[originCornerIndex].y,
                "flags": {
                    "world": {           // flagType
                        "LosMacro": true // flagName
                    }
                }
            }
        );
    }

    await canvas.scene.createEmbeddedDocuments(documentType, rays);
    cleanUp();
}

// remove our drawings
function cleanUp()
{
    for (let p = canvas.scene.drawings.filter(s => s.getFlag(flagType, flagName)).length; p > 0; --p)
    {
        sfDrawingIDs.push(canvas.scene.drawings.filter(s => s.getFlag(flagType, flagName))[p-1]._id);
    }
    setTimeout(() => canvas.scene.deleteEmbeddedDocuments(documentType, sfDrawingIDs), time);
}
