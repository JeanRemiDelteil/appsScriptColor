export const injectInTab = (tab: chrome.tabs.Tab, fnToInject: () => void): void => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        world: "MAIN",
        func: fnToInject,
    })
    .then(res => console.log('Injection success', fnToInject, res))
    .catch(err => console.error('Injection error', fnToInject, err));
};
