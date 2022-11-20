module.exports = {
    inputFiles: [
        { input: "content-script/index.ts", output: "injectColor.js" },
        { input: "background/index.ts", output: "background.js" },
        {
            input: "asc-in-app-service/index.ts",
            output: "ascInAppService.js",
        },
    ],
    inputDir: "./src",
    outputDir: "AppScriptColor",

    env: "PRODUCTION",
};
