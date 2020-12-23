export const EVENT_SUB_FOLDER_CHANGED = 'EVENT_SUB_FOLDER_CHANGED';
export type EVENT_SUB_FOLDER_CHANGED = void;

declare global {
	interface DocumentEventMap {
		[EVENT_SUB_FOLDER_CHANGED]: CustomEvent<EVENT_SUB_FOLDER_CHANGED>
	}
}
