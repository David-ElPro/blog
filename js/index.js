
async function loadArticles() {
  const response = await fetch('articles_final.json');
  const articles = await response.json();
  
  const featuredContainer = document.getElementById("featured-article");
  const gridContainer = document.getElementById("articles-grid");
  
  const mostViewed = articles.sort((a, b) => b.views - a.views)[0];
  
  featuredContainer.innerHTML = `
    <img src="${mostViewed.image}" alt="${mostViewed.title}">
    <div class="featured-content">
      <div class="article-category">${mostViewed.category}</div>
      <div class="article-title">${mostViewed.title}</div>
      <p>${mostViewed.summary}</p>
      <a href="articulo.html?id=${mostViewed.id}" class="read-more">Leer más</a>
    </div>
  `;

  articles.filter(a => a.id !== mostViewed.id).forEach(article => {
    gridContainer.innerHTML += `
      <div class="article-card">
        <img src="${article.image}" alt="${article.title}">
        <div class="article-content">
          <div class="article-category">${article.category}</div>
          <div class="article-title">${article.title}</div>
          <p>${article.summary}</p>
          <a href="articulo.html?id=${article.id}" class="read-more">Leer más</a>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadArticles);
