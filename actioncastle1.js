//#region Variable Definition
    //#region Game Mechanics
        let where = "cottage";
        let saving = "";
        let inventory = ["lamp"];
        let leftinv = [];
        let troll = true;
        let user = "";
    //#endregion

    //#region Element Definition
        //#region Basic Page Elements
            let navbar = document.querySelector(".navbar");
            let homeButton = document.querySelector("#homeButton");
            let adjustPage = document.querySelector("#adjustPage");
            let body = document.querySelector("body");
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
                let binaryC = document.querySelector("#optC");
                let binaryD = document.querySelector("#optD");
            //#endregion

            //#region Text Input
                let ytextInput = document.querySelector("#textInput");
                let inputText = document.querySelector(".input-text");
            //#endregion
        //#endregion

        let textImage = document.querySelector("#textImage");
        let buttons = document.querySelectorAll("button:not(#homeButton,#adjustPage)");
    //#endregion
//#endregion

//#region Basic Workings

    //#region Resize
        function AdjustImage() {
            let navbarheight = navbar.clientHeight;
            let imgwidth = textImage.width;
            // Image location
            textImage.style.position="fixed";
            navbar.style.zIndex = "10";
            textImage.style.zIndex="5";
            locationm.style.zIndex="2";
            navbar.style.width="100vw";
            navbar.style.position="fixed";
            interaction.style.overflowY="scroll";
            locationm.style.overflowY="scroll";
            locationm.style.overflowX="hidden";
            interaction.style.overflowX="hidden";
            textImage.style.top = navbarheight+"px";
            body.style.maxWidth = "100vw";
            body.style.width = "100vw";
            textImage.style.left="0px";
            locationm.style.position="fixed";
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
        function getDialog(path, _callback = function(){}) {
            let txt;
            fetch("assets/text/"+path+".txt")
                .then((res) => res.text())
                .then((text) => {
                    dialog.innerHTML = text;
                })
                .catch((e) => console.error(e));
            _callback();
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
            binaryC.style.display = "none";
            binaryD.style.display = "none";
            saving = "";
            dcontinue.disabled = "disabled";
        }

        function Remove(item, list) {
            let index = list.indexOf(item);

            if (index !== -1) {
                list.splice(index, 1);
            }
            return list;
        }

        function StartItAll() {
            Cottage();
            DisableAll();
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
                    setTimeout(Input(),500);                
                } else  {
                    ytextInput.value="Fill this out please.";
                }
            }
        });

        function Input() {
            Cottage();
            user = ytextInput.value;
            ytextInput.disabled = "disabled";
        }

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
        inputText.style.display = "auto";
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

    function FishingPond() {
        getDialog("fishingPond");
        NormalButtons();
        specialSingle.style.display = "none";
        west.disabled="disabled";
        north.disabled="";
        south.disabled="disabled";
        east.disabled="disabled";
        where = "fishingPond";
        textImage.src = "assets/images/fishing-pond.png";
        AdjustImage();
    };

    function BendInRoad() {
        getDialog("bendInRoad");
        NormalButtons();
        west.disabled="disabled";
        north.disabled="disabled";
        south.disabled="";
        east.disabled="";
        specialSingle.innerHTML="Up";
        where = "bendInRoad";
        textImage.src = "assets/images/bend-in-road.png";
        AdjustImage();
    };

    function ToweringTree() {
        getDialog("toweringTree");
        NormalButtons();
        specialSingle.style.display = "inline";
        specialSingle.innerHTML = "Down";
        west.disabled="disabled";
        north.disabled="disabled";
        south.disabled="disabled";
        east.disabled="disabled";
        where = "toweringTree";
        textImage.src = "assets/images/towering-tree.png";
        AdjustImage();
    }

    function Drawbridge() {
        NormalButtons();
        west.disabled="";
        north.disabled="disabled";
        south.disabled="disabled";
        east.disabled="";
        specialSingle.style.display="none";
        textImage.src = "assets/images/drawbridge.png";
        if (troll) {
            getDialog("drawbridge");
            DisableAll();
        } else {
            getDialog("drawbridge", function(){
                console.log(dialog.innerHTML);
            });
        }
        where = "drawbridge";
        AdjustImage();
    }
