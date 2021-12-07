
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
    document.getElementById("cohort").innerHTML = data.questionnaire.cohort;
    document.getElementById("degree").innerHTML = data.questionnaire.degree;
    document.getElementById("sign").innerHTML = data.questionnaire.sign;
    document.getElementById("music").innerHTML = data.questionnaire.musicGenre;
    document.getElementById("show").innerHTML = data.questionnaire.tvGenre;
    document.getElementById("game").innerHTML = data.questionnaire.gameGenre;
    document.getElementById("hobby").innerHTML = data.questionnaire.hobbies;
    document.getElementById("travel").innerHTML = data.questionnaire.travelDestination;


}

fetchData('http://localhost:3000/sendUser');

