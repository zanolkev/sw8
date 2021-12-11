var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001



async function getResult() {

   

    var today = new Date().toISOString().slice(0, 10)
    const d = new Date();
    let hour = d.getHours()-1;
    // e.g. http://localhost:3001/MyDB/MotionDetected?timestamp=13:00
   var url = rootUrl + "/api/MyDB/TemperatureHour?timestamp=2021-12-11"; 

    var response = await axios.get(url);
   
    var result = String(response.data[0].timestamp);
    var result2 = result.substring(11, result.length-8);
    
   document.getElementById("result").innerHTML = result2;
}



    