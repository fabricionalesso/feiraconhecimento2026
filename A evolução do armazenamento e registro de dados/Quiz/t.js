document.addEventListener('DOMContentLoaded', () => {
    const navTransition = sessionStorage.getItem('navQuizTransition');
    if (navTransition === 'enter-from-right') {
        document.body.classList.add('page-enter-right');
        sessionStorage.removeItem('navQuizTransition');
    }
});

const backLink = document.querySelector('.back-link');
if (backLink) {
    backLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Transição de VOLTAR para a direita
        sessionStorage.setItem('navQuizTransition', 'enter-from-left');
        document.body.classList.remove('page-enter-right', 'page-enter-left');
        document.body.classList.add('page-exit-right');
        setTimeout(() => {
            window.location.href = backLink.getAttribute('href');
        }, 300);
    });
}
