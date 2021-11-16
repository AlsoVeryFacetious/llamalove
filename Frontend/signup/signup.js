let features = document.getElementById("features");
let devs = document.getElementById("devs")
let mission = document.getElementById("missionStatement");

let featuresText = `<p>We Match Users Based On Their Questions<br>
    More Features here I forgot</p>`;
let devsText = `Nirvik Is the Best`;
let missionText = `This is the mission Text`;

function displayFeatures(){
    features.innerHTML = featuresText;
    features.style.fontSize = "30px";
}
function displayFeaturesTitle(){
    features.innerHTML = "Features";
    features.style.fontSize = "50px"
}
function displayDevs(){
    devs.innerHTML = devsText;
    devs.style.fontSize = "30px";
}
function displayDevsTitle(){
    devs.innerHTML = "About the Dev's";
    devs.style.fontSize = "50px"
}
function displayMission(){
    mission.innerHTML = missionText;
    mission.style.fontSize = "30px";
}
function displayMissionTitle(){
    mission.innerHTML = "Our Mission";
    mission.style.fontSize = "50px"
}