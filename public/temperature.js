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

// Maximaler Temperature Level für die Berechnung des Prozentwerts und als maximaler Wert für das Chart.
// -- TODO Aufgabe 1 -- 
// Maximalwert anpassen
var maxLevel = 100;
var tempHour;
   
async function getTemp() {
      //DB Request
      var today = new Date().toISOString().slice(0, 10)
      const d = new Date();
      let hour = d.getHours()-1;
      // e.g. http://localhost:3001/MyDB/MotionDetected?timestamp=13:00
      var url = rootUrl + "/api/MyDB/TemperatureHour?timestamp="+ today; 
      var response = await axios.get(url);
      var result = Number(response.data[0].eventData);

      //API Particle Request für text  
     var response2 = await axios.get(rootUrl + "/api/device/0/variable/TemperatureHour");
      var TempHour = response2.data.result;

       //auskomentiert zum testn
      document.getElementById("Temperature-average-text").innerHTML = TempHour + "°   ";  
      
        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
      if (TempHour > 20) {
          color = "Green";
       } else {
          color = "Red";
      }

        // CSS Style für die Hintergrundfarbe des Balkens
      var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
      var widthStyle = "width: " + TempHour + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
      document.getElementById("Temperature-average-bar").style = colorStyle + widthStyle;
      //Fill Chart with data
      var i=0;   
      do {  
        var x=Number(response.data[i].eventData);
        var timestamp= String(response.data[i].timestamp);
        var result2 = timestamp.substring(11, timestamp.length-8);
        addData(x,result2);
        i += 1;
      } while (i < hour+1);

        
    }

    async function getTempMinute() {
      // request the variable "HummidityDay"
      var response = await axios.get(rootUrl + "/api/device/0/variable/TemperatureMinute");
      var TempMinute = response.data.result;

  
      // update the html element
      document.getElementById("Temperature-text").innerHTML = TempMinute;
  
   // Farbe des Balkens abhängig von Level festlegen
          // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
          
          // Weitere Farben abhängig vom Level
          if (TempMinute > 20) {
              color = "Green";
          } else {
              color = "Red";
          }
          // CSS Style für die Hintergrundfarbe des Balkens
          var colorStyle = "background-color: " + color + " !important;";
  
          // CSS Style für die Breite des Balkens in Prozent
          var widthStyle = "width: " + TempMinute + "%;";
  
          // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
          // den Progressbar im HTML-Dokument zu aktualisieren
      
          document.getElementById("Temperature-bar").style = colorStyle + widthStyle;
  
  }


//////////////////////////////////
/////   Code für den Chart   /////
//////////////////////////////////

// Line Chart Dokumentation: https://developers.google.com/chart/interactive/docs/gallery/linechart

// Chart und Variablen 
var chartData, chartOptions, chart;
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

// Chart initialisieren. Diese Funktion wird einmalig aufgerufen, wenn die Page geladen wurde.
function drawChart() {
    // Daten mit dem Dummy-Wert ["", 0] initialisieren. 
    // (Dieser Dummy-Wert ist nötig, damit wir das Chart schon anzeigen können, bevor 
    // wir Daten erhalten. Es können keine Charts ohne Daten gezeichnet werden.)
    chartData = google.visualization.arrayToDataTable([['Zeit', 'Temperatur'], ["", 0]]);
    // Chart Options festlegen
    chartOptions = {
        title: 'Temperature Level',
        hAxis: { title: 'Zeit' },
        vAxis: { title: 'Temperatur' },
        animation: {
            duration: 300, // Dauer der Animation in Millisekunden
            easing: 'out',
        },
        curveType: 'function', // Werte als Kurve darstellen (statt mit Strichen verbundene Punkte)
        legend: 'none',
        vAxis: {
            // Range der vertikalen Achse
            viewWindow: {
                min: 0,
                max: maxLevel
            },
        }
    };
    // LineChart initialisieren
    chart = new google.visualization.LineChart(document.getElementById('Temperature-chart'));
    chartData.removeRow(0); // Workaround: ersten (Dummy-)Wert löschen, bevor das Chart zum ersten mal gezeichnet wird.
    chart.draw(chartData, chartOptions); // Chart zeichnen
    
}

// Eine neuen Wert ins Chart hinzufügen
function addData(test,timenew) {

						  

    // aktuelles Datum/Zeit
    var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
        chartData.addRow([timenew, test]);

    // Chart neu rendern
    chart.draw(chartData, chartOptions);
}

