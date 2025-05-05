document.addEventListener("DOMContentLoaded", () => {
  let articles = [];

  async function fetchArticles() {
    const res = await fetch("json/articles_final.json");
    articles = await res.json();
    renderArticles("todo");
  }

  function renderArticles(category, searchTerm = "") {
    const featuredContainer = document.getElementById("featured-article");
    const gridContainer = document.getElementById("articles-grid");
    featuredContainer.innerHTML = "";
    gridContainer.innerHTML = "";

    let filtered = category === "todo"
      ? articles
      : articles.filter(a => a.category.toLowerCase() === category.toLowerCase());

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(term) ||
        article.summary.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term) ||
        (article.content && article.content.toLowerCase().includes(term))
      );
    }

    if (filtered.length === 0) return;

    const featured = filtered.reduce((prev, current) => (current.views > prev.views ? current : prev));
    const rest = filtered.filter(a => a.id !== featured.id);

    // Artículo destacado
    featuredContainer.innerHTML = `
      <img src="${featured.image}" alt="${featured.title}">
      <div class="featured-content">
        <div class="article-category">${featured.category}</div>
        <div class="article-title">${featured.title}</div>
        <p>${featured.summary}</p>
        <a href="html/articulo.html?id=${featured.id}" class="read-more">Leer más</a>
      </div>
    `;

    // Resto del grid
    rest.forEach(article => {
      gridContainer.innerHTML += `
        <div class="article-card" data-category="${article.category.toLowerCase()}">
          <img src="${article.image}" alt="${article.title}">
          <div class="article-content">
            <div class="article-category">${article.category}</div>
            <div class="article-title">${article.title}</div>
            <p>${article.summary}</p>
            <a href="../html/articulo.html?id=${article.id}" class="read-more">Leer más</a>
          </div>
        </div>
      `;
    });
  }

  // Botones de categoría
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.category;
      document.getElementById("category-select").value = category;
      renderArticles(category, document.getElementById("searchInput").value);
    });
  });

  // Select móvil
  document.getElementById("category-select").addEventListener("change", function () {
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    document.querySelector(`.category-btn[data-category="${this.value}"]`)?.classList.add("active");
    renderArticles(this.value, document.getElementById("searchInput").value);
  });

  // Búsqueda
  document.getElementById("searchInput").addEventListener("input", () => {
    const category = document.querySelector(".category-btn.active")?.dataset.category || "todo";
    const searchTerm = document.getElementById("searchInput").value;
    renderArticles(category, searchTerm);
  });

  fetchArticles();
});


