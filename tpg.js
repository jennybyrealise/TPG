let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        let data = JSON.parse(xhttp.responseText);
        let stops = data.stops;
        let liste = document.getElementById('liste');
        
        
        for (let stop of stops) {
            let stopCode = stop.stopCode;
            let stopsUl = document.createElement('ul');
            stopsUl.innerHTML = stop.stopName;
            liste.appendChild(stopsUl);
          
            //------------------------------------------------------------------------------------------
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    data = JSON.parse(xhttp.responseText); 
                    let departures = data.departures.slice(0,8);
                    for(depart of departures){
                        let departLi = document.createElement('li');
                        departLi.innerHTML = '<span>' +depart.waitingTime +'</span><span>' +depart.line.lineCode +'</span><span>' +depart.line.destinationCode +'</span>' ;
                        stopsUl.appendChild(departLi);           
                    }
                };

            }
            xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetNextDepartures?&key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b&stopCode=" + stopCode);
            xhttp.send();
        }
    }
};

function recherche(name) {
    xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetStops?stopName=" + name + "&key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b");
    xhttp.send();
}