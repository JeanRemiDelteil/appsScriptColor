import { BackgroundMessager } from "./messager";

export class BackgroundRunner {
    constructor() {
        BackgroundMessager.init();
    }

    static init(): void {
        new BackgroundRunner();
    }
}
