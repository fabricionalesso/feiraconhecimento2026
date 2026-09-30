const continuar = document.getElementById('continuar');
const verMais = document.getElementById('verMais');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const inicio = document.getElementById('inicio');

if (inicio) {
    inicio.addEventListener('click', () => {
        sessionStorage.removeItem('navDirection');
        window.location.href = "../index.html";
    });
}

if (continuar) {
    continuar.addEventListener('click', () => {
        navegarPara("./tela1.html", "forward");
    });
}

if (verMais) {
    verMais.addEventListener('click', () => {
        modal.style.display = "flex";
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });
}

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

document.querySelectorAll('.modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('href');
        navegarPara(target, 'forward');
    });
});
