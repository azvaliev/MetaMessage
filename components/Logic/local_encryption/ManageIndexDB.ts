import { openDB } from "idb";

export const updateIVStore = async (iv: ArrayBuffer) => {
  // check for compatibility
  if (!checkIndexDBCompatible) {
    return false;
  }
  const db = await openDB("IVStore", 2);
  return db
    .put("iv", iv, "iv_buffer")
    .then(() => true)
    .catch(() => false);
};

export const createIVStore = async (iv: ArrayBuffer) => {
  // check for compatibility
  if (!checkIndexDBCompatible) {
    return false;
  }
  // upgrade function will get triggered on first attempt
  // which will create the collection to store IV
  const db = await openDB("IVStore", 2, {
    upgrade(db) {
      db.createObjectStore("iv");
    },
  });
  return db
    .add("iv", iv, "iv_buffer")
    .then(() => true)
    .catch((err) => console.error(err));
};

export const getIVStore = async () => {
  // check for compatibility
  if (!checkIndexDBCompatible) {
    return false;
  }
  const db = await openDB("IVStore", 2);
  const res = await db.get("iv", "iv_buffer");
  return res;
};

const checkIndexDBCompatible = () => {
  // this function checks for browser compatibility
  if (!("indexedDB" in window)) {
    return false;
  }
  return true;
};
