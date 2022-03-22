import { deleteStore } from "./manageIndexDB";

const deleteAccount = async () => {
  localStorage.clear();
  return await deleteStore();
};
export default deleteAccount;
