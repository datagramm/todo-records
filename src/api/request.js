import $ from 'jquery'


export const request = async (url, method, data = null) => {
    try {
        const productionURL = process.env.VUE_APP_PRODUCTION_URL

        $.ajaxSetup({
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
        });
        if (data && method === 'POST')  return  await  $.post(`${productionURL}${url}`, data)
        if (data === null && method === 'GET') return  await $.get(`${productionURL}${url}`)

    }
    catch (err){
        console.log(err)
    }


}