/**********************************************************************
 ** Starship Quadrants
 ** Updated for v9 by Sputt, cleaned up a little by CptTwinkie
 **********************************************************************/

(async function(){
    if (!token) {
        ui.notifications.info("Select a ship token on the active scene!");
        return;
    }
    
    const aboutFaceEnabled = token.data.flags["about-face"] && (typeof token.data.flags["about-face"].direction) !== "undefined";
    const tokenRotation = aboutFaceEnabled ? token.data.flags["about-face"].direction : token.data.rotation;
    
    const angles = [30, 150, 210, -30];
    const origin = {
        x: token.x + token.w / 2,
        y: token.y + token.h / 2
    };

    const specs = angles.map(angle => {
        let borderColor = angle < 90? "#00ff00" : "#45afeb";
        
        return {t: "ray",
            user: game.user.id,
            x: origin.x,
            y: origin.y,
            direction: tokenRotation + angle,
            distance: 100,
            width: 0.001,
            borderColor,
            fillColor: "#000000"
        };
        });

    const scene = game.scenes.current;
    const type = "MeasuredTemplate";
    const rays = await scene.createEmbeddedDocuments(type, specs);
    const rayIds = rays.map(i => i.id);
    
    setTimeout(() => {scene.deleteEmbeddedDocuments(type, rayIds)}, 2500);
})()