import '../styles/main.pcss';
import getScreen from './utils/getScreen';
import swiperDemo from './components/swiperDemo.js';

document.querySelector('html')?.addEventListener('on:updateScreen', (event: Event) => {
  const customEvent = event as CustomEvent;
  console.log(`on:updateScreen: ${customEvent.detail.name}`);
});

getScreen();
swiperDemo();
