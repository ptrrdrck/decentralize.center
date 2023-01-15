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
let aTally = 0;
let aTallyWeight = 0;
let bTally = 0;
let bTallyWeight = 0;
let abstainTally = 0;
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
let aVoteRate;
let bVoteRate;
let abstainVoteRate;

const voteValueA = document.getElementById('vote-value-a');
const voteValueB = document.getElementById('vote-value-b');

const aTallyDisplay = document.getElementById('vote-tally-a');
const aTallyWeightDisplay = document.getElementById('total-a-votes');
const bTallyDisplay = document.getElementById('vote-tally-b');
const bTallyWeightDisplay = document.getElementById('total-b-votes');
const abstainTallyDisplay = document.getElementById('abstain-tally');
const aVoteRateDisplay = document.getElementById('a-vote-rate');
const bVoteRateDisplay = document.getElementById('b-vote-rate');
const abstainVoteRateDisplay = document.getElementById('abstain-vote-rate');
const roundNumberDisplay = document.getElementById('round-number');
const totalVotesAccruedDisplay = document.getElementById('votes-accrued');
const totalVotesUsedDisplay = document.getElementById('total-votes-used');
const votesAvailableDisplay = document.getElementById('votes-available');
const roundWeightDisplay = document.getElementById('round-weight');
const roundsMissedDisplay = document.getElementById('rounds-missed');
const roundsActiveDisplay = document.getElementById('rounds-active');
const activeStreakDisplay = document.getElementById('active-streak');
const participationRateDisplay = document.getElementById('participation-rate');

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
    aTally++;
    aTallyWeight = parseFloat(aTallyWeight) + parseFloat(currentVoteValueA);
    votesUsed = currentVoteValueA;
    votesAvailable = votesAvailable - currentVoteValueA;
    totalVotesUsed = totalVotesAccrued - votesAvailable;
  } else if (votedB == true) {
    roundStatus = 'Voted B';
    bTally++;
    bTallyWeight = parseFloat(bTallyWeight) + parseFloat(currentVoteValueB);
    votesUsed = currentVoteValueB;
    votesAvailable = votesAvailable - currentVoteValueB;
    totalVotesUsed = totalVotesAccrued - votesAvailable;
  } else if (abstained == true) {
    roundStatus = 'Abstained';
    abstainTally++;
    votesUsed = 0;
    votesAvailable;
    totalVotesUsed;
  }
  totalVotesUsedDisplay.innerText = totalVotesUsed;
  roundsActiveDisplay.innerText = roundsActive;
  activeStreakDisplay.innerText = activeStreak;
  aTallyDisplay.innerText = aTally;
  aTallyWeightDisplay.innerText = aTallyWeight;
  bTallyDisplay.innerText = bTally;
  bTallyWeightDisplay.innerText = bTallyWeight;
  abstainTallyDisplay.innerText = abstainTally;
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
  aVoteRate = `${Math.floor((aTally / currentRoundNumber) * 100)}%`;
  bVoteRate = `${Math.floor((bTally / currentRoundNumber) * 100)}%`;
  abstainVoteRate = `${Math.floor((abstainTally / currentRoundNumber) * 100)}%`;
  participationRateDisplay.innerText = myParticipationRate;
  aVoteRateDisplay.innerText = aVoteRate;
  bVoteRateDisplay.innerText = bVoteRate;
  abstainVoteRateDisplay.innerText = abstainVoteRate;
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

voteButtonA.addEventListener('click', () => {
  checkA();
});

const castVoteA = () => {
  currentVoteValueA = voteValueA.value - 0;
  votedA = true;
  disableVoteButtons();
  updateStats();
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
  window.scrollTo({top: 96, behavior: 'smooth'});
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