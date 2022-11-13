module.exports = {
  inputFiles: [
    { input: "index.ts", output: "injectColor.js" },
    { input: "background/index.ts", output: "background.js" },
    { input: "background/monaco/reset-theme.ts", output: "resetTheme.js" },
  ],
  inputDir: "./src",
  outputDir: "AppScriptColorDEV",

  env: "DEVELOPMENT",
};
