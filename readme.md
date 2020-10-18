![GitHub package.json version](https://img.shields.io/github/package-json/v/nhevia/simple-docs?style=flat-square) ![CircleCI Build Status](https://circleci.com/gh/nhevia/simple-docs.svg?style=shield "CircleCI Build Status") [![Known Vulnerabilities](https://snyk.io/test/github/nhevia/simple-docs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/nhevia/simple-docs?targetFile=package.json)
![PR](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![GitHub](https://img.shields.io/github/license/nhevia/simple-docs?style=flat-square) ![Twitter Follow](https://img.shields.io/twitter/follow/n_hevia?style=social)

# simple-docs

> A simple documentation tool.


### Installation

`npm install @nhevia/simple-docs`

or install as a development dependency (recommended)

`npm install --save-dev @nhevia/simple-docs`

### Usage

- Add **sdoc** as a package.json script:

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

- Run `npm run docs`. It will indentify documentation blocks in your project and generates an output file (`sdoc.md` by default, on root folder):


Since the generated file is markdown, it is supported inside documentation blocks.

```javascript
/*sdoc
  This is the **main** component
*/
```

![image](https://user-images.githubusercontent.com/50466554/91442173-b727aa80-e871-11ea-9a97-b54b94d9d72a.png)

### Options

- `-f <filename>, --file <filename>`  
Set the output file name:
`sdoc -f docs-components` | `sdoc --file docs-components`
>
- `-ni, --no-index`  
Set the output file name.
`sdoc -ni` | `sdoc --no-index`


### Why?

Most major documentation libraries have tools that are beyond the current necessities for personal projects.

I needed a **really** simple tool to generate documentation for my scripts. Insert a comment block at the beggining of the file describing it and its usage and that's it.

Note that if you're working in a team with multiple people, there are better, more tested and reliable alternatives.

### Contributing

Pull requests are more than welcome. 


### License

Copyright © 2020 Nicolas Hevia
This project is [MIT](https://opensource.org/licenses/MIT) licensed
