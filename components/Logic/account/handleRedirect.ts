
const handleRedirect = () => {
    const keypairCheck = localStorage.getItem("keypair");
    if (keypairCheck) {
        return "/login";
    } else {
        return "/welcome";
    }
};

export default handleRedirect;