function submitQuestionnaire() {
  const fd = new FormData(form);
  console.log(fd);
  console.log(sessionStorage.getItem('username'));
      fetch("http://localhost:3000/question", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          username: sessionStorage.getItem('username'),
          age: document.getElementById('age').value,
          pronouns: document.querySelector('input[name="pronouns"]:checked').value,
          sexInterest: document.querySelector('input[name="attracted"]:checked').value,
          sign: document.getElementById('starsign-dropdown').value,
          degree: document.getElementById('degree-dropdown').value,
          cohort: document.getElementById('cohort-dropdown').value,
          musicGenre: document.querySelector('input[name="genre"]:checked').value,
          gameGenre: document.querySelector('input[name="game"]:checked').value,
          tvGenre: document.querySelector('input[name="show"]:checked').value,
          hobbies: document.getElementById('hobby-dropdown').value,
          travelDestination: document.querySelector('input[name="travel"]:checked').value,
          image: "hello"
      })
      }).then(res => {
        console.log("Request complete! response:", res);
        window.location.replace("../home/tilt.html");
      });
}
// window.addEventListener('load', function(){
//   const form = document.getElementById('survey-form');

//   function sendData(){
//     const fd = formData(form);
//   }
//   form.addEventListener('submit', evt =>{
//     evt.preventDfault();
//     sendData();
//   })
// })

document.getElementById('survey-form')