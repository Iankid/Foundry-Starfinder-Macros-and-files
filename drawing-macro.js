/* 
canvas.scene.getEmbeddedDocument('Drawing',"siikv6duTy6ViS6Y")
^ to grab object data as needed

if (!token) {
        ui.notifications.info("Select a ship token on the active scene!");
        return;
    }
*/

const time = 10000;
const tokenRotation = (token.data.flags["about-face"] && (typeof token.data.flags["about-face"].direction) !== "undefined") ? token.data.flags["about-face"].direction : token.data.rotation;

const origin = {
	x: token.x + token.w / 2,
	y: token.y + token.h / 2
	};
const ranges = [0, 5, 10, 20, 40]
const colors = ["#40FF40", "#ffff40", "#ff4040", "#00FFFF"]
const hexSize = game.scenes.current.grid.size;
const distancePerHex = game.scenes.current.grid.distance;

canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			-750, 1300,
			-1500, 0,
			-750, -1300,
			0,0
			]
		}, 
	fillColor:"#00FFFF",
	fillAlpha: .1,
	fillType: 1,
	//strokeColor:"#FFFFFF",
	strokeWidth:0,
	//strokeAlpha:1
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			750, 1300,
			1500, 0,
			750, -1300,
			0,0
			]
		}, 
	fillColor:"#00FFFF",
	fillAlpha: .1,
	fillType: 1,
	//strokeColor:"#FFFFFF",
	strokeWidth:0,
	//strokeAlpha:1
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			-750, -1300,
			//-1500, 0,
			750, -1300,
			0,0
			]
		}, 
	fillColor:"#00FF00",
	fillAlpha: .1,
	fillType: 1,
	//strokeColor:"#FFFFFF",
	strokeWidth:0,
	//strokeAlpha:1
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	x: origin.x,
	y: origin.y,
	shape: {
		type: "p", 
		points: [
			0, 0,
			-750, 1300,
			//-1500, 0,
			750, 1300,
			0,0
			]
		}, 
	fillColor:"#FF0000",
	fillAlpha: .1,
	fillType: 1,
	//rotation:330,
	//strokeColor:"#ff0000",
	strokeWidth:0,
	//strokeAlpha:1
	}]);

/*
Below draws all the circles
*/

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

/*
canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "e", 
		width: 1000, 
		height: 1000}, 
	strokeColor:"#ffff40",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x - ranges[1],
	y: origin.y - ranges[1]
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "e", 
		width: 2000, 
		height: 2000}, 
	strokeColor:"#ff4040",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x - ranges[2],
	y: origin.y - ranges[2]
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "e", 
		width: 3000, 
		height: 3000}, 
	strokeColor:"#000000",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x - ranges[3],
	y: origin.y - ranges[3]
	}]);
*/

/*
Below here covers the cross-hatch lines for quadrants.
rotation is 330 and 30 for 'true north' orientation, with offsets for token rotation
*/

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
	rotation:330
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
	rotation:30
        }]);
};

/* canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "r", 
		width: 1, 
		height: 3000}, 
	strokeColor:"#ff4040",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x,
	y: origin.y-1500,
	rotation:330
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "r", 
		width: 1, 
		height: 1000}, 
	strokeColor:"#ffff40",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x,
	y: origin.y-500,
	rotation:330
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "r", 
		width: 1, 
		height: 500}, 
	strokeColor:"#33ff33",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x,
	y: origin.y-250,
	rotation:330
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "r", 
		width: 1, 
		height: 3000}, 
	strokeColor:"#ff4040",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x,
	y: origin.y-1500,
	rotation:30
	}]);

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "r", 
		width: 1, 
		height: 1000}, 
	strokeColor:"#ffff40",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x,
	y: origin.y-500,
	rotation:30
	}]);


canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "r", 
		width: 1, 
		height: 500}, 
	strokeColor:"#33ff33",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x,
	y: origin.y-250,
	rotation:30
    }]);
*/