/* TODO: Add Moralis init code */

/* Moralis init code */
const serverUrl = "https://zpoco9zecvth.usemoralis.com:2053/server";
const appId = "Ln95OTXfWjIYSCFyPd9hXlzJsKUP6H5GnhTBiCHa";
Moralis.start({ serverUrl, appId });
console.log("Moralis initiated");

/* TODO: Add Moralis Authentication code */

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
            .then(function (user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
            })
            .catch(function (error) {
                console(error);
            });
    }
    console.log("logged in user:", user);
    // set user to div with id root
    document.getElementById("root").innerHTML = user.get("ethAddress");
}
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}
document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
