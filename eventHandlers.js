const logger = require('./db/logger.js');

exports.sendEvent = null;

exports.registerEventHandlers = function (source) {
    source.addEventListener('Temperature', handleTemperature);
    source.addEventListener('TemperatureHour', handleTemperatureHour);
    source.addEventListener('Hummidity', handleHummidity);
    source.addEventListener('HummidityHour', handleHummidityHour);
    source.addEventListener('RisikoTyp', handleRisikoTyp);
    // Register more event handlers here
}

function handleRisikoTyp(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        
        logger.logOne("MyDB", "RisikoTyp", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}




function handleTemperature(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        
        logger.logOne("MyDB", "Temperature", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleTemperatureHour(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        
        logger.logOne("MyDB", "TemperatureHour", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}

function handleHummidity(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        
        logger.logOne("MyDB", "Hummidity", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }
}
function handleHummidityHour(event) {
    // read variables from the event
    var data = {
        eventName: event.type,
        eventData: JSON.parse(event.data).data, // the value of the event
        deviceId: JSON.parse(event.data).coreid,
        timestamp: JSON.parse(event.data).published_at
    };

    //var datetime = new Date(data.timestamp); // convert the timestamp to a Date object

    try {        
        // you can add more properties to your data object
        data.myMessage = "Hello World";

        // TODO: do something meaningful with the data

        // Log the event in the database
        
        logger.logOne("MyDB", "HummidityHour", data);

        // send data to all connected clients
        exports.sendEvent(data);
    } catch (error) {
        console.log("Could not handle event: " + JSON.stringify(event) + "\n");
        console.log(error)
    }


}
