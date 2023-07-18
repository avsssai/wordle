export type IObjectStringKeyValue = {
	[key: string]: string;
};
export type IObjectNumberKeyValue = {
	[key: number]: () => JSX.Element;
};
