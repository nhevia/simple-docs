![GitHub package.json version](https://img.shields.io/github/package-json/v/nhevia/simple-docs?style=flat-square) ![PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![GitHub](https://img.shields.io/github/license/nhevia/simple-docs?style=flat-square) ![Twitter Follow](https://img.shields.io/twitter/follow/nhevia?style=social)

# simple-docs

> A simple documentation tool.

### Why?

I needed a **really** simple tool to generate documentation for my 100+ components. Insert a comment block at the beggining of the file describing it and it's usage and that's it.

Most major documentation libraries have tools that are beyond the current necessities for most of my projects.

Disclaimer: If you're working in a team with multiple people, there are better, more tested and reliable alternatives.

### Installation

`npm install @nhevia/simple-docs`

or install as a development dependency (recommended)

`npm install --save-dev @nhevia/simple-docs`

### Usage

- Add **sdoc** to package.json script:

```
"scripts": {
  "docs": "sdoc"
}
```

- Use a comment block at the start of any file with `sdoc` preffix:

```javascript
/*sdoc
This is the main component
*/

// your code
```

![image](https://user-images.githubusercontent.com/50466554/91441610-d4a84480-e870-11ea-9459-9d2e22c56370.png)

- Run `npm run docs`. It indentifies documentation blocks in your project and generates an `sdoc.md` file:

![image](https://user-images.githubusercontent.com/50466554/91441844-323c9100-e871-11ea-8f6b-68f979038b5d.png)

Since the generated file is markdown, it is supported inside documentation blocks.

```javascript
/*sdoc
  This is the **main** component
*/
```

![image](https://user-images.githubusercontent.com/50466554/91442173-b727aa80-e871-11ea-9a97-b54b94d9d72a.png)

### License

Copyright © 2020 Nicolas Hevia
This project is [MIT](https://opensource.org/licenses/MIT) licensed
