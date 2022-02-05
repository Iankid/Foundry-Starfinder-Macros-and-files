/**********************************************************************
 ** Starship Quadrants (Ranged)
 ** Updated for v9 by Sputt
 ** Changed to show short, medium, and long ranges by CptTwinkie
 **********************************************************************/

(async function(){
    if (!token) {
        ui.notifications.info("Select a ship token on the active scene!");
        return;
    }
    
    const tokenRotation = (token.data.flags["about-face"] && (typeof token.data.flags["about-face"].direction) !== "undefined") ? token.data.flags["about-face"].direction : token.data.rotation;
    const scene = game.scenes.current;
    const type = "MeasuredTemplate";
    const time = 2500;
    const angles = [30, 150, 210, -30];
    const ranges = [0, 25, 50, 100]
    const colors = ["#40FF40", "#ffff40", "#ff4040"]
    const origin = {
        x: token.x + token.w / 2,
        y: token.y + token.h / 2
    };

    function _CalcNewStartingPoint(degrees, distance){
        let hexSize = scene.data.grid;
        let distancePerHex = scene.data.gridDistance;
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
                width: 0.001,
                borderColor: borderColor,
                fillColor: "#000000"
            };
        });

        specs = specs.concat(spec);
    }
    
    const rays = await scene.createEmbeddedDocuments(type, specs);
    const rayIds = rays.map(i => i.id);
    
    setTimeout(() => {scene.deleteEmbeddedDocuments(type, rayIds)}, time);
})()