/**
    Participation-Weighted Voting © Peter Rodrick.
**/

let currentRoundNumber = 1;
let currentVoteValueA = 0;
let currentVoteValueB = 0;
let votedA = false;
let votedB = false;
let abstained = false;
let roundStatus = '';
let myATally = 0;
let myATallyWeight = 0;
let myBTally = 0;
let myBTallyWeight = 0;
let myAbstainTally = 0;
let voteAccrualRate = 10;
let votesAccrued = voteAccrualRate;
let totalVotesAccrued = voteAccrualRate;
let votesUsed = 0;
let totalVotesUsed = 0;
let votesAvailable = totalVotesAccrued - totalVotesUsed;
let roundsActive = 0;
let activeStreak = 0;
let activeStreakThreshold = 10;
let activeStreakAccrualRate = 20;
let roundsMissed = 0;
let currentRoundWeight = votesAvailable;
let myParticipationRate;
let myAVoteRate;
let myBVoteRate;
let myAbstainVoteRate;

const voteValueA = document.getElementById('vote-value-a');
const voteValueB = document.getElementById('vote-value-b');

const myATallyDisplay = document.getElementById('vote-tally-a');
const myATallyWeightDisplay = document.getElementById('total-a-votes');
const myBTallyDisplay = document.getElementById('vote-tally-b');
const myBTallyWeightDisplay = document.getElementById('total-b-votes');
const myAbstainTallyDisplay = document.getElementById('abstain-tally');
const myAVoteRateDisplay = document.getElementById('a-vote-rate');
const myBVoteRateDisplay = document.getElementById('b-vote-rate');
const myAbstainVoteRateDisplay = document.getElementById('abstain-vote-rate');
const roundNumberDisplay = document.getElementById('round-number');
const totalVotesAccruedDisplay = document.getElementById('votes-accrued');
const totalVotesUsedDisplay = document.getElementById('total-votes-used');
const votesAvailableDisplay = document.getElementById('votes-available');
const roundWeightDisplay = document.getElementById('round-weight');
const roundsMissedDisplay = document.getElementById('rounds-missed');
const roundsActiveDisplay = document.getElementById('rounds-active');
const activeStreakDisplay = document.getElementById('active-streak');
const myParticipationRateDisplay = document.getElementById('participation-rate');

const voteButtonA = document.getElementById('vote-button-a');
const voteButtonB = document.getElementById('vote-button-b');
const abstainButton = document.getElementById('abstain');
const nextRoundButton = document.getElementById('next-round');
const addButtonA = document.getElementById('add-a');
const addButtonB = document.getElementById('add-b');
const subtractButtonA = document.getElementById('subtract-a');
const subtractButtonB = document.getElementById('subtract-b');
const maxButtonA = document.getElementById('max-a');
const maxButtonB = document.getElementById('max-b');

const historyArea = document.getElementById('history-area');

const updateStats = () => {
  roundsActive++;
  activeStreak++;
  if (votedA == true) {
    roundStatus = 'Voted A';
    myATally++;
    myATallyWeight = parseFloat(myATallyWeight) + parseFloat(currentVoteValueA);
    votesUsed = currentVoteValueA;
    votesAvailable = votesAvailable - currentVoteValueA;
    totalVotesUsed = totalVotesAccrued - votesAvailable;
  } else if (votedB == true) {
    roundStatus = 'Voted B';
    myBTally++;
    myBTallyWeight = parseFloat(myBTallyWeight) + parseFloat(currentVoteValueB);
    votesUsed = currentVoteValueB;
    votesAvailable = votesAvailable - currentVoteValueB;
    totalVotesUsed = totalVotesAccrued - votesAvailable;
  } else if (abstained == true) {
    roundStatus = 'Abstained';
    myAbstainTally++;
    votesUsed = 0;
    votesAvailable;
    totalVotesUsed;
  }
  totalVotesUsedDisplay.innerText = totalVotesUsed;
  roundsActiveDisplay.innerText = roundsActive;
  activeStreakDisplay.innerText = activeStreak;
  myATallyDisplay.innerText = myATally;
  myATallyWeightDisplay.innerText = myATallyWeight;
  myBTallyDisplay.innerText = myBTally;
  myBTallyWeightDisplay.innerText = myBTallyWeight;
  myAbstainTallyDisplay.innerText = myAbstainTally;
};

