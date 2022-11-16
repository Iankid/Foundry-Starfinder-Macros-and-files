/*
A modified and updated for V10 compatibility implementation of the quadrant and ranging macros for Starfinder, based on work by Sputt and CptTwinkie.

Ranges are set to correspond with starship rules (short, double short/medium, double medium/long, double long), with the understanding of using the map scale of 1 hex and intended for use on an ~30x30 hex column layout. Significantly smaller maps can cause errors, which can be remedied by adjusting the ranges downward.

Ranges can be modified to match other settings by editing the line "const ranges = []" and "const colors = []", requiring matching pairs to be added to or removed from both arrays to function properly.

Time on screen can be modified by editing the "const time = " line, where the number is in miliseconds. 10000 (default) is 10 seconds.
*/

(async function(){
    if (!token) {
        ui.notifications.info("Select a ship token on the active scene!");
        return;
    }
    
    const tokenRotation = (token.data.flags["about-face"] && (typeof token.data.flags["about-face"].direction) !== "undefined") ? token.data.flags["about-face"].direction : token.data.rotation;
    const scene = game.scenes.current;
    const type = "MeasuredTemplate";
    const time = 10000;
    const angles = [60, 120, 240, 300];
    const ranges = [0, 5, 10, 20, 40]
    const colors = ["#40FF40", "#ffff40", "#ff4040", "#00FFFF"]
    const origin = {
        x: token.x + token.w / 2,
        y: token.y + token.h / 2
    };

    function _CalcNewStartingPoint(degrees, distance){
        let hexSize = scene.data.grid;
        let distancePerHex = scene.data.grid.distance;
        let gridDistance = hexSize * (distance/distancePerHex);
        
        let radians = degrees * (Math.PI/180);
        let x = origin.x + Math.cos(radians) * gridDistance;
        let y = origin.y + Math.sin(radians) * gridDistance;
        return {x:x, y:y};
    }

    let specs = [];

    for (let i = ranges.length - 1; i > 0; --i){
        let spec = angles.map(angle => {
            let borderColor = colors[i - 1];
            let maxRange = ranges[i];
            let minRange = ranges[i - 1];
            let coordinate = _CalcNewStartingPoint(angle, minRange);

            return {t: "ray",
                user: game.user.id,
                x: origin.x,
                y: origin.y,
                direction: tokenRotation + angle,
                distance: maxRange,
                width: 1,
                borderColor: borderColor,
                fillColor: "#000000"
            };
        });

        specs = specs.concat(spec);
    }
    
   for (let i = ranges.length - 1; i >= 1; --i){
        specs.push({t: "circle",
            user: game.user.id,
            x: origin.x,
            y: origin.y,
            distance: ranges[i],
            borderColor: colors[i],
            fillColor: "#000000"
        });
    }
    
    const rays = await scene.createEmbeddedDocuments(type, specs);
    const rayIds = rays.map(i => i.id);
    
    setTimeout(() => {scene.deleteEmbeddedDocuments(type, rayIds)}, time);
})()