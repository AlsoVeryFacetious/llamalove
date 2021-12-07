function submitQuestionnaire() {
  console.log(sessionStorage.getItem('username'));
      fetch("http://localhost:3000/question", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
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
          travelDestination: document.querySelector('input[name="travel"]:checked').value
      })
      }).then(res => {
        console.log("Request complete! response:", res);
        window.location.replace("../home/tilt.html");
      });
}