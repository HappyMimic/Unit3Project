let charname = "";
let inventory = [];
let ytextInput = document.querySelector("#textInput");
let textImage = document.querySelector("#textImage");
let whichImage = "assets/snake.txt"; 

//#region Locations
function Cottage() {
    if (inventory.includes("fishingPole")) {
        
    } else {

    }
};
//#endregion

//#region Basic Workings
ytextInput.addEventListener("focus", function() {
    ytextInput.select();
});

ytextInput.addEventListener("keypress", function(event) {
    // Submit is permanent
    if (event.code === "Enter") {
        if (!((ytextInput.value).includes("Name here")) && !((ytextInput.value).includes("Fill this out please."))) {
            ytextInput.setAttribute("disabled","disabled");
            charname=ytextInput.value();
            (document.querySelector("p")).innerHTML=charname;
        } else  {
            ytextInput.value="Fill this out please.";
        }
    }
});
//#endregion