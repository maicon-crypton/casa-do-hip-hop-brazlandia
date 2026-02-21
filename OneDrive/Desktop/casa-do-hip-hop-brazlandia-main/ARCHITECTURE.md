# Arquitetura de Produção - Casa do Hip Hop Brazlandia

## Visao Geral do Projeto

Este documento define a arquitetura final, configuracoes de seguranca e estrategia de deploy para o site institucional da Casa do Hip Hop Brazlandia. O projeto e um site estatico (sem backend) desenvolvido com HTML, CSS e JavaScript puros, otimizado para producao.

---

## 1. Arquitetura de Arquivos

### Estrutura Final Proposta

```
casa-do-hip-hop-brazlandia/
├── index.html              # Pagina principal (unico arquivo HTML)
├── style.css              # Todos os estilos (compilados/minificados)
├── script.js              # JavaScript principal
├── assets/                 # Recursos estaticos
│   ├── images/            # Imagens otimizadas
│   │   ├── hero/          # Imagens da secao hero
│   │   ├── workshops/     # Imagens das oficinas
│   │   └── team/          # Imagens da equipe
│   ├── icons/             # Icones (SVG inline ou sprite)
│   └── favicons/          # Favicons e manifest
├── robots.txt             # Directives para motores de busca
├── sitemap.xml            # Mapa do site para SEO
├──404.html                # Pagina de erro 404
├── .htaccess              # Configuracoes Apache (se aplicavel)
├── _redirects             # Configuracoes Netlify/Vercel
├── vercel.json            # Configuracoes Vercel (se usar)
├── netlify.toml           # Configuracoes Netlify (se usar)
├── .gitignore             # Arquivos ignorados
├── CHANGELOG.md           # Historico de alteracoes
├── LICENSE                # Licenca do projeto
└── README.md              # Documentacao principal
```

### Responsabilidades por Arquivo

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Estrutura semantica, metadados SEO, declaracoes de recursos |
| `style.css` | Estilos globais, componentes, design tokens, media queries |
| `script.js` | Interatividade, animacoes, integracao WhatsApp |
| `assets/` | Conteudo estatico (imagens, icones) |
| `robots.txt` | Controle de indexacao |
| `sitemap.xml` | Estrutura para SEO |
| `404.html` | Tratamento de erros |

---

## 2. Checklist de Seguranca

### 2.1 Configuracoes Obrigatorias (Antes do Deploy)

#### HTTPS e Certidicado SSL

- [ ] **Certificado SSL/TLS instalado** - Provedor de hospedagem fornece automaticamente
- [ ] **Redirecionamento HTTP para HTTPS** - Configurar no provedor ou .htaccess
- [ ] **HSTS (HTTP Strict Transport Security)** - Header de seguranca recomendado

#### Headers de Seguranca

Adicionar ao `.htaccess` ou configuracao do servidor:

