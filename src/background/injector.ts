export const injectInTab = (
    tab: chrome.tabs.Tab,
    fnToInject: (...args: unknown[]) => void,
    args?: unknown[]
): void => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: fnToInject,
        args,
    });
    // .then((res) => console.log("Injection success", fnToInject, res))
    // .catch((err) => console.error("Injection error", fnToInject, err));
};

export const injectScriptInTab = (
    tab: chrome.tabs.Tab,
    scriptName: string
): void => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        files: [scriptName],
    });
    // .then((res) => console.log("Script Injection success", scriptName, res))
    // .catch((err) =>
    //     console.error("Script Injection error", scriptName, err)
    // );
};