const updateVotesAccrued = () => {
  if (activeStreak >= activeStreakThreshold) {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(activeStreakAccrualRate);
      votesAccrued = activeStreakAccrualRate;
  } 
  else {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(voteAccrualRate);
      votesAccrued = voteAccrualRate;
  }
  votesAvailable = totalVotesAccrued - totalVotesUsed;
  totalVotesAccruedDisplay.innerText = totalVotesAccrued;
  votesAvailableDisplay.innerText = votesAvailable;
};

const updateMissedRound = () => {
  roundsMissed++;
  roundStatus = 'Missed';
  activeStreak = 0;
  roundsMissedDisplay.innerText = roundsMissed;
  activeStreakDisplay.innerText = activeStreak;
};

const updatePlayerRates = () => {
  myParticipationRate = `${Math.floor((roundsActive / currentRoundNumber) * 100)}%`;
  myAVoteRate = `${Math.floor((myATally / currentRoundNumber) * 100)}%`;
  myBVoteRate = `${Math.floor((myBTally / currentRoundNumber) * 100)}%`;
  myAbstainVoteRate = `${Math.floor((myAbstainTally / currentRoundNumber) * 100)}%`;
  myParticipationRateDisplay.innerText = myParticipationRate;
  myAVoteRateDisplay.innerText = myAVoteRate;
  myBVoteRateDisplay.innerText = myBVoteRate;
  myAbstainVoteRateDisplay.innerText = myAbstainVoteRate;
};

const updateHistory = () => {
  let history = document.querySelector('#history-area');
  let stats = [`Round ${currentRoundNumber}`,`${roundStatus}`,`${votesAccrued} votes were accrued.`,`${votesUsed} votes were used.`];
  let nodes = stats.map(stat => {
    let p = document.createElement('p');
    p.textContent = stat;
    return p;
  });
  history.prepend(...nodes);
  historyArea.scrollTo({top: 0, behavior: 'smooth'});
};

const advanceRound = () => {
  currentRoundNumber++;
  currentRoundWeight = votesAvailable;
};

const disableVoteButtons = () => {
  addButtonA.setAttribute('disabled', true);
  addButtonB.setAttribute('disabled', true);
  subtractButtonA.setAttribute('disabled', true);
  subtractButtonB.setAttribute('disabled', true);
  maxButtonA.setAttribute('disabled', true);
  maxButtonB.setAttribute('disabled', true);
  voteValueA.setAttribute('disabled', true);
  voteValueB.setAttribute('disabled', true);
  voteButtonA.setAttribute('disabled', true);
  voteButtonB.setAttribute('disabled', true);
  abstainButton.setAttribute('disabled', true);
  nextRoundButton.classList.add('button-blink');
  if (window.innerWidth < 599) {
    nextRoundButton.classList.add('next-round-float');
  }
  window.scrollTo({top: 595, behavior: 'smooth'});
};

/**
    Other players
**/
let players = 99;
let quota = .51;
let totalPlayerVotes = (players + 1) * voteAccrualRate;
let quotaVotes = totalPlayerVotes * quota;
let roundResult = '';

const percentVotedDisplay = document.getElementById('percent-voted');
const playersVotedADisplay = document.getElementById('players-voted-a');
const playersAVotesDisplay = document.getElementById('players-total-a-votes');
const playersVotedBDisplay = document.getElementById('players-voted-b');
const playersBVotesDisplay = document.getElementById('players-total-b-votes');
const playersAbstainedDisplay = document.getElementById('players-total-abstained');
const playersMissedDisplay = document.getElementById('players-total-missed');
const roundResultDisplay = document.getElementById('round-result');

roundResultDisplay.innerText = 'Waiting for vote...';

