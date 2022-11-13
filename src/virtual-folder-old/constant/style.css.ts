import { CLASS_TITLE_CONTAINER } from "./className";

export const css = `
<style>
/* Root */
.asc_old_FolderRoot>.${CLASS_TITLE_CONTAINER}{
	display: none;
}

/* Folder */
.asc_old_Folder>.${CLASS_TITLE_CONTAINER}{
	display: flex;
	align-items: center;
	
	user-select: none;
	cursor: pointer;
}
.asc_old_Folder>.${CLASS_TITLE_CONTAINER} .asc_old_folderIcon{
	font-size: 0;
	padding: 5px;
}
.asc_old_Folder>.${CLASS_TITLE_CONTAINER} .asc_old_folderIcon>.material-icons{
	font-size: 20px;
}

.asc_old_Folder>.${CLASS_TITLE_CONTAINER} .asc_old_closed{
	display: none;
}
.asc_old_Folder:not(.asc_old_opened)>.${CLASS_TITLE_CONTAINER} .asc_old_closed{
	display: unset;
}
.asc_old_Folder:not(.asc_old_opened)>.${CLASS_TITLE_CONTAINER} .asc_old_opened{
	display: none;
}

.asc_old_Folder>.${CLASS_TITLE_CONTAINER} .asc_old_folder_title {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	flex: auto;
	margin-right: 5px;
	padding: 7px 0;
}

.asc_old_Folder>.asc_old_folder_ChildList {
	margin-left: 20px;
}
.asc_old_Folder:not(.asc_old_opened)>.asc_old_folder_ChildList{
	display: none;
}

.asc_old_folder_info {
	display: flex;
	padding: 6px;
}
.asc_old_folder_info>i.material-icons {
	font-size: 18px;
}

/* Popup */
.asc_old_info_popup {
	position: fixed;
	margin-left: 24px;
	width: 280px;
	height: 110px;
	padding: 10px;
	z-index: 1000000;
	border: 2px solid;
	border-radius: 3px;
	overflow: auto;
}
.asc_old_info_popup-hide{
	display: none;
}


/* Items */
.project-items-list .item {
	display: flex;
	align-items: center;
	padding: 0!important;
	border: none!important;
}
.project-items-list .item:before {
	content: "insert_drive_file";
	/*noinspection CssNoGenericFontName*/font-family: 'Material Icons';
	font-weight: normal;
	font-style: normal;
	font-size: 20px;
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	-webkit-font-feature-settings: 'liga';
	-webkit-font-smoothing: antialiased;
	padding: 5px;
}
.project-items-list .item.file-type-js:before {
	content: "description";
}
.project-items-list .item.file-type-html:before {
	content: "web";
}
.project-items-list .item.file-type-json:before {
	content: "build";
}

.project-items-list .item img.piece {
	display: none!important;
}
.project-items-list .item div.name {
	flex: auto;
	padding: 7px 0!important;
	height: 15px;	}
.project-items-list .item .dropdown {
	opacity: 0!important;
	margin: 0!important;
	padding: 0!important;
	height: 20px;
	width: 20px;
}
.project-items-list .item:after {
	content: "arrow_drop_down";
	/*noinspection CssNoGenericFontName*/font-family: 'Material Icons';
	font-weight: normal;
	font-style: normal;
	font-size: 20px;
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	-webkit-font-feature-settings: 'liga';
	-webkit-font-smoothing: antialiased;
	margin-right: 4px;
}
</style>`;
