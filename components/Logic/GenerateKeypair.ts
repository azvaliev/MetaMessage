import * as solanaWeb3 from '@solana/web3.js';

const GenerateKeypair = () => {
    let keypair = solanaWeb3.Keypair.generate();
    window.localStorage.setItem('keypair', JSON.stringify(keypair));
    return keypair;
}

export default GenerateKeypair;