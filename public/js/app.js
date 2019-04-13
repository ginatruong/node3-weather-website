// console.log('Client side javascript file is loaded');
/* 
1. FETCH - browser api, not part of JS
2. use in modern browsers
3. not accessible in node.js - can't use in backend node script

*/

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//   response.json().then(data => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent ='';

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });
});
