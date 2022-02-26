import CheckMessages from "./CheckMessages"

async function GetConversations (wallet) {
    let incoming = await CheckMessages(wallet);
    if (incoming[0] != 'N/A') {
        incoming.forEach(conversation => {
            if (localStorage.getItem(conversation[0].from.toString()) !== null) {
                conversation.push(...JSON.parse(localStorage.getItem(conversation[0].from.toString())))
            }
            
            conversation.sort((a,b) => {
                let a_ms = new Date(a.date).getTime()
                let b_ms = new Date(b.date).getTime()
                if (a_ms > b_ms) {
                    return 1;
                } else if (b_ms > a_ms) {
                    return -1;
                } else {
                    return 0;
                }
            })
        });
    }
    return incoming;
}

export default GetConversations;