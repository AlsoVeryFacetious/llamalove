
let hobby = document.getElementsByClassName("hobby");
let travel = document.getElementsByClassName("travel");
let displayedUsername = '';

let arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

let fetchData = () => {
    fetch("http://localhost:3000/sendUser", {
        method: "GET",
        credentials: 'include'
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            displayedUsername = data.user.username;
            let imgString = '';
            try{
                imgString = arrayBufferToBase64(data.questionnaire.image.data.data);
                imgString = `data:image/jpg;base64,${imgString}`
            } catch{
                imgString = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80";
            }
            // console.log(imgString);
            displayData(data, imgString);
        });
}

let fetchMatches = () => {
    fetch("http://localhost:3000/matches", {
        method: "GET",
        credentials: 'include'
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            displayMatches(data);
        });
}

let fetchProfilePicture = () => {
    fetch("http://localhost:3000/getProfilePicture", {
        method: "GET",
        credentials: 'include'
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            displayProfilePicture(data);
        });
}

let displayProfilePicture = data => {
    let imgString = '';
    try{
        imgString = arrayBufferToBase64(data.image.data.data);
        imgString = `data:image/jpg;base64,${imgString}`
    } catch{
        imgString = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80";
    }
    document.getElementById('logo').src = imgString;
}

let displayMatches = data => {
    const matchBox = document.getElementById('matches');
    for (i in data) {
        let imgString = '';
        try{
            imgString = arrayBufferToBase64(data[i].image.image.data.data);
            imgString = `data:image/jpg;base64,${imgString}`
        } catch{
            imgString = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80";
        }
        matchBox.innerHTML += `<p><img style="vertical-align:middle" src="${imgString}" width="50px" height = "40px"Person 1>   ${data[i].name.name}</p>`
    }
}

function displayData(data, imgString) {
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
    document.getElementById('image').innerHTML = `<img src="${imgString}" width="650px" height="400px" alt="test">`
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

fetchData();
fetchMatches();
fetchProfilePicture();

