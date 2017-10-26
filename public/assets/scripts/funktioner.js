
// Henter et parameter fra url i browseren 
const getUrlParameter = function (sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1));
    const sURLVariables = sPageURL.split('&');
    let sParameterName;
    for (let int = 0; int < sURLVariables.length; int = int + 1) {
        sParameterName = sURLVariables[int].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

// =================================================

var equalColumnsNy = function (classname) {
    // Finder alle elementer der har classen "sammeHojde" og lægger dem ned i et array
    var columns = document.getElementsByClassName(classname);

    // Angiver hvor mange elementer der har classen sammeHojde
    var length = columns.length;
    var height = 0;

    // Sætter alle højder til auto, for at tilpasse kolonnen til indholdet
    for (var i = 0; i < length; i++) {
        columns[i].style.height = "auto";
    }

    // Denne løkke finder ud af hvilken kolonne der er højest
    // Højden bliver gemt i variablen height (den største værdi bliver gemt)
    for (var i = 0; i < length; i++) {
        if (columns[i].clientHeight > height) {
            height = columns[i].clientHeight;
        }
    }

    // Sætter højden på alle kolonner og angiver i px
    for (var i = 0; i < length; i++) {
        columns[i].style.height = height + "px";
    }
}
