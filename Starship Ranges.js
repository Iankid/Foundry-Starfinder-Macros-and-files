/**********************************************************************
 ** Starship Ranges
 ** Updated for v9 by Sputt
 ** Changed to show short, medium, and long range circles by CptTwinkie
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
    const ranges = [25, 50, 100]
    const colors = ["#40FF40", "#ffff40", "#ff4040"]
    const origin = {
        x: token.x + token.w / 2,
        y: token.y + token.h / 2
    };

    let specs = [];

    for (let i = ranges.length - 1; i >= 0; --i){
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