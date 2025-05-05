async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);

  const response = await fetch("../json/articles_final.json");
  const articles = await response.json();
  const article = articles.find((a) => a.id === id);

  if (article) {
    // Actualizar encabezado
    document.querySelector(".article-header img").src = article.image;
    document.querySelector(".article-header img").alt = article.title;
    document.querySelector(".article-category").textContent = article.category;
    document.querySelector(".article-title").textContent = article.title;
    document.querySelector(".article-date").textContent = "Fecha: " + article.date;

    // Mostrar contenido completo
    const container = document.getElementById("article-content");
    container.innerHTML = `
      <section class="article-content">
        ${article.content}
      </section>

       <!-- Simulador de anuncio AdSense -->
  <div class="adsense-simulated">
    <p>[Aqui pondría un anuncio.. ¡Si tan solo estuviera en producción!]</p>
  </div>


`;
      
    

    document.title = article.title + " | Linntae Blog";

    // Artículos relacionados
    const related = articles.filter(
      (a) => a.id !== article.id && a.category === article.category
    ).slice(0, 3);

    const extras = articles.filter(
      (a) => a.id !== article.id && a.category !== article.category
    ).slice(0, 3 - related.length);

    const allRelated = [...related, ...extras];

    const relatedContainer = document.getElementById("related-container");
    relatedContainer.innerHTML = ""; // Limpiar antes de insertar

    allRelated.forEach((item) => {
      relatedContainer.innerHTML += `
        <div class="related-article-card">
          <img src="${item.image}" alt="${item.title}">
          <div class="related-content">
            <div class="related-category">${item.category}</div>
            <div class="related-title">${item.title}</div>
            <a href="articulo.html?id=${item.id}" class="read-more">Leer más</a>
          </div>
        </div>
      `;
    });
  } else {
    document.getElementById("article-content").innerHTML = "<p>Artículo no encontrado.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadArticle);
