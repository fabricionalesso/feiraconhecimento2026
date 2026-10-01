document.addEventListener('DOMContentLoaded', () => {
    const navTransition = sessionStorage.getItem('navQuizTransition');
    if (navTransition === 'enter-from-left') {
        document.body.classList.add('page-enter-left');
        sessionStorage.removeItem('navQuizTransition');
    }
});

const guia = document.getElementById('guia');
const quiz = document.getElementById('quiz');

if (guia) {
    guia.addEventListener('click', () => {
        sessionStorage.removeItem('navQuizTransition');
        sessionStorage.setItem('navDirection', 'forward');
        window.location.href = "./Telas/tela.html";
    });
}

if (quiz) {
    quiz.addEventListener('click', () => {
        sessionStorage.setItem('navQuizTransition', 'enter-from-right');
        document.body.classList.remove('page-enter-left', 'page-enter-right');
        document.body.classList.add('page-exit-left');
        setTimeout(() => {
            window.location.href = "./Quiz/t.html";
        }, 300);
    });
}