import { IdeVersion } from './ide-version.enum';


export const detectIde = (): IdeVersion => {
	return /\/home\/projects\/([^\/]+?)\/edit/.test(document.location.pathname)
	       ? IdeVersion.CURRENT
	       : /\/([^\/]+?)\/edit/.test(document.location.pathname)
	         ? IdeVersion.OLD
	         : IdeVersion.NOT_IDE;
};

export const getScriptKey = (): string => document.location.pathname.match(/\/([^\/]+?)\/edit/)[1];
