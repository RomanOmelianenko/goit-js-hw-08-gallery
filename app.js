import gallery from "./gallery-items.js";

const listRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const btnRef = document.querySelector('button[data-action="close-lightbox"]');
const lightboxContentRef = document.querySelector(".lightbox__content");
const imgRef = document.querySelector(".lightbox__image");

const imgAttribute = lightboxRef.querySelector(".lightbox__image");
let i = 0;

const listCreate = gallery.map(function (element) {
  const itemCreate = document.createElement("li");
  const linkCreate = document.createElement("a");
  const imageCreate = document.createElement("img");

  itemCreate.classList = "gallery__item";
  linkCreate.classList = "gallery__link";
  imageCreate.classList = "gallery__image";

  linkCreate.setAttribute("href", element.original);
  imageCreate.setAttribute("src", element.preview);
  imageCreate.setAttribute("alt", element.description);
  imageCreate.dataset.sourse = element.original;

  linkCreate.append(imageCreate);
  itemCreate.append(linkCreate);
  return itemCreate;
});

listRef.append(...listCreate);

listRef.addEventListener("click", onOpenModalGallery);
btnRef.addEventListener("click", onCloseModalGallery);
lightboxContentRef.addEventListener("click", onClickNotImageCloseModal);

function onOpenModalGallery(event) {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    lightboxRef.classList.add("is-open");
    imgAttribute.src = event.target.dataset.sourse;
    imgAttribute.alt = event.target.alt;
  }

  window.addEventListener("keydown", onPressEscape);
  window.addEventListener("keydown", rightArrow);
  window.addEventListener("keydown", leftArrow);
}

function onCloseModalGallery() {
  lightboxRef.classList.remove("is-open");
  window.removeEventListener("keydown", onPressEscape);
  window.removeEventListener("keydown", rightArrow);
  window.removeEventListener("keydown", leftArrow);

  onImgRemoveAttribute();
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    onCloseModalGallery();
  }
}

function onImgRemoveAttribute() {
  imgRef.src = " ";
  imgRef.alt = " ";
}

function onClickNotImageCloseModal(event) {
  if (event.target === event.currentTarget) {
    lightboxRef.classList.remove("is-open");
    onImgRemoveAttribute();
  }
}

function rightArrow(event) {
  if (event.code === "ArrowRight") {
    if (i < gallery.length - 1) {
      i += 1;
      imgRef.src = gallery[i].original;
      imgRef.alt = gallery[i].description;
    }
  }
}

function leftArrow(event) {
  if (event.code === "ArrowLeft") {
    if (i > 0) {
      i -= 1;
      imgRef.src = gallery[i].original;
      imgRef.alt = gallery[i].description;
    }
  }
}
