/*
const playerTesting = document.getElementById('players-area');

let totalFakePlayers = 10;

function createFakePlayers() {
  for (i=2; i <= totalFakePlayers; i++) {
    let playerId = i;
    let randParticipationRate = Math.floor(Math.random() * 100);
    let rand1 = Math.floor(Math.random() * 100);
    let rand2 = Math.floor(Math.random() * 100);
    let rand3 = Math.floor(Math.random() * 100);
    let randFactor = 100 / (rand1 + rand2 + rand3);
    let randVoteARate = Math.floor(rand1 * randFactor);
    let randVoteBRate = Math.floor(rand2 * randFactor);
    let randAbstainRate = 100 - (randVoteARate + randVoteBRate);
    class Player {
      constructor(plId, pRate, vARate, vBRate, abRate) {
        this.plyrId = plId;
        this.participationRate = pRate;
        this.voteARate = vARate;
        this.voteBRate = vBRate;
        this.abstainRate = abRate;
      }
    }
    let player = new Player(`${playerId}`, `${randParticipationRate}`, `${randVoteARate}`, `${randVoteBRate}`, `${randAbstainRate}`);
    let div = document.createElement('div');
    div.className = 'other-player';
    div.innerHTML = `<span>Player ${player.plyrId} Stats</span>` + '<br />' + '<br />' + `<span>Participation rate: ${player.participationRate}%</span>` + '<br />' + `<span>Vote A rate: ${player.voteARate}%</span>` + '<br />' + `<span>Vote B rate: ${player.voteBRate}%</span>` + '<br />' + `<span>Abstain rate: ${player.abstainRate}%</span>`;
    playerTesting.appendChild(div);
    let divHistory = document.createElement('div');
    divHistory.className = 'other-player-history';
    divHistory.innerHTML = `<span>Player ${player.plyrId} History</span>` + '<br />' + '<br />';
    playerTesting.appendChild(divHistory);
  }
}

createFakePlayers();

//Testing area

player1.roundStatus = '';


player = {
  "playerId": `${++id}`,
  "${playerId}ParticipationRate": 50/100,
  "${playerId}VoteARate": 25/100,
  "${playerId}VoteBRate": 75/100,
  "${playerId}AbstainRate": 25/100,
  "${playerId}RoundStatus": '',
  "${playerId}TotalVotesAccrued": 0,
  "${playerId}TotalVotesUsed": 0,
  "${playerId}VotesAccrued]": 0,
  "${playerId}VotesUsed]": 0,
  "${playerId}VotesAvailable": 0,
  "${playerId}RoundsActive": 0,
  "${playerId}ActiveStreak": 0,
  "${playerId}RoundsMissed": 0,
  "${playerId}VoteATally": 0,
  "${playerId}VoteATallyWeight": 0,
  "${playerId}VoteBTally": 0,
  "${playerId}VoteBTally": 0,
  "${playerId}AbstainTally": 0,
};

vote = {
  "choice": '',
  "votesValue": 0,
};
*/