/****************************************************************************************************
*
*   This macro is intended to generate arguments string for Play Hit Animation macro in Automated Animations
*
*****************************************************************************************************/

const content = `<form>
    <p>Filepaths accept SequencerDB shortpaths ( copy/paste ) as well as full paths. </p>
    <div class="form-group">
        <label>Animation path for normal hit:</label>
        <div class="form-fields">
            <input type="text" name="animationHit">
            <button class="animationHit-button"><i class="fas fa-file-import fa-fw"></i></button>
        </div>
    </div>
    <div class="form-group">
        <label>Animation path for critical hit:</label>
        <div class="form-fields">
            <input type="text" name="animationCrit">
            <button class="animationCrit-button"><i class="fas fa-file-import fa-fw"></i></button>
        </div>
    </div>
    <div class="form-group">
        <label>Audio path for normal hit:</label>
        <div class="form-fields">
            <input type="text" name="audioHit">
            <button class="audioHit-button"><i class="fas fa-file-import fa-fw"></i></button>
        </div>
    </div>
    <div class="form-group">
        <label>Audio path for critical hit:</label>
        <div class="form-fields">
            <input type="text" name="audioCrit">
            <button class="audioCrit-button"><i class="fas fa-file-import fa-fw"></i></button>
        </div>
    </div>
    <div>
    <br><h3><b>Leave these blank for using same values as attack</b></h3>
    </div>
    <div class="form-group">
        <label>Override nr. of repeats:</label>
        <div class="form-fields">
            <input type="text" name="repeatOverride">
        </div>
    </div>
    <div class="form-group">
        <label>Override repeat delay (ms):</label>
        <div class="form-fields">
            <input type="text" name="delayOverride">
        </div>
    </div>
    <div class="form-group">
        <label>Override volume (0-1):</label>
        <div class="form-fields">
            <input type="text" name="volumeOverride">
        </div>
    </div>
</form>`;

new Dialog({
    title: "Auto Animations macro setup helper for SFRPG",
    content,
    buttons: {ok: {
		label: "Copy to clipboard",
		callback: async (html) => {
			const resultNames = [
			"animationHit", "animationCrit", "audioHit",
			"audioCrit", "repeatOverride",
			"delayOverride", "volumeOverride"];
			const resultString = resultNames.reduce((acc, e) => acc += ","+html[0].querySelector(`input[name=${e}]`).value, ``).substring(1);
			navigator.clipboard.writeText(resultString);
            ui.notifications.info("Settings have been successfully stored in the clipboard");
		}
	}},
	default: "ok",
    render: (html) => listener(html)
}).render(true);

function listener(html){
	const classes = ["animationHit", "animationCrit", "audioHit", "audioCrit"];
	for(let i=0; i < classes.length; i++){
		let cls = classes[i];
		let type = i < 2 ? "video" : "audio";
		html[0].querySelector(`button.${cls}-button`).addEventListener("click", async () => {
			new FilePicker({type, callback: async (path) => {
				html[0].querySelector(`input[name=${cls}]`).value = path;
			}}).render(true);
		});
	}
}