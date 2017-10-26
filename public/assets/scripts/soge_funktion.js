// Når sidens elementer (alt indhold) er loadet på siden
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // console.log('Siden loadet');

        // Laver en reference til sogeknappen
        var sogeknap = document.getElementById("sogeknap");

        // Gør at browseren lytter på om der er blevet trykket på knappen
        sogeknap.addEventListener("click", function () {
            // console.log("søgeknap trykket");

         // Laver en reference til søgefeltet
            var sogefelt = document.getElementById("sogefelt");

            // Udskriver indholdet af søgefeltet
            // console.log(sogefelt.value);

            // Kopierer indholdet af søgefeltet til min egen variabel
            var sogetekst = sogefelt.value;
 
            // Sender brugeren til produkt_soeg.html med søgeteksten som url parameter
            window.location.href=`produkt_soeg.html?sogetekst=${sogetekst}`;
        });
    });
})();