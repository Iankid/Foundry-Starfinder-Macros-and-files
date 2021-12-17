/*
Adds or Subracts 1 usage from a listed Starfinder resource.
Change "TYPE" and "SUBTYPE" to those listed in the resource details, keeping " "
    • SELECT A TOKEN FIRST
    • Click to subtract
    • Shift-Click to add
    • Alt-Click to reset
    • Ctrl-Click for minimum value
    • Ctrl-Shift-Click for maximum
*/
(()=> {
    if (!token)
    {
        return ui.notifications.error("Please select a token first");
    }

    // Set the type and subtype of the resource
    const resourceType = "solarian"; // e.g. solarian
    const resourceSubtype = "stellarMode"; // e.g. stellarMode

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
        return token.actor.setResourceBaseValue(resourceType, resourceSubtype, 0);
    }

    if (event.ctrlKey)
    {
        if (event.shiftKey) {
            // Maximum
            return token.actor.setResourceBaseValue(resourceType, resourceSubtype, max);
        } else {
            // Minimum
            return token.actor.setResourceBaseValue(resourceType, resourceSubtype, min);
        }
    }

    if (event.shiftKey)
    {
        // Increment
        if ((max || max === 0) && base >= max)
        {
            return ui.notifications.error(`${resource.name} already at the maximum value of ${Math.abs(max)} for resource`);
        }

        newBase = Math.min(base + 1, max);
    }
    else
    {
        // Decrement
        if ((min || min === 0) && base <= min)
        {
            return ui.notifications.error(`${resource.name} already at the maximum value of ${Math.abs(min)} for resource`);
        }

        newBase = Math.max(base - 1, min);
    }

    return token.actor.setResourceBaseValue(resourceType, resourceSubtype, newBase);
})();