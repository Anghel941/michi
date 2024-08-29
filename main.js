let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
  console.log('Next button clicked');
  let items = document.querySelectorAll('.item');
  document.querySelector('.slide').appendChild(items[0]);
});

prev.addEventListener('click', function(){
  console.log('Prev button clicked');
  let items = document.querySelectorAll('.item');
  document.querySelector('.slide').prepend(items[items.length - 1]);
});