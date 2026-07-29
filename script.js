let color = "color:white;";
let weight = "font-weight:normal;";
let style = "font-style:normal;";

const colorarray = ["darkblue", "darkgreen", "darkaqua", "darkred", "darkpurple", "gold", "gray", "darkgray", "blue", "green", "aqua", "red", "purple", "yellow", "black", "white"];
// This is entirely unreadable. Too bad!
const iconarray =  ["", "", "", "", "✔", "✖", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const mobsarray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const statsarray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "�"];

const substrings = ["[darkblue]", "[darkgreen]", "[darkaqua]", "[darkred]", "[darkpurple]", "[gold]", "[gray]", "[darkgray]", "[blue]", "[green]", "[aqua]", "[red]", "[purple]", "[yellow]", "[black]", "[white]", "[bold]", "[normal]", "[italic]"];

function updateLore() {
    let lore = document.getElementById("lore");
    let lorearray = lore.value.split("\n");
    let tooltip = document.getElementById("tooltip");
    
    tooltip.innerHTML = "";
    color = "color:white;";
    weight = "font-weight:normal;";
    
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
        let after = "";
        
        addText(split[0]); // everything before any tags
        for (let i in split) {
            if (i > 0) {
                // add up everything after any amount of possible tags
                after += split[i];
            }
        }
        changeProperties(found);
        addText(after);

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
            tooltip.style.borderImage = "url(assets/common_frame.png) 4 / 8px";
            
            break;
        case "UNCOMMON":
            tooltip.style.borderImage = "url(assets/uncommon_frame.png) 6 / 12px";
            
            break;
        case "RARE":
            tooltip.style.borderImage = "url(assets/rare_frame.png) 6 / 12px";
            
            break;
        case "EPIC":
            tooltip.style.borderImage = "url(assets/epic_frame.png) 8 / 16px";
            
            break;
        case "LEGENDARY":
            tooltip.style.borderImage = "url(assets/legendary_frame.png) 10 / 20px";
            
            break;
        case "MYTHIC":
            tooltip.style.borderImage = "url(assets/mythic_frame.png) 10 / 20px";
            
            break;
        case "DIVINE":
            tooltip.style.borderImage = "url(assets/supreme_frame.png) 14 / 28px";
            
            break;
        case "SPECIAL":
            tooltip.style.borderImage = "url(assets/special_frame.png) 4 / 8px";
            
            break;
        case "VERY_SPECIAL":
            tooltip.style.borderImage = "url(assets/very_special_frame.png) 20 / 40px";
            
            break;
        case "ULTIMATE":
            tooltip.style.borderImage = "url(assets/ultimate_frame.png) 20 / 40px";
            
            break;
        case "NONE":
            tooltip.style.borderImage = "url(assets/frame.png) 8 / 16px";
            
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
        let newColorButton = document.createElement("button");
        newColorButton.innerHTML = i;
        newColorButton.setAttribute("class", "iconbutton");
        newColorButton.setAttribute("style", "color:white; font-family:\"HypixelSkyblock\"; font-size:32px;");
        newColorButton.setAttribute("onclick", "appendText" + "(\"" + i + "\")");
        grid.appendChild(newColorButton);
    }
}

function appendText(text) {
    let lore = document.getElementById("lore");
    lore.value += String(text);
    updateLore();
}

function scaleTooltip(int) {
    let tooltip = document.getElementById("tooltip");
    tooltip.style.transform = "scale(" + int +")";
    tooltip.style.translate = "0 " + 50*(int-1) + "%";
}
