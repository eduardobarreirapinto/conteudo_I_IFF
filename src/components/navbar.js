/**
 * Injeta a navbar no elemento alvo e marca o link ativo
 * @param {string} activePage - 'home' | 'artigos' | 'sobre'
 * @param {string} basePath   - caminho relativo até a raiz (ex: '../' para subpastas)
 */
export function renderNavbar(activePage = '', basePath = './') {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Navegação principal');

  const links = [
    { key: 'artigos', label: 'Artigos', href: `${basePath}artigos.html` },
    { key: 'sobre',   label: 'Sobre',   href: `${basePath}sobre.html`   },
  ];

  nav.innerHTML = `
    <div class="logo">
      <a href="${basePath}index.html" aria-label="Educação Interativa - Início">Educação Interativa</a>
    </div>
    <ul class="nav-links" role="list">
      <div class="menu">
        ${links.map(link => `
          <li>
            <a href="${link.href}" ${activePage === link.key ? 'aria-current="page"' : ''}>
              ${link.label}
            </a>
          </li>
        `).join('')}
      </div>
    </ul>
  `;

  document.body.insertAdjacentElement('afterbegin', nav);
}
