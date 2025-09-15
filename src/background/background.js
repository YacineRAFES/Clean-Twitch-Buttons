browser.runtime.onMessage.addListener((message) => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        if (tabs[0]) {
            browser.tabs.sendMessage(tabs[0].id, message);
        }
    });
});