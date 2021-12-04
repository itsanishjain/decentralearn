/* TODO: Add Moralis init code */

/* Moralis init code */
const serverUrl = "https://pwdgajlkixh3.usemoralis.com:2053/server";
const appId = "Gws8paRYa2auAnWgLoQYCcSbdOpugC3vbGsMdEWW";
Moralis.start({ serverUrl, appId });
console.log("Moralis initiated");

/* TODO: Add Moralis Authentication code */

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    console.log('USER IS HERE', user);
    if (!user) {
        user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
            .then(function (user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    console.log("logged in user:", user);
    const options = { address: "0x41de50BB1Bd1A0Fecc0f04a747c0e36D6AaBd9f3", chain: "mumbai" };
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    console.log(NFTs);
    parseMetadata(NFTs.result);

    document.getElementById("root").innerHTML = user.get("ethAddress");
}

function parseMetadata(results) {
    console.log(results);
    for (let i = 0; i < results.length; i++) {
        console.log(results[i])
        let parsedNFTsMetadata = JSON.parse(results[i].metadata);

        console.log(parsedNFTsMetadata);
        console.log(parsedNFTsMetadata);
        let img = new Image();
        img.src = parsedNFTsMetadata.image;
        img.width = "100";
        img.height = "100";

        console.log(img);

        img.onload = function () {
            console.log(img.width);
            console.log(img.height);
            let nftDiv = document.getElementById("image")
            // .src = img.src;
            nftDiv.appendChild(img);
        }
        console.log(img.src);


    }


}


async function logOut() {
    await Moralis.User.logOut();
    window.location.reload();
    console.log("logged out");
}

login()
document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;



function hexpadded(HexId) {
    let hexInt = parseInt(HexId).toString();
    let padded = ("0000000000000000000000000000000000000000000000000000000000000000" + hexInt).slice(-64)
    console.log(padded.toString().length);

}

// hexpadded(12)