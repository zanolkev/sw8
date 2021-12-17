var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();




// Maximaler Hummidity Level für die Berechnung des Prozentwerts und als maximaler Wert für das Chart.
// -- TODO Aufgabe 1 -- 
// Maximalwert anpassen
var maxLevel = 100;
  
   async function getRisikoTyp() {
    // request the variable "RsikoTyp"
    var response = await axios.get(rootUrl + "/api/device/0/variable/RisikoTyp");
    var risiko = response.data.result;
        if (risiko =1){
        //console.log(temp);
        var text = 'Das Schimmelrisiko ist hoch. Die Feuchtigkeit liegt über 70%';  
        var text2 = 'Ich empfehle dir ein Entfeuchtungsgerät einzusetzen um die Feuchtigkeit in ein angemesser Bereich zu halten';     
 
       }
       if (risiko =2){
        //console.log(temp);
        var text = 'Das Schimmelrisiko ist hoch. Die Feuchtigkeit liegt über 30% und die Raumtemperatur unter 12°';  
        var text2 = 'Erhöhe die Heizleistung. Die Raumtemperatur sollte mindestens 20° betragen';      
    }
       if (risiko =3){
        //console.log(temp);
        var text = 'Das Schimmelrisiko ist hoch. Die Feuchtigkeit liegt über 40% und die Raumtemperatur unter 17°';  
        var text2 = 'Erhöhe die Heizleistung. Die Raumtemperatur sollte mindestens 20° betragen';       
    }
       if (risiko =4){
        //console.log(temp);
        var text = 'Das Schimmelrisiko ist hoch. Die Feuchtigkeit liegt über 50% und die Raumtemperatur unter 20°';  
        var text2 = 'Erhöhe die Heizleistung. Falls dies nocht möglich ist der Einsatz eines Entfeuchtungsgerät sinnvoll.';     
    }
       if (risiko =5){
        //console.log(temp);
        var text2 = 'Die Werte sind im grünen Bereich. Es ist keine Handlung notwendig';  
      
        var text = 'Das Schimmelrisiko ist tief. Die Feuchtigkeit liegt unter 70% und die Raumtemperatur in einem angemessenen Bereich';  
       }

      document.getElementById("Risiko-text").innerHTML = text;
      document.getElementById("Empfehlung-text").innerHTML = text2;
           }
   
      
 
 async function getHumDay() {
    // request the variable "HummidityDay"
    var response = await axios.get(rootUrl + "/api/device/0/variable/HummidityDay");
    var HumDay = response.data.result;
   

    // update the html element
    document.getElementById("HummidityDay").innerHTML = HumDay+"%";

 // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (HumDay < 70) {
            color = "Green";
        } else {
            color = "Red";
        }
        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + HumDay + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
        document.getElementById("Hummidity-average-bar").style = colorStyle + widthStyle;

}
   
async function getTempDay() {
    // request the variable "HummidityDay"
    var response = await axios.get(rootUrl + "/api/device/0/variable/TemperatureDay");
    var TempDay = response.data.result;
    console.log(TempDay);

    // update the html element
    document.getElementById("TemperatureDay").innerHTML = TempDay+"°";

 // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (TempDay > 19) {
            color = "Green";
        } else {
            color = "Red";
        }
        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + TempDay + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
        document.getElementById("Temperature-average-bar").style = colorStyle + widthStyle;

}
   
        


