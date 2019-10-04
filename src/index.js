import {asc} from './color-theme';
import {Folders} from './virtual-folder';


// Only execute if the current page is in editing mode
if (/\/edit$/.test(document.location.pathname)) {
	asc.initColors();
	asc.insertMenuButton();
	
	Folders.insertCSS();
	Folders.waitInitialization();
}
