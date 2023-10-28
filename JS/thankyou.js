
document.addEventListener("DOMContentLoaded", function() {
              var formData = sessionStorage.getItem("formData");
              var now = new Date();
              var formattedDate = now.toLocaleDateString("de-DE"); //aktuelles Datum für DE
              var formattedTime = now.toLocaleTimeString("de-DE", { hour12: false }); //Zeitformat auf 24h
              var dateTimeString = formattedDate + " " + formattedTime;

              if (formData) {
                formData = JSON.parse(formData); //Daten von JSON zu Variablen
                document.getElementById("childrenclothingSpan").textContent = formData.childrenclothing ? "Ja" : "-";//Daten aus Storage übernehmen. Falls leer wird Initialwert angezeigt
                document.getElementById("shoesSpan").textContent = formData.shoes ? "Ja" : "-";
                document.getElementById("bagsSpan").textContent = formData.bags ? "Ja" : "-";
                document.getElementById("firstname").textContent = formData.firstname || "Geschätsstelle"; 
                document.getElementById("lastname").textContent = formData.lastname || "Kleiderspenden25";
                document.getElementById("street").textContent = formData.street || "Mülheimer Str.";
                document.getElementById("number").textContent = formData.number || "38";
                document.getElementById("zipcode").textContent = formData.zipcode || "53604";
                document.getElementById("town").textContent = formData.town || "Bad Honnef";
                document.getElementById("land").textContent = formData.land;
                document.getElementById("DatumZeit").textContent = dateTimeString;
              }
              sessionStorage.removeItem("formData"); //Bereinigung Session Storage 

});