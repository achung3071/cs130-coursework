/*
    Hints: 
    1. Attach click event handlers to all four of the 
       buttons (#default, #ocean, #desert, and #high-contrast).
    2. Modify the className property of the body tag 
       based on the button that was clicked.
*/

const body = document.querySelector('body');

document.querySelector('#default').addEventListener('click', () => {
   body.className = ''
});

document.querySelector('#ocean').addEventListener('click', () => {
   body.className = 'ocean'
});

document.querySelector('#desert').addEventListener('click', () => {
   body.className = 'desert'
});

document.querySelector('#high-contrast').addEventListener('click', () => {
   body.className = 'high-contrast'
});