const heading = document.querySelector('h1');
const content = document.querySelector('div.content')

heading.style.fontSize = "34px";
content.style.fontSize = "22px";

const makeBigger = () => {
   const hSize = parseInt(heading.style.fontSize.substring(0, 2));
   const cSize = parseInt(content.style.fontSize.substring(0, 2));
   heading.style.fontSize = hSize + 3 + "px";
   content.style.fontSize = cSize + 3 + "px";
};

const makeSmaller = () => {
   const hSize = parseInt(heading.style.fontSize.substring(0, 2));
   const cSize = parseInt(content.style.fontSize.substring(0, 2));
   heading.style.fontSize = hSize - 3 + "px";
   content.style.fontSize = cSize - 3 + "px";
};

document.querySelector('#a1').addEventListener('click', makeBigger);
document.querySelector('#a2').addEventListener('click', makeSmaller);
