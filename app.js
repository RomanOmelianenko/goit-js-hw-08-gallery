import gallery from "./gallery-items.js";

const listRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const btnRef = document.querySelector('button[data-action="close-lightbox"]');
const lightboxContentRef = document.querySelector(".lightbox__content");

const listCreate = gallery.map(function (element) {
  const itemCreate = document.createElement("li");
  const linkCreate = document.createElement("a");
  const imageCreate = document.createElement("img");
  itemCreate.classList = "gallery__item";
  linkCreate.classList = "gallery__link";
  imageCreate.classList = "gallery__image";
  linkCreate.setAttribute("href", element.original);
  imageCreate.setAttribute("src", element.preview);
  imageCreate.dataset.sourse = element.original;
  imageCreate.setAttribute("alt", element.description);
  linkCreate.append(imageCreate);
  itemCreate.append(linkCreate);
  return itemCreate;
});

listRef.append(...listCreate);

listRef.addEventListener("click", onOpenModalGallery);
btnRef.addEventListener("click", onCloseModalGallery);
lightboxContentRef.addEventListener("click", onNotImageCloseModal);

function onOpenModalGallery(event) {
  event.preventDefault();
  if (event.target.nodeName === "IMG") {
    lightboxRef.classList.add("is-open");
    lightboxRef.querySelector(".lightbox__image").src =
      event.target.dataset.sourse;
    lightboxRef.querySelector(".lightbox__image").alt =
      event.target.dataset.sourse;
  }

  window.addEventListener("keydown", onPressEscape);
}

function onCloseModalGallery() {
  lightboxRef.classList.remove("is-open");
  window.removeEventListener("keydown", onPressEscape);
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    onCloseModalGallery();
  }
}

function onNotImageCloseModal(event) {
  if (event.target === event.currentTarget) {
    lightboxRef.classList.remove("is-open");
  }
}
