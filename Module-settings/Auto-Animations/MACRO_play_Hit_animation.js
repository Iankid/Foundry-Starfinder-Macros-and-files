/****************************************************************************************
*   
*   Play HIT! animation macro
*
*   DEPENDENCIES: Automated Animations, Sequencer
*   RECOMMENDED: JB2A, Game Audio Bundle, any other effect or audio library
*
*   This macro is intended to be used with Automated Animations's 
*   macro functionality. This macro is intended as an universal player
*   and the effects to play are sent via AA's macro argumrnts ( "Send Args" )
*
*   SETUP
*   In the settings for AA enable "Add macro" ( a little keyboard button to the right)
*   Try to avoid adding explosions while using this macro. In the MACRO section
*   Leave "When to Play" set to "Concurrent with Animation"
*   Into "Macro Name" enter the name you saved this macro under
*   Into "Send Args" write your setting for the macro as a CSV string in this exact order:
*
*   animationHit, animationCrit, audioHit, audioCrit, repeatOverride, delayOverride, volumeOverride
*
*   animationHit, animationCrit, audioHit and audioCrit: are file paths to your effects of choice
*   using Foundry's standard Data structure. SequencerDB shortpath are also accepted.
*   
*   repeatOverride, delayOverride and volumeOverride: this macro reads and uses the values set
*   attack animation. Should you need or wish to change them, you use these overrides.
*
*   You can also use the HelperMacro to generate this string from your inputs for you.
*
*   IMPORTANT!
*   You can leave out any argument you do not wish to include, but in this case
*   you STILL NEED to include at least an empty space instead of the argument, as it 
*   otherwise breaks the CSV string.
*
**********************************************************************************************/

const data = args[1];
const animationHit = args[2];
const animationCrit = args[3];
const audioHit = args[4];
const audioCrit = args[5];
const wait = data.autorecObject.delay ?? 250;
const rpt = data.autorecObject.repeat ?? 1;
const volume = data.autorecObject.audio.a01.volume ?? 0.5;
const customRepeat = parseInt(args[6]) || rpt;
const customDelay = parseInt(args[7]) || wait;
const customVolume = parseFloat(args[8]) || volume;
let effectScale = 1.5;

const playHit = (animationCue, audioCue) => {
    const seq = new Sequence();
        for (let target of data.allTargets) {          
            seq.effect()
                .file(animationCue, true)
                .scaleToObject(effectScale)
                .atLocation(target)
                .repeats(customRepeat, customDelay)
                .playIf(animationCue)
                .delay(0,100);
        }
        seq.sound()
            .file(audioCue, true)
            .volume(customVolume)
            .repeats(customRepeat, customDelay)
            .playIf(audioCue);
    seq.play();
};

const damageRolled = await data.item.rollDamage();                                
if (damageRolled[0] === "normal") {                                         
    playHit(animationHit, audioHit);
} else if (damageRolled[0] === "critical") {
    playHit(animationCrit, audioCrit);
} else return;