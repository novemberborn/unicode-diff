'use strict'

const fs = require('fs')
const path = require('path')

const mkdirp = require('mkdirp')
const regenerate = require('regenerate')

function writeCodePoints (def, other, diff) {
  console.log(`Writing ${def.version}/${other.version}/code-points`)

  const dir = path.join(__dirname, '..', def.version, other.version)
  mkdirp.sync(dir)
  fs.writeFileSync(
    path.join(dir, 'code-points.js'),
    `module.exports=${JSON.stringify(diff)};\n`)
}

function writeRegex (def, other, diff) {
  console.log(`Writing ${def.version}/${other.version}/regex`)

  const dir = path.join(__dirname, '..', def.version, other.version)
  mkdirp.sync(dir)
  fs.writeFileSync(
    path.join(dir, 'regex.js'),
    `module.exports=/${regenerate(diff).toString()}/;\n`)
}

const pkg = require('../package.json')
const definitions = []
for (let name in pkg.devDependencies) {
  if (/^unicode-\d+\.\d+\.\d+$/.test(name)) {
    var version = name.slice(8)
    console.log(`Loading ${version}`)

    const codePoints = new Set()
    require(name).Block.forEach(function (block) {
      const byBlock = require(`${name}/Block/${block}/code-points`)
      for (let cp of byBlock) {
        codePoints.add(cp)
      }
    })

    definitions.push({
      version: version,
      codePoints: codePoints
    })
  }
}

const index = { versions: {} }
while (definitions.length) {
  let def = definitions.shift()
  index.versions[def.version] = []

  for (let other of definitions) {
    console.log(`Computing code points introduced between ${def.version} and ${other.version}`)

    const diff = []
    for (let cp of other.codePoints) {
      if (!def.codePoints.has(cp)) {
        diff.push(cp)
      }
    }
    diff.sort()

    writeCodePoints(def, other, diff)
    writeRegex(def, other, diff)
    index.versions[def.version].push(other.version)
  }
}

fs.writeFileSync(
  path.join(__dirname, '..', 'index.js'),
  `module.exports=${JSON.stringify(index)}\n`)
