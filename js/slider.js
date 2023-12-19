"use strict";

const mainContent = document.querySelector(".main__content");
const sliderPhoto = document.querySelector(".main__slider");
const cardPhoto = document.querySelectorAll(".sl-photo__main-photo");
const lineSlider = document.querySelector(".slider-line-show");
const miniCardForChoise = document.querySelectorAll(".sl-photo__choise-photo");

mainContent.addEventListener("click", openSlider);

if (window.innerWidth <= 450) {
    mainContent.removeEventListener("click", openSlider);
}

for (let i = 0; i < cardPhoto.length; i++) {
    cardPhoto[i].setAttribute("id", i);
}
for (let i = 0; i < miniCardForChoise.length; i++) {
    miniCardForChoise[i].id = `img${i}`;
}

let coord = 0;

function openSlider(event) {
    if (event.target.closest(".sl-photo__main-photo")) {
        sliderPhoto.style.visibility = "unset";
        bodyClip(true);
    }
    if (event.target.closest(".close-slider")) {
        sliderPhoto.style.visibility = "hidden";
        const childImg = lineSlider;
        childImg.innerHTML = "";
        coord = 0;
        lineSlider.style.transform = `translate3d(${coord}px, 0, 0)`;
        bodyClip(false);
    }
    if (event.target.closest(".sl-photo__main-photo")) {
        let idElem = event.target.parentElement.id;
        let arrayImg = [];
        let doneArray = [];
        const allImg = document.getElementById(`img${idElem}`).children;
        arrayImg = arrayImg.concat(Array.from(allImg));

        for (let k = 0; k < arrayImg.length; k++) {
            if (arrayImg[k].firstElementChild.tagName == "IMG") {
                doneArray = doneArray.concat(arrayImg[k].firstElementChild);
            }
        }
        doneArray = doneArray.reverse();
        for (let r = 0; r < doneArray.length; r++) {
            const imgBlock = document.createElement("div");
            imgBlock.className = "slider-img";
            let item = doneArray[r].cloneNode();
            lineSlider.prepend(imgBlock);
            imgBlock.prepend(item);
        }
    }
}
const sliderImg = document.querySelector(".slider-hidden");

sliderPhoto.addEventListener("click", activeButton);

function activeButton(event) {
    if (
        event.target.closest(".button-next") &&
        !event.target.closest(".close-slider")
    ) {
        const sliderImg = document.querySelector(".slider-hidden");
        let coordNext = sliderImg.offsetWidth;
        coord = coord - coordNext;
        checkPosition();
        lineSlider.style.transform = `translate3d(${coord}px, 0, 0)`;
    }
    if (event.target.closest(".button-prev")) {
        const sliderImg = document.querySelector(".slider-hidden");
        let coordNext = sliderImg.offsetWidth;
        coord = coord + coordNext;
        checkPosition();
        lineSlider.style.transform = `translate3d(${coord}px, 0, 0)`;
    }
}

function checkPosition() {
    if (coord >= 0) {
        coord = 0;
    }
    if (coord <= -lineSlider.offsetWidth + sliderImg.offsetWidth) {
        coord = -lineSlider.offsetWidth + sliderImg.offsetWidth;
    }
}

function bodyClip(bool) {
    if (bool) {
        document.documentElement.style.overflow = "hidden";
    }
    if (!bool) {
        document.documentElement.style.overflow = "unset";
    }
}

const main = document.querySelector(".main");

main.addEventListener("click", listPhoto);

function listPhoto(event) {
    if (event.target.closest(".sl-photo__choise-photo")) {
        const numberGallary = event.target.parentElement.id.slice(-1);
        const mainGal = document.getElementById(`${numberGallary}`);
        if (mainGal != null) {
            mainGal.innerHTML = "";
            let elem = event.target.firstElementChild.cloneNode();
            mainGal.prepend(elem);
        }
    }
}

const countPhoto = document.querySelectorAll(".counter");

mainContent.addEventListener("click", swipePhoto);

let elemActive = [];

while (elemActive.length < cardPhoto.length) {
    elemActive.push(1);
}

function swipePhoto(event) {
    bodyClip(false);
    if (event.target.closest(".sl-photo__main-photo")) {
        let positionImg =
            event.clientX - cardPhoto[0].getBoundingClientRect().left;
        let eventTargetId = event.target.parentElement.id;

        const imgEl = document.getElementById(`img${eventTargetId}`).children;
        let arraySwipe = [];
        for (let t = 0; t < imgEl.length; t++) {
            if (imgEl[t].firstElementChild.tagName == "IMG") {
                arraySwipe = arraySwipe.concat(imgEl[t].firstElementChild);
            }
        }
        countPhoto[eventTargetId].style.color = "inherit";
        const windImg = document.getElementById(`${eventTargetId}`);
        let widthWindImg = windImg.offsetWidth;
        if (positionImg >= widthWindImg / 2) {
            elemActive[eventTargetId]++;
        }
        if (positionImg < widthWindImg / 2) {
            elemActive[eventTargetId]--;
        }
        if (elemActive[eventTargetId] < 1) {
            elemActive[eventTargetId] = 1;
        }
        if (elemActive[eventTargetId] >= arraySwipe.length) {
            elemActive[eventTargetId] = arraySwipe.length;
        }
        let res = arraySwipe[elemActive[eventTargetId] - 1].cloneNode();
        windImg.prepend(res);
        windImg.lastElementChild.remove();
        countPhoto[eventTargetId].innerHTML = elemActive[eventTargetId];
        if (
            elemActive[eventTargetId] == 1 ||
            elemActive[eventTargetId] == arraySwipe.length
        ) {
            countPhoto[eventTargetId].style.color = "#C1C1C1";
        }
    }
}

window.addEventListener("resize", checkSizeWind);

let position;

function checkSizeWind(event) {
    if (window.innerWidth <= 450) {
        mainContent.removeEventListener("click", openSlider);
        mainContent.addEventListener("click", swipePhoto);
    }
    if (window.innerWidth >= 451) {
        mainContent.removeEventListener("click", swipePhoto);
        mainContent.addEventListener("click", openSlider);

        function plusVal() {
            position = document.elementFromPoint(
                window.innerWidth / 2,
                window.innerHeight / 2
            ).offsetLeft;
            coord = -position;
            lineSlider.style.transform = `translate3d(${coord}px, 0, 0)`;
        }

        setTimeout(plusVal, 500);
    }
}