//#endregion

//#region Reactions
    //#region Other Goobers
    function UselessHere(item) {
        getDialog("uselessHere");
    }

    function RunInventory() {
        if (leftinv.indexOf("lamp") === 0) {
            getDialog("lampDesc");
            textImage.src = "assets/images/lamp.png";
            leftinv = Remove("lamp", leftinv);
        } else if (leftinv.indexOf("fishingPole")===0) {
            getDialog("fishingPoleDesc");
            textImage.src = "assets/images/fishing-pole.png";
            leftinv = Remove("fishingPole", leftinv);
        } else if (leftinv.indexOf("rose")===0) {
            getDialog("roseDesc");
            textImage.src = "assets/images/rose.png";
            leftinv = Remove("rose", leftinv);
        } else if (leftinv.indexOf("branch")===0) {
            getDialog("branchDesc");
            textImage.src = "assets/images/branch.png";
            leftinv = Remove("branch", leftinv);
        } else if (leftinv.indexOf("fish")===0) {
            getDialog("fishDesc");
            textImage.src = "assets/images/fish.png";
            leftinv = Remove("fish", leftinv);
        } else if (leftinv.indexOf("key")===0) {
            getDialog("keyDesc");
            textImage.src = "assets/images/take-key.png";
            leftinv = Remove("key", leftinv);
        } else if (leftinv.indexOf("strangeCangle")===0) {
            getDialog("strangeCandleDesc");
            textImage.src = "assets/images/strange-cangle.png";
            leftinv = Remove("strangeCandle", leftinv);
        } else if (leftinv.indexOf("litLamp")===0) {
            getDialog("litLampDesc");
            textImage.src = "assets/images/light-lamp.png";
            leftinv = Remove("litLamp", leftinv);
        } else if (leftinv.indexOf("litStrangeCandle")===0) {
            getDialog("litStrangeCandleDesc");
            textImage.src = "assets/images/light-strange-candle.png";
            leftinv = Remove("litStrangeCandle", leftinv);
        }  else if (leftinv.indexOf("crown")===0) {
            getDialog("crownDesc");
            textImage.src = "assets/images/crown.png";
            leftinv = Remove("crown", leftinv);
        }
        DisableAll();
        binaryC.style.display="inline";
        binaryC.disabled="";
        if (leftinv.length === 0) {
            where = saving;
            leftinv = [];
        }
    }

    function NothingHere() {
        getDialog("nothingHere");
        textImage.src = "assets/images/nothing.png";
        textImage.style.background = "black";
        DisableAll();
    }

    function Troll() {
            getDialog("troll");
            NormalButtons();
            west.disabled="";
            north.disabled="disabled";
            south.disabled="disabled";
            east.disabled="disabled";
            specialSingle.style.display="none";
            textImage.src = "assets/images/troll.png";
    }
    //#endregion
    
    //#region Find Item
    function FindFishingPole() {
        getDialog("findFishingPole");
        textImage.src = "assets/images/find-fishing-pole.png";
        inventory.push("fishingPole");
        DisableAll();
    }

    function FindRose() {
        getDialog("findRose");
        textImage.src = "assets/images/find-rose.png";
        inventory.push("rose");
        DisableAll();
    }

    function FindBranch() {
        getDialog("findBranch");
        textImage.src = "assets/images/find-branch.png";
        inventory.push("branch");
        DisableAll();
    }
    //#endregion

    //#region Use Item
        function GoFish() {
            getDialog("goFish");
            DisableAll();
            textImage.src = "assets/images/go-fish.png";
            binaryC.style.display="none";
            where = "fishingPond";
            inventory.push("fish");
            AdjustImage();
        }

        function GiveTrollFish() {
            getDialog("giveTrollFish");
            DisableAll();
            troll = false;
            textImage.src = "assets/images/give-troll-fish.png";
            binaryC.style.display="none";
            where = "drawbridge";
            inventory = Remove("fish",inventory);
            AdjustImage();
        }
    //#endregion
