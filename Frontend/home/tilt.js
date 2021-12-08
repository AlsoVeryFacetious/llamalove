
let hobby = document.getElementsByClassName("hobby");
let travel = document.getElementsByClassName("travel");
let displayedUsername = '';

// let fetchData = async (url) =>{
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//     displayedUsername = data.user.username;
//     displayData(data);
// }
let fetchData = () => {
    fetch("http://localhost:3000/sendUser", {
        method: "GET",
        credentials: 'include'
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            displayedUsername = data.user.username;
            displayData(data);
        });
}

let fetchMatches = () => {
    fetch("http://localhost:3000/matches", {
        method: "GET",
        credentials: 'include'
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            displayMatches(data);
        });
}

let displayMatches = data => {
    const matchBox = document.getElementById('matches');
    for (match in data) {
        matchBox.innerHTML += `<p><img style="vertical-align:middle" src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" width="50px" height = "40px"Person 1>   ${data[match]}</p>`
    }
}

function displayData(data) {
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

function like() {
    fetch("http://localhost:3000/like", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            likedUser: displayedUsername
        })
    }).then(res => {
        console.log("Request complete! response:", res);
        fetchData();
    });
}

let dislike = () => {
    fetchData();
}

document.getElementById('likeButton').addEventListener('click', like);
document.getElementById('dislikeButton').addEventListener('click', dislike);
// fetchData('http://localhost:3000/sendUser');
fetchData();
fetchMatches();

