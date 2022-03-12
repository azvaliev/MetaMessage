import { deleteStore } from "./ManageIndexDB";

const DeleteAccount = async () => {
  localStorage.clear();
  return await deleteStore();
};
export default DeleteAccount;