```apache
# Security Headers
<IfModule mod_headers.c>
    # Previne clickjacking
    Header always set X-Frame-Options "SAMEORIGIN"
    
    # Protege contra XSS
    Header always set X-XSS-Protection "1; mode=block"
    
    # Previne MIME type sniffing
    Header always set X-Content-Type-Options "nosniff"
    
    # Content Security Policy (CSP)
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://images.unsplash.com data:; connect-src 'self';"
    
    # Referrer Policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Permissions Policy
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

#### Protecao de Arquivos

- [ ] **Remover informacoes de debug** - Nenhum console.log ou erro visivel em producao
- [ ] **Ocultar arquivos sensiveis** - Verificar .gitignore
- [ ] **Proteger arquivos de configuracao** - Nenhum arquivo .env exposto

### 2.2 Configuracoes Recomendadas (Apos o Deploy)

- [ ] **Monitoramento de seguranca** - Configurar alertas
- [ ] **Backup automatico** - Configure no provedor
- [ ] **Logs de acesso** - Analise periodica
- [ ] **Firewall de aplicacao web (WAF)** - Se disponivel no provedor

---

## 3. Conformidade LGPD

### 3.1 Analise de Dados

O site atual **NAO coleta dados pessoais** diretamente:

- **Formularios**: Nenhum formulario de coleta de dados
- **Cookies**: Apenas cookies tecnicos necessarios (CDN, animacoes)
- **Dados de terceiros**: Imagens do Unsplash (sem coleta propria)

### 3.2 Politica de Privacidade (Obrigatorio)

Criar arquivo `privacidade.html` com:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Politica de Privacidade - Casa do Hip Hop Brazlandia</title>
</head>
<body>
    <h1>Politica de Privacidade</h1>
    <p><strong>Ultima atualizacao:</strong> Fevereiro/2026</p>
    
    <h2>1. Introducao</h2>
    <p>A Casa do Hip Hop Brazlandia respeita sua privacidade...</p>
    
    <h2>2. Dados Coletados</h2>
    <p>Este site NAO coleta dados pessoais. Utilizamos apenas...</p>
    
    <h2>3. Cookies</h2>
    <p>Utilizamos cookies tecnicos apenas para...</p>
    
    <h2>4. Links de Terceiros</h2>
    <p>Nosso site pode conter links para...</p>
    
    <h2>5. Contato</h2>
    <p>Para duvidas sobre esta politica, fale conosco pelo WhatsApp...</p>
</body>
</html>
```

### 3.3 Termos de Uso (Recomendado)

Criar arquivo `termos.html` com termos de uso do site.

### 3.4 Checklist LGPD

- [x] **Nao ha coleta de dados sensiveis** - Confirmado
- [ ] **Politica de privacidade publicada** - Criar documento
- [ ] **Termos de uso publicados** - Criar documento
- [ ] **Link no rodape para Politica de Privacidade** - ja existe no HTML
- [ ] **Link no rodape para Termos de Uso** - ja existe no HTML

---

## 4. SEO (Search Engine Optimization)

### 4.1 Metadados Atuais (Ja Implementados)

O arquivo `index.html` ja possui:

- [x] `<meta charset="UTF-8">`
- [x] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [x] `<meta name="description" content="...">`
- [x] `<meta name="keywords" content="...">`
- [x] `<meta name="author" content="...">`
- [x] `<title>...</title>`
- [x] Atributos `alt` em todas as imagens

### 4.2 Melhorias SEO Recomendadas

#### robots.txt

```text
User-agent: *
Allow: /

Sitemap: https://acasadohiphopbrazlandia.com.br/sitemap.xml
```

#### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://acasadohiphopbrazlandia.com.br/</loc>
        <lastmod>2026-02-18</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://acasadohiphopbrazlandia.com.br/#sobre</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://acasadohiphopbrazlandia.com.br/#oficinas</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://acasadohiphopbrazlandia.com.br/#eventos</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://acasadohiphopbrazlandia.com.br/#contato</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>https://acasadohiphopbrazlandia.com.br/privacidade.html</loc>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
    <url>
        <loc>https://acasadohiphopbrazlandia.com.br/termos.html</loc>
        <changefreq>yearly</changefreq>
        <priority>0.3</priority>
    </url>
</urlset>
```

#### Open Graph (Adicionar no head)

```html
<meta property="og:title" content="Casa do Hip Hop Brazlandia | Cultura e Transformacao">
<meta property="og:description" content="Cultura, arte e transformacao atraves da danca, rima e graffiti. Oficinas e eventos culturais em Brazlandia, DF.">
<meta property="og:image" content="https://acasadohiphopbrazlandia.com.br/assets/images/og-image.jpg">
<meta property="og:url" content="https://acasadohiphopbrazlandia.com.br">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
```

#### Twitter Cards (Adicionar no head)

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Casa do Hip Hop Brazlandia">
<meta name="twitter:description" content="Cultura, arte e transformacao atraves da danca, rima e graffiti.">
<meta name="twitter:image" content="https://acasadohiphopbrazlandia.com.br/assets/images/og-image.jpg">
```

