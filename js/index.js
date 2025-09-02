 function updateProgressBar(percentage) {
            const progressBar = document.getElementById('progress');
            progressBar.style.width = percentage + '%';
        }

          // Simular progresso
            let progress = 0;
            const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                const imagem = document.createElement('img');
                imagem.src = 'imagens/cowboy.png';
                imagem.alt = 'Foto de um cachorro fantasiado do personagem Woody do filme Toy Story';
                document.body.appendChild(imagem).style.display = 'block';
                document.getElementById('progress').style.display = 'none';
                document.getElementById('Progresso').innerText = 'Imagem carregada com sucesso!';
                

            }
             else {
                progress += 10;
                updateProgressBar(progress);
            }
        }, 1000);
        // Função para atualizar a barra de progresso'