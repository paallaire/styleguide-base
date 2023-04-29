import { screensData } from '../data/screens';
import debounce from 'lodash/debounce';

export default function getScreen() {
  const html = document.querySelector('html');
  const screens = {};
  let lastScreen: string = '';

  function handleMediaQuery() {
    let size: string = 'none';
    for (const [screen, mq] of Object.entries(screens)) {
      if (!mq || (mq as MediaQueryList).matches) {
        size = screen;
      }
    }

    if (size === lastScreen) return;

    html?.dispatchEvent(
      new CustomEvent('on:updateScreen', {
        detail: { name: size },
      })
    );

    lastScreen = size;
  }

  function createMatchMedia() {
    for (const [name, value] of Object.entries(screensData)) {
      (screens as any)[name] = window.matchMedia(`(min-width: ${value})`);
    }
  }

  function createEvents() {
    for (const [name, match] of Object.entries(screens)) {
      console.log('name:', name);
      if (match) {
        (match as MediaQueryList).addEventListener('change', debounce(handleMediaQuery, 300));
      }
    }
  }

  // init
  // --------------------------------------------
  createMatchMedia();
  createEvents();
  handleMediaQuery();
}
