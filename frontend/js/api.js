const API = "http://127.0.0.1:8000";

async function get(url){

    const response = await fetch(API + url);

    return await response.json();

}

async function post(url,data){

    const response = await fetch(

        API + url,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(data)

        }

    );

    return await response.json();

}

async function put(url,data){

    const response = await fetch(

        API + url,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(data)

        }

    );

    return await response.json();

}