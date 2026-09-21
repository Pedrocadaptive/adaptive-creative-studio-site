# Adaptive Creative Studio

Site da Adaptive Creative Studio. **Earn The Future.**

Site estático, sem build e sem dependências: HTML, CSS e JavaScript simples. Pode ser alojado em qualquer servidor ou serviço de páginas estáticas.

## Estrutura

```
index.html            todas as páginas: Início, Estúdio, Contacto e Adaptive Labs
assets/css/site.css   estilos
assets/js/site.js     navegação, animações, idioma PT/EN e formulário
assets/img/           logótipo, símbolo e fotografia da equipa
assets/icons/         favicon e ícone para ecrã inicial
```

As páginas trocam pelo endereço: `#inicio`, `#estudio`, `#contacto` e `#labs`.

## Ver localmente

Basta um servidor estático na pasta do projeto, por exemplo:

```
npx serve .
```

## Onde mudar o quê

- **Email mostrado no site:** constante `MAIL` no início de `assets/js/site.js`.
- **Formulário:** é enviado pelo [Web3Forms](https://web3forms.com). A chave está em `WEB3FORMS_KEY`, em `assets/js/site.js`, e as mensagens chegam ao email com que a chave foi criada. A chave é pública por natureza: só serve para entregar mensagens nesse email.
- **Telemóvel:** em `index.html`, procurar `tel:+351`.
- **Redes sociais:** em `index.html`, procurar `instagram.com` e `facebook.com`.
- **Textos em inglês:** objeto `EN` em `assets/js/site.js`. Os textos em português estão no próprio `index.html`.

## Por fazer

- Filme de capa (a capa tem uma luz feita em CSS no lugar).
- Trabalhos reais (os quatro projetos estão fechados, com o nome por revelar).
- Logótipo em SVG vetorial. Os ficheiros atuais são PNG.
