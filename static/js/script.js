window.addEventListener("load" , () => {

    const submit    = document.querySelector("#submit");
    submit.addEventListener( "click", () => { send(); });

});

const send = () => {

    const form_elem     = "#form_area";
    const form          = document.querySelector(form_elem);

    const data      = new FormData( form );
    const url       = form.getAttribute("action");
    const method    = form.getAttribute("method");

    // formタグ内のデータを確認。
    for (let v of data ){ console.log(v); }

    const request   = new XMLHttpRequest();

    //送信先とメソッドの指定
    request.open(method,url);

    // formタグ内にcsrf_tokenが含まれているため不要。
    //console.log(csrftoken);
    //request.setRequestHeader("X-CSRFToken", csrftoken);

    //送信(内容)
    request.send(data);

    //成功時の処理
    request.onreadystatechange = () => {
        if( request.readyState === 4 && request.status === 200 ) {
            json    = JSON.parse(request.responseText);

            //投稿内容の描画
            const content_area      = document.querySelector("#content_area");
            content_area.innerHTML  = json["content"];

        }
    }




}


