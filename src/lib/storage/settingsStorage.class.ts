import { ICustomThemes } from "../color-theme";
import { Action, dispatchAscAction, EVENT_ASC_ACTION } from "../com";
import { IFolderStateDictionary } from "../folders";

class SettingsStorage {
    private readonly _storagePrefix = "appScriptColor";

    //<editor-fold desc="# Theme Settings">
    getThemeInUse(): string {
        return this._getSetting("theme");
    }

    setThemeInUse(themeName: string): void {
        this._setSetting("theme", undefined, themeName);
        dispatchAscAction({ action: Action.ALL_THEME_CHANGED, themeName });
    }

    useTheme(useTheme?: boolean): boolean {
        if (useTheme !== undefined) {
            this._setSetting("theme", "useTheme", "" + useTheme);
            return useTheme;
        }

        try {
            return !!JSON.parse(this._getSetting("theme", "useTheme"));
        } catch (_err) {
            return true;
        }
    }

    getCustomThemes(): ICustomThemes {
        try {
            return JSON.parse(this._getSetting("theme", "custom") || "{}");
        } catch (e) {
            return {};
        }
    }

    setCustomThemes(customThemes: ICustomThemes): void {
        return this._setSetting(
            "theme",
            "custom",
            JSON.stringify(customThemes)
        );
    }

    //</editor-fold>

    //<editor-fold desc="# Folder settings">
    getFolderStates(scriptKey: string): IFolderStateDictionary {
        try {
            return JSON.parse(
                this._getSetting("static", `Folders-${scriptKey}`) || "{}"
            );
        } catch (e) {
            return {};
        }
    }

    setFolderStates(
        scriptKey: string,
        folderStates: IFolderStateDictionary
    ): void {
        return this._setSetting(
            "static",
            `Folders-${scriptKey}`,
            JSON.stringify(folderStates)
        );
    }

    //</editor-fold>

    private _buildSettingKey(store: string, settingName?: string): string {
        return [this._storagePrefix, store, settingName]
            .filter((_) => !!_)
            .join("-");
    }

    private _setSetting(
        store: string,
        settingName: string | undefined,
        value: string
    ) {
        localStorage.setItem(this._buildSettingKey(store, settingName), value);
    }

    private _getSetting(store: string, settingName?: string): string {
        return localStorage.getItem(this._buildSettingKey(store, settingName));
    }
}

export const settingsService = new SettingsStorage();
