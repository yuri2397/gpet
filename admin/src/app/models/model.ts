export abstract class Model<T> {
  id!: number;


  clone():T{
    var cloneObj = new (this.constructor() as any);
    for (var attribut in this) {
        if (typeof this[attribut] === "object") {
            cloneObj[attribut] = (this[attribut] as any).clone();
        } else {
            cloneObj[attribut] = this[attribut];
        }
    }
    return cloneObj;
  };

  abstract myIndex(arrays: T[]): number;

  abstract some(arrays: T[]): T | null;

  deleted = false;
  add = false;
  loading = false;
}
