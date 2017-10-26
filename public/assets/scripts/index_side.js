// Når sidens elementer (alt indhold) er loadet på siden, kør funktionen forside
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        forside();
    });
})();

/* Funktion som henter data til visning i <div id="content">
   Funktionen har et parameter - hvis tallet nul hentes alt indhold, og hvis større end nul hentes kun denne ene kategori */
function forside() {
    var url = 'http://localhost:1337/produkt/forside'; // Henter indhold fra route/produkt/forside

    fetch(url)
        .then((response) => { // grib svarets indhold (body) og send det som et json objekt til næste .then()
            //console.log("response = " + url);
            return response.json();
             //console.log("response = " + response);
        })
        .then((data) => { // lægger json objektet ind i data variablen
            // console.log("data: ", data);

            var forside_html_element = document.getElementById('content'); // opretter en variabel som indeholder <div id="content">
            
            var html = ""; // opretter en variabel med innerHTML til <div id="content">. Starter med at rydde tagget for indhold

            // ======================================== innerHTML til div id="content"
            // Velkomst i toppen af siden

            html += ` 
                <div class="row space-between">
                    <div class="col-md-6">
                        <image class="img-responsive space-between" src="./assets/images/forside-banner.jpg" title="" alt="">
                    </div>
                    <div class="col-md-6">
                        <h1>Livet er for kort til dårligt grej</h1>
                        <p>Her hos HI FI Shoppen finder du de sidste nye produkter inden for billede og lyd. Alle produkter er af den
                            bedste kvalitet og nøje udvalgt blandt de bedste producenter på markedet.</p>
                        <p>Vi går ikke på kompromis med lyden og et af vores mål er at samle de bedste produkter og sætte dem til en
                            pris, som er til at betale, for dig - som forbruger. For vi mener nemlig at godt grej er en hver mands
                            ret.</p>
                        <p>Vi udvider løbende vores sortiment. Hvis du syntes der mangler noget, skal du være velkommen til at kontakte
                            os her på siden eller komme ned i butikken til en snak over en kop kaffe.</p>
                        <p><a href="kontakt.html" class="btn btn-default btn-lg" alt="Link til kontaktsiden" title="Gå til kontaktsiden"
                                role="button">Kontakt</a></p>
                    </div>
                </div>
            `;

            // ========================================
            // Seneste 3 produkter - Henter de sidste 3 produkter fra route/produkt

            // Først statisk indhold
            html += ` 
                <div class="col-md-12 space-between">
                    <h1>Seneste produkter</h1>
                </div>
            `;

            // Dernæst dynamisk, som hentes med forEach
            data.forEach(function (element) {
                html += ` 
                <article class="col-md-4 sammeHojde">
                     <image class="img-responsive space-between" src="./assets/images/${element.produkt_billede}" title="" alt="">
                    <div class="col-md-12">
                        <div class="col-md-12">
                            <h3>${element.produkt_navn}</h3>
                            <p>${element.produkt_tekst} DKK: ${element.produkt_pris}</p>
                        </div>
                        <p><a href="produkt.html?produkt=${element.produkt_id}" class="btn btn-default btn-lg" alt="" title="" role="button">Se mere</a></p>
                    </div>
                </article>
            `;
            })

            forside_html_element.innerHTML = html; // indsætter indholdet af variablen html i <div id="content"> vha innerHTML
            // For at funktionen equalColumns kan bruges, er indholdet nødt til at være på siden først. 
            // Derfor sættes en forsinkelse (vha. setTimeout) på denne funktion, så indholdet er til stede, når funktionen kaldes.

            setTimeout(function () {
                equalColumnsNy("sammeHojde");
                window.addEventListener("resize", function () { equalColumnsNy("sammeHojde") }, true);
                
            }, 50); // hvad gør denne linje kode - sammeHojde slog først igennem, da denne blev tilføjet...




        })
}