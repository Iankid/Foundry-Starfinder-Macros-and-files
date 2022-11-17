/*
Starfinder Quadrant and Ranging Macro
Based on work by Sputt and CptTwinkie, with help from Zhell, Freeze, and honeybadger
Updated for Foundry V10.290
Read comment lines above code blocks before attempting to modify
@RZ#1917 on Discord if you're having issues modifying to suit needs
*/

//Checks to make sure a token is selected, otherwise reminds
if (!token) {
        ui.notifications.info("Select a ship token on the active scene!");
        return;
    }

//grabs x y coordinate of selected (starship) token, and translates it into center,center instead of top-left
const origin = {
	x: token.x + token.w / 2,
	y: token.y + token.h / 2
    };

//presets, ranges given in terms of hexes, colors defined by hexcode
//can be modified if desired, needs to always be set in pairs though, will automatically generate more circles and cross-hatches, quadrants are fixed
//timeToLive how long it stays on screen, in miliseconds (10000 = 10 seconds)
const ranges = [5, 10, 20, 40]
const colors = ["#40FF40", "#ffff40", "#ff4040", "#000000"]
const timeToLive  = 10000

// hexsize, distance per hex, and token rotation automatically grabbed from current scene to (mostly) ensure scaling if weird settings are encountered
// array instantiated for later use in cleanup
// DO NOT MODIFY 
const hexSize = game.scenes.current.grid.size;
const distancePerHex = game.scenes.current.grid.distance;
const tokenRotation = (token.document.flags["about-face"] && (typeof token.document.flags["about-face"].direction) !== "undefined") ? token.document.flags["about-face"].direction : token.document.rotation;
const sfDrawingIDs = [];

//generates the range circles, centering them on the token
//can modify the "strokeWidth" and "strokeAlpha" if desired, using whole numbers and decimals between 0 and 1, respectively
for (let i = ranges.length; i > 0; --i){
    await canvas.scene.createEmbeddedDocuments("Drawing", [{
        shape: {
            type: "e", 
            width: ranges[i-1]*2*(hexSize/distancePerHex), 
            height: ranges[i-1]*2*(hexSize/distancePerHex)}, 
        strokeColor:colors[i-1],
        strokeWidth:3,
        strokeAlpha:1,
        x: origin.x - ranges[i-1]*(hexSize/distancePerHex),
		y: origin.y - ranges[i-1]*(hexSize/distancePerHex),
		flags: {world: {SFRangeAndQuad: true}}
        }]);
};

//generates the cross-hatch lines for quadrants in offset pairs
//again, "strokeWidth" and "strokeAlpha" are the modifiers, do not modify the "width" value
for (let i = ranges.length; i > 0; --i){
    await canvas.scene.createEmbeddedDocuments("Drawing", [{
        shape: {
            type: "r", 
            width: 1, 
            height: ranges[i-1]*2*(hexSize/distancePerHex)}, 
        strokeColor:colors[i-1],
        strokeWidth:3,
        strokeAlpha:1,
        x: origin.x,
        y: origin.y - ranges[i-1]*(hexSize/distancePerHex),
		rotation:330 + tokenRotation,
		flags: {world: {SFRangeAndQuad: true}}
        }]);
    await canvas.scene.createEmbeddedDocuments("Drawing", [{
        shape: {
            type: "r", 
            width: 1, 
            height: ranges[i-1]*2*(hexSize/distancePerHex)}, 
        strokeColor:colors[i-1],
        strokeWidth:3,
        strokeAlpha:1,
        x: origin.x,
        y: origin.y - ranges[i-1]*(hexSize/distancePerHex),
		rotation:30 + tokenRotation,
		flags: {world: {SFRangeAndQuad: true}}
        }]);
};

//bad trigonometry math to find coordinates for quadrants
const triangleHeight = ranges[3] * (hexSize/distancePerHex) * Math.sqrt(3)
const triangleWidth = ranges[3] * (hexSize/distancePerHex)

//handles left quadrant
await canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			triangleWidth * -1, triangleHeight,
			triangleHeight * -1, 0,
			triangleWidth * -1, triangleHeight * -1,
			0,0
			]
		}, 
	fillColor:"#00FFFF",
	fillAlpha: .1,
	fillType: 1,
	strokeWidth:0,
	rotation: tokenRotation,
	flags: {world: {SFRangeAndQuad: true}}
	}]);

//handles right quadrant
await canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			triangleWidth, triangleHeight,
			triangleHeight, 0,
			triangleWidth, triangleHeight * -1,
			0,0
			]
		}, 
	fillColor:"#00FFFF",
	fillAlpha: .1,
	fillType: 1,
	strokeWidth:0,
	rotation: tokenRotation,
	flags: {world: {SFRangeAndQuad: true}}
	}]);

/*
rear quadrant
note the height variables may be reversed from 'expected' due to how foundry handles grid
negative means towards top and left of screen from center of object, positive means towards bottom and right of screen from center of object
only thing to modify here is "fillColor" and "fillAlpha"
*/
await canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			triangleWidth, triangleHeight,
			triangleWidth * -1, triangleHeight,
			0,0
			]
		}, 
	fillColor:"#ff4040",
	fillAlpha: .1,
	fillType: 1,
	strokeWidth:0,
	rotation: tokenRotation,
	flags: {world: {SFRangeAndQuad: true}}
	}]);

//front quadrant, same with "fillColor" and "fillAlpha"
await canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			triangleWidth  * -1, triangleHeight * -1,
			triangleWidth, triangleHeight * -1,
			0,0
			]
		}, 
	fillColor:"#40FF40",
	fillAlpha: .1,
	fillType: 1,
	strokeWidth:0,
	rotation: tokenRotation,
	flags: {world: {SFRangeAndQuad: true}}
    }]);
    
//iterates through the list of all tagged drawings, grabbing ids for deletion
//there's basically zero reason you should ever modify this barring significant Foundry changes
for (let i = canvas.scene.drawings.filter(s => s.getFlag("world", "SFRangeAndQuad")).length; i > 0; --i){
	sfDrawingIDs.push(canvas.scene.drawings.filter(s => s.getFlag("world", "SFRangeAndQuad"))[i-1]._id);
}
setTimeout(() => canvas.scene.deleteEmbeddedDocuments("Drawing", sfDrawingIDs), timeToLive);

//CLEARS ALL DRAWINGS ON SCREEN AFTER 10 SECONDS
//YOU HAVE BEEN WARNED
//THIS WILL DELETE EXISTING DRAWINGS NOT CREATED BY THE MACRO
//Now defunct, see loop above for non-destructive replacement. Left behind as a comment in case something goes horrifically wrong in the future.
//setTimeout(() => {canvas.scene.deleteEmbeddedDocuments("Drawing", canvas.scene.drawings.map(d => d.id))}, time);