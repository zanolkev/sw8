var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001



async function getResult() {

   

    var today = new Date().toISOString().slice(0, 10)
    const d = new Date();
    let hour = d.getHours()-1;
    // e.g. http://localhost:3001/MyDB/MotionDetected?timestamp=13:00
   var url = rootUrl + "/api/MyDB/TemperatureHour?timestamp="+ today; 

    var response = await axios.get(url);
    
    console.log(response.data[0].eventData)
    var result = Number(response.data[hour].eventData);
    
   document.getElementById("result").innerHTML = hour;
}



    