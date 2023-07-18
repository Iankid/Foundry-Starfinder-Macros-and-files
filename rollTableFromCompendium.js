// Created by /CrazyCalYa
// Tested to work with FoundryVTT V10, direct compatibility with DnD5e & SFRPG. Thorough testing still required.

let allCompendiums = await game.packs.contents;
let compendiumsLength = allCompendiums.length;
let itemTypes = await game.documentTypes.Item.sort();
let itemTypesLength = itemTypes.length;
let thisSystem = await game.system.id;

let windowWidth;
switch (thisSystem) {
    case "dnd5e":
        windowWidth = 322;
        break;
    case "sfrpg":
        windowWidth = 656;
        break;
}

let compendiumSelect = ``;
for (let i = 0; i < compendiumsLength; i++)
    compendiumSelect += `<option value="${allCompendiums[i].metadata.id}">${allCompendiums[i].metadata.label}</option>`
compendiumSelect = `<select name="compendiumSelect" style="width: 8em;">${compendiumSelect}</select>`

function capitalize(string) {
    if (typeof string === "string")
        return string[0].toUpperCase() + string.substring(1);
    return string;
};

function getValueByPath(obj, path) {
    let parts = path.split('.');
    let current = obj;

    for (let part of parts) {
        if (current[part] !== undefined) {
            current = current[part];
        } else {
            return undefined;
        }
    }
    return current;
}

function createCustomFilterSection() {
    const section = document.createElement('div');
    section.className = 'customFilterSection';
    section.innerHTML = `
        <hr>
        <div class="form-group">
            <label>Path:</label>
            <div class="form-fields">
                <input type="text" class="filterPath" placeholder="system.baseItem"></input>
            </div>
        </div>
        <div class="form-group">    
            <label>Requirements:</label>
            <div class="form-fields">
                <input type="text" class="filterRequirements" placeholder="battleaxe, longbow"></input>
            </div>
        </div>`;
    return section;
}

function createNameFilterSection() {
    const section = document.createElement('div');
    section.className = 'nameFilterSection';
    section.innerHTML = `
        <hr>
        <div class="form-group">
            <label>Name Contains:</label>
            <div class="form-fields">
                <input type="text" class="filterName" placeholder="arrow"></input>
            </div>
            <input type="checkbox" class="filterNameExclude">Exclude</input>
        </div>`;
    return section;
}

