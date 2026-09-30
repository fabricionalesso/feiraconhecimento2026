const continuar = document.getElementById('continuar');
const voltar = document.getElementById('voltar');
const inicio = document.getElementById('inicio');

if (continuar) {
    continuar.addEventListener('click', () => {
        navegarPara("./tela7.html", "forward");
    });
}

if (voltar) {
    voltar.addEventListener('click', () => {
        navegarPara("./tela5.html", "backward");
    });
}

if (inicio) {
    inicio.addEventListener('click', () => {
        sessionStorage.removeItem('navDirection');
        window.location.href = "../index.html";
    });
}

