var checker = true;

/* ------------------------- Formular validering ------------------------- */
function formular(form) {
    checker = true;
    "use strict";
    if (form.fornavn.value.length === 0) {
        document.getElementById("fornavnHelp").innerHTML = "Udfyld dit fornavn";
        form.fornavn.focus(); //sætter markøren i det valgte felt
        checker = false;
        return false;
    } else {
        document.getElementById("fornavnHelp").innerHTML = "";
    }

    if (form.efternavn.value.length === 0) {
        document.getElementById("efternavnHelp").innerHTML = "Udfyld dit efternavn";
        form.efternavn.focus();
        checker = false;
        return false;

    } else {
        document.getElementById("efternavnHelp").innerHTML = "";
    }

    if (form.telefon.value.length === 0) {
        document.getElementById("telefonHelp").innerHTML = "Udfyld dit telefon nummer";
        form.telefon.focus();
        checker = false;
        return false;
    }
    else if (isNaN(form.telefon.value)) {
        document.getElementById("telefonHelp").innerHTML = "Dette er ikke et nummer - prøv igen";
        form.telefon.focus();
        checker = false;
        return false;
    }
    else if (form.telefon.value.length !== 8) {
        document.getElementById("telefonHelp").innerHTML = "Husk otte cifre";
        form.telefon.focus();
        checker = false;
        return false;
    } else {
        document.getElementById("telefonHelp").innerHTML = "";
    }

    if (form.mail.value.length === 0) {
        document.getElementById("emailHelp").innerHTML = "Udfyld din email adresse";
        form.mail.focus();
        checker = false;
        return false;
    } else {
        document.getElementById("emailHelp").innerHTML = "";
    }

    if (form.emne.value.length === 0) {
        document.getElementById("emneHelp").innerHTML = "Udfyld emne feltet";
        form.emne.focus();
        checker = false;
        return false;
    } else {
        document.getElementById("emneHelp").innerHTML = "";
    }

    if (form.besked.value.length === 0) {
        document.getElementById("beskedHelp").innerHTML = "Udfyld besked feltet";
        form.besked.focus();
        checker = false;
        return false;
    } else {
        document.getElementById("beskedHelp").innerHTML = "";
    }

    function checkEmail(mail) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail)) {
            document.getElementById("emailHelp").innerHTML = "Dette er ikke en email adresse - prøv igen";
            form.mail.focus();
            return true;
        } else {
            document.getElementById("emailHelp").innerHTML = "";
        }
        checker = false;
        return false;
    }
    return false;
}

/* ------------------------- Kontakt route - sender data afsted ------------------------- */
document.querySelector('#submitKnap').addEventListener('click', (event) => {
    var f = document.getElementById("formId");
    formular(f);
    if (checker) {
        console.log('event ok');
        event.preventDefault();
        let fornavn = document.querySelector('#forNavn').value;
        let efternavn = document.querySelector('#efterNavn').value;
        let telefon = document.querySelector('#telefonNummer').value;
        let mail = document.querySelector('#eMail').value;
        let emne = document.querySelector('#emne').value;
        let besked = document.querySelector('#besked').value;

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let init = {
            method: 'POST',
            headers: headers,
            body: `{
                 "fornavn":"${fornavn}",
                 "efternavn":"${efternavn}",
                 "telefon":"${telefon}",
                 "mail":"${mail}",
                 "emne":"${emne}",
                 "besked":"${besked}" 
             }`,
            cache: 'no-cache',
            mode: 'cors'
        };

        let request = new Request('http://localhost:1337/create', init);

        fetch(request)
            .then(response => {
                return response.json();
            })
            .then(sucessStastus => {
                document.querySelector('#formBesked').innerHTML = "<h2>Din besked er nu blevet sendt - du vil snart høre fra os.</h2>";
                f.fornavn.value = "";
                f.efternavn.value = "";
                f.telefon.value = "";
                f.mail.value = "";
                f.emne.value = "";
                f.besked.value = "";
            })
            .catch(err => {
                console.log(err)
            });
    }


});
