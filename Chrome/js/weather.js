const API_KEY = "47063f4445bfc85015f7af1663b5c9ec";

function onGeoOK(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude; //position 객체에서 정보 불러다가 변수에 저장
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    fetch(url).then(response => response.json()).then((data)=>{
        const weather = document.querySelector("#weather span:last-child")
        const city = document.querySelector("#weather span:first-child")
        city.innerText = data.name;
        weather.innerText = data.weather[0].main;
        
    });
}
function onGeoError() {
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError)