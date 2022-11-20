module.exports = {
    inputFiles: [
        { input: "content-script/index.ts", output: "injectColor.js" },
        { input: "background/index.ts", output: "background.js" },
        {
            input: "asc-in-app-service/index.ts",
            output: "ascInAppService.js", // can't import it from TS file :p
        },
    ],
    inputDir: "./src",
    outputDir: "AppScriptColorDEV",

    env: "DEVELOPMENT",
};
