// Created by /CrazyCalYa
// Tested to work with FoundryVTT V10

let compendiums = await game.packs.contents;
let compendiumsLength = compendiums.length;

let compendiumSelect = ``;
for (let i = 0; i < compendiumsLength; i++)
    compendiumSelect += `<option value="${compendiums[i].metadata.id}">${compendiums[i].metadata.label}</option>`
compendiumSelect = `<select name="compendiumSelect" style="width: 8em;">${compendiumSelect}</select>`

let content = `
    <div>
        <p>Please select a compendium to convert to rolltable.</p>
        <form>
            <div class="form-group">
                <label>Compendium:</label>
                ${compendiumSelect}
            </div>
        </form>
    </div>`

await Dialog.confirm({
    title: "Compendium to Rolltable",
    content: content,
    yes: async (html) => {
        let selected = html.find('select[name="compendiumSelect"]').val();

        let compendium = await game.packs.get(selected);

        // Ported from Foundry's existing RollTable.fromFolder() 
        async function fromCompendium(compendium, options = {}) {
            const results = await compendium.index.map((e, i) => {
                return {
                    text: e.name,
                    type: 2,
                    collection: compendium.type,
                    resultId: e.id,
                    img: e.thumbnail || e.img,
                    weight: 1,
                    range: [i + 1, i + 1],
                    documentCollection: `${compendium.metadata.packageName}.${compendium.metadata.name}`,
                    drawn: false
                };
            });
            options.renderSheet = options.renderSheet ?? true;
            return await RollTable.create({
                name: compendium.metadata.label,
                description: `A random table created from the contents of the ${compendium.metadata.label} compendium.`,
                results: results,
                formula: `1d${results.length}`
            }, options);
        }

        await fromCompendium(compendium);

    },
    defaultYes: false
});
