const isMobile = () => {
	if (window.innerHeight > window.innerWidth * 1.5 && window.innerWidth < 650) {
		return true;
	}
	return false;
};
export default isMobile;

