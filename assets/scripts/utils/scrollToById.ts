export default function scrollToById() {
  const elButtonsScrollTo = document.querySelectorAll('[scroll-to]');

  elButtonsScrollTo.forEach((button) => {
    const id: string | null = button.getAttribute('scroll-to');
    const elTo: HTMLElement | null = document.querySelector(`#${id}`);

    if (elTo) {
      button.addEventListener('click', (e: Event) => {
        e.preventDefault();
        elTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });
}
