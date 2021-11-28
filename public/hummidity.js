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


// Array, in dem alle empfangenen Hummidity-Werte gespeichert werden.
var allMeasurements = [];

// Maximaler Hummidity Level für die Berechnung des Prozentwerts und als maximaler Wert für das Chart.
// -- TODO Aufgabe 1 -- 
// Maximalwert anpassen
var maxLevel = 100;


   
// Diese Funktion wird immer dann ausgeführt, wenn ein neues Event empfangen wird.
function updateVariables(data) {

   // zum test
   // document.getElementById("lastevent").innerHTML = JSON.stringify(data);
    


    if (data.eventName === "Hummidity") {
        // Erhaltenen Wert in der Variable 'Hummidity' speichern

 // zum test
// document.getElementById("lastevent").innerHTML = data.eventData;        
        var hum = Number(data.eventData);
       //console.log(hum);
       document.getElementById("Hummidity-text").innerHTML = hum+ '%';  
      

        // Wert im Chart hinzufügen
        
        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
       allMeasurements.push(hum);

         //Hummidity aktuell

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (hum < 70) {
            color = "Green";
        } else {
            color = "Red";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + hum + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
        document.getElementById("Hummidity-bar").style = colorStyle + widthStyle;
		
		// Text unterhalb des Balkens aktualisieren
        //document.getElementById("HummidityAktuell").innerHTML = hum;
	}
	


    if (data.eventName === "HummidityHour") {
        // Erhaltenen Wert in der Variable 'Hummidity' speichern

 // zum test
// document.getElementById("lastevent").innerHTML = data.eventData;        
        var humAverageold = Number(data.eventData);
       //console.log(hum);
       document.getElementById("Hummidity-average-text").innerHTML = humAverageold+ '%';  
      

        // Wert im Chart hinzufügen
        
        // Wert am Ende des Arrays 'allMeasurements' hinzufügen
 

         //Hummidity aktuell

        // Farbe des Balkens abhängig von Level festlegen
        // Liste aller unterstützten Farben: https://www.w3schools.com/cssref/css_colors.asp
        // -- TODO Aufgabe 2 -- 
        // Weitere Farben abhängig vom Level
        if (humAverageold < 70) {
            color = "Green";
        } else {
            color = "Red";
        }

        // CSS Style für die Hintergrundfarbe des Balkens
        var colorStyle = "background-color: " + color + " !important;";

        // CSS Style für die Breite des Balkens in Prozent
        var widthStyle = "width: " + humAverageold + "%;";

        // Oben definierte Styles für Hintergrundfarbe und Breite des Balkens verwenden, um
        // den Progressbar im HTML-Dokument zu aktualisieren
		
        document.getElementById("Hummidity-average-bar").style = colorStyle + widthStyle;
		
		// Text unterhalb des Balkens aktualisieren
        //document.getElementById("HummidityAktuell").innerHTML = hum;

        // Wert im Chart hinzufügen
        addData(humAverageold);}
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
        title: 'Hummidity Level',
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
function addData(humAverageold) {
					  

    // aktuelles Datum/Zeit
    var date = new Date();
    // aktuelle Zeit in der Variable 'localTime' speichern
    var localTime = date.toLocaleTimeString();

    // neuen Wert zu den Chartdaten hinzufügen
    chartData.addRow([localTime, humAverageold]);

    // Chart neu rendern
    chart.draw(chartData, chartOptions);
}
