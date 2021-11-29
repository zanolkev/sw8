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
   
// Diese Funktion wird immer dann ausgeführt, wenn ein neues Event empfangen wird.
function updateVariables(data) {

   // zum test
   // document.getElementById("lastevent").innerHTML = JSON.stringify(data);
    
    if (data.eventName === "Temperature") {
        // Erhaltenen Wert in der Variable 'Temperature' speichern

 // zum test
// document.getElementById("lastevent").innerHTML = data.eventData;        
        var temp = Number(data.eventData);
       //console.log(temp);
       document.getElementById("Temperature-text").innerHTML = temp+ '°';  
      
        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (temp < 70) {
            color = "Green";
        } else {
            color = "Red";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + temp + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
        document.getElementById("Temperature-bar").style = colorStyle + widthStyle;
		
		// Text unterhalb des Balkens aktualisieren
        //document.getElementById("TemperatureAktuell").innerHTML = temp;
	}
	    
    if (data.eventName === "TemperatureHour") {
        // Erhaltenen Wert in der Variable 'Temperature' speichern

 // zum test
// document.getElementById("lastevent").innerHTML = data.eventData;        
        var tempHour = Number(data.eventData);
       test=tempHour;
      
       //console.log(temp);
       document.getElementById("Temperature-average-text").innerHTML = tempHour+ '°';  
      
        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (tempHour > 20) {
            color = "Green";
        } else {
            color = "Red";
        }
        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + tempHour + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
        document.getElementById("Temperature-average-bar").style = colorStyle + widthStyle;
	

        addData(test);}
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
function addData(test) {

						  

    // aktuelles Datum/Zeit
    var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    chartData.addRow([localTime, test]);

    // Chart neu rendern
    chart.draw(chartData, chartOptions);
}
