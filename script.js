let color = "color:white;";
let weight = "font-weight:normal;";
let style = "font-style:normal;";

const colorarray = ["darkblue", "darkgreen", "darkaqua", "darkred", "darkpurple", "gold", "gray", "darkgray", "blue", "green", "aqua", "red", "purple", "yellow", "black", "white"];

// defined in loadArrays();
var iconarray = [];
var mobsarray = [];
var statsarray = [];
var weatherarray = [];
var legacyarray = [];

const substrings = ["[darkblue]", "[darkgreen]", "[darkaqua]", "[darkred]", "[darkpurple]", "[gold]", "[gray]", "[darkgray]", "[blue]", "[green]", "[aqua]", "[red]", "[purple]", "[yellow]", "[black]", "[white]", "[bold]", "[normal]", "[italic]"];

async function loadArrays() {
    const response = await fetch("./icons.json");
    const jsonData = await response.json();

    iconarray = jsonData.skills.map(item => item.char) + jsonData.icons.map(item => item.char);
    mobsarray = jsonData.mobs.map(item => item.char);
    statsarray = jsonData.stats.map(item => item.char);
    weatherarray = jsonData.weather.map(item => item.char);
    legacyarray = jsonData.legacy.map(item => item.char);

    colorsMenu(); // as this function is ran on load, also open up the colors menu as a freebie.
    return { iconarray };
}

function updateLore() {
    let lore = document.getElementById("lore");
    let lorearray = lore.value.split("\n");
    let tooltip = document.getElementById("tooltip");
    
    tooltip.innerHTML = "";
    color = "color:white;";
    weight = "font-weight:normal;";
    style = "font-style:normal;"
    
    for (let i of lorearray) {
        addText(i);
        tooltip.appendChild(document.createElement("br"));
    }
}

function addText(value) {
    let tooltip = document.getElementById("tooltip");

    if (substrings.some(sub => value.includes(sub))) {
        let found = substrings.find(sub => value.includes(sub));
        let split = value.split(found);
        
        addText(split[0]); // everything before any tags
        for (let i in split) {
            if (i > 0) {
                // add up everything after any amount of possible tags
                changeProperties(found);
                addText(split[i]);
            }
        }

    } else {
        let line = document.createElement("span");
        
        line.setAttribute("class", "tooltiptext");
        line.setAttribute("style", color + weight + style);
        line.innerHTML = value;

        tooltip.appendChild(line);
    }
}

function changeProperties(tag) {
    let property = tag.replace(/[\[\]]/g, "");
    if (property == "bold") {
        weight = "font-weight:bold;";
        return;
    }
    if (property == "italic") {
        style = "font-style:italic;";
        return;
    }
    if (property == "normal") {
        weight = "font-weight:normal;";
        style = "font-style:normal;";
        return;
    }
    color = "color:var(--" + String(property) + ");";
}

function changeRarity() {
    let rarity = document.getElementById("rarity").value;
    let tooltip = document.getElementById("tooltip");
    switch (rarity) {
        case "COMMON":
            tooltip.style.borderImage = "url(/assets/common_frame.png) 4 / 8px";
            
            break;
        case "UNCOMMON":
            tooltip.style.borderImage = "url(/assets/uncommon_frame.png) 6 / 12px";
            
            break;
        case "RARE":
            tooltip.style.borderImage = "url(/assets/rare_frame.png) 6 / 12px";
            
            break;
        case "EPIC":
            tooltip.style.borderImage = "url(/assets/epic_frame.png) 8 / 16px";
            
            break;
        case "LEGENDARY":
            tooltip.style.borderImage = "url(/assets/legendary_frame.png) 10 / 20px";
            
            break;
        case "MYTHIC":
            tooltip.style.borderImage = "url(/assets/mythic_frame.png) 10 / 20px";
            
            break;
        case "DIVINE":
            tooltip.style.borderImage = "url(/assets/supreme_frame.png) 14 / 28px";
            
            break;
        case "SPECIAL":
            tooltip.style.borderImage = "url(/assets/special_frame.png) 4 / 8px";
            
            break;
        case "VERY_SPECIAL":
            tooltip.style.borderImage = "url(/assets/very_special_frame.png) 20 / 40px";
            
            break;
        case "ULTIMATE":
            tooltip.style.borderImage = "url(/assets/ultimate_frame.png) 20 / 40px";
            
            break;
        case "NONE":
            tooltip.style.borderImage = "url(/assets/frame.png) 8 / 16px";
            
            break;
    }
}

function clearGrid() {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";
}

function colorsMenu() {
    clearGrid();
    for (let i of colorarray) {
        let newColorButton = document.createElement("button");
        newColorButton.innerHTML = "■";
        newColorButton.setAttribute("class", "iconbutton");
        newColorButton.setAttribute("style", "color:var(--" + i + "); font-size:32px;");
        newColorButton.setAttribute("onclick", "appendText" + "(\"[" + i + "]\")");
        grid.appendChild(newColorButton);
    }
}
function iconMenu(array) {
    clearGrid();
    for (let i of array) {
        if (i == ",") {
            continue // dumb. but parsing from json leads to commas somewhere along the way. this is the easiest way to get them out.
        }

        let newColorButton = document.createElement("button");
        newColorButton.innerHTML = i;
        newColorButton.setAttribute("class", "iconbutton gridbutton");
        newColorButton.setAttribute("style", "color:white; font-family:\"HypixelSkyblock\";");
        newColorButton.setAttribute("onclick", "appendText" + "(\"" + i + "\")");
        grid.appendChild(newColorButton);
    }
}

function appendText(text) {
    let lore = document.getElementById("lore");

    const originalValue = lore.value;
    const newValue = originalValue.substring(0,lore.selectionStart) + text + originalValue.substring(lore.selectionEnd);

    lore.value = newValue;
    
    updateLore();
}

function scaleTooltip(int) {
    let tooltip = document.getElementById("tooltip");
    tooltip.style.transform = "scale(" + int +")";
    tooltip.style.translate = "0 " + 50*(int-1) + "%";
}