function playersResults() {
  let randParticipationRate = Math.floor(Math.random() * 100);
  if (randParticipationRate < 60) {
    randParticipationRate = randParticipationRate + 40;
  }
  let rand1 = Math.floor(Math.random() * 100);
  let rand2 = Math.floor(Math.random() * 100);
  let rand3 = Math.floor(Math.random() * 100);
  let randFactor = 100 / (rand1 + rand2 + rand3);
  let randVoteARate = Math.floor(rand1 * randFactor);
  let randVoteBRate = Math.floor(rand2 * randFactor);
  let randAbstainRate = 100 - (randVoteARate + randVoteBRate);

  let totalRoundVoters = Math.round(players * (randParticipationRate / 100));
  let totalRoundMissers = players - totalRoundVoters;
  let totalAVoters = Math.round((totalRoundVoters * randVoteARate) / 100);
  let totalBVoters = Math.round((totalRoundVoters * randVoteBRate) / 100);
  let totalAbstainVoters = Math.round((totalRoundVoters * randAbstainRate) / 100);

  let totalAVotes = (totalAVoters * voteAccrualRate) + currentVoteValueA;
  let totalBVotes = (totalBVoters * voteAccrualRate) + currentVoteValueB;

  if (roundStatus == 'Voted A') {
    totalAVoters = totalAVoters + 1;
    totalRoundVoters = totalRoundVoters + 1;
  } else if (roundStatus == 'Voted B') {
    totalBVoters = totalBVoters + 1;
    totalRoundVoters = totalRoundVoters + 1;
  } else if (roundStatus == 'Abstained') {
    totalAbstainVoters = totalAbstainVoters + 1;
    totalRoundVoters = totalRoundVoters + 1;
  } else if (roundStatus == 'Missed') {
    totalRoundMissers = totalRoundMissers + 1;
  }

  if ((randParticipationRate + totalRoundMissers) < 100) {
    totalRoundMissers = totalRoundMissers + (100 - (randParticipationRate + totalRoundMissers));
  } else if ((randParticipationRate + totalRoundMissers) > 100) {
    totalRoundMissers = totalRoundMissers - ((randParticipationRate + totalRoundMissers) - 100);
  }

  if ((totalAVoters + totalBVoters + totalAbstainVoters) < randParticipationRate) {
    totalAbstainVoters = totalAbstainVoters + (randParticipationRate - (totalAVoters + totalBVoters + totalAbstainVoters));
  } else if ((totalAVoters + totalBVoters + totalAbstainVoters) > randParticipationRate) {
    totalAbstainVoters = totalAbstainVoters - ((totalAVoters + totalBVoters + totalAbstainVoters) - randParticipationRate);
  }

  percentVotedDisplay.innerText = `Percent Active: ${randParticipationRate}%`;
  playersVotedADisplay.innerText = `Voted A: ${totalAVoters}`;
  playersAVotesDisplay.innerText = `(${totalAVotes})`;
  playersVotedBDisplay.innerText = `Voted B: ${totalBVoters}`;
  playersBVotesDisplay.innerText = `(${totalBVotes})`;
  playersAbstainedDisplay.innerText = `Abstained: ${totalAbstainVoters}`;
  playersMissedDisplay.innerText = `Missed: ${totalRoundMissers}`;

  if (totalAVotes >= quotaVotes) {
    roundResult = 'A vote successful.';
  } else if (totalBVotes >= quotaVotes) {
    roundResult = 'B vote successful.';
  } else if (totalAVotes < quotaVotes && totalBVotes < quotaVotes) {
    roundResult = 'Vote failed. Quota not met.';
  }

  roundResultDisplay.innerText = roundResult;
};
/** 
    END Other players
**/

voteButtonA.addEventListener('click', () => {
  checkA();
});

const castVoteA = () => {
  currentVoteValueA = voteValueA.value - 0;
  votedA = true;
  disableVoteButtons();
  updateStats();
  playersResults();
  updateVotesAccrued();
  updatePlayerRates();
  updateHistory();
};

voteButtonB.addEventListener('click', () => {
  checkB();
});

const castVoteB = () => {
  currentVoteValueB = voteValueB.value - 0;
  votedB = true;
  disableVoteButtons();
  updateStats();
  playersResults();
  updateVotesAccrued();
  updatePlayerRates();
  updateHistory();
};

abstainButton.addEventListener('click', () => {
  checkAbstain();
});

const castVoteAbstain = () => {
  abstained = true;
  disableVoteButtons();
  updateStats();
  playersResults();
  updateVotesAccrued();
  updatePlayerRates();
  updateHistory();
};

nextRoundButton.addEventListener('click', () => {
  if (votedA == true || votedB == true || abstained == true) {
    goToNextRound();
  } else {
    checkNextRound();
  }
});

