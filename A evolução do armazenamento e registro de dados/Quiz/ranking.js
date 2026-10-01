const rankingList = document.getElementById('ranking-list');
const clearRankingBtn = document.getElementById('clear-ranking');

function renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('quizRanking') || '[]');
    rankingList.innerHTML = '';

    if (ranking.length === 0) {
        rankingList.innerHTML = '<li style="justify-content: center; color: #aaa;">Nenhuma pontuação registrada ainda. Seja o primeiro!</li>';
    } else {
        // Ordena por maior pontuação
        ranking.sort((a, b) => b.score - a.score);
        
        // Pega os top 10
        const topRanking = ranking.slice(0, 10);
        
        topRanking.forEach((entry, index) => {
            const li = document.createElement('li');
            if(index === 0) li.classList.add('top-1');
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'name';
            nameSpan.textContent = `${index + 1}º - ${entry.name}`;
            
            const scoreSpan = document.createElement('span');
            scoreSpan.className = 'score';
            scoreSpan.textContent = `${entry.score} pts (${entry.percent}%)`;
            
            li.appendChild(nameSpan);
            li.appendChild(scoreSpan);
            rankingList.appendChild(li);
        });
    }
}

if (clearRankingBtn) {
    clearRankingBtn.addEventListener('click', () => {
        if(confirm('Tem certeza que deseja apagar todo o ranking?')) {
            localStorage.removeItem('quizRanking');
            renderRanking();
        }
    });
}

// Renderizar na inicialização
renderRanking();
