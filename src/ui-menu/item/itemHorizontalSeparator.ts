import { Item } from "./item";

export class ItemHorizontalSeparator extends Item {
    getItem(): HTMLElement {
        const domItem = document.createElement("div");
        domItem.classList.add("goog-menuseparator");
        domItem.setAttribute("aria-disabled", "true");
        domItem.setAttribute("role", "separator");
        domItem.style.userSelect = "none";

        return domItem;
    }
}
