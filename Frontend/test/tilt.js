
let cohort = document.getElementsByClassName("cohort");
let degree = document.getElementsByClassName("degree");
let sign = document.getElementsByClassName("sign");
let music = document.getElementsByClassName("music");
let show = document.getElementsByClassName("show");
let game = document.getElementsByClassName("game");
let hobby = document.getElementsByClassName("hobby");
let travel = document.getElementsByClassName("travel");

let fetchData = async (url) =>{
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayData(data);
}

function displayData(data){
    document.getElementById("name").innerHTML = data.user.name;
    document.getElementById("age").innerHTML = data.questionnaire.age;
}

fetchData('http://localhost:3000/sendUser');

