(async function(){
if (!token) {
  ui.notifications.info("Seleziona un'astronave per visualizzare gli archi di fuoco");
  return
}
const rotation = (token.data.flags["about-face"] && (typeof token.data.flags["about-face"].direction) !== "undefined") ? token.data.flags["about-face"].direction : token.data.rotation;
const type = "MeasuredTemplate";
const time = 2500;
const headings = [120, 240, 300, 60];
const specs = headings.map(h => {
    let borderColor = "#ff0000"
    if( h < 180 ) borderColor = "#00ff00";
    return {
      t: "ray",
      user: game.user._id,
      x: token.x + token.w / 2,
      y: token.y + token.h / 2,
      direction: rotation+ h,
      distance: 20,
      width: 0.001,
      borderColor,
      fillColor: "#000000"
    }
});
const scene = game.scenes.current;
const ents = await scene.createEmbeddedDocuments(type, specs);
const deletions = ents.map(i => i.id);
setTimeout(() => {scene.deleteEmbeddedDocuments(type, deletions)}, time);
})()
