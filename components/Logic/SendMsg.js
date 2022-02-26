const splToken = require("@solana/spl-token");

const web3 = require('@solana/web3.js');

export default async function SendMsg(message, recipient, keypair, pubkey) {

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
    console.error('CONNECTED');

    const wallet = web3.Keypair.fromSecretKey(new Uint8Array(Object.values(keypair.secretKey)))

    const address = wallet.publicKey.toString();
    // const secret = JSON.stringify(Array.from(wallet.secretKey));

    console.error(address);

    const airdropSignature = await connection.requestAirdrop(
        pubkey,
        web3.LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(airdropSignature);

    // console.error('airdrop confirmed!')
    
    const mint = await splToken.createMint(
        connection,
        wallet,
        wallet.publicKey,
        wallet.publicKey,
        0
    ).catch(err => {
        console.error(err, mint)
    })

    console.error('minted!')

    const associatedTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mint,
        wallet.publicKey
    );

    console.error('Finding/creating mint account');

    await splToken.mintTo(
        connection,
        wallet,
        mint,
        associatedTokenAccount.address,
        wallet,
        1
    );

    console.error('minted!')

    const toTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(connection, wallet, mint, new web3.PublicKey(recipient))

    const signature = await splToken.transfer(
        connection,
        wallet,
        associatedTokenAccount.address,
        toTokenAccount.address,
        wallet.publicKey,
        1
    )

    // const accountInfo = await splToken.getAccount(connection, associatedTokenAccount.address);
    // const mintInfo = await splToken.getMint(
    //     connection,
    //     mint
    // );
    console.error(signature);

    return true;
}