const goToNextRound = () => {
  // Handle missed round
  if (votedA == false && votedB == false && abstained == false) {
    updateMissedRound();
    playersResults();
    updatePlayerRates();
    updateHistory();
    advanceRound();
  } else {
    advanceRound();
  }
  // Display the updated round number and round weight
  roundNumberDisplay.innerText = currentRoundNumber;
  roundWeightDisplay.innerText = currentRoundWeight;
  // Set the correct button states
  voteButtonA.setAttribute('disabled', true);
  voteButtonB.setAttribute('disabled', true);
  abstainButton.removeAttribute('disabled');
  nextRoundButton.classList.remove('button-blink','next-round-float');
  // Reset the vote input boxes
  voteButtonA.innerText = 'Vote A';
  voteButtonB.innerText = 'Vote B';
  voteValueA.value = '0';
  voteValueB.value = '0';
  voteValueA.removeAttribute('disabled');
  voteValueB.removeAttribute('disabled');
  subtractButtonA.setAttribute('disabled', true);
  subtractButtonB.setAttribute('disabled', true);
  addButtonA.removeAttribute('disabled');
  addButtonB.removeAttribute('disabled');
  maxButtonA.removeAttribute('disabled');
  maxButtonB.removeAttribute('disabled');
  // Reset the flags
  votedA = false;
  votedB = false;
  abstained = false;
  // Reset the round-specific variables
  votesAccrued = 0;
  votesUsed = 0;
  roundStatus = '';
  currentVoteValueA = 0;
  currentVoteValueB = 0;
  window.scrollTo({top: 96, behavior: 'smooth'});
  // Reset round results
  percentVotedDisplay.innerText = '';
  playersVotedADisplay.innerText = '';
  playersAVotesDisplay.innerText = '';
  playersVotedBDisplay.innerText = '';
  playersBVotesDisplay.innerText = '';
  playersAbstainedDisplay.innerText = '';
  playersMissedDisplay.innerText = '';
  roundResultDisplay.innerText = 'Waiting for vote...';
};

addButtonA.addEventListener('click', () => {
  voteValueA.value = + voteValueA.value + 1;
  handleValueChangeA(voteValueA.value);
});

addButtonB.addEventListener('click', () => {
  voteValueB.value = + voteValueB.value + 1;
  handleValueChangeB(voteValueB.value);
});

subtractButtonA.addEventListener('click', () => {
  voteValueA.value = + voteValueA.value - 1;
  handleValueChangeA(voteValueA.value);
});

subtractButtonB.addEventListener('click', () => {
  voteValueB.value = + voteValueB.value - 1;
  handleValueChangeB(voteValueB.value);
});

maxButtonA.addEventListener('click', () => {
  voteValueA.value = + votesAvailable;
  voteButtonA.removeAttribute('disabled');
  addButtonA.setAttribute('disabled', true);
  subtractButtonA.removeAttribute('disabled');
  maxButtonA.setAttribute('disabled', true);
});

maxButtonB.addEventListener('click', () => {
  voteValueB.value = + votesAvailable;
  voteButtonB.removeAttribute('disabled');
  addButtonB.setAttribute('disabled', true);
  subtractButtonB.removeAttribute('disabled');
  maxButtonB.setAttribute('disabled', true);
});

const handleValueChangeA = value => {
  if (value <= 0) {
    subtractButtonA.setAttribute('disabled', true);
    voteButtonA.setAttribute('disabled', true);
  } else if (value < votesAvailable) {
    subtractButtonA.removeAttribute('disabled');
    addButtonA.removeAttribute('disabled');
    maxButtonA.removeAttribute('disabled');
    voteButtonA.removeAttribute('disabled');
  } else if (value = votesAvailable) {
    addButtonA.setAttribute('disabled', true);
    maxButtonA.setAttribute('disabled', true);
  } else {
    subtractButtonB.setAttribute('disabled', true);
  }
};

const handleValueChangeB = value => {
  if (value <= 0) {
    subtractButtonB.setAttribute('disabled', true);
    voteButtonB.setAttribute('disabled', true);
  } else if (value < votesAvailable) {
    subtractButtonB.removeAttribute('disabled');
    addButtonB.removeAttribute('disabled');
    maxButtonB.removeAttribute('disabled');
    voteButtonB.removeAttribute('disabled');
  } else if (value = votesAvailable) {
    addButtonB.setAttribute('disabled', true);
    maxButtonB.setAttribute('disabled', true);
  } else {
    subtractButtonB.setAttribute('disabled', true);
  }
};

voteValueA.addEventListener('input', function(e) {
  if (this.value > votesAvailable) {
    this.value = votesAvailable;
  }
  handleValueChangeA(e.target.value);
});

voteValueB.addEventListener('input', function(e) {
  if (this.value > votesAvailable) {
    this.value = votesAvailable;
  }
  handleValueChangeB(e.target.value);
});