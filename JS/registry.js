document.addEventListener("DOMContentLoaded", function (){
    var uebergabeDropdown = document.getElementById("shopship");
    var childrenClothingCheckbox = document.getElementById("childrenclothing");
    var shoesCheckbox = document.getElementById("shoes");
    var bagsChekcbox = document.getElementById("bags");
    var ContainerShop = document.getElementById("ContainerShop")
    var ContainerShip = document.getElementById("ContainerShip")

    var submitButton = document.getElementById("submitButton");
    var firstnameInput = document.getElementById("firstname");
    var lastnameInput = document.getElementById("lastname");
    var streetInput = document.getElementById("street");
    var numberInput = document.getElementById("number");
    var zipcodeInput = document.getElementById("zipcode");
    var townInput = document.getElementById("town");
    var landDropdown = document.getElementById("land");
    var submitButton = document.getElementById("submitButton");
    var zipcodeErrorVisible = false;

    uebergabeDropdown.addEventListener("change", unhideAfterSelection);
    childrenClothingCheckbox.addEventListener("change", unhideAfterSelection);
    shoesCheckbox.addEventListener("change", unhideAfterSelection);
    bagsChekcbox.addEventListener("change", unhideAfterSelection);
    firstnameInput.addEventListener("input", unhideAfterSelection);
    lastnameInput.addEventListener("input", unhideAfterSelection);
    streetInput.addEventListener("input", unhideAfterSelection);
    numberInput.addEventListener("input", unhideAfterSelection);
    zipcodeInput.addEventListener("input", unhideAfterSelection);
    townInput.addEventListener("input", unhideAfterSelection);
    landDropdown.addEventListener("change", redirectionstothankyou)
    

    unhideAfterSelection();

    function unhideAfterSelection(){ //Einblenden von Elementen je Fall
        if (uebergabeDropdown.value === "nothing" || (uebergabeDropdown.value !== "shop" && uebergabeDropdown.value !== "ship")) { //Keine Auswahl
            ContainerShop.style.display = "none";
            ContainerShip.style.display = "none";
            submitButton.disable = true;
        } else if (uebergabeDropdown.value === "shop") { //Auswahl Abgabe im Shop
            ContainerShop.style.display = "block";
            ContainerShip.style.display = "none";

            if (childrenClothingCheckbox.checked || shoesCheckbox.checked || bagsChekcbox.checked) { //Checkboxprüfung für Abgabe im Shop
                submitButton.disabled = false;  //Absenden einblenden
            } else {
                submitButton.disabled = true;
                redirectionstothankyou(); //Daten speichern
            }  
        } else { //Auswahl Abholung durch Sammelfahrzeug
            ContainerShop.style.display = "block";
            ContainerShip.style.display = "block";

            if (firstnameInput.value.trim().length >= 2 && //Prüfung ob Feld mit zwei Zeichen befüllt
                lastnameInput.value.trim().length >= 2 && 
                streetInput.value.trim().length >= 2 && 
                numberInput.value.trim().length !== "" && //Prüfung ob Feld nicht leer
                zipcodeInput.value.trim().length == 5 && //Prüfung ob Feld mit fünf Zeichen befüllt
                townInput.value.trim().length >= 2 &&
                (childrenClothingCheckbox.checked || shoesCheckbox.checked || bagsChekcbox.checked) &&
                !zipcodeErrorVisible) { //Prüfung ob Postleitzahlfehlerflag nicht gesetzt
                    submitButton.disabled =false;
                } else {
                    submitButton.disabled = true;
                    redirectionstothankyou();
                }
        }

        zipcodeInput.addEventListener("input", zipcodemanipulation);
        zipcodemanipulation();
    }

    function zipcodemanipulation() {
        zipcodeInput.value = zipcodeInput.value.replace(/[^0-9]/g, ''); //nur Zahlen zulassen bei Postleitzahl
        
        if (zipcodeInput.value.substring(0, 2) === "53") { //Prüfung der ersten beiden Zeichen
            showError("zipcode", "Bitte bringe deine Kleiderspende zu unserem Shop. Deine Postleitzahl ist für eine Abholung durch das Sammelfahrzeug zu nah.");
        } else {
            hideError("zipcode");
        }

        function showError(element, message){
            var errorElement = document.getElementById(element + "Error");
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = "block"; //Fehlertext einblenden
                if (element === "zipcode") {
                    zipcodeErrorVisible = true;
                    zipcodeInput.value = zipcodeInput.value.slice(0, 2); //weitertippen bei Fehleranzeige unterbinden
                }
            }
        }

        function hideError(element) {
            var errorElement = document.getElementById(element + "Error");
            if (errorElement) {
                errorElement.style.display = "none";
                if (element === "zipcode") {
                    zipcodeErrorVisible = false; //Fehlertext ausblenden
                }
            }

            if (zipcodeInput.value.length >5) {
            zipcodeInput.value = zipcodeInput.value.slice(0, 5); //Postleitzahl auf fünf Zeichen begrenzen
            }
        }
    }

    function redirectionstothankyou() {
        

        submitButton.addEventListener("click", storeFormData);

        function storeFormData() {
            var formData ={
                childrenclothing: document.getElementById("childrenclothing").checked,
                shoes: document.getElementById("shoes").checked,
                bags: document.getElementById("bags").checked,
                firstname: document.getElementById("firstname").value,
                lastname: document.getElementById("lastname").value,
                street: document.getElementById("street").value,
                number: document.getElementById("number").value,
                zipcode: document.getElementById("zipcode").value,
                town: document.getElementById("town").value,
                land: document.getElementById("land").value  
            };
            
            sessionStorage.setItem("formData", JSON.stringify(formData)); //Daten von Variablen zu JSON; Session Storage befüllen
            window.location.href = "thankyou.html"; //Weiterleitung zur Abschlussseite
        }      
    }
    
  });  