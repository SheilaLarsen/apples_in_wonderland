
// Når sidens elementer (alt indhold) er loadet på siden
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // console.log('Siden loadet');

        var kategoriId = getUrlParameter("kategori"); // henter url fra kategori-routet og sætter ind i variablen kategoriId
        // console.log(kategoriId);
        if (kategoriId !== undefined) {
            hentProduktKategori(kategoriId); // Henter alle produkter i en kategori
        }

        var produktId = getUrlParameter("produkt"); // henter url fra produkt/:id-routet og sætter ind i variablen id
        // console.log(id);
        if (produktId !== undefined) {
            etProdukt(produktId);
        }
    });
})();


// Funktion som henter data til visning i content
// Funktionen viser alle produkter i en valgt kategori
function hentProduktKategori(kategoriId) {
    var url = 'http://localhost:1337/produkt/kategori/' +  kategoriId;
   
    fetch(url)
        .then((response) => {
            // grib svarets indhold (body) og send det som et json objekt til næste .then()
            return response.json();
        })
        .then((data) => {
            // nu er json objektet lagt ind i data variablen, udskriv data
            // console.log("data: ", data);
            var maa_udskrive_kategori = true; // overskrives i løkken senere

            var indhold_html = document.getElementById('content');

            // Tager fat på html tagget og rydder det for indhold
            indhold_html.innerHTML = "";

            data.forEach(function (element) {
                if (maa_udskrive_kategori == true) {
                    indhold_html.innerHTML += `
                        <h1>${element.kategori_navn}</h1>
                        <p>Se de forskellige ${element.kategori_navn} i listen herunder.</p>
                    `;
                    maa_udskrive_kategori = false;
                }

                indhold_html.innerHTML += `
            <article class="col-md-4 sammeHojde">
                <img class="img-responsive space-between" src="./assets/images/${element.produkt_billede}"  title="" alt="">
                <div class="col-md-12">
                    <div class="col-md-12">
                        <h3>${element.produkt_navn}</h3>
                        <p>${element.produkt_tekst}.   ${element.produkt_pris} Kr.</p>
                    </div>
                    <p><a href="produkt.html?produkt=${element.produkt_id}" id="enkeltProdukt" class="btn btn-default btn-lg" alt=""
                    title="" role="button">Se mere</a></p>
                </div>
            </article>
            `;
            })

            setTimeout(function () {
                equalColumnsNy("sammeHojde");
                window.addEventListener("resize", function () { equalColumnsNy("sammeHojde") }, true);
                
            }, 50); // hvad gør denne linje kode - sammeHojde slog først igennem, da denne blev tilføjet...

        })
};

function etProdukt(produktId) {
    if (produktId > 0) {
        var url = 'http://localhost:1337/produkt';
        url += "/" + produktId;
    }
    fetch(url)
        .then((response) => { // grib svarets indhold (body) og send det som et json objekt til næste .then()
            return response.json();
            // console.log("response = " + response);
        })
        .then((data) => { // lægger json objektet ind i data variablen
            //console.log("data =" + data);
            var indhold_html = document.getElementById('content');  // opretter en variabel som indeholder <div id="content">
            var html = "";  // opretter en variabel med innerHTML til <div id="content">. Starter med at rydde tagget for indhold


            // ======================================== innerHTML til <div id="content">
            data.forEach(function (element) {
                html += `
                <div class="row space-between">
                    <div class="col-md-12">
                        <h1>${element.kategori_navn}</h1>
                    </div>
                </div>

                <div class="row space-between">
                    <div class="col-md-6">
                        <image class="img-responsive" src="./assets/images/${element.produkt_billede}" title="" alt="">
                    </div>
                    <div class="col-md-6">
                        <h1>${element.produkt_navn}</h1>
                        <p>${element.produkt_tekst}</p>
                        <div class="col-xs-6">
                            <h2>DKK ${element.produkt_pris}</h2>
                        </div>
                        <div class="col-xs-6">
                            <p><a href="#" class="btn btn-default btn-lg" alt="Put i kurv" title="Put i kurv" role="button">Køb</a></p>
                        </div>
                    </div>
                </div>
                `;
            }, this);
            indhold_html.innerHTML = html; // indsætter indholdet af variablen html i <div id="content"> vha innerHTML
        })
}