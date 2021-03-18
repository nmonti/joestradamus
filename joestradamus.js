export async function getScore() {
  let potentialScores = [];
  const year = document.getElementById("year").value;
  const team1 = document.getElementById("team1").value
  const team2 = document.getElementById("team2").value


  const res = await fetch(`./data/${year}.json`);
  const scores = await res.json();

  potentialScores = scores.filter(s => {
    const yr = new Date(s.Date).getFullYear().toString();
    const winner = s.Winner.tie;
    const loser = s.Loser.tie;

    return  (
      yr === year && 
      (winner === team1 || winner === team2) &&
      (loser === team1 || loser === team2)
    );
  });

  const potentialScoresCount = potentialScores.length;

  if (potentialScoresCount == 0) {
    document.getElementById("winner").innerHTML = "Try another team combo and/or year!";
    document.getElementById("loser").innerHTML = '';
  }
  else if (potentialScoresCount == 1) {
    const winner = `${potentialScores[0].Winner.tie} - ${potentialScores[0].PtsW}`;
    const loser = `${potentialScores[0].Loser.tie} - ${potentialScores[0].PtsL}`;

    document.getElementById("winner").innerHTML = winner;
    document.getElementById("loser").innerHTML = loser;
  }
  else {
    let random = Math.floor(Math.random() * potentialScoresCount);
    const winner = `${potentialScores[random].Winner.tie} - ${potentialScores[random].PtsW}`;
    const loser = `${potentialScores[random].Loser.tie} - ${potentialScores[random].PtsL}`;

    document.getElementById("winner").innerHTML = winner;
    document.getElementById("loser").innerHTML = loser;
  }

}