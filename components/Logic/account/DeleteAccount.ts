import { deleteStore } from "./manageIndexedDB";

const deleteAccount = async () => {
	localStorage.clear();
	return await deleteStore();
};
export default deleteAccount;
