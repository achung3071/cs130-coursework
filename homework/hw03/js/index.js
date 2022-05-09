/**
 *
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 *
 * 1. Create and attach an event handler (function) to each ".image"
 * element so that when the ".image" element is clicked, the corresponding
 * image loads in the .featured image element.
 *
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 *
 * 3. If you get to the end, start at the beginning.
 *
 * 4. If you get to the beginning, loop around to the end.
 *
 *
 */

const images = [
  "images/field1.jpg",
  "images/purple.jpg",
  "images/jar.jpg",
  "images/green.jpg",
  "images/green1.jpg",
  "images/purple1.jpg",
  "images/magnolias.jpg",
  "images/daisy1.jpg",
];

const initScreen = () => {
  images.forEach((image, idx) => {
    document.querySelector(".cards").innerHTML += `
        <li class="card">
            <button class="image" 
                style="background-image:url('${image}')"
                data-index=${idx}"
                aria-label="Displays image ${idx} in the main panel."></button>
        </li>`;
  });
};

initScreen();

// create event handler:
const showImage = (ev) => {
  const elem = ev.currentTarget;
  console.log(elem.style.backgroundImage);

  // your job: set the .featured_image's backgroundImage to the
  // element that was just clicked.
  const featured = document.querySelector(".featured_image");
  featured.style.backgroundImage = elem.style.backgroundImage;
  currentIndex = parseInt(elem.dataset.index);
};

// attach event handler to all of the image tags
// (after initScreen() has been invoked).

// first get all of the image elements from the DOM:
const imageElements = document.querySelectorAll(".image");

// then loop through each one and attach an event handler
// to each element's click event:
for (const elem of imageElements) {
  elem.onclick = showImage;
}

let currentIndex = 0;

const showNext = (ev) => {
  if (currentIndex + 1 < images.length) {
    currentIndex += 1;
  } else {
    currentIndex = 0;
  }
  const featured = document.querySelector(".featured_image");
  for (const image of imageElements) {
    if (parseInt(image.dataset.index) === currentIndex) {
      featured.style.backgroundImage = image.style.backgroundImage;
      break;
    }
  }
};

const showPrev = (ev) => {
  if (currentIndex > 0) {
    currentIndex -= 1;
  } else {
    currentIndex = images.length - 1;
  }
  const featured = document.querySelector(".featured_image");
  for (const image of imageElements) {
    if (parseInt(image.dataset.index) === currentIndex) {
      featured.style.backgroundImage = image.style.backgroundImage;
      break;
    }
  }
};

document.querySelector(".next").onclick = showNext;
document.querySelector(".prev").onclick = showPrev;
document.querySelector(".featured_image").onclick = showNext;
