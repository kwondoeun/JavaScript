
var mainPopup = "mainPopup";
var subPopup = "subPopup";


function createCookie() {

    var date = new Date();
    date.setDate( date.getDate() + 1); 
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    var cookie = "";
    cookie += mainPopup + "=true;";
    cookie += " path=/;";
    cookie += " expires=" + date.toUTCString();

    document.cookie = cookie;
}

function getCookie(x) {

    var arr = document.cookie.split("; ");

    for(var i = 0; i < arr.length; i++) {
        if(arr[i].indexOf(x) != -1 ) {
            return true;
        }
    }

}