#### Canonical URL

```html
<link rel="canonical" href="https://acasadohiphopbrazlandia.com.br/">
```

### 4.3 Checklist SEO

- [x] Meta tags basicas
- [x] Semantica HTML
- [x] Atributos alt em imagens
- [x] Estrutura de titulos (H1, H2, H3)
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Open Graph
- [ ] Twitter Cards
- [ ] Canonical URL
- [ ] Favicon

---

## 5. Performance

### 5.1 Otimizacoes Obrigatorias (Antes do Deploy)

#### Imagens

- [ ] **Todas as imagens com atributos `loading="lazy"`** - ja implementado
- [ ] **Dimensoes explícitas (width/height)** - Adicionar onde faltam
- [ ] **Converter para WebP** - Substituir imagens Unsplash por versoes otimizadas
- [ ] **Comprimir imagens** - Reduzir tamanho total

#### CSS e JavaScript

- [ ] **Minificar CSS** - Remover espacos em branco
- [ ] **Minificar JavaScript** - Remover espacos em branco
- [ ] **Eliminar CSS nao utilizado** - Remover classes Tailwind nao usadas

#### Carregamento

- [ ] **Fonts otimizadas** - Usar `font-display: swap`
- [ ] **Preload de recursos criticos** - Adicionar preconnect
- [ ] **Defer de scripts** - Adicionar `defer` ao script.js

### 5.2 Estrutura de Carregamento Recomendada

```html
<head>
    <!-- Preconnect para origens externas -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Preload de recursos criticos -->
    <link rel="preload" href="style.css" as="style">
    
    <!-- CSS principal -->
    <link rel="stylesheet" href="style.css">
    
    <!-- Fontes (com swap) -->
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Conteudo -->
    
    <!-- Scripts com defer -->
    <script src="script.js" defer></script>
</body>
```

### 5.3 Checklist Performance

- [x] lazy loading em imagens
- [ ] Imagens em WebP
- [ ] Minificacao de CSS
- [ ] Minificacao de JavaScript
- [ ] Dimensoes em imagens
- [ ] Font-display: swap
- [ ] Preconnect para origens externas

---

## 6. Estrutura de Ambientes

### 6.1 Ambiente de Desenvolvimento (Local)

```
URL: http://localhost:5500 (Live Server)
Proposito: Desenvolvimento e testes locais
```

### 6.2 Ambiente de Staging (Teste)

```
URL: https://staging-acasadohiphopbrazlandia.netlify.app (exemplo)
Proposito: Validacao antes do deploy producao
```

### 6.3 Ambiente de Producao

```
URL: https://acasadohiphopbrazlandia.com.br
Proposito: Site publica para visitantes
```

---

## 7. Estrategia de Deploy

### 7.1 Provedores Recomendados

| Provedor | Custo | Facilidade | CDN | SSL |
|----------|-------|------------|-----|-----|
| Netlify | Gratuito ate certo limite | Muito facil | Sim | Automatico |
| Vercel | Gratuito ate certo limite | Muito facil | Sim | Automatico |
| Cloudflare Pages | Gratuito | Facil | Sim | Automatico |
| GitHub Pages | Gratuito | Facil | Limitado | Automatico |

**Recomendacao**: Netlify ou Vercel (mais simples para sites estaticos)

### 7.2 Fluxo de Deploy

```
1. DESENVOLVIMENTO (local)
   |
   v
2. COMMIT (Git)
   |
   v
3. STAGING (branch staging)
   |-> Testes de integracao
   |
   v
4. HOMOLOGACAO (branch production)
   |-> Validacao final
   |
   v
5. PRODUCAO (branch main)
```

### 7.3 Configuracao Netlify (netlify.toml)

