# react-i18next-types-generator

[![npm](https://img.shields.io/npm/v/react-i18next-types-generator.svg)](https://www.npmjs.com/package/react-i18next-types-generator)

Simple CLI tool for generating types for `react-i18next` just like that https://react.i18next.com/latest/typescript

## Usage

```console
npm i react-i18next-types-generator
npx react-i18next-types-generator [options]
```

```console
react-i18next-types-generator [options]

Options:
      --version     Show version number                                [boolean]
      --help        Show help                                          [boolean]
  -i, --input       Path to the directory that contains translation JSON files
                                                             [string] [required]
  -o, --output      Path to the output declaration file      [string] [required]
  -a, --importPath  Path used to create import directives for the JSON files
                                                                        [string]
  -w, --watch       Watch directory changes           [boolean] [default: false]
```
