import { IdeVersion } from "./ideVersion.enum";

export const detectIde = (): IdeVersion => {
    return /\/home\/projects\/([^\/]+?)\/edit/.test(document.location.pathname)
        ? IdeVersion.MONACO
        : IdeVersion.NOT_IDE;
};

export const getScriptKey = (): string =>
    (document.location.pathname.match(/\/([^\/]+?)\/edit/) ||
        document.location.pathname.match(
            /\/home\/projects\/([^\/]+?)(?:\/|$)/
        ) ||
        [])[1];
