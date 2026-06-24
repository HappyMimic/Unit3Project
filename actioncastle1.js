//#region Variable Definition
    //#region Game Mechanics
        let where = "cottage";
        let inventory = ["lamp"];
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
            console.log("imgwidth: " + imgwidth);
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
            specialTwo.forEach(function(button) {
                button.style.display = "none";
            });
            specialThree.forEach(function(button) {
                button.style.display = "none";
            });
            dcontinue.disabled = "disabled";
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
    function FindFishingPole() {
        getDialog("findFishingPole");
        textImage.src = "assets/images/fishing-pole.png";
        inventory.push("Fishing pole");
        DisableAll();
    }
    function NothingHere() {
        getDialog("nothingHere");
        textImage.src = "assets/images/nothing.png";
        textImage.style.background = "black";
        DisableAll();
}
//#endregion

//#region Button Events
    dcontinue.addEventListener("click", function() {
        if (where === "cottage") {
            Cottage();
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
            if (inventory.includes("Fishing pole")) {
                NothingHere();
            } else {
                FindFishingPole();
            }
        }
    });

//#endregion

GardenPath();