```toml
[build]
  command = "echo 'No build step required for static site'"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 7.4 Configuracao Vercel (vercel.json)

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 7.5 Script de Deploy (Opcional)

Criar script `deploy.sh`:

```bash
#!/bin/bash

# Deploy para Staging
echo "Fazendo deploy para Staging..."
netlify deploy --dir=. --prod --site=STAGING_SITE_ID

# Para producao
echo "Fazendo deploy para Producao..."
netlify deploy --dir=. --prod
```

---

## 8. Manutencao

### 8.1 Tarefas Regulares

| Frequencia | Tarefa |
|------------|--------|
| Semanal | Verificar erros no console |
| Mensal | Atualizar imagens e conteudo |
| Trimestral | Revisar links internos |
| Anual | Revisar politica de privacidade |

### 8.2 Controle de Versoes

Usar conventional commits:

```
feat: adiciona nova secao de eventos
fix: corrige bug no menu mobile
docs: atualiza documentacao
style: ajusta estilos
refactor: otimiza JavaScript
perf: melhora performance
```

### 8.3 Changelog

Manter arquivo `CHANGELOG.md`:

```markdown
# Changelog

## [1.1.0] - 2026-02-18

### Adicionado
- Pagina de politica de privacidade
- Pagina de termos de uso

### Alterado
- Otimizacao de imagens
- Atualizacao de metadados SEO

## [1.0.0] - 2024-09-15

### Adicionado
- Lancamento inicial do site
```

---

## 9. Resumo: Obrigatorio vs Recomendado

### 9.1 OBRIGATORIO (Antes do Deploy)

| Item | Descricao | Status |
|------|-----------|--------|
| SSL/HTTPS | Certificado instalado | Provedor |
| Politica de Privacidade | Arquivo privacidade.html | A criar |
| Termos de Uso | Arquivo termos.html | A criar |
| Links no rodape | Ja existem no HTML | OK |
| Minificacao CSS | Remover espacos | A processar |
| Minificacao JS | Remover espacos | A processar |
| Imagens otimizadas | WebP e compressao | A processar |
| robots.txt | Directives para SEO | A criar |
| sitemap.xml | Mapa do site | A criar |

### 9.2 RECOMENDADO (Pode ficar para depois)

| Item | Descricao | Prioridade |
|------|-----------|------------|
| Open Graph | Metadados sociais | Media |
| Twitter Cards | Metadados Twitter | Media |
| Canonical URL | Evitar conteudo duplicado | Baixa |
| Pagina 404 customizada | Experiencia de erro | Baixa |
| Monitoramento | Erros em producao | Baixa |
| Backup automatico | Provedor ja oferece | Baixa |

---

## 10. Proximos Passos

### Imediato (1 dia)

1. Criar `privacidade.html`
2. Criar `termos.html`
3. Criar `robots.txt`
4. Criar `sitemap.xml`
5. Criar `.htaccess` com security headers
6. Minificar CSS e JavaScript

### Curto prazo (1 semana)

1. Configurar conta Netlify/Vercel
2. Conectar repositorio GitHub
3. Configurar deploy automatico
4. Testar ambiente de staging
5. Validar HTTPS

### Medio prazo (1 mes)

1. Adicionar Open Graph
2. Otimizar imagens
3. Configurar dominio proprio
4. Testar em dispositivos reais

---

## Anexo: Arquivos a Criar

```
NOVOS ARQUIVOS:
- privacidade.html
- termos.html
- robots.txt
- sitemap.xml
- .htaccess
- 404.html
- CHANGELOG.md

ARQUIVOS A MODIFICAR:
- index.html (adicionar OG, Twitter Cards, canonical)
- style.css (minificar)
- script.js (minificar)

ESTRUTURA A CRIAR:
- assets/images/
- assets/icons/
- assets/favicons/
```

---

**Documento criado em**: Fevereiro/2026
**Versao**: 1.0
**Proximo review**: Março/2026
