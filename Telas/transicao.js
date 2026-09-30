// Script de transição de tela com efeito de rolagem/slide

document.addEventListener('DOMContentLoaded', () => {
    const direction = sessionStorage.getItem('navDirection');
    if (direction === 'backward') {
        document.body.classList.add('page-enter-backward');
        sessionStorage.removeItem('navDirection');
    } else if (direction === 'forward') {
        document.body.classList.add('page-enter-forward');
        sessionStorage.removeItem('navDirection');
    }
});

function navegarPara(url, direcao = 'forward') {
    sessionStorage.setItem('navDirection', direcao);
    document.body.classList.remove('page-enter-forward', 'page-enter-backward');
    
    if (direcao === 'backward') {
        document.body.classList.add('page-exit-backward');
    } else {
        document.body.classList.add('page-exit-forward');
    }
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}
