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


// -- TODO Aufgabe 1 -- 
// Maximalwert anpassen
var maxLevel = 100;
var HumHour;
   
async function getHum() {

       var today = new Date().toISOString().slice(0, 10)
       const d = new Date();
       let hour = d.getHours()-1;
        // e.g. http://localhost:3001/MyDB/MotionDetected?timestamp=13:00
       var url = rootUrl + "/api/MyDB/HummidityHour?timestamp="+ today; 
    
        var response = await axios.get(url);
        //console.log(response.data[0].eventData)
        var result = Number(response.data[hour].eventData);
        //var timestamp= String(response.data[hour].timestamp);
        //var result2 = timestamp.substring(11, timestamp.length-5);
        
       //auskomentiert zum testn
      document.getElementById("Hummidity-average-text").innerHTML = result + "% ";  
      
        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
      if (result > 70) {
          color = "Green";
       } else {
          color = "Red";
      }
        // CSS Style für die Hintergrundfarbe des Balkens
      var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
      var widthStyle = "width: " + result + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
      document.getElementById("Hummidity-average-bar").style = colorStyle + widthStyle;
      var i=0;
      do {

        var date = new Date();
      
        
        i += 1;
        var x=Number(response.data[i].eventData);
        var timestamp= String(response.data[i].timestamp);
        var result2 = timestamp.substring(11, timestamp.length-8);
        addData(x,result2);
      } while (i < hour+1);

        
    }

    async function getHumMinute() {
      // request the variable "HummidityDay"
      var response = await axios.get(rootUrl + "/api/device/0/variable/HummidityMinute");
      var HumMinute = response.data.result;

  
      // update the html element
      document.getElementById("Hummidity-text").innerHTML = HumMinute;
  
   // Farbe des Balkens abhängig von Level festlegen
          // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
          // -- TODO Aufgabe 2 -- 
          // Weitere Farben abhängig vom Level
          if (HumMinute > 20) {
              color = "Green";
          } else {
              color = "Red";
          }
          // CSS Style für die Hintergrundfarbe des Balkens
          var colorStyle = "background-color: " + color + " !important;";
  
          // CSS Style für die Breite des Balkens in Prozent
          var widthStyle = "width: " + HumMinute + "%;";
  
          // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
          // den Progressbar im HTML-Dokument zu aktualisieren
      
          document.getElementById("Hummidity-bar").style = colorStyle + widthStyle;
  
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
    chartData = google.visualization.arrayToDataTable([['Zeit', 'Feuchtigkeit'], ["", 0]]);
    // Chart Options festlegen
    chartOptions = {
        title: 'Feuchtigkeit Level',
        hAxis: { title: 'Zeit' },
        vAxis: { title: 'Feuchtigkeit' },
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
    chart = new google.visualization.LineChart(document.getElementById('Hummidity-chart'));
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

