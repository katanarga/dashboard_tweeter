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
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json");
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
    let url = "http://localhost:8000/?text="+paramString;
    let res = await Tweets.ajax("GET", url);
    return JSON.parse(res);
}

Tweets.search = async function (str) {
    let res = Tweets.query(str);
    return res;
}

Tweets.query_name = async function (params) {
    let paramString = "";
    for (let p in params) {
        if (params.hasOwnProperty (p)) {
            paramString += encodeURIComponent(params[p]);
        };
    };
    let url = "http://localhost:8000/?name="+paramString;
    let res = await Tweets.ajax("GET", url);
    return JSON.parse(res);
}

Tweets.search_name = async function (str) {
    let res = Tweets.query_name(str);
    console.log(res)
    return res;
}