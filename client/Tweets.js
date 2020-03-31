var Tweets = {};

Tweets.ajax = function (method, url) {

    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange",  function () {
            /* quand la requête change à l'état 'terminé' */
            if (this.readyState == 4) {
                if (this.status == 200)
                    resolve(this.responseText);
                else
                    reject(this.status + " : " + this.responseText);
            }
        });

        /* on commence la requête HTTP */
        xhr.open(method, url);
        /* on définit quelques en-têtes */
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8"); // type de retour
        xhr.setRequestHeader( 'Api-User-Agent', 'M1Info/1.0' ); //spécifique à Wikimedia

        /* on envoie la requête */
        xhr.send();
    })
};

Tweets.query = async function (params) {
    let paramString = "";
    for (let p in params) {
        if (params.hasOwnProperty (p)) {
            paramString += encodeURIComponent(params[p]);
        };
    };
    let url = "/search?text="+paramString;
    console.log("url:",url);
    let res = await Tweets.ajax("GET", url);
    return JSON.parse(res);
}

Tweets.search = async function (str) {
    console.log("Tweets.search",str);
    let res = Tweets.query(str);
    console.log(res)
    return res;
}