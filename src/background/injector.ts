export const injectInTab = (
    tab: chrome.tabs.Tab,
    fnToInject: () => void
): void => {
    chrome.scripting
        .executeScript({
            target: { tabId: tab.id },
            world: "MAIN",
            func: fnToInject,
        })
        .then((res) => console.log("Injection success", fnToInject, res))
        .catch((err) => console.error("Injection error", fnToInject, err));
};

export const injectScriptInTab = (
    tab: chrome.tabs.Tab,
    scriptName: string
): void => {
    chrome.scripting
        .executeScript({
            target: { tabId: tab.id },
            world: "MAIN",
            files: [scriptName],
        })
        .then((res) => console.log("Script Injection success", scriptName, res))
        .catch((err) =>
            console.error("Script Injection error", scriptName, err)
        );
};
