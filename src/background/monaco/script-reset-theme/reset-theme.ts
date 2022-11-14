export const resetTheme = () => {
    // console.log("Register RESET");

    window.__ascInAppAction__ = {
        action: "RESET",
    };

    window.__ascInAppService__?.doAction();
};
