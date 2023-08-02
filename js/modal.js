const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const modalCloseButton = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

modalTrigger.addEventListener('click', openModal);
modalCloseButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

let isModalShown = false;

const handleScroll = () => {
    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

    if (isAtBottom && !isModalShown) {
        openModal();
        isModalShown = true;
    }
};

window.addEventListener('scroll', handleScroll);


setTimeout(() => {
    openModal();
    isModalShown = true;
}, 10000);
