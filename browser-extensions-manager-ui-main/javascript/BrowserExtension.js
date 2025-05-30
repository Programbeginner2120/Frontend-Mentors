export class BrowserExtension {

    id;
    logo;
    name;
    description;
    isActive;

    constructor(id, logo, name, description, isActive) {
        this.id = id;
        this.logo = logo;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
    }

    toggleIsActive() {
        this.isActive = !this.isActive;
    }

}