# Educação Interativa — IFF

Ambiente virtual interativo de aprendizagem para as disciplinas de Programação e Automação.

## Estrutura

```
src/
├── components/        # Componentes reutilizáveis (navbar)
├── pages/             # HTMLs das páginas (index, corredor, sobre, artigos)
├── scenes/            # Lógica Babylon.js isolada por cena
│   ├── HomeScene.js
│   └── CorredorScene.js
└── styles/            # CSS modular por página
```

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173/src/pages/index.html`

## Build para produção

```bash
npm run build
```

Os arquivos otimizados ficam em `dist/`. Faça deploy dessa pasta no Vercel, Netlify ou GitHub Pages.

## Deploy rápido (Vercel)

```bash
npx vercel
```

## Fluxo de navegação

`index.html` → clica na porta → `corredor.html` → clica na porta esquerda → sala Python  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ clica no PC gamer → jogos
