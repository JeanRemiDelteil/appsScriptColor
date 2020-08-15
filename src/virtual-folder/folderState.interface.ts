export interface IFolderState {
	open: boolean;
	sub: IFolderStateDictionary;
}

export interface IFolderStateDictionary {
	[folderName: string]: IFolderState;
}
