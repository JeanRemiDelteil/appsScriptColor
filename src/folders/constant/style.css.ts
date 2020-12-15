import { CLASS_TITLE_CONTAINER } from './className';


export const css = `
<style>
/* Root */
.asc_FolderRoot{
	background: white;
	position: relative;
	padding-bottom: 7px;
}

.asc_FolderRoot>.${ CLASS_TITLE_CONTAINER }{
	display: none;
}

/* Folder */
.asc_Folder>.${ CLASS_TITLE_CONTAINER }{
	display: flex;
	align-items: center;
	
	user-select: none;
	cursor: pointer;
}
.asc_Folder>.${ CLASS_TITLE_CONTAINER } .asc_folderIcon{
	display: flex;
	padding: 6px 3px;
	font-size: 0;
}
.asc_Folder>.${ CLASS_TITLE_CONTAINER } .asc_folderIcon>.material-icons{
	font-size: 20px;
}

.asc_Folder>.${ CLASS_TITLE_CONTAINER } .asc_closed{
	display: none;
}
.asc_Folder:not(.asc_opened)>.${ CLASS_TITLE_CONTAINER } .asc_closed{
	display: unset;
}
.asc_Folder:not(.asc_opened)>.${ CLASS_TITLE_CONTAINER } .asc_opened{
	display: none;
}

.asc_Folder>.${ CLASS_TITLE_CONTAINER } .asc_folder_title {
	flex: auto;
	padding: 0 3px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.asc_Folder>.asc_folder_ChildList {
	margin-left: 16px;
}
.asc_Folder>.asc_folder_ChildList>li:first-child {
	margin-top: 0!important;
}
.asc_Folder>.asc_folder_ChildList>li {
	padding-left: 13px!important;
}
.asc_Folder:not(.asc_opened)>.asc_folder_ChildList{
	display: none;
}

</style>`;
