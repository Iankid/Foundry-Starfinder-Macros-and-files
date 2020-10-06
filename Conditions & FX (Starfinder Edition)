(async ()=> {
// Open a dialog for quickly adding or removing conditions and FX on the controlled tokens.
// REQUIRES Token Magic FX mod: https://foundryvtt.com/packages/tokenmagic/
// This macro was based on code by @Erogroth#7134. This version by @Iankid with the help of @SecretFire

if (canvas.tokens.controlled.length === 0)
  return ui.notifications.error("Please select a token first");

const effectasleep = "systems/sfrpg/icons/conditions/asleep.png";
const effectblinded = "systems/sfrpg/icons/conditions/blinded.png";
const effectbleeding = "systems/sfrpg/icons/conditions/bleeding.png";
const effectburning = "systems/sfrpg/icons/conditions/burning.png";
const effectconfused = "systems/sfrpg/icons/conditions/confused.png";
const effectcowering = "systems/sfrpg/icons/conditions/cowering.png";
const effectdazed = "systems/sfrpg/icons/conditions/dazed.png";
const effectdazzled = "systems/sfrpg/icons/conditions/dazzled.png";
const effectdead = "systems/sfrpg/icons/conditions/dead.png";
const effectdeafened = "systems/sfrpg/icons/conditions/deafened.png";
const effectdying = "systems/sfrpg/icons/conditions/dying.png";
const effectencumbered = "systems/sfrpg/icons/conditions/encumbered.png";
const effectentangled = "systems/sfrpg/icons/conditions/entangled.png";
const effectexhausted = "systems/sfrpg/icons/conditions/exhausted.png";
const effectfatigued = "systems/sfrpg/icons/conditions/fatigued.png";
const effectflatfooted = "systems/sfrpg/icons/conditions/flatfooted.png";
const effectfrightened = "systems/sfrpg/icons/conditions/frightened.png";
const effectgrappled = "systems/sfrpg/icons/conditions/grappled.png";
const effecthelpless = "systems/sfrpg/icons/conditions/helpless.png";
const effectnauseated = "systems/sfrpg/icons/conditions/nauseated.png";
const effectoffkilter = "systems/sfrpg/icons/conditions/offkilter.png";
const effectofftarget = "systems/sfrpg/icons/conditions/offtarget.png";
const effectoverburdened = "systems/sfrpg/icons/conditions/overburdened.png";
const effectpanicked = "systems/sfrpg/icons/conditions/panicked.png";
const effectparalyzed = "systems/sfrpg/icons/conditions/paralyzed.png";
const effectpinned = "systems/sfrpg/icons/conditions/pinned.png";
const effectprone = "systems/sfrpg/icons/conditions/prone.png";
const effectshaken = "systems/sfrpg/icons/conditions/shaken.png";
const effectsickened = "systems/sfrpg/icons/conditions/sickened.png";
const effectstable = "systems/sfrpg/icons/conditions/stable.png";
const effectstaggered = "systems/sfrpg/icons/conditions/staggered.png";
const effectstunned = "systems/sfrpg/icons/conditions/stunned.png";
const effectunconsious = "systems/sfrpg/icons/conditions/unconscious.png";

let applyChanges = false;
new Dialog({
  title: `Conditions & FX`,
  content: `
    <form>
      <div class="form-group">
        <label>Condition:</label>
        <select id="Condition" name="Condition">
          <option value="removeall">Remove All FX (leaves conditions)</option>
          <option value="asleep">Asleep</option>
          <option value="asleep2">Asleep Off</option>
          <option value="bleeding">Bleeding</option>
          <option value="bleeding2">Bleeding Off</option>
          <option value="blinded">Blinded</option>
          <option value="blinded2">Blinded Off</option>
          <option value="burning">Burning</option>
          <option value="burning2">Burning Off</option>
          <option value="confused">Confused</option>
          <option value="confused2">Confused Off</option>
          <option value="cowering">Cowering</option>
          <option value="cowering2">Cowering Off</option>
          <option value="dazed">Dazed</option>
          <option value="dazed2">Dazed Off</option>
          <option value="dazzled">Dazzled</option>
          <option value="dazzled2">Dazzled Off</option>
          <option value="dead">Dead</option>
          <option value="dead2">Dead Off</option>
          <option value="deafened">Deafened</option>
          <option value="deafened2">Deafened Off</option>
          <option value="dying">Dying</option>
          <option value="dying2">Dying Off</option>
          <option value="encumbered">Encumbered*</option>
          <option value="encumbered2">Encumbered Off</option>
          <option value="entangled">Entangled</option>
          <option value="entangled2">Entangled Off</option>
          <option value="exhausted">Exhausted*</option>
          <option value="exhausted2">Exhausted Off</option>
          <option value="fascinated">Fascinated*</option>
          <option value="fascinated2">Fascinated Off</option>
          <option value="fatigued">Fatigued*</option>
          <option value="fatigued2">Fatigued Off</option>
          <option value="flatfooted">Flat-footed</option>
          <option value="flatfooted2">Flat-footed Off</option>
          <option value="frightened">Frightened</option>
          <option value="frightened2">Frightened Off</option>
          <option value="grappled">Grappled*</option>
          <option value="grappled2">Grappled Off</option>
          <option value="helpless">Helpless*</option>
          <option value="helpless2">Helpless Off</option>
          <option value="nauseated">Nauseated</option>
          <option value="nauseated2">Nauseated Off</option>
          <option value="offkilter">Off-kilter*</option>
          <option value="offkilter2">Off-kilter Off</option>
          <option value="offtarget">Off-target*</option>
          <option value="offtarget2">Off-target Off</option>
          <option value="overburdened">Overburdened*</option>
          <option value="overburdened2">Overburdened Off</option>
          <option value="panicked">Panicked</option>
          <option value="panicked2">Panicked Off</option>
          <option value="paralyzed">Paralyzed*</option>
          <option value="paralyzed2">Paraplyzed Off</option>
          <option value="pinned">Pinned*</option>
          <option value="pinned2">Pinned Off</option>
          <option value="prone">Prone*</option>
          <option value="prone2">Prone Off</option>
          <option value="shaken">Shaken</option>
          <option value="shaken2">Shaken Off</option>
          <option value="sickened">Sickened</option>
          <option value="sickened2">Sickened Off</option>
          <option value="stable">Stable*</option>
          <option value="stable2">Stable Off</option>
          <option value="staggered">Staggered*</option>
          <option value="staggered2">Staggered Off</option>
          <option value="stunned">Stunned*</option>
          <option value="stunned2">Stunned Off</option>
          <option value="unconscious">Unconscious*</option>
          <option value="unconscious2">Unconscious Off</option>
        </select>
        </div>
        Conditions marked with * do not have FX attached
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let Condition = html.find('[name="Condition"]')[0].value || "none";
        switch (Condition) {
            case "asleep":
                token.actor.update({"data.conditions.asleep" : true});
                token.toggleEffect(effectasleep);
                var params = 
[{
    filterType: "bevel",
    filterId: "asleepFX",
    rotation: 0,
    thickness: 30,
    lightColor: 0x3A3C99,
    lightAlpha: 0.8,
    shadowColor: 0x4E5097,
    shadowAlpha: 0.6,
    animated :
    {
       rotation: 
       { 
          active: true,
          clockWise: true, 
          loopDuration: 5600, 
          animType: "syncRotation"
       }
    }
},
{
    filterType: "zoomblur",
    filterId: "asleepFX",
    strength: 0.35,
    innerRadiusPercent: 85,
    radiusPercent: 100,
    padding: 30,
    animated:
    {
        innerRadiusPercent: 
        { 
           active: true, 
           animType: "sinOscillation", 
           loopDuration: 3000, 
           val1: 65, 
           val2: 75
        }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);

        break;
            case "asleep2":
                token.actor.update({"data.conditions.asleep" : false});
                token.toggleEffect(effectasleep);
                token.TMFXdeleteFilters("asleepFX");
        break;
            case "bleeding":
              token.actor.update({"data.conditions.bleeding" : true});
token.toggleEffect(effectbleeding);
var params =
    [{
        filterType: "splash",
        filterId: "bleeding",
        color: 0x990505,
        padding: 80,
        time: 3,
        seed: Math.random(),
        splashFactor: .009,
        spread: 3,
        blend: 1,
        dimX: 1,
        dimY: 1,
        cut: false,
        textureAlphaBlend: true,
                animated :
        {
          time : 
          { 
            active: true, 
            speed: 0.0001, 
            animType: "move" 
          }
        },
        anchorX: 0.35,
        anchorY: 0.75
    },
    {
            filterType: "splash",
        filterId: "bleeding",
        color: 0x990505,
        padding: 80,
        time: 2,
        seed: Math.random(),
        splashFactor: .09,
        spread: 3,
        blend: 1,
        dimX: 1,
        dimY: 1,
        cut: false,
        textureAlphaBlend: true,
                animated :
        {
          time : 
          { 
            active: true, 
            speed: 0.0001, 
            animType: "move" 
          }
        },
        anchorX: 0.35,
        anchorY: 0.75
    
    }];
    
TokenMagic.addFiltersOnSelected(params);
            break;
                      case "bleeding2":
token.actor.update({"data.conditions.bleeding" : false});
token.toggleEffect(effectbleeding);
token.TMFXdeleteFilters("bleeding");
            break;
            case "blinded":
                token.actor.update({"data.conditions.blinded" : true});
                token.actor.update({"data.conditions.flatfooted" : true});
                token.toggleEffect(effectblinded);
                token.toggleEffect(effectflatfooted);
                var params = 
[{
   filterType: "xbloom",
   filterId: "blindedFX",
   threshold: 0.35,
   bloomScale: 0,
   brightness:0.3,
   blur: 0.01,
   padding: 10,
   quality: 15,
   blendMode: 0,
   animated:
   {
       bloomScale: 
       { 
          active: true, 
          loopDuration: 6000, 
          animType: "syncCosOscillation", 
          val1: 0.2, 
          val2: 0.4
       },
       threshold:  
       { 
          active: false, 
          loopDuration: 3000, 
          animType: "syncCosOscillation", 
          val1: 0.10, 
          val2: 0.20
       }
   }
},
{
    filterType: "smoke",
    filterId: "blindedFX",
    color: 0x787878,
    time: 0,
    blend: 2,
    dimX: 1,
    dimY: 1,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0015, 
        animType: "move"
      }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);

        break;
            case "blinded2":
                token.actor.update({"data.conditions.blinded" : false});
                token.actor.update({"data.conditions.flatfooted" : false});
                token.toggleEffect(effectblinded);
                token.toggleEffect(effectflatfooted);
                token.TMFXdeleteFilters("blindedFX");
        break;
          case "burning":
token.actor.update({"data.conditions.burning" : true});
token.toggleEffect(effectburning);
var params =
[{
    filterType: "fire",
    filterId: "Burningcond",
    intensity: 1,
    color: 0xFFFFFF,
    amplitude: 1,
    time: 0,
    blend: 2,
    fireBlend : 1,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: -0.0024, 
        animType: "move" 
      },
      intensity:
      {
        active:true,
        loopDuration: 15000,
        val1: 0.7,
        val2: .8,
        animType: "syncCosOscillation"
      },
      amplitude:
      {
        active:true,
        loopDuration: 4400,
        val1: .5,
        val2: .8,
        animType: "syncCosOscillation"
      }
      
    }
},
{
    filterType: "zapshadow",
    filterId: "Burningcond",
    alphaTolerance: 0.50
},
{
    filterType: "xglow",
    filterId: "Burningcond",
    auraType: 2,
    color: 0x903010,
    thickness: 9.8,
    scale: 4.0,
    time: 0,
    auraIntensity: 1.5,
    subAuraIntensity: 1.0,
    threshold: 0.40,
    discard: true,
    animated:
    {
        time : 
        {  
           active: true,
           speed: 0.0027, 
           animType: "move" 
        },
        thickness:
        {
           active: true,
           loopDuration: 3000, 
           animType: "cosOscillation", 
           val1:2, 
           val2:5
        }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
            break;
                      case "burning2":
token.actor.update({"data.conditions.burning" : false});
token.toggleEffect(effectburning);
token.TMFXdeleteFilters("Burningcond");
        break;
            case "confused":
                token.actor.update({"data.conditions.confused" : true});
                token.toggleEffect(effectconfused);
                var params = 
[{
    filterType: "liquid",
    filterId: "confusedFX",
    time: 0,
    blend: .3,
    intensity: .8,
    spectral: false,
    scale: .3,
    animated :
    {
       time : 
       { 
          active: true, 
          speed: 0.00028, 
          animType: "move" 
       
       }
    }
},
{
    filterType: "globes",
    filterId: "confusedFX",
    time: 0,
    distortion: 0.5,
    scale: 10,
    alphaDiscard: false,
    zOrder: 1,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0005, 
        animType: "move" 
      },
      color: 
        {
           active: true, 
           loopDuration: 3000, 
           animType: "colorOscillation", 
           val1:0xFF3000, 
           val2:0x30FF00
        }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);

        break;
            case "confused2":
                token.actor.update({"data.conditions.confused" : false});
                token.toggleEffect(effectconfused);
                token.TMFXdeleteFilters("confusedFX");
        break;
            case "cowering":
                token.actor.update({"data.conditions.cowering" : true});
                token.toggleEffect(effectcowering);
                var params = 
[{
   filterType: "xbloom",
   filterId: "coweringFX",
   threshold: 0.35,
   bloomScale: 0,
   brightness: 1,
   blur: 0.1,
   padding: 10,
   quality: 15,
   blendMode: 0,
   animated:
   {
       bloomScale: 
       { 
          active: true, 
          loopDuration: 3000, 
          animType: "syncCosOscillation", 
          val1: -.2, 
          val2: -.6
       },
       threshold:  
       { 
          active: false, 
          loopDuration: 1000, 
          animType: "syncCosOscillation", 
          val1: 0.00, 
          val2: 1.90
       }
   }
},
{
    filterType: "transform",
    filterId: "coweringFX",
        bpRadiusPercent: 70,
        padding: 100,
        animated:
        {
            bpStrength:
        { 
           active: true, 
           animType: "syncCosOscillation", 
           loopDuration: 850, 
           val1: 0.1, 
           val2: -0.05
        }
    }
},
{
    filterType: "images",
    filterId: "coweringFX",
    time: 0,
    nbImage: 1,
    alphaImg: 1.0,
    alphaChr: 0.0,
    blend: 2,
    ampX: 0.10,
    ampY: 0.10,
    padding: 80,
    zOrder: 20,
    animated :
    {
      time: 
      { 
        active: true, 
        speed: 0.0050, 
        animType: "move" 
      },
      ampX:
      {
        active: true,
        val1: 0.00,
        val2: 0.01,
        chaosFactor: 1,
        animType: "syncChaoticOscillation",
        loopDuration: 450
      },
      ampY:
      {
        active: true,
        val1: 0.00,
        val2: 0.005,
        chaosFactor: 0.12,
        animType: "syncChaoticOscillation",
        loopDuration: 250
      }
    }
    
}];

TokenMagic.addUpdateFiltersOnSelected(params);

        break;
            case "cowering2":
                token.actor.update({"data.conditions.cowering" : false});
                token.toggleEffect(effectcowering);
                token.TMFXdeleteFilters("coweringFX");
        break;
            case "dazed":
                token.actor.update({"data.conditions.dazed" : true});
                token.toggleEffect(effectdazed);
                var params =
[{
    enabled: true,
    filterType: "images",
    filterId: "dazedFX",
    time: 0, 
    blend: 4,
    nbImage: 4, 
    padding: 100,
    alphaImg: .5, 
    alphaChr: 0,
    ampX: 0.5, 
    ampY: 0.5,
    animated :
    {
      time: 
      { 
        speed: 0.001, 
        animType: "move" 
      },
      ampX:
      {
        val1: 0, val2: 0.1,
        animType: "cosOscillation",
        loopDuration: 3250
      },
      ampY:
      {
        val1: 0, val2: 0.12,
        animType: "cosOscillation",
        loopDuration: 1750,
      },
      alphaChr:        
      {
        val1: 1, val2: 0.8,
        animType: "syncCosOscillation",
        loopDuration: 2000
      },
      alphaImg:        
      {
        val1: 0.2, val2: 0.6,
        animType: "syncSinOscillation",
        loopDuration: 2000
      }
    }
},
    {
        filterType: "transform",
        filterId: "dazedFX",
        autoDestroy: true,
        padding: 80,
        pivotX: 0.5,
        pivotY: 0.55,
        animated:
        {
                        translationX:
            {
                animType: "sinOscillation",
                val1: -0.020,
                val2: +0.020,
                loopDuration: 4250
            },
            rotation:
            {
                animType: "cosOscillation",
                val1: -20,
                val2: +15,
                loopDuration: 6500,

            },
        }
    }];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "dazed2":
                token.actor.update({"data.conditions.dazed" : false});
                token.toggleEffect(effectdazed);
                token.TMFXdeleteFilters("dazedFX");
        break;
                case "dazzled":
              token.actor.update({"data.conditions.dazzled" : true});
token.toggleEffect(effectdazzled);
var params =
[{
    filterType: "globes",
    filterId: "dazzledFX",
    time: 0,
    color: 0x3080EE,
    distortion: 0.2,
    scale: 20,
    alphaDiscard: false,
    zOrder: 1,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0006, 
        animType: "move" 
      }
    }
}]

TokenMagic.addUpdateFiltersOnSelected(params);
            break;
                      case "dazzled2":
token.actor.update({"data.conditions.dazzled" : false});
token.toggleEffect(effectdazzled);
token.TMFXdeleteFilters("dazzledFX");
        break;
            case "dead":
                token.actor.update({"data.conditions.dead" : true});
                token.toggleEffect(effectdead);
                var params =
    [{
        filterType: "splash",
        filterId: "deadFX",
        color: 0x900505,
        padding: 30,
        time: Math.random()*1000,
        seed: Math.random()/100,
        splashFactor: 2,
        spread: 7,
        blend: 1,
        dimX: 1,
        dimY: 1,
        cut: true,
        textureAlphaBlend: false
    }];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "dead2":
                token.actor.update({"data.conditions.dead" : false});
                token.toggleEffect(effectdead);
                token.TMFXdeleteFilters("deadFX");
        break;
            case "deafened":
                token.actor.update({"data.conditions.deafened" : true});
                token.toggleEffect(effectdeafened);
                var params =
[{
    filterType: "glow",
    filterId: "deafenedFX",
    outerStrength: 6,
    innerStrength: 0,
    color: 0xC44F8D,
    quality: 0.5,
    padding: 10,
    animated:
    {
        color: 
        {
           active: true, 
           loopDuration: 3000, 
           animType: "colorOscillation", 
           val1:0x530C5A, 
           val2:0xD51BE8
        }
    }
},
{
    filterType: "shockwave",
    filterId: "deafenedFX",
    time: 0,
    amplitude: 8,
    wavelength: 75,
    radius: 500,
    brightness: 1.5,
    speed: 25,
    padding: 0,
    animated:
    {
        time: 
        { 
           animType: "cosOscillation",
           active: true, 
           loopDuration: 3000, 
           val1: 5, val2: 7
        }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "deafened2":
                token.actor.update({"data.conditions.deafened" : false});
                token.toggleEffect(effectdeafened);
                token.TMFXdeleteFilters("deafenedFX");
        break;
            case "dying":
                token.actor.update({"data.conditions.dying" : true});
                token.toggleEffect(effectdying);
                var params =
    [{
        filterType: "splash",
        filterId: "dyingFX",
        color: 0xFF0505,
        padding: 80,
        time: 0,
        seed: 0.10,
        splashFactor: 2.25,
        spread: 7,
        blend: 1,
        dimX: 1,
        dimY: 1,
        cut: true,
        animated :
        {
          time : 
          { 
            active: true, 
            speed: 0.0009, 
            animType: "move" 
          }
        }
    }];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "dying2":
                token.actor.update({"data.conditions.dying" : false});
                token.toggleEffect(effectdying);
                token.TMFXdeleteFilters("dyingFX");
        break;
            case "encumbered":
                token.actor.update({"data.conditions.encumbered" : true});
                token.toggleEffect(effectencumbered);
        break;
            case "encumbered2":
                token.actor.update({"data.conditions.encumbered" : false});
                token.toggleEffect(effectencumbered);
        break;
            case "entangled":
                token.actor.update({"data.conditions.entangled" : true});
                token.toggleEffect(effectentangled);
                var params =
[{
    filterType: "field",
    filterId: "entangledFX",
    shieldType: 5,
    gridPadding: 1.1,
    color: 0xCADFA3 ,
    time: 0,
    blend: 2,
    intensity: 1.1,
    lightAlpha: 0.5,
    lightSize: .5,
    scale: 1.5,
    radius: 1,
    chromatic: false,
    alphaDiscard: true,
    zOrder: 5000,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0003, 
        animType: "move" 
      }
    }
},
{
    filterType: "xfog",
    filterId: "entangledFX",
    color: 0xFFFFFF,
    time: 0,
    animated:
        {
            time:
            {
                active: true,
                speed: 0.0002,
                animType: "move"
            }
        }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "entangled2":
                token.actor.update({"data.conditions.entangled" : false});
                token.toggleEffect(effectentangled);
                token.TMFXdeleteFilters("entangledFX");
        break;
            case "exhausted":
                token.actor.update({"data.conditions.exhausted" : true});
                token.toggleEffect(effectexhausted);
        break;
            case "exhausted2":
                token.actor.update({"data.conditions.exhausted" : false});
                token.toggleEffect(effectexhausted);
        break;
            case "fatigued":
                token.actor.update({"data.conditions.fatigued" : true});
                token.toggleEffect(effectfatigued);
        break;
            case "fatigued2":
                token.actor.update({"data.conditions.fatigued" : false});
                token.toggleEffect(effectfatigued);
        break;
            case "flatfooted":
                token.actor.update({"data.conditions.flatfooted" : true});
                token.toggleEffect(effectflatfooted);
                var params =
[{
    filterType: "glow",
    filterId: "flatfootedFX",
    outerStrength: 6,
    innerStrength: 10,
    color: 0x5099DD,
    quality: 1,
    padding: 0,
    animated:
    {
        color: 
        {
           active: true, 
           loopDuration: 2000, 
           animType: "colorOscillation", 
           val1:0xD83939, 
           val2:0xF69898
        }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "flatfooted2":
                token.actor.update({"data.conditions.flatfooted" : false});
                token.toggleEffect(effectflatfooted);
                token.TMFXdeleteFilters("flatfootedFX");
        break;
            case "frightened":
                token.actor.update({"data.conditions.frightened" : true});
                token.toggleEffect(effectfrightened);
                var params = 
[{
   filterType: "xbloom",
   filterId: "frightenedFX",
   threshold: 0.35,
   bloomScale: 0,
   brightness: 1,
   blur: 0.1,
   padding: 10,
   quality: 15,
   blendMode: 0,
   animated:
   {
       bloomScale: 
       { 
          active: true, 
          loopDuration: 1250, 
          animType: "syncCosOscillation", 
          val1: 0, 
          val2: 0.09
       },
       threshold:  
       { 
          active: false, 
          loopDuration: 1250, 
          animType: "syncCosOscillation", 
          val1: 0.00, 
          val2: 0.90
       }
   }
},
{
    filterType: "adjustment",
    filterId: "frightenedFX",
    saturation: 1,
    brightness: 1,
    contrast: 1,
    gamma: 1,
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
    animated:
    {
        red: 
        { 
           active: true, 
           loopDuration: 1250, 
           animType: "syncCosOscillation",
           val1: 1,
           val2: 1.25 },
        blue: 
        { 
           active: true, 
           loopDuration: 1250, 
           animType: "syncCosOscillation",
           val1: 1,
           val2: 1.75 },
        green: 
        { 
           active: true, 
           loopDuration: 1250, 
           animType: "syncCosOscillation",
           val1: 1,
           val2: 0.5 }
    }
},
{
    filterType: "transform",
    filterId: "frightenedFX",
        bpRadiusPercent: 70,
        padding: 100,
        animated:
        {
            bpStrength:
        { 
           active: true, 
           animType: "syncCosOscillation", 
           loopDuration: 1250, 
           val1: 0, 
           val2: -0.05
        }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "frightened2":
                token.actor.update({"data.conditions.frightened" : false});
                token.toggleEffect(effectfrightened);
                token.TMFXdeleteFilters("frightenedFX");
        break;
            case "grappled":
                token.actor.update({"data.conditions.grappled" : true});
                token.toggleEffect(effectgrappled);
        break;
            case "grappled2":
                token.actor.update({"data.conditions.grappled" : false});
                token.toggleEffect(effectgrappled);
        break;
            case "helpless":
                token.actor.update({"data.conditions.helpless" : true});
                token.toggleEffect(effecthelpless);
        break;
            case "helpless2":
                token.actor.update({"data.conditions.helpless" : false});
                token.toggleEffect(effecthelpless);
        break;
            case "nauseated":
                token.actor.update({"data.conditions.nauseated" : true});
                token.toggleEffect(effectnauseated);
                 var params =
[{
    filterType: "field",
    filterId: "nauseatedFX",
    shieldType: 9,
    gridPadding: 1,
    color: 0x9BEC90,
    time: 0,
    blend: 1.8,
    intensity: 1.3,
    lightAlpha: 2,
    lightSize: 2,
    scale: 0.4,
    radius: 1,
    chromatic: false,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0008, 
        animType: "move" 
      },
      lightSize:        
      {
        val1: 0.8, val2: 0.4,
        animType: "syncCosOscillation",
        loopDuration: 5000
      }
    }
},
{
    filterType: "flood",
    filterId: "nauseatedFX",
    time: 0,
    color: 0x0020BB,
    billowy: 0.33,
    tintIntensity: 0.0,
    glint: 0.11,
    scale: 30,
    padding: 10,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0006, 
        animType: "move"
      }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "nauseated2":
                token.actor.update({"data.conditions.nauseated" : false});
                token.toggleEffect(effectnauseated);
                token.TMFXdeleteFilters("nauseatedFX");
        break;
            case "offkilter":
                token.actor.update({"data.conditions.offkilter" : true});
                token.toggleEffect(effectoffkilter);
        break;
            case "offkilter2":
                token.actor.update({"data.conditions.offkilter" : false});
                token.toggleEffect(effectoffkilter);
        break;
            case "offtarget":
                token.actor.update({"data.conditions.offtarget" : true});
                token.toggleEffect(effectofftarget);
        break;
            case "offtarget2":
                token.actor.update({"data.conditions.offtarget" : false});
                token.toggleEffect(effectofftarget);
        break;
            case "overburdened":
                token.actor.update({"data.conditions.overburdened" : true});
                token.toggleEffect(effectoverburdened);
        break;
            case "overburdened2":
                token.actor.update({"data.conditions.overburdened" : false});
                token.toggleEffect(effectoverburdened);
        break;
            case "panicked":
                token.actor.update({"data.conditions.panicked" : true});
                token.toggleEffect(effectpanicked);
                var params =
[{
    filterType: "images",
    filterId: "panickedFX",
    time: 0,
    nbImage: 1,
    alphaImg: 1.0,
    alphaChr: 0.0,
    blend: 2,
    ampX: 0.10,
    ampY: 0.10,
    padding: 80,
    zOrder: 20,
    animated :
    {
      time: 
      { 
        active: true, 
        speed: 0.0050, 
        animType: "move" 
      },
      ampX:
      {
        active: true,
        val1: 0.00,
        val2: 0.05,
        chaosFactor: 0.08,
        animType: "syncChaoticOscillation",
        loopDuration: 1050
      },
      ampY:
      {
        active: true,
        val1: 0.00,
        val2: 0.05,
        chaosFactor: 0.09,
        animType: "syncChaoticOscillation",
        loopDuration: 650
      }
    }
    
},
{
   filterType: "xbloom",
   filterId: "panickedFX",
   threshold: 0.35,
   bloomScale: 0,
   brightness: 1,
   blur: 0.1,
   padding: 10,
   quality: 15,
   blendMode: 0,
   animated:
   {
       bloomScale: 
       { 
          active: true, 
          loopDuration: 1350, 
          animType: "syncCosOscillation", 
          val1: 0, 
          val2: 0.09
       },
       threshold:  
       { 
          active: false, 
          loopDuration: 1350, 
          animType: "syncCosOscillation", 
          val1: 0.00, 
          val2: 0.90
       }
   }
},
{
    filterType: "adjustment",
    filterId: "panickedFX",
    saturation: 1,
    brightness: 1,
    contrast: 1,
    gamma: 1,
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
    animated:
    {
        red: 
        { 
           active: true, 
           loopDuration: 1350, 
           animType: "syncCosOscillation",
           val1: 1,
           val2: 3 },
        blue: 
        { 
           active: true, 
           loopDuration: 1350, 
           animType: "syncCosOscillation",
           val1: 1,
           val2: 1 },
        green: 
        { 
           active: true, 
           loopDuration: 1350, 
           animType: "syncCosOscillation",
           val1: 1,
           val2: 1 }
    }
},
{
    filterType: "transform",
    filterId: "panickedFX",
        bpRadiusPercent: 70,
        padding: 100,
        animated:
        {
            bpStrength:
        { 
           active: true, 
           animType: "syncCosOscillation", 
           loopDuration: 1350, 
           val1: 0.1, 
           val2: -0.1
        }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "panicked2":
                token.actor.update({"data.conditions.panicked" : false});
                token.toggleEffect(effectpanicked);
                token.TMFXdeleteFilters("panickedFX");
        break;
            case "paralyzed":
                token.actor.update({"data.conditions.paralyzed" : true});
                token.toggleEffect(effectparalyzed);
        break;
            case "paralyzed2":
                token.actor.update({"data.conditions.paralyzed" : false});
                token.toggleEffect(effectparalyzed);
        break;
            case "pinned":
                token.actor.update({"data.conditions.pinned" : true});
                token.toggleEffect(effectpinned);
        break;
            case "pinned2":
                token.actor.update({"data.conditions.pinned" : false});
                token.toggleEffect(effectpinned);
        break;
            case "prone":
                token.actor.update({"data.conditions.prone" : true});
                token.toggleEffect(effectprone);
        break;
            case "prone2":
                token.actor.update({"data.conditions.prone" : false});
                token.toggleEffect(effectprone);
        break;
          case "shaken":
              token.actor.update({"data.conditions.shaken" : true});
token.toggleEffect(effectshaken);
var params =
[{
    enabled: true,
    filterType: "images",
    filterId: "ShakenFX",
    time: 0, 
    blend: 4,
    nbImage: 4, 
    padding: 100,
    alphaImg: .5, 
    alphaChr: 0,
    ampX: 0.5, 
    ampY: 0.5,
    animated :
    {
      time: 
      { 
        speed: 0.001, 
        animType: "move" 
      },
      ampX:
      {
        val1: 0, val2: 0.06,
        animType: "syncCosOscillation",
        loopDuration: 2000
      },
      ampY:
      {
        val1: 0, val2: 0.08,
        animType: "syncCosOscillation",
        loopDuration: 2000,
        pauseBetweenDuration: 2000
      },
      alphaChr:        
      {
        val1: 1, val2: 0.8,
        animType: "syncCosOscillation",
        loopDuration: 2000
      },
      alphaImg:        
      {
        val1: 0.2, val2: 0.4,
        animType: "syncSinOscillation",
        loopDuration: 2000
      }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
            break;
                      case "shaken2":
token.actor.update({"data.conditions.shaken" : false});
token.toggleEffect(effectshaken);
token.TMFXdeleteFilters("ShakenFX");
        break;
            case "sickened":
                token.actor.update({"data.conditions.sickened" : true});
                token.toggleEffect(effectsickened);
                var params =
[{
    filterType: "field",
    filterId: "sickenedFX",
    shieldType: 9,
    gridPadding: 1,
    color: 0x9BEC90,
    time: 0,
    blend: 1.4,
    intensity: 1.5,
    lightAlpha: 1,
    lightSize: 0.8,
    scale: 0.2,
    radius: 1,
    chromatic: false,
    zOrder: 512,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: 0.0008, 
        animType: "move" 
      },
      lightSize:        
      {
        val1: 0.8, val2: 0.4,
        animType: "syncCosOscillation",
        loopDuration: 5000
      }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
        break;
            case "sickened2":
                token.actor.update({"data.conditions.sickened" : false});
                token.toggleEffect(effectsickened);
                token.TMFXdeleteFilters("sickenedFX");
        break;
            case "stable":
                token.actor.update({"data.conditions.stable" : true});
                token.toggleEffect(effectstable);
        break;
            case "stable2":
                token.actor.update({"data.conditions.stable" : false});
                token.toggleEffect(effectstable);
        break;
            case "staggered":
                token.actor.update({"data.conditions.staggered" : true});
                token.toggleEffect(effectstaggered);
        break;
            case "staggered2":
                token.actor.update({"data.conditions.staggered" : false});
                token.toggleEffect(effectstaggered);
        break;
            case "stunned":
                token.actor.update({"data.conditions.stunned" : true});
                token.toggleEffect(effectstunned);
        break;
            case "stunned2":
                token.actor.update({"data.conditions.stunned" : false});
                token.toggleEffect(effectstunned);
        break;
            case "unconscious":
                token.actor.update({"data.conditions.unconscious" : true});
                token.toggleEffect(effectunconsious);
        break;
            case "unconscious2":
                token.actor.update({"data.conditions.unconscious" : false});
                token.toggleEffect(effectunconsious);
        break;
          case "removeall":
// Delete all filters on the selected tokens/tiles
TokenMagic.deleteFiltersOnSelected();
        }
      }
    }
  }
}).render(true);
})();
