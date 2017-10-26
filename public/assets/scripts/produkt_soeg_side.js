
// Når sidens elementer (alt indhold) er loadet på siden
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // console.log('Siden loadet');

        var sogetekst = getUrlParameter("sogetekst"); // henter url fra kategori-routet og sætter ind i variablen sogetekst
        // console.log(sogetekst);
        if (sogetekst !== undefined) {
            sogProdukter(sogetekst); // Henter alle produkter i en kategori
        }
    });
})();


// Funktion som henter data til visning i content
// Funktionen viser alle produkter i en valgt kategori
function sogProdukter(sogetekst) {


    var url = `http://localhost:1337/produkt/find/${sogetekst}`;

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