// Authors: Rik Schennink, Tommy
// Sources: https://codepen.io/rikschennink/pen/yZYbwQ, https://stackoverflow.com/a/73407276

// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      
      // Call our function and pass any params we received
      fn(...params);
    });

  } 
};

// Store scroll position in page's data attribute
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

const windowBiggerThanHTML = () => {
  document.documentElement.dataset.viewportTooBig = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) > document.getElementsByTagName("html")[0].offsetHeight
}

// Listen for new scroll event
document.addEventListener('scroll', debounce(storeScroll), { passive: true });
window.addEventListener('resize', debounce(windowBiggerThanHTML), { passive: true });
window.addEventListener('load', windowBiggerThanHTML, {passive: true});

storeScroll()