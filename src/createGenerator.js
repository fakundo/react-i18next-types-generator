import path from "path";
import fs from "fs";
import { camelCase } from "camel-case";

const addSpace = (amount) => {
  return (s) => new Array(amount + 1).join(" ") + s;
};

export default (inputPath, outputPath, importPath, exportReactI18next) => () => {
  const files = fs.readdirSync(path.resolve(inputPath));
  const outputImports = [];
  const outputResourceItems = [];

  files.forEach((fileName) => {
    const extName = path.extname(fileName);
    if (extName === ".json") {
      const baseName = path.basename(fileName, extName);
      const normalizedName = camelCase(baseName);
      const modulePath = path.join(importPath, fileName);
      outputImports.push(`import ${normalizedName} from '${modulePath}';`);
      outputResourceItems.push(`'${baseName}': typeof ${normalizedName};`);
    }
  });

  let output = "";

  if (exportReactI18next) {
    output += "export * from 'react-i18next';\n\n";
  }

  output += `${outputImports.join("\n")}

declare module 'react-i18next' {
  interface Resources {
${outputResourceItems.map(addSpace(4)).join("\n")}
  }
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
${outputResourceItems.map(addSpace(6)).join("\n")}
    };
  }
}`;

  fs.writeFileSync(path.resolve(outputPath), output);

  console.log(
    `[react-i18next-types-generator] Generated types for ${outputImports.length} files!`
  );
};
