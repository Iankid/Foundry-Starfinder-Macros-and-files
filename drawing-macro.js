/* 
canvas.scene.getEmbeddedDocument('Drawing',"siikv6duTy6ViS6Y")
^ to grab object data as needed

if (!token) {
        ui.notifications.info("Select a ship token on the active scene!");
        return;
    }
*/

const origin = {
	x: token.x + token.w / 2,
	y: token.y + token.h / 2
	};
const ranges = [250, 500, 1000, 1500]

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "p", 
		points: [
			[0, 0],
			[1428, 457],
			[1500, 0],
			[1428, 1957]
			]
		}, 
	strokeColor:"#FFFFFF",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x,
	y: origin.y
	}]);

/*
Below draws all the circles
*/

canvas.scene.createEmbeddedDocuments("Drawing", [{
	shape: {
		type: "e", 
		width: 500, 
		height: 500}, 
	strokeColor:"#33ff33",
	strokeWidth:3,
	strokeAlpha:1,
	x: origin.x - ranges[0],
	y: origin.y - ranges[0]
	}]);

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


/*
Below here covers the cross-hatch lines for quadrants.
Height is for total length of line.
y needs to be offset -.5*height
rotation is 330 and 30
*/

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