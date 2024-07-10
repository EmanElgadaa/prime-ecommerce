
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to save language in local storage
function saveToLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

// Function to get language from local storage
function getFromLocalStorage(name,defaultValue) {
    return localStorage.getItem(name) || defaultValue;
}

var apiUrl ='http://localhost/CRM/api'
var imageUrl ='http://localhost/Site2/Content/'
function AjaxCall(url, method, data, onSuccess, onError) {

    if (selectedLang === "")
        checkLanguage();

    $.ajax(
        apiUrl + '/' + url,
        {
            type: method, // http method
            data: data, // data to submit
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                //'Authorization': "Bearer " + apiKey,
                'userLang': selectedLang=="en"?1:2,
                'Platform': "Web ",
            },

            success: onSuccess,
            error: onError
        });
}

function Download(id, CallBack) {
    AjaxCall('FileManager/Download/' + id, 'GET', null,
        function (data) {
            if (data.Sucessed)
                CallBack(data.Data.ContentBase64)
        },
        null);
}