import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function swiperDemo() {
  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.swiper .swiper-button-next',
      prevEl: '.swiper .swiper-button-prev',
    },
  });
}
