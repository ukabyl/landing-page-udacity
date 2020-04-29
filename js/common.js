// section elements
const sections = document.querySelectorAll('.section');
//links
const links = document.querySelectorAll('.nav-list__link');

// Create a scroll function
function smoothScroll(selector, duration) {
  let target = document.querySelector(selector);
  let targetPosition = target.offsetTop;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null ) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if ( timeElapsed < duration ) requestAnimationFrame(animation);
  }

  // Mathematical function from gizma.com for easing animation
  function ease(t, b, c, d) {
    t /= d/2;
  	if (t < 1) return c/2*t*t*t*t*t + b;
  	t -= 2;
  	return c/2*(t*t*t*t*t + 2) + b;
  }

  requestAnimationFrame(animation);

}

// Add event listener to each link
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    smoothScroll('.' + e.currentTarget.dataset.link, 3000);
  })
});

let nextScroll = false;

window.addEventListener('scroll', (e) => {
  nextScroll = true;
  const timeout = setTimeout(() => {
    nextScroll = false;
    sections.forEach((section) => {
      const top = section.offsetTop - 10;
      const bottom = top + parseInt(window.getComputedStyle(section, null).height) - 200;
      const scroll = window.scrollY;
      const selector = section.classList[1];
      if( scroll > top && scroll < bottom){
            links.forEach((link) => link.classList.remove('active'));
            document.querySelector(`a[data-link="${selector}"]`).classList.add('active');
        }
    });
  }, 50);
  setTimeout(() => { if (nextScroll) clearTimeout(timeout) }, 50);
})
