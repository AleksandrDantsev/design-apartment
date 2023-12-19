"use strict";
const headerNavMain = document.querySelector(".header__nav-list");
const headerNav = document.querySelector(".header__nav-list").children;
const mainProj = document.querySelector(".main");
const service = document.querySelector(".conteiner__bottom-main");
const aboutMe = document.querySelector(".main__bottom-info");
const contact = document.querySelector(".conteiner-forms");

for (let r = 0; r < headerNav.length; r++) {
	headerNav[r].className = `navigation${r}`;
}

headerNavMain.addEventListener("click", checkButton);

function checkButton(event) {
	event.preventDefault();
	choisePosition(event, 0, mainProj);
	choisePosition(event, 1, service);
	choisePosition(event, 2, aboutMe);
	choisePosition(event, 3, contact);
}

function choisePosition(event, posNum, item) {
	if (event.target.closest(`.navigation${posNum}`)) {
		item.scrollIntoView({ block: "start", behavior: "smooth" });
	}
}

const headerGum = document.querySelector(".header_humburger");
const headerDrop = document.querySelector(".header__drop-menu");

headerGum.addEventListener("click", openMenu);

function openMenu(event) {
	let resultTarget = event.target.tagName;
	if (resultTarget == "svg" || resultTarget == "path") {
		headerDrop.classList.toggle("open-menu");
	}
}

document.addEventListener("click", closeDropMenu);

function closeDropMenu(event) {
	if (
		!event.target.closest(".header__drop-menu") &&
		!event.target.closest(".header_humburger")
	) {
		headerDrop.classList.remove("open-menu");
	}
}

const imgDescr = document.querySelector(".sl-photo__main-photo");
const descr = document.querySelector(".sl-description");
const sliderImgItems = document.querySelectorAll(".sl-photo__choise-photo");

let heightBlockProd = imgDescr.offsetHeight;

for (let i = 0; i < sliderImgItems.length; i++) {
	sliderImgItems[i].style.maxHeight = `${heightBlockProd / 1.565}px`;
}
// sliderImgItems.forEach(item => item.style.maxHeight = `${heightBlockProd}px`);

window.addEventListener("resize", () => columnImage);

function columnImage() {
	if (window.innerWidth < 901) {
		let heightBlockProd = imgDescr.offsetHeight;
		sliderImgItems.forEach(
			item => item.style.maxHeight = `${heightBlockProd}px`
		);
	}
}

columnImage();

if (window.innerWidth < 901) {
	let heightBlockProd = imgDescr.offsetHeight;
	sliderImgItems.forEach(
		(item) => (item.style.maxHeight = `${heightBlockProd}px`)
	);
}

const allImages = document.querySelectorAll("img");

for (let i = 0; i < allImages.length; i++) {
	allImages[i].setAttribute("loading", "lazy");
}

const formInput = document.querySelector(".main__base-forms-right form");
const inputs = document.querySelectorAll(".main__base-forms-right input");
const textArea = document.querySelector(".textara-forms");

formInput.addEventListener("keyup", checkValue);

function checkValue() {
	window.addEventListener("beforeunload", function (event) {
		event.preventDefault();
		event.returnValue = "";
	});
}
