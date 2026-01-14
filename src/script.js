// Ler ficheiro XML e mostrar recursos na tabela
fetch("dados.xml")
  .then(response => response.text())
  .then(texto => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(texto, "text/xml");

    const recursos = xmlDoc.getElementsByTagName("recurso");
    const tabela = document.getElementById("corpo-tabela");

    for (let i = 0; i < recursos.length; i++) {
      const id = recursos[i].getAttribute("id");
      const tipo = recursos[i].getElementsByTagName("tipo")[0].textContent;
      const nome = recursos[i].getElementsByTagName("nome")[0].textContent;
      const uso = recursos[i].getElementsByTagName("uso")[0].textContent;
      const descricao = recursos[i].getElementsByTagName("descricao")[0].textContent;

      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${id}</td>
        <td>${tipo}</td>
        <td>${nome}</td>
        <td>${uso}</td>
        <td>${descricao}</td>
      `;

      tabela.appendChild(linha);
    }
  });


