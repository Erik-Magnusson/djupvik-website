
import { getResults } from "/assets/js/fetchData.js";

const WEATHER = document.querySelector('#weather');

initWeather();

async function initWeather() {

    let data = await getResults();

    let now = new Date();
    let year = now.getFullYear();
    let month = ('0'+(now.getMonth()+1)).slice(-2);
    let today = now.getDate();
    let tomorrow = now.getDate()+1;

    var dateToday = year + "-" + month + "-" + today;
    var dateTomorrow = year + "-" + month + "-" + tomorrow;

    var title1 = document.createElement('h3');
    var title2 = document.createElement('h3');

    title1.innerText = 'Idag';
    title2.innerText = 'Imorgon';

    WEATHER.appendChild(title1);
    makeTable(data, dateToday);
    WEATHER.appendChild(title2);
    makeTable(data, dateTomorrow);

}

function createTopRow(table) {
    let topRow = document.createElement('tr');
    let kl = document.createElement('th');
    let t = document.createElement('th');
    let w = document.createElement('th');
    let s = document.createElement('th');

    kl.innerText = 'kl.';
    t.innerText = 'Temp (C)';
    w.innerText = "Vind (m/s)";
    s.innerText = 'Himmel';

    topRow.appendChild(kl);
    topRow.appendChild(t);
    topRow.appendChild(w);
    topRow.appendChild(s);

    table.appendChild(topRow)
}

function makeTable(data, date) {

    let time06 = date + "T06:00:00Z";
    let time12 = date + "T12:00:00Z";
    let time18 = date + "T18:00:00Z";
    
    let table = document.createElement('table');

    createTopRow(table);
    makeRow(data, time06, table);
    makeRow(data, time12, table);
    makeRow(data, time18, table);

    WEATHER.appendChild(table);
}

function makeRow(data, time, table) {
    
    let row = document.createElement('tr');

    let timeStamp = document.createElement('td');
    timeStamp.innerText = time.slice(11,13);

    let temp = getTemp(data, time);
    let wind = getWind(data, time);
    let cloud = getCloudCover(data, time);

    row.appendChild(timeStamp);
    row.appendChild(temp);
    row.appendChild(wind);
    row.appendChild(cloud);

    table.appendChild(row);
}

function getTemp(data, time) {
    var i;
    var j;
    let temp = document.createElement('td');
    for (i = 0; i < data.timeSeries.length; i++) {
        if (data.timeSeries[i].validTime == time) {
            for (j = 0; j < data.timeSeries[i].parameters.length; j++) {
                if (data.timeSeries[i].parameters[j].name== "t") {
                    temp.innerText = data.timeSeries[i].parameters[j].values;
                }
            }        
        }
    }
    return temp;
}

function getWind(data, time) {
    var i;
    var j;
    let wind = document.createElement('td');
    let windDir = getWindDir(data, time);
    for (i = 0; i < data.timeSeries.length; i++) {
        if (data.timeSeries[i].validTime == time) {
            for (j = 0; j < data.timeSeries[i].parameters.length; j++) {
                if (data.timeSeries[i].parameters[j].name == "ws") {
                    wind.innerText = windDir + ' (' + data.timeSeries[i].parameters[j].values + ')';
                }
            }        
        }
    }
    return wind;
}

function getWindDir(data, time) {
    var i;
    var j;
    var windDir = 0;
    for (i = 0; i < data.timeSeries.length; i++) {
        if (data.timeSeries[i].validTime == time) {
            for (j = 0; j < data.timeSeries[i].parameters.length; j++) {
                if (data.timeSeries[i].parameters[j].name == "wd") {
                    windDir = data.timeSeries[i].parameters[j].values;
                }
            }        
        }
    }
    return degreesToString(windDir);
}


function getCloudCover(data, time) {
    var i;
    var j;
    let cloudCover = document.createElement('td');
    for (i = 0; i < data.timeSeries.length; i++) {
        if (data.timeSeries[i].validTime == time) {
            for (j = 0; j < data.timeSeries[i].parameters.length; j++) {
                if (data.timeSeries[i].parameters[j].name == "Wsymb2") {
                    cloudCover.innerText = ccToString(data.timeSeries[i].parameters[j].values);
                }
            }        
        }
    }
    return cloudCover;
}

function degreesToString(degree) {

    if (degree >= 0 && degree < 22.5) {
        return 'N';
    }
    else if (degree >= 22.5 && degree < 67.5) {
        return 'N/Ö';
    }
    else if (degree >= 67.5 && degree < 112.5) {
        return 'Ö';
    }
    else if (degree >= 112.5 && degree < 157.5) {
        return 'S/Ö';
    }
    else if (degree >= 157.5 && degree < 202.5 ) {
        return 'S';
    }
    else if (degree >= 202.5 && degree < 247.5 ) {
        return 'S/V';
    }
    else if (degree >= 247.5 && degree < 292.5  ) {
        return 'V';
    }
    else if (degree >= 292.5 && degree < 337.5  ) {
        return 'N/V';
    }
    else if (degree >= 337.5) {
        return 'N';
    }

}

function ccToString(cloudCover) {

    var cc = {1:'Klart', 2: 'Lätt molnighet', 3:'Halvklart', 4: 'Molnighet', 5: 'Mycket moln'};
    if (cloudCover > 5) cloudCover = 5;

    return cc[cloudCover];
}



