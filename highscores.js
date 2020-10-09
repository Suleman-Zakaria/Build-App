//assignments of constants 
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(score => {
	  //Sorting the highest scores
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");