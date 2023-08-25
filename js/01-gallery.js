
import { galleryItems } from './gallery-items.js';


const galleryList = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(
    item => `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
  `
  )
  .join('');

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

// Функція для відкриття та закриття модального вікна
function toggleModal(imageURL, alt) {
  const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${imageURL}" alt="${alt}" />
    </div>
  `);

  instance.show();

  const modalImage = instance.element().querySelector('img');
  modalImage.addEventListener('click', () => {
    instance.close();
  });
}

// Обробник події кліку на списку ul.gallery
galleryList.addEventListener('click', event => {
  event.preventDefault();

  const clickedImage = event.target;
  if (clickedImage.classList.contains('gallery__image')) {
    const originalImageURL = clickedImage.dataset.source;
    const alt = clickedImage.alt;

    toggleModal(originalImageURL, alt);
  }
});

