export const injectInTab = (tab: chrome.tabs.Tab, fnToInject: () => void): void => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        world: "MAIN",
        func: fnToInject,
    })
        .then(res => console.log('Injection success', res))
        .catch(err => console.error('Injection error', err));
};
