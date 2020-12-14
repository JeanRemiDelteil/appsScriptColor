export interface IInfoShown {
	vFolder: boolean,
}

let infoShown: IInfoShown = {
	vFolder: false,
};

export function getInfoShown(): IInfoShown {
	return infoShown;
}

export function setInfoShown(value: IInfoShown): IInfoShown {
	return infoShown = value;
}
