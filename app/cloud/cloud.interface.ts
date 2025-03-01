export interface ICloud {
	title: string;
	download: () => void | Promise<void>;
}