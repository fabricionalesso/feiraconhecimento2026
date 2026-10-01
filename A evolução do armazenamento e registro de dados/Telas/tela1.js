const continuar = document.getElementById('continuar');
const voltar = document.getElementById('voltar');
const inicio = document.getElementById('inicio');

if (continuar) {
    continuar.addEventListener('click', () => {
        navegarPara("./tela2.html", "forward");
    });
}

if (voltar) {
    voltar.addEventListener('click', () => {
        navegarPara("./tela.html", "backward");
    });
}

if (inicio) {
    inicio.addEventListener('click', () => {
        sessionStorage.removeItem('navDirection');
        window.location.href = "../index.html";
    });
}

