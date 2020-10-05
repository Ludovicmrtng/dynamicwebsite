setTimeout(function () {
  $("#loading").addClass("animated fadeOut");
  setTimeout(function () {
    $("#loading").removeClass("animated fadeOut");
    $("#loading").css("display", "none");
  }, 700);
}, 1600);

//HABURGER MENU

const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");
const navLinks = document.querySelectorAll(".nav_link");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

function show() {
  mainMenu.style.display = "flex";
  mainMenu.style.top = "0";
}

function close() {
  mainMenu.style.top = "-110%";
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainMenu.style.top = "-110%";
  });
});

//Type Writing Effects on homepage

const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordindex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Type Method
TypeWriter.prototype.type = function () {
  //Current Index of words
  const current = this.wordindex % this.words.length;
  //Get Full Text of current word
  const fullTxt = this.words[current];

  //Check if isDeleting
  if (this.isDeleting) {
    //Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert TXT into element
  this.txtElement.innerHTML = `<span class="txt"> ${this.txt}</span>`;

  //Initial Type Speed
  let typeSpeed = 100;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //if word is complete

  if (!this.isDeleting && this.txt === fullTxt) {
    //Make pause at end
    typeSpeed = this.wait;
    //set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //Move to next word
    this.wordindex++;
    //Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//init on Dom Load
document.addEventListener("DOMContentLoaded", init);

//Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //init Typewriter
  new TypeWriter(txtElement, words, wait);
}
