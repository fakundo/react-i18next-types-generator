#!/usr/bin/env node
import yargs from "yargs";
import path from "path";
import mkdirp from "mkdirp";
import watch from "node-watch";
import createGenerator from "./createGenerator";

const { argv } = yargs
  .locale("en")
  .usage("$0 [options]")
  .help()
  .options({
    input: {
      alias: "i",
      type: "string",
      description: "Path to the directory that contains translation JSON files",
      required: true,
    },
    output: {
      alias: "o",
      type: "string",
      description: "Path to the output declaration file",
      required: true,
    },
    importPath: {
      alias: "a",
      type: "string",
      description: "Path used to create import directives for the JSON files",
      default: undefined,
    },
    watch: {
      alias: "w",
      type: "boolean",
      description: "Watch directory changes",
      default: false,
    },
    exportReactI18next: {
      alias: "r",
      type: "boolean",
      description: "Add export directive for all react-i18next types",
      default: true,
    },
  });

const inputPath = path.resolve(argv.input);
const outputPath = path.resolve(argv.output);

const generate = createGenerator(
  inputPath,
  outputPath,
  argv.importPath || path.relative(path.dirname(argv.output), argv.input),
  argv.exportReactI18next
);

mkdirp.sync(path.dirname(outputPath));
generate();

if (argv.watch) {
  watch(inputPath, { recursive: true }, (evt, fileName) => {
    if (
      (evt === "remove" || evt === "update") &&
      path.extname(fileName) === ".json"
    ) {
      generate();
    }
  });
}