function caseInsensitiveIncludes(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

let itemTypeSelect = ``;
for (let i = 0; i < itemTypesLength; i++)
    itemTypeSelect += `
    <div class="form-group has-boxes">
        <label>${capitalize(itemTypes[i])}</label>
        <div class="form-fields">
            <input type="checkbox" value="${itemTypes[i]}" class="itemTypeCheckbox">
        </div>
    </div>
    `;

let spellLevel = [];
switch (thisSystem) {
    case "dnd5e":
        spellLevel = [`cantrip`, `1st`, `2nd`, `3rd`, `4th`, `5th`, `6th`, `7th`, `8th`, `9th`];
        break;
    case "sfrpg":
        for (let i = 0; i < 7; i++)
            spellLevel.push(i);
        break;
};

let spellLevelLength = spellLevel.length;
let spellLevelSelect = ``;
for (let i = 0; i < spellLevelLength; i++)
    spellLevelSelect += `
    <div class="form-group has-boxes">
        <label>${capitalize(spellLevel[i])}</label>
        <div class="form-fields">
            <input type="checkbox" value="${[i]}" class="spellLevelCheckbox">
        </div>
    </div>
    `;


let itemRarity = [];
let itemRaritySelect = ``;
switch (thisSystem) {
    case "sfrpg":
        for (let i = 0; i < 22; i++)
            itemRarity.push(i);
        break;
    case "dnd5e":
        itemRarity = ['common', 'uncommon', 'rare', 'veryRare', 'legendary', 'artifact'];
        itemRaritySelect = `
            <div class="form-group has-boxes">
                <label>None</label>
                <div class="form-fields">
                    <input type="checkbox" value="" class="itemRarityCheckbox">
                </div>
            </div>
            `;
        break;
}

let itemRarityLength = itemRarity.length;
for (let i = 0; i < itemRarityLength; i++)
    itemRaritySelect += `
    <div class="form-group has-boxes">
        <label>${capitalize(itemRarity[i])}</label>
        <div class="form-fields">
            <input type="checkbox" value="${itemRarity[i]}" class="itemRarityCheckbox">
        </div>
    </div>
    `;


let content = `
    <div>
        <form>
            <div class="form-group">
                <label>Compendium:</label>
                <div class="form-fields">
                ${compendiumSelect}
                </div>
            </div>
            <hr>
            <button id="toggleAll" type="button">Toggle All</button>
            <input type="checkbox" id="filterTypes">Item Type</input>
            <div id="itemTypeFilters" class="grid-container" style="display: none; font-size: 80%;">
                ${itemTypeSelect}
            </div>
            <br>
            <input type="checkbox" id="filterSpells">Spell Level</input>
            <div id="spellLevelFilters" style="display: none; font-size: 80%; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 2px 8px;">
                ${spellLevelSelect}
            </div>
            <br>
            <input type="checkbox" id="filterRarity">Rarity</input>
            <div id="rarityFilters" style="display: none; font-size: 80%; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 2px 8px;">
                ${itemRaritySelect}
            </div>
            <hr>
            <div id="nameFilters">
                <button id="addNameFilter" type="button">Add Name Filter</button>
            </div>
            <hr>
            <div id="customFilters">
                <button id="addCustomFilter" type="button">Add Custom Filter</button>
            </div>
            <hr>
        </form>
    </div>`

let styles = `
    <style>
        .has-boxes{
            border: 1px solid #000000;
            border-radius: 3px;
            padding: 3px;
            display: flex;
            flex-direction: column;
        }
        .has-boxes label {
            white-space: nowrap;
            text-overflow: clip;
            width: 100%;
        }
        .has-boxes .form-fields {
            display: flex;
            flex-direction: column;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px 8px;
          }
    </style>`;

class CompendiumToRollTable extends Dialog {
    constructor() {
        super({
            title: "Compendium to Rolltable",
            content: content + styles,
            buttons: {
                proceed: {
                    icon: "<i class='fas fa-check'></i>",
                    label: "OK",
                    callback: async (html) => {
                        let selected = html.find('select[name="compendiumSelect"]').val();
                        let filterTypes = html.find('#filterTypes').prop('checked');
                        let selectedItems = filterTypes ? Array.from(html[0].querySelectorAll('.itemTypeCheckbox:checked')).map(checkbox => checkbox.value) : itemTypes;
                        let filterSpells = html.find('#filterSpells').prop('checked');
                        let selectedSpellLevels = filterSpells ? Array.from(html[0].querySelectorAll('.spellLevelCheckbox:checked')).map(checkbox => parseInt(checkbox.value)) : Array.from({ length: 10 }, (_, i) => i);
                        let filterRarity = html.find('#filterRarity').prop('checked');
                        let selectedRarities = filterRarity ? Array.from(html[0].querySelectorAll('.itemRarityCheckbox:checked')).map(checkbox => checkbox.value) : itemRarity;
                        let nameFilterSections = html.find('.nameFilterSection');
                        let nameFilters = nameFilterSections.map(function () {
                            return {
                                filterName: $(this).find('.filterName').val().trim(),
                                filterNameExclude: $(this).find('.filterNameExclude').prop('checked')
                            };
                        }).get();
                        let customFilterSections = html.find('.customFilterSection');
                        let customFilters = customFilterSections.map(function () {
                            return {
                                filterPath: $(this).find('.filterPath').val().trim(),
                                filterRequirements: $(this).find('.filterRequirements').val().trim().split(',').map(req => req.trim())
                            };
                        }).get();

                        let compendium = await game.packs.get(selected);

                        async function fromCompendium(compendium, options = {}) {
                            const entries = await compendium.getDocuments();
                            const filteredEntries = entries.filter(entry => {

                                let customFiltersValid = customFilters.every(({ filterPath, filterRequirements }) => {
                                    let filterPathValue = getValueByPath(entry, filterPath);
                                    let filterPathValid = filterPath.length === 0 || (filterRequirements.length > 0 && filterPathValue !== undefined && filterRequirements.map(String).includes(String(filterPathValue)));
                                    return filterPathValid;
                                });

                                let nameFilterValid = nameFilters.every(({ filterName, filterNameExclude }) => {
                                    return filterName.length === 0 || (filterNameExclude ? !caseInsensitiveIncludes(filterName, entry.name) : caseInsensitiveIncludes(filterName, entry.name));
                                });

                                let itemTypeValid = selectedItems.includes(entry.type);
                                let spellLevelValid = (entry.system.type !== "spell" && entry.type !== "spell") || selectedSpellLevels.includes(entry.system.level);
                                let rarityValid = !filterRarity || (entry.system.rarity && selectedRarities.includes(entry.system.rarity));

                                return customFiltersValid && nameFilterValid && itemTypeValid && spellLevelValid && rarityValid;
                            });


                            if (filteredEntries.length === 0)
                                return ui.notifications.error('No valid items within compendium for selected filters.')
                            const results = filteredEntries.map((entry, i) => {
                                return {
                                    text: entry.name,
                                    type: 2,
                                    collection: compendium.type,
                                    resultId: entry.id,
                                    img: entry.img,
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
                    height: 40
                },
                cancel: {
                    icon: "<i class='fas fa-times'></i>",
                    label: "Cancel",
                    callback: () => { },
                    height: 40
                }
            },
            default: "cancel"
        },
            {
                width: windowWidth,
                resizable: true
            })
    }

    activateListeners(html) {

        // // TODO Implement a filter to only display relevant item types per compendium. Should uncheck and hide irrelevant options.
        // html.find('select[name="compendiumSelect"]').on('change', async (e) => {
        //     let selectedOptionValue = $(e.currentTarget).val();
        //     let selectedOptionName = html.find(`option[value="${selectedOptionValue}"]`).val();
        //     let thisPack = game.packs.get(selectedOptionName);

        //     // Get all of the "type" properties within the pack and save it to an array
        //     let types = await thisPack.getIndex().then(index => {
        //         return [...new Set(index.map(i => i.type))]; // extract the "type" property from each object, create a set of unique values, and convert the set back to an array
        //     });

        //     console.log(types)
        // });

        html.find("#toggleAll").on('click', async () => {
            let itemTypeCheckboxes = html.find(".itemTypeCheckbox");
            let spellLevelCheckboxes = html.find(".spellLevelCheckbox");
            let itemRarityCheckboxes = html.find(".itemRarityCheckbox");
            let allCheckboxes = itemTypeCheckboxes.add(spellLevelCheckboxes).add(itemRarityCheckboxes);

            let shouldCheckAll = allCheckboxes.toArray().some(checkbox => !checkbox.checked);

            allCheckboxes.prop("checked", shouldCheckAll);
        });


        html.find('#filterTypes').on('change', (e) => {
            let isChecked = e.target.checked;
            if (isChecked) {
                html.find("#itemTypeFilters").css("display", "grid");
            } else {
                html.find("#itemTypeFilters").css("display", "none");
            }
        });

        html.find('#filterSpells').on('change', (e) => {
            let isChecked = e.target.checked;
            if (isChecked) {
                html.find("#spellLevelFilters").css("display", "grid");
            } else {
                html.find("#spellLevelFilters").css("display", "none");
            }
        });

        html.find('#filterRarity').on('change', (e) => {
            let isChecked = e.target.checked;
            if (isChecked) {
                html.find("#rarityFilters").css("display", "grid");
            } else {
                html.find("#rarityFilters").css("display", "none");
            }
        });

        html.find('#addCustomFilter').on('click', () => {
            const customFilterSection = createCustomFilterSection();
            html.find('#customFilters').append(customFilterSection);
        });

        html.find('#addNameFilter').on('click', () => {
            const nameFilterSection = createNameFilterSection();
            html.find('#nameFilters').append(nameFilterSection);
        });

        super.activateListeners(html);
    }

}

new CompendiumToRollTable().render(true);
