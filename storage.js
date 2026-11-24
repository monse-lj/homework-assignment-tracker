export class LocalStorageRepository {
    constructor(storage, key = "assignments") {
        this.storage = storage;
        this.key = key;
    }

    load() {
        return JSON.parse(this.storage.getItem(this.key)) || [];
    }

    save(assignments) {
        this.storage.setItem(this.key, JSON.stringify(assignments));
    }
}
