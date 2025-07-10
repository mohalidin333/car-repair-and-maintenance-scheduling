import { Dexie, Table } from "dexie";

type Image = {
  id?: number;
  file: Blob;
};

class IndexedDbDexie extends Dexie {
  images!: Table<Image, number>;
  constructor() {
    super("IndexedDbDexie");
    this.version(2).stores({
      images: "++id",
    });
  }
}

export const indexedDbDexie = new IndexedDbDexie();
