// Når sidens elementer (alt indhold) er loadet på siden
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        menu();
    });
    })();

// Funktion som henter data til visning i content
// Funktionen har en parameter - hvis tallet nul hentes alt indhold, og hvis større end nul hentes kun denne ene kategori
function menu() {
    let url = 'http://localhost:1337/kategorier'; // Henter indhold fra route/kategorier

    fetch(url)
        .then((response) => { // grib svarets indhold (body) og send det som et json objekt til næste .then()
            return response.json();
            // console.log("response = " + response);
        })
        .then((data) => { // lægger json objektet ind i data variablen
            //console.log("data =" + data);

            var menu_html_element = document.getElementById('min_menu');  // opretter en variabel som indeholder <ul id="min_menu">

            var html = "";  // opretter en variabel med innerHTML til <ul id="min_menu">. Starter med at rydde tagget for indhold
            
            
            // ======================================== innerHTML til <ul id="min_menu">
            // Starten af menuen - Indeholder statisk indhold, som eks. link til forsiden
            
            html += `
                <li><a href="index.html">Forside</a></li>
                    <li class="dropdown">
                        <a href="produkt.html" class="dropdown-toggle" data-toggle="dropdown">Produkter <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
            `;
            
            // ========================================
            // Dynamisk indhold - Henter alle Kategorier. 
            // Indsætter kategori.navn i link-teksten og linker til produktsiden, hvor alle produkter i én kategori vil blive vist afhængig af det valgte id..

            data.forEach(function (element) {
                html += ` 
                    <li><a href="produkt.html?kategori=${element.id}">${element.navn}</a></li>
                `;
            })



            // ========================================
            // Slutningen på menuen - statisk indhold, som består af link til kontakt-siden.

            html += `
                        </ul>
                    </li>
                <li><a href="kontakt.html">Kontakt</a></li>
            `;

            menu_html_element.innerHTML = html; // indsætter indholdet af variablen html i <ul id="min_menu"> vha innerHTML
        })
}
