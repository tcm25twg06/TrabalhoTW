document.addEventListener('DOMContentLoaded', function() {
    
    // --- FUNÇÃO 1: Ler XML (Requisito Obrigatório) ---
    // Verifica se estamos na página que tem a tabela
    const tabelaBody = document.getElementById("corpo-tabela");
    
    if (tabelaBody) {
        fetch("dados.xml")
            .then(function(response) {
                return response.text();
            })
            .then(function(texto) {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(texto, "text/xml");
                const recursos = xmlDoc.getElementsByTagName("recurso");
                
                let html = "";
                for (let i = 0; i < recursos.length; i++) {
                    const id = recursos[i].getAttribute("id");
                    
                    // Maneira simples de garantir que não dá erro se a tag não existir
                    let tipo = "N/A";
                    if (recursos[i].getElementsByTagName("tipo")[0]) {
                        tipo = recursos[i].getElementsByTagName("tipo")[0].textContent;
                    }

                    let nome = "N/A";
                    if (recursos[i].getElementsByTagName("nome")[0]) {
                        nome = recursos[i].getElementsByTagName("nome")[0].textContent;
                    }

                    let uso = "N/A";
                    if (recursos[i].getElementsByTagName("uso")[0]) {
                        uso = recursos[i].getElementsByTagName("uso")[0].textContent;
                    }

                    let descricao = "N/A";
                    if (recursos[i].getElementsByTagName("descricao")[0]) {
                        descricao = recursos[i].getElementsByTagName("descricao")[0].textContent;
                    }

                    html += "<tr>" +
                            "<td>" + id + "</td>" +
                            "<td>" + tipo + "</td>" +
                            "<td>" + nome + "</td>" +
                            "<td>" + uso + "</td>" +
                            "<td>" + descricao + "</td>" +
                            "</tr>";
                }
                tabelaBody.innerHTML = html;
            })
            .catch(function(erro) {
                console.log("Erro ao carregar XML: " + erro);
                tabelaBody.innerHTML = "<tr><td colspan='5'>Erro ao carregar dados. (Usa o Live Server)</td></tr>";
            });
    }

    // --- FUNÇÃO 2: Manipulação de Eventos e CSS (Bónus) ---
    // Botão de Alto Contraste
    const footer = document.querySelector('.site-footer .container');
    if (footer) {
        const btnContrast = document.createElement('button');
        btnContrast.innerText = "Modo Alto Contraste";
        btnContrast.style.marginTop = "20px";
        
        footer.appendChild(btnContrast);

        btnContrast.addEventListener('click', function() {
            const body = document.body;
            
            // Alternar classe
            body.classList.toggle('alto-contraste');
            
            // Manipulação direta de estilo (requisito extra de JS)
            if (body.classList.contains('alto-contraste')) {
                body.style.backgroundColor = "#000";
                body.style.color = "#FFF";
                body.style.backgroundImage = "none";
                btnContrast.innerText = "Desativar Alto Contraste";
            } else {
                body.style.backgroundColor = ""; // Volta ao CSS original
                body.style.color = "";
                body.style.backgroundImage = "";
                btnContrast.innerText = "Modo Alto Contraste";
            }
        });
    }

    // --- FUNÇÃO 3: Validação de Formulário (Bónus) ---
    const form = document.getElementById('meuFormulario');
    if (form) {
        form.addEventListener('submit', function(e) {
            const nomeInput = document.getElementById('nome');
            const valorNome = nomeInput.value;

            if (valorNome.length < 3) {
                e.preventDefault(); // Impede o envio
                alert("Erro: O nome tem de ter pelo menos 3 letras.");
                nomeInput.style.border = "2px solid red";
            } else {
                alert("Formulário validado com sucesso!");
            }
        });
    }

    // --- FUNÇÃO 4: Canvas (Bónus) ---
    const canvas = document.getElementById("meuCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        // Desenhar um retângulo
        ctx.fillStyle = "#35424a";
        ctx.fillRect(10, 10, 180, 80);
        
        // Desenhar texto
        ctx.font = "20px Arial";
        ctx.fillStyle = "#e8491d";
        ctx.fillText("Multimédia", 40, 55);
    }
});