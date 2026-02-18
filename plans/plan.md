# Casa do Hip Hop Brazlandia - Plano de Refatoração

## Visão Geral do Projeto
Website cultural para a Casa do Hip Hop de Brazlândia, DF - Brasil. Promove oficinas, eventos e a cultura Hip Hop na comunidade local.

---

## Arquitetura de Arquivos

### Estrutura Atual
- `index.html` - Estrutura HTML com script inline
- `style.css` - Estilos customizados (parcial)
- `script.js` - Vazio (scripts inline no HTML)

### Estrutura Proposta
- `index.html` - Semântica HTML melhorada + estrutura organizada
- `style.css` - Design tokens + estilos globais + componentes
- `script.js` - Lógica de negócio completamente documentada

---

## 1. Design Tokens (style.css)

### Cores (CSS Variables)
```css
:root {
    /* Primárias */
    --color-black: #0E0E0E;
    --color-white: #FFFFFF;
    
    /* Accent */
    --color-accent-yellow: #FFC107;
    --color-accent-red: #E53935;
    
    /* Escuras */
    --color-bg-dark: #1F1F1F;
    --color-bg-darker: #0A0A0A;
    
    /* Cinzas */
    --color-gray-100: #F5F5F5;
    --color-gray-300: #E0E0E0;
    --color-gray-400: #9E9E9E;
    --color-gray-500: #757575;
    
    /* Opacas */
    --color-overlay-dark: rgba(0, 0, 0, 0.6);
    --color-overlay-darker: rgba(0, 0, 0, 0.95);
}
```

### Tipografia
```css
:root {
    --font-primary: 'Inter', sans-serif;
    --font-display: 'Bebas Neue', cursive;
    
    /* Tamanhos */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-4xl: 2.25rem;
    --text-6xl: 3.75rem;
    --text-8xl: 4.5rem;
}
```

### Espaçamento & Sombras
```css
:root {
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.3);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.4);
    --shadow-xl: 0 20px 40px rgba(0,0,0,0.5);
}
```

---

## 2. Estrutura HTML (index.html)

### Seções Comentadas
```html
<!-- 1. CABEÇALHO -->
<!-- 2. NAVEGAÇÃO -->
<!-- 3. HERO SECTION -->
<!-- 4. SOBRE NÓS -->
<!-- 5. OFICINAS -->
<!-- 6. MESTRES/INSTRUTORES -->
<!-- 7. EVENTOS -->
<!-- 8. CONTATO/FOOTER -->
```

### Melhorias Semânticas
- `<main>` para conteúdo principal
- `<header>` para navegação
- `<article>` para cards de oficinas
- `<nav>` para links de navegação
- `<footer>` para rodapé
- `<button>` para elementos clicáveis (não `<a>`)
- Atributos `aria-label` em todos os botões

---

## 3. Estilos de Componentes

### Botões
```css
/* Estados: default, hover, active, focus, disabled */
.btn-primary { /* ... */ }
.btn-primary:hover { /* ... */ }
.btn-primary:active { /* ... */ }
.btn-primary:focus-visible { /* ... */ }

.btn-outline { /* ... */ }
.btn-outline:hover { /* ... */ }
```

### Cards
```css
.card-oficina { /* ... */ }
.card-oficina:hover { /* ... */ }
.card-oficina:focus-within { /* ... */ }
```

### Navegação
```css
.nav-link { /* ... */ }
.nav-link:hover { /* ... */ }
.nav-link:focus-visible { /* ... */ }
.nav-link--active { /* ... */ }
```

---

## 4. JavaScript (script.js)

### Módulos/Funções
```javascript
/**
 * Inicializa as animações AOS
 */
function initAnimations() { }

/**
 * Gerencia a barra de progresso do scroll
 */
function initScrollProgress() { }

/**
 * Gerencia o comportamento da navegação (scroll)
 */
function initNavigation() { }

/**
 * Gerencia o menu mobile
 */
function initMobileMenu() { }

/**
 * Função de inscrição via WhatsApp
 * @param {string} workshopName - Nome da oficina
 */
function handleEnrollment(workshopName) { }
```

---

## 5. Acessibilidade

### Requisitos
- [ ] Skip link para conteúdo principal
- [ ] ARIA labels em todos os botões
- [ ] ARIA labels em navegação
- [ ] Estados de focus visíveis (`focus-visible`)
- [ ] Contraste de cores adequado (WCAG AA)
- [ ] Labels em inputs (se existirem)
- [ ] Alt text em todas as imagens

---

## 6. Responsividade (Mobile-First)

### Breakpoints
```css
/* Mobile first - base styles */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1280px) { }
```

---

## 7. Interatividade

### Elementos com Estados
| Elemento | Hover | Active | Focus |
|----------|-------|--------|-------|
| Botões | ✓ | ✓ | ✓ |
| Links nav | ✓ | - | ✓ |
| Cards | ✓ | - | ✓ |
| Imagens | ✓ | - | - |
| Inputs | ✓ | ✓ | ✓ |

---

## Plano de Execução

1. **style.css** - Redefinir design tokens + componentes base
2. **index.html** - Estrutura semântica + ARIA + organização
3. **script.js** - Lógica de negócio + documentação
4. **Verificação** - Testar responsividade + acessibilidade

---

## Resultado Esperado

Código limpo, documentado, acessível e preparado para produção com estética premium mantendo a identidade visual da marca.
