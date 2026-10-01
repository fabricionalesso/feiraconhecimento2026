const voltar = document.getElementById('voltar');
const inicio = document.getElementById('inicio');

if (voltar) {
    voltar.addEventListener('click', () => {
        navegarPara("./tela9.html", "backward");
    });
}

if (inicio) {
    inicio.addEventListener('click', () => {
        sessionStorage.removeItem('navDirection');
        window.location.href = "../index.html";
    });
}