//#endregion

//#region Button Events
    dcontinue.addEventListener("click", function() {
        if (where === "cottage") {
            Cottage();
        } else if (where === "inventory") {
            RunInventory();
        } else if (where === "gardenPath") {
            GardenPath();
        } else if (where === "fishingPond") {
            FishingPond();
        } else if (where === "bendInRoad") {
            BendInRoad();
        } else if (where === "toweringTree") {
            ToweringTree();
        } else if (where === "drawbridge" && troll) {
            Troll();
        } else if (where === "drawbridge" && !troll) {
            Drawbridge();
        } 
    });

    binaryC.addEventListener("click",function(){
        let currentind = inventory.length - (leftinv.length + 1);
        if (saving === "fishingPond" && inventory.indexOf("fishingPole") === currentind) {
            GoFish();
            leftinv = [];
            inventory=Remove("fishingPole",inventory);
        } else if (saving === "drawbridge" && inventory.indexOf("fish") === currentind && troll) {
            GiveTrollFish();
            leftinv = [];
        } else if (saving === "drawbridge" && inventory.indexOf("branch") === currentind) {
            DeathByTroll("branch");
            leftinv = [];
        } else if (saving === "dungeon" && inventory.indexOf("branch") === currentind) {
            DeathByGhost("branch");
            leftinv = [];
        } else if (saving === "courtyardGuard" && inventory.indexOf("branch") === currentind) {
            HitGuard();
            leftinv = [];
            inventory=Remove("branch",inventory);
        } else if (saving === "princessRoom" && inventory.indexOf("rose") === currentind) {
            GivePrincessRose();
            leftinv = [];
            inventory=Remove("rose",inventory);
        } else if (saving === "dungeon" && inventory.indexOf("rose") === currentind) {
            DeathByGhost("rose");
            leftinv = [];
        } else if (saving === "dungeon" && inventory.indexOf("strangeCandle") === currentind) {
            LightStrangeCandle();
            leftinv = [];
        } else if (saving === "drawbridge" && inventory.indexOf("rose") === currentind) {
            DeathByTroll("rose");
            leftinv = [];
        } else if (saving === "courtyardGuard" && !inventory.indexOf("") === currentind) {
            ConfuseGuard();
            leftinv = [];
        } else {
            UselessHere();
        }
    })

    north.addEventListener("click", function(){
        if (where === "fishingPond") {
            GardenPath();
        } else if (where === "gardenPath") {
            BendInRoad();
        }
    });

    south.addEventListener("click",function(){
        if (where === "gardenPath") {
            FishingPond();
        } else if (where === "bendInRoad") {
            GardenPath();
        }
    });

    east.addEventListener("click",function(){
        if (where === "bendInRoad") {
            Drawbridge();
        } else if (where === "drawbridge") {
            alert("Thank you " + user + " for playing so far!\nThis game is yet to be complete, but come back later to learn how you become Ruler "+user+" of ACTION CASTLE (castle castle castle)!");
            location.reload();
        }
    });

    west.addEventListener("click",function(){
        if (where === "drawbridge") {
            BendInRoad();
        }
    });

    specialSingle.addEventListener("click", function(){
        if (where === "cottage") {
            GardenPath();
        } else if (where === "gardenPath") {
            Cottage();
        } else if (where === "bendInRoad") {
            ToweringTree();
        } else if (where === "toweringTree") {
            BendInRoad();
        }
    });

    binaryA.addEventListener("click", function() {
        if (where === "cottage" && !inventory.includes("fishingPole")) {
            FindFishingPole();
        } else if (where === "gardenPath" && !inventory.includes("rose")) {
            FindRose();
        } else if (where === "toweringTree" && !inventory.includes("branch")) {
            FindBranch();
        } else {
            NothingHere();
        }
    });

    binaryB.addEventListener("click", function() {
        saving = where;
        where = "inventory";
        leftinv = [...inventory];
        RunInventory();
    });

//#endregion

Drawbridge();
inventory.push("fish");