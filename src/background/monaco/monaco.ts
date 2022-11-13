export const runMonacoAction = (action: () => void): void => {
    if (window.monaco && window.jsWireMonacoEditor) {
        console.log("runMonacoAction: immediate");
        action();

        return;
    }

    // Wait for monaco to be available
    const observer = new MutationObserver((mutations) => {
        mutations.some((mutation) => {
            const domMonacoStyle = Array.from(mutation.addedNodes).find(
                (node: Element & Node) =>
                    !(
                        node.tagName !== "STYLE" ||
                        !node.classList.contains("monaco-colors")
                    )
            );
            if (!domMonacoStyle) return false;

            console.log("runMonacoAction: delayed");
            action();
            observer.disconnect();
            return true;
        });
    });

    observer.observe(document.head, {
        childList: true,
        attributes: false,
        characterData: false,
    });
};
