let navbar = document.querySelector(".navbar");
let ac1b = document.querySelector("#ac1button");
let ac2b = document.querySelector("#ac2button");
let ac3b = document.querySelector("#ac3button");
let main = document.querySelector(".main");

ac1b.addEventListener("click", function(){
    window.location.href = "actioncastle1.html";
});

ac2b.addEventListener("click", function(){
    window.location.href = "actioncastle2.html";
});

ac3b.addEventListener("click", function(){
    window.location.href = "actioncastle3.html";
});