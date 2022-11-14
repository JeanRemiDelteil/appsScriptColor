module.exports = {
    inputFiles: [
        { input: "index.ts", output: "injectColor.js" },
        { input: "background/index.ts", output: "background.js" },
        {
            input: "background/monaco/asc-in-app-service/index.ts",
            output: "ascInAppService.js",
        },
    ],
    inputDir: "./src",
    outputDir: "AppScriptColor",

    env: "PRODUCTION",
};
