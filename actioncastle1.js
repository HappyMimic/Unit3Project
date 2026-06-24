//#region Variable Definition
    //#region Game Mechanics
        let where = "cottage";
        let saving = "";
        let inventory = ["lamp"];
        let leftinv = [];
    //#endregion

    //#region Element Definition
        //#region Basic Page Elements
            let navbar = document.querySelector(".navbar");
            let homeButton = document.querySelector("#homeButton");
            let adjustPage = document.querySelector("#adjustPage");
        //#endregion

        //#region Location
            let dcontinue = document.querySelector("#dcontinue");
            let locationm = document.querySelector(".location");
            let dialog = document.querySelector("#dialog");
        //#endregion

        //#region Interaction
            let interaction = document.querySelector(".interaction");
            let directions = document.querySelector("#directions");

            //#region Exits
                let compass = document.querySelectorAll(".compass")
                let west = document.querySelector("#west");
                let north = document.querySelector("#north");
                let south = document.querySelector("#south");
                let east = document.querySelector("#east");
                let specialSingle = document.querySelector("#specialSingle");
                let specialTwoClass = document.querySelectorAll(".specialTwo");
                let specialTwoA = document.querySelector("#specialTwoA");
                let specialTwoB = document.querySelector("#specialTwoB");
                let specialThreeClass = document.querySelectorAll(".specialThree");
                let specialThreeA = document.querySelector("#specialThreeA");
                let specialThreeB = document.querySelector("#specialThreeB");
                let specialThreeC = document.querySelector("#specialThreeC");
            //#endregion

            //#region List choices
                let listc = document.querySelector(".list-choice");
                let listC = document.querySelector(".choices");
            //#endregion

            //#region binary options
                let binaryc = document.querySelector(".binary-choice");
                let binaryA = document.querySelector("#optA");
                let binaryB = document.querySelector("#optB");
            //#endregion

            //#region Text Input
                let ytextInput = document.querySelector("#textInput");
                let inputText = document.querySelector(".input-text");
            //#endregion
        //#endregion

        let textImage = document.querySelector("#textImage");
        console.log(textImage);
        let buttons = document.querySelectorAll("button:not(#homeButton,#adjustPage)");
        console.log(buttons);
    //#endregion
//#endregion

//#region Basic Workings

    //#region Resize
        function AdjustImage() {
            let navbarheight = document.querySelector(".navbar").clientHeight;
            let imgwidth = textImage.width;
            // Image location
            textImage.style.position="absolute";
            textImage.style.top = navbarheight+"px";
            textImage.style.left="0px";
            locationm.style.position="absolute";
            locationm.style.top = getComputedStyle(textImage).top;
            locationm.style.left=imgwidth+"px";
            locationm.style.width="calc(100vw - "+imgwidth+"px)";
            locationm.style.height="calc((100vh - "+navbarheight+"px) / 2";
            let locationheight = locationm.clientHeight;
            interaction.style.position = "absolute";
            interaction.style.top = (navbarheight + locationheight) + "px";
            interaction.style.width = "calc(100vw - "+imgwidth+"px)";
            interaction.style.left = imgwidth+"px";
            interaction.style.height="calc((100vh - "+navbarheight+"px) / 2";
        }

        window.addEventListener("load", function() {setTimeout(AdjustImage(),5000)});
        window.addEventListener("resize", function() {setTimeout(AdjustImage(),5000)});

        textImage.addEventListener("load", function() {setTimeout(AdjustImage(),5000)});
        textImage.addEventListener("resize", function() {setTimeout(AdjustImage(),5000)});

        adjustPage.addEventListener("click", function() {
            AdjustImage();
        });
    //#endregion

    //#region Repeat offenders
        function getDialog(path) {
            let txt;
            fetch("assets/text/"+path+".txt")
                .then((res) => res.text())
                .then((text) => {
                    dialog.innerHTML = text;
                })
                .catch((e) => console.error(e));
        }

        function DisableAll() {
            buttons.forEach(function(button){button.disabled = "disabled"});
            dcontinue.disabled = "";
        }

        function NormalButtons() {
            buttons.forEach(function(button){
                button.disabled = "";
                button.style.display = "inline";
            });
            listc.style.display = "none";
            specialTwoClass.forEach(function(button) {
                button.style.display = "none";
            });
            specialThreeClass.forEach(function(button) {
                button.style.display = "none";
            });
            binaryc.style.display = "inline";
            dcontinue.disabled = "disabled";
        }

        function Remove(item, list) {
            let index = list.indexOf(item);

            if (index !== -1) {
                list.splice(index, 1);
            }
            
            console.log(`Updated Array: ${list}`);
            return list;
        }
    //#endregion

    //#region Text Input
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

    homeButton.addEventListener("click", function() {
        window.location.href = "index.html";
    });

//#endregion

//#region Locations
    function Cottage() {
        getDialog("cottage");
        specialSingle.disabled = "";
        specialSingle.style.display = "inline";
        specialSingle.innerHTML = "Out";

        NormalButtons();
        west.disabled="disabled";
        north.disabled="disabled";
        south.disabled="disabled";
        east.disabled="disabled";
        where = "cottage";
        inputText.style.display = "none";
        listc.style.display = "none";

        textImage.src = "assets/images/cabin.png";

        binaryc.style.display = "inline";
        binaryA.innerHTML = "Examine";
        binaryB.innerHTML = "Inventory";
        AdjustImage();
    };

    function GardenPath() {
        getDialog("gardenPath");
        specialSingle.disabled = "";
        specialSingle.style.display = "inline";
        specialSingle.innerHTML = "In";
        
        NormalButtons();
        west.disabled="disabled";
        north.disabled="";
        south.disabled="";
        east.disabled="disabled";
        where = "gardenPath";
        textImage.src = "assets/images/garden-path.png";
        AdjustImage();
};
//#endregion

//#region Reactions
    //#region Find Item
    function FindRose() {
        getDialog("findRose");
        textImage.src = "assets/images/rose.png";
        inventory.push("rose");
        DisableAll();
    }

    function FindFishingPole() {
        getDialog("findFishingPole");
        textImage.src = "assets/images/fishing-pole.png";
        inventory.push("fishing pole");
        DisableAll();
    }
    //#endregion

    function NothingHere() {
        getDialog("nothingHere");
        textImage.src = "assets/images/nothing.png";
        textImage.style.background = "black";
        DisableAll();
    }

    function RunInventory() {
        console.log("RUN INVENTORY:");
        if (leftinv.includes("lamp")) {
            getDialog("lampDesc");
            textImage.src = "assets/images/lamp.png";
            leftinv = Remove("lamp", leftinv);
            console.log("   LAMP");
        } else if (leftinv.includes("fishing pole")) {
            getDialog("fishingPoleDesc");
            textImage.src = "assets/images/fishing-pole.png";
            leftinv = Remove("fishing pole", leftinv);
            console.log("   FISHING POLE");
        } else if (leftinv.includes("rose")) {
            getDialog("roseDesc");
            textImage.src = "assets/images/rose.png";
            leftinv = Remove("rose", leftinv);
            console.log("   ROSE");
        } else if (leftinv.includes("branch")) {
            getDialog("branchDesc");
            textImage.src = "assets/images/branch.png";
            leftinv = Remove("branch", leftinv);
            console.log("   BRANCH");
        } else if (leftinv.includes("fish")) {
            getDialog("fishDesc");
            textImage.src = "assets/images/fish.png";
            leftinv = Remove("fish", leftinv);
            console.log("   FISH");
        } else if (leftinv.includes("key")) {
            getDialog("keyDesc");
            textImage.src = "assets/images/take-key.png";
            leftinv = Remove("key", leftinv);
            console.log("   KEY");
        } else if (leftinv.includes("strange cangle")) {
            getDialog("strangeCandleDesc");
            textImage.src = "assets/images/strange-cangle.png";
            leftinv = Remove("strange candle", leftinv);
            console.log("   STRANGE CANDLE");
        } else if (leftinv.includes("lit lamp")) {
            getDialog("litLampDesc");
            textImage.src = "assets/images/light-lamp.png";
            leftinv = Remove("lit lamp", leftinv);
            console.log("   LIT LAMP");
        } else if (leftinv.includes("lit strange candle")) {
            getDialog("litStrangeCandleDesc");
            textImage.src = "assets/images/light-strange-candle.png";
            leftinv = Remove("lit strange candle", leftinv);
            console.log("   LIT STRANGE CANDLE");
        }  else if (leftinv.includes("crown")) {
            getDialog("crownDesc");
            textImage.src = "assets/images/crown.png";
            leftinv = Remove("crown", leftinv);
            console.log("   CROWN");
        }
        if (leftinv.length === 0) {
            where = saving;
            saving = "";
            leftinv = [];
        }
        DisableAll();
    }
//#endregion

//#region Button Events
    dcontinue.addEventListener("click", function() {
        console.log("continuation");
        if (where === "cottage") {
            Cottage();
        } else if (where === "inventory") {
            console.log("in the right area");
            RunInventory();
            console.log("Afterfunction");
        } else if (where === "gardenPath") {
            GardenPath();
        }
    });

    specialSingle.addEventListener("click", function(){
        if (where === "cottage") {
            GardenPath();
        } else if (where === "gardenPath") {
            Cottage();
        }
    });

    binaryA.addEventListener("click", function() {
        if (where === "cottage") {
            if (inventory.includes("fishing pole")) {
                NothingHere();
            } else {
                FindFishingPole();
            }
        }
    });

    binaryB.addEventListener("click", function() {
        saving = where;
        where = "inventory";
        console.log("Just before:")
        leftinv = [...inventory];
        console.log(leftinv);
        console.log(inventory);
        console.log(leftinv.length);
        console.log("endreciept");
        RunInventory();
    });

//#endregion

GardenPath();