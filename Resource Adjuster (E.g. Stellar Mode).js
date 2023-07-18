/*
Adds or Subracts 1 usage from a listed Starfinder resource.
Change "TYPE" and "SUBTYPE" to those listed in the resource details, keeping " "
    • SELECT A TOKEN FIRST
    • Click to add
    • Shift-Click to subtract
    • Alt-Click to reset
    • Ctrl-Click for maximum value
    • Ctrl-Shift-Click for minimum value
*/
(()=> {
    if (!token)
    {
        return ui.notifications.error("Please select a token first");
    }

    // Set the type and subtype of the resource
    const resourceType = "solarian"; // e.g. solarian , evolutionist
    const resourceSubtype = "stellarMode"; // e.g. stellarMode , evolutionTrack

    const resource = token.actor.getResource(resourceType, resourceSubtype);

    if (!resource)
    {
        return ui.notifications.error("Token does not have this resource available.");
    }

    const base = resource.data.data.base;
    const min = resource.data.data.range.min;
    const max = resource.data.data.range.max;


    let newBase = base;
    if (event.altKey)
    {
        // Reset
        ui.notifications.info("Resource points have been reset");
        return token.actor.setResourceBaseValue(resourceType, resourceSubtype, 0);
    }

    if (event.ctrlKey)
    {
        if (event.shiftKey) {
            // Minimum
            ui.notifications.info("Resource points have been set to the minimum");
            return token.actor.setResourceBaseValue(resourceType, resourceSubtype, min);
        } else {
            // Maximum
            ui.notifications.info("Resource points have been set to the maximum");
            return token.actor.setResourceBaseValue(resourceType, resourceSubtype, max);
        }
    }

    if (event.shiftKey)
    {
        // Decrement
        if ((min || min === 0) && base <= min)
        {
            return ui.notifications.error(`${resource.name} already at the minimum value of ${Math.abs(min)} for resource`);
        }

        ui.notifications.info("Resource points have been reduced by one");
        newBase = Math.max(base - 1, min);
    }
    else
    {
        // Increment
        if ((max || max === 0) && base >= max)
        {
            return ui.notifications.error(`${resource.name} already at the maximum value of ${Math.abs(max)} for resource`);
        }

        ui.notifications.info("Resource points have been increased by one");
        newBase = Math.min(base + 1, max);
    }

    return token.actor.setResourceBaseValue(resourceType, resourceSubtype, newBase);
})();
