let main_container=document.querySelector(".main_container");
let input_text=document.querySelector(".input_text");
let user_container=document.querySelector(".user_container");
let info_text=document.querySelector(".info_text");
let input=document.querySelector("input");
let btn=document.querySelector(".btn");
let iconimg=document.querySelector(".icon");

let temp_detail_container=document.querySelector("temp_detail_container");
let number=document.querySelector(".number");
let location_name=document.querySelector(".location_name");
let weather_details=document.querySelector(".weather_details");
let backbtn=document.querySelector(".backbtn");


backbtn.addEventListener("click", ()=>{
    window.location.reload();
});
// this function works only for user location... 
btn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(sucess,Error);
    }else{
        
    }
})
function sucess(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    info_text.textContent="Getting Weather Details..."
    info_text.classList.add("pending");
    api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=920673445dca26d8a81f781800b7fc1c`
    fetch(api).then(Response =>Response.json()).then(data=> weather_data(data))
}
function Error(err){
    console.log("you block the request");
}

// this js function is for perticular city name... 
input.addEventListener('keyup',(e)=>{
    if(e.key=="Enter" && input.value !==""){
        info_text.textContent="Getting Weather Details..."
        info_text.classList.add("pending");
        requestApi(input.value);
    }
})
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=920673445dca26d8a81f781800b7fc1c`
    fetch(api).then(Response =>Response.json()).then(data=> weather_data(data))
}
function weather_data(data){
    console.log(data);
    if(data.cod=="404"){
        info_text.classList.replace("pending" ,"error");
        info_text.textContent=`${data.message} !!`
    }else{
        main_container.classList.add("active")
        console.log(data);
        location_name.textContent=`${data.name} , ${data.sys.country}`
        weather_details.textContent=`${data.weather[0].description}`
        number.textContent=`${Math.round(data.main.temp - 273)}`
        const icon=`${data.weather[0].icon}`
        skycon(icon)
    }
}
function skycon(icon){
    iconimg.src=`http://openweathermap.org/img/wn/${icon}@4x.png`
}