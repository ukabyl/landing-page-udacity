// section elements
const sections = document.querySelectorAll('.section');

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

document.addEventListener('DOMContentLoaded', () => {
  // Appending elements to the DOM
  document.querySelector('.nav-list').innerHTML = `
        <li class="nav-list__item">
          <a data-link="section1" class="nav-list__link active">Main</a>
        </li>
        <li class="nav-list__item">
          <a data-link="section2" class="nav-list__link">About</a>
        </li>
        <li class="nav-list__item">
          <a data-link="section3" class="nav-list__link">Portfolio</a>
        </li>
        <li class="nav-list__item">
          <a data-link="section4" class="nav-list__link">Section 1</a>
        </li>
        <li class="nav-list__item">
          <a data-link="section5" class="nav-list__link">Section 2</a>
        </li>
    `;

    //links
    const links = document.querySelectorAll('.nav-list__link');

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
})
