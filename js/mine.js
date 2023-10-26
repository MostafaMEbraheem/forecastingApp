async function search(city) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    console.log(t);
    if (t.ok == true && t.status == 200) {
        let a = await t.json();
        console.log(a);
        displaycurrent(a.location, a.current)
        displayanother(a.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", function(e)

    {
        search(e.target.value)
    })

function displaycurrent(x1, x2) {
    let city = x1.name;
    let condtion = x2.condition.text;
    let currenttemp = x2.temp_c;
    let url = x2.condition.icon;
    let URL = "http:" + url
    document.querySelector(".location").innerHTML = city;
    document.querySelector(".custom").innerHTML = condtion;
    document.querySelector(".num").innerHTML = `${currenttemp}<sup>o</sup>C`;
    document.getElementById("myimge").src = URL;
    var day1 = currentday(x2);
    var month = currentmonth(x2);
    document.querySelector(".day").innerHTML = day1;
    document.querySelector(".date").innerHTML = month;

}
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function currentday(X) {
    var currentday = new Date(X.last_updated);
    let theday = currentday.getDate();
    return days[theday];
}

function currentmonth(X) {
    var currentmonth = new Date(X.last_updated);
    let month = monthNames[currentmonth.getMonth()];
    const r = new Date("2023-02-25");
    let e = r.getDate();
    month = e + month;
    return currentmonth;
}



function displayanother(x3) {
    let day2 = "";
    for (let i = 1; i <= x3.length; i++) {
        const d = new Date(x3[i].date);
        let Day = d.getDay();
        day2 += `<div class="col-md-6 col-sm-12"><div class="header text-center py-2">
        <p class="mb-0" id="secondday">${days[Day]}</p>
    </div>
    <div class="content text-center pt-5">
        <img class="my-3" src="http:${x3[i].day.condition.icon}" alt="noimage">
        <p id="Maxtemp" class="maxtemp text-white mb-0 pt-5">${x3[i].day.maxtemp_c}<sup>o</sup>C</p>
        <p id="Mintemp" class="mintemp  mb-0">${x3[i].day.mintemp_c}</p>
        <p id="Status" class="status mt-4 text-primary">${x3[i].day.condition.text}</p>
    </div></div>`
        document.querySelector(".anotherdays1").innerHTML = day2;
    }
}


search("cairo");