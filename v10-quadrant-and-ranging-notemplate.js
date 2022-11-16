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
const ranges = [5, 10, 20, 40]
const colors = ["#40FF40", "#ffff40", "#ff4040", "#000000"]

// hexsize, distance per hex, and token rotation automatically grabbed from current scene to (mostly) ensure scaling if weird settings are encountered
// DO NOT MODIFY 
const hexSize = game.scenes.current.grid.size;
const distancePerHex = game.scenes.current.grid.distance;
const tokenRotation = (token.document.flags["about-face"] && (typeof token.document.flags["about-face"].direction) !== "undefined") ? token.document.flags["about-face"].direction : token.document.rotation;

//generates the circles, centering them on the token
//can modify the "strokeWidth" and "strokeAlpha" if desired, using whole numbers and decimals between 0 and 1, respectively
for (let i = ranges.length; i > 0; --i){
    canvas.scene.createEmbeddedDocuments("Drawing", [{
        shape: {
            type: "e", 
            width: ranges[i-1]*2*(hexSize/distancePerHex), 
            height: ranges[i-1]*2*(hexSize/distancePerHex)}, 
        strokeColor:colors[i-1],
        strokeWidth:3,
        strokeAlpha:1,
        x: origin.x - ranges[i-1]*(hexSize/distancePerHex),
        y: origin.y - ranges[i-1]*(hexSize/distancePerHex)
        }]);
};

//generates the cross-hatch lines in offset pairs
//again, "strokeWidth" and "strokeAlpha" are the modifiers, do not modify the "width" value
for (let i = ranges.length; i > 0; --i){
    canvas.scene.createEmbeddedDocuments("Drawing", [{
        shape: {
            type: "r", 
            width: 1, 
            height: ranges[i-1]*2*(hexSize/distancePerHex)}, 
        strokeColor:colors[i-1],
        strokeWidth:3,
        strokeAlpha:1,
        x: origin.x,
        y: origin.y - ranges[i-1]*(hexSize/distancePerHex),
	rotation:330 + tokenRotation
        }]);
    canvas.scene.createEmbeddedDocuments("Drawing", [{
        shape: {
            type: "r", 
            width: 1, 
            height: ranges[i-1]*2*(hexSize/distancePerHex)}, 
        strokeColor:colors[i-1],
        strokeWidth:3,
        strokeAlpha:1,
        x: origin.x,
        y: origin.y - ranges[i-1]*(hexSize/distancePerHex),
	rotation:30 + tokenRotation
        }]);
};

//bad trigonometry math to find coordinates for quadrants
const triangleHeight = ranges[3] * (hexSize/distancePerHex) * Math.sqrt(3)
const triangleWidth = ranges[3] * (hexSize/distancePerHex)

//handles left quadrant
canvas.scene.createEmbeddedDocuments("Drawing", [{
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
	rotation: tokenRotation
	}]);

//handles right quadrant
canvas.scene.createEmbeddedDocuments("Drawing", [{
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
	rotation: tokenRotation
	}]);

/*
rear quadrant
note the height variables may be reversed from 'expected' due to how foundry handles grid
minus means towards top of screen from center of object, plus means towards bottom of screen from center of object
only thing to modify here is "fillColor" and "fillAlpha"
*/
canvas.scene.createEmbeddedDocuments("Drawing", [{
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
	rotation: tokenRotation
	}]);

//front quadrant, same with "fillColor" and "fillAlpha"
canvas.scene.createEmbeddedDocuments("Drawing", [{
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
	rotation: tokenRotation
    }]);
    
//CLEARS ALL DRAWINGS ON SCREEN AFTER 10 SECONDS
//YOU HAVE BEEN WARNED
//THIS WILL DELETE EXISTING DRAWINGS NOT CREATED BY THE MACRO
