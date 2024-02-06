/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const currentRound = {
  number: 1,
  voteValueA: 0,
  voteValueB: 0,
  votedA: false,
  votedB: false,
  abstained: false,
  status: "",
  myATally: 0,
  myATallyWeight: 0,
  myBTally: 0,
  myBTallyWeight: 0,
  myAbstainTally: 0,
  voteAccrualRate: 10,
  votesAccrued: 10,
  totalVotesAccrued: 10,
  votesUsed: 0,
  totalVotesUsed: 0,
  votesAvailable: 10,
  roundsActive: 0,
  activeStreak: 0,
  activeStreakThreshold: 10,
  activeStreakAccrualRate: 20,
  roundsMissed: 0,
  currentRoundWeight: 0,
  myParticipationRate: "",
  myAVoteRate: "",
  myBVoteRate: "",
  myAbstainVoteRate: "",
};

const getElement = (id) => document.getElementById(id);

const voteValueA = getElement("vote-value-a");
const voteValueB = getElement("vote-value-b");
const myATallyDisplay = getElement("vote-tally-a");
const myATallyWeightDisplay = getElement("total-a-votes");
const myBTallyDisplay = getElement("vote-tally-b");
const myBTallyWeightDisplay = getElement("total-b-votes");
const myAbstainTallyDisplay = getElement("abstain-tally");
const myAVoteRateDisplay = getElement("a-vote-rate");
const myBVoteRateDisplay = getElement("b-vote-rate");
const myAbstainVoteRateDisplay = getElement("abstain-vote-rate");
const roundNumberDisplay = getElement("round-number");
const totalVotesAccruedDisplay = getElement("votes-accrued");
const totalVotesUsedDisplay = getElement("total-votes-used");
const votesAvailableDisplay = getElement("votes-available");
const roundWeightDisplay = getElement("round-weight");
const roundsMissedDisplay = getElement("rounds-missed");
const roundsActiveDisplay = getElement("rounds-active");
const activeStreakDisplay = getElement("active-streak");
const myParticipationRateDisplay = getElement("participation-rate");
const voteButtonA = getElement("vote-button-a");
const voteButtonB = getElement("vote-button-b");
const abstainButton = getElement("abstain");
const nextRoundButton = getElement("next-round");
const addButtonA = getElement("add-a");
const addButtonB = getElement("add-b");
const subtractButtonA = getElement("subtract-a");
const subtractButtonB = getElement("subtract-b");
const maxButtonA = getElement("max-a");
const maxButtonB = getElement("max-b");
const historyArea = getElement("history-area");

const updateStats = () => {
  currentRound.roundsActive++;
  currentRound.activeStreak++;
  if (currentRound.votedA) {
    currentRound.status = "Voted A";
    currentRound.myATally++;
    currentRound.myATallyWeight += parseFloat(currentRound.voteValueA);
    currentRound.votesUsed = currentRound.voteValueA;
    currentRound.votesAvailable -= currentRound.voteValueA;
    currentRound.totalVotesUsed =
      currentRound.totalVotesAccrued - currentRound.votesAvailable;
  } else if (currentRound.votedB) {
    currentRound.status = "Voted B";
    currentRound.myBTally++;
    currentRound.myBTallyWeight += parseFloat(currentRound.voteValueB);
    currentRound.votesUsed = currentRound.voteValueB;
    currentRound.votesAvailable -= currentRound.voteValueB;
    currentRound.totalVotesUsed =
      currentRound.totalVotesAccrued - currentRound.votesAvailable;
  } else if (currentRound.abstained) {
    currentRound.status = "Abstained";
    currentRound.myAbstainTally++;
    currentRound.votesUsed = 0;
  }
  totalVotesUsedDisplay.innerText = currentRound.totalVotesUsed;
  roundsActiveDisplay.innerText = currentRound.roundsActive;
  activeStreakDisplay.innerText = currentRound.activeStreak;
  myATallyDisplay.innerText = currentRound.myATally;
  myATallyWeightDisplay.innerText = currentRound.myATallyWeight;
  myBTallyDisplay.innerText = currentRound.myBTally;
  myBTallyWeightDisplay.innerText = currentRound.myBTallyWeight;
  myAbstainTallyDisplay.innerText = currentRound.myAbstainTally;
};

const updateVotesAccrued = () => {
  if (currentRound.activeStreak >= currentRound.activeStreakThreshold) {
    currentRound.totalVotesAccrued += parseFloat(
      currentRound.activeStreakAccrualRate
    );
    currentRound.votesAccrued = currentRound.activeStreakAccrualRate;
  } else {
    currentRound.totalVotesAccrued += parseFloat(currentRound.voteAccrualRate);
    currentRound.votesAccrued = currentRound.voteAccrualRate;
  }
  currentRound.votesAvailable =
    currentRound.totalVotesAccrued - currentRound.totalVotesUsed;
  totalVotesAccruedDisplay.innerText = currentRound.totalVotesAccrued;
  votesAvailableDisplay.innerText = currentRound.votesAvailable;
};

const updateMissedRound = () => {
  currentRound.roundsMissed++;
  currentRound.status = "Missed";
  currentRound.activeStreak = 0;
  roundsMissedDisplay.innerText = currentRound.roundsMissed;
  activeStreakDisplay.innerText = currentRound.activeStreak;
};

const updatePlayerRates = () => {
  currentRound.myParticipationRate = `${Math.floor(
    (currentRound.roundsActive / currentRound.number) * 100
  )}%`;
  currentRound.myAVoteRate = `${Math.floor(
    (currentRound.myATally / currentRound.number) * 100
  )}%`;
  currentRound.myBVoteRate = `${Math.floor(
    (currentRound.myBTally / currentRound.number) * 100
  )}%`;
  currentRound.myAbstainVoteRate = `${Math.floor(
    (currentRound.myAbstainTally / currentRound.number) * 100
  )}%`;
  myParticipationRateDisplay.innerText = currentRound.myParticipationRate;
  myAVoteRateDisplay.innerText = currentRound.myAVoteRate;
  myBVoteRateDisplay.innerText = currentRound.myBVoteRate;
  myAbstainVoteRateDisplay.innerText = currentRound.myAbstainVoteRate;
};

const updateHistory = () => {
  let history = getElement("history-area");
  let stats = [
    `Round ${currentRound.number}`,
    `${currentRound.status}`,
    `${currentRound.votesAccrued} votes were accrued.`,
    `${currentRound.votesUsed} votes were used.`,
  ];
  let nodes = stats.map((stat) => {
    let p = document.createElement("p");
    p.textContent = stat;
    return p;
  });
  history.prepend(...nodes);
  historyArea.scrollTo({ top: 0, behavior: "smooth" });
};

const advanceRound = () => {
  currentRound.number++;
  currentRound.currentRoundWeight = currentRound.votesAvailable;
};

const disableVoteButtons = () => {
  addButtonA.setAttribute("disabled", true);
  addButtonB.setAttribute("disabled", true);
  subtractButtonA.setAttribute("disabled", true);
  subtractButtonB.setAttribute("disabled", true);
  maxButtonA.setAttribute("disabled", true);
  maxButtonB.setAttribute("disabled", true);
  voteValueA.setAttribute("disabled", true);
  voteValueB.setAttribute("disabled", true);
  voteButtonA.setAttribute("disabled", true);
  voteButtonB.setAttribute("disabled", true);
  abstainButton.setAttribute("disabled", true);
  nextRoundButton.classList.add("button-blink");
  if (window.innerWidth < 599) {
    nextRoundButton.classList.add("next-round-float");
  }
  window.scrollTo({ top: 595, behavior: "smooth" });
};

const players = {
  count: 99,
  quota: 0.51,
  totalPlayerVotes: 1000,
  quotaVotes: 510,
  roundResult: "",
};

const percentVotedDisplay = getElement("percent-voted");
const playersVotedADisplay = getElement("players-voted-a");
const playersAVotesDisplay = getElement("players-total-a-votes");
const playersVotedBDisplay = getElement("players-voted-b");
const playersBVotesDisplay = getElement("players-total-b-votes");
const playersAbstainedDisplay = getElement("players-total-abstained");
const playersMissedDisplay = getElement("players-total-missed");
const roundResultDisplay = getElement("round-result");

roundResultDisplay.innerText = "Waiting for vote...";

function playersResults() {
  let randParticipationRate = Math.floor(Math.random() * 100);
  if (randParticipationRate < 60) {
    randParticipationRate += 40;
  }
  let rand1 = Math.floor(Math.random() * 100);
  let rand2 = Math.floor(Math.random() * 100);
  let rand3 = Math.floor(Math.random() * 100);
  let randFactor = 100 / (rand1 + rand2 + rand3);
  let randVoteARate = Math.floor(rand1 * randFactor);
  let randVoteBRate = Math.floor(rand2 * randFactor);
  let randAbstainRate = 100 - (randVoteARate + randVoteBRate);

  let totalRoundVoters = Math.round(
    players.count * (randParticipationRate / 100)
  );
  let totalRoundMissers = players.count - totalRoundVoters;
  let totalAVoters = Math.round((totalRoundVoters * randVoteARate) / 100);
  let totalBVoters = Math.round((totalRoundVoters * randVoteBRate) / 100);
  let totalAbstainVoters = Math.round(
    (totalRoundVoters * randAbstainRate) / 100
  );

  let totalAVotes =
    totalAVoters * currentRound.voteAccrualRate + currentRound.voteValueA;
  let totalBVotes =
    totalBVoters * currentRound.voteAccrualRate + currentRound.voteValueB;

  if (currentRound.status == "Voted A") {
    totalAVoters++;
    totalRoundVoters++;
  } else if (currentRound.status == "Voted B") {
    totalBVoters++;
    totalRoundVoters++;
  } else if (currentRound.status == "Abstained") {
    totalAbstainVoters++;
    totalRoundVoters++;
  } else if (currentRound.status == "Missed") {
    totalRoundMissers++;
  }

  if (randParticipationRate + totalRoundMissers < 100) {
    totalRoundMissers += 100 - (randParticipationRate + totalRoundMissers);
  } else if (randParticipationRate + totalRoundMissers > 100) {
    totalRoundMissers -= randParticipationRate + totalRoundMissers - 100;
  }

  if (
    totalAVoters + totalBVoters + totalAbstainVoters <
    randParticipationRate
  ) {
    totalAbstainVoters +=
      randParticipationRate -
      (totalAVoters + totalBVoters + totalAbstainVoters);
  } else if (
    totalAVoters + totalBVoters + totalAbstainVoters >
    randParticipationRate
  ) {
    totalAbstainVoters -=
      totalAVoters + totalBVoters + totalAbstainVoters - randParticipationRate;
  }

  percentVotedDisplay.innerText = `Percent Active: ${randParticipationRate}%`;
  playersVotedADisplay.innerText = `Voted A: ${totalAVoters}`;
  playersAVotesDisplay.innerText = `(${totalAVotes})`;
  playersVotedBDisplay.innerText = `Voted B: ${totalBVoters}`;
  playersBVotesDisplay.innerText = `(${totalBVotes})`;
  playersAbstainedDisplay.innerText = `Abstained: ${totalAbstainVoters}`;
  playersMissedDisplay.innerText = `Missed: ${totalRoundMissers}`;

  if (totalAVotes >= players.quotaVotes) {
    players.roundResult = "A vote successful.";
  } else if (totalBVotes >= players.quotaVotes) {
    players.roundResult = "B vote successful.";
  } else if (
    totalAVotes < players.quotaVotes &&
    totalBVotes < players.quotaVotes
  ) {
    players.roundResult = "Vote failed. Quota not met.";
  }

  roundResultDisplay.innerText = players.roundResult;
}

voteButtonA.addEventListener("click", () => {
  checkA();
});

const castVoteA = () => {
  currentRound.voteValueA = +voteValueA.value;
  currentRound.votedA = true;
  disableVoteButtons();
  updateStats();
  playersResults();
  updateVotesAccrued();
  updatePlayerRates();
  updateHistory();
};

voteButtonB.addEventListener("click", () => {
  checkB();
});

const castVoteB = () => {
  currentRound.voteValueB = +voteValueB.value;
  currentRound.votedB = true;
  disableVoteButtons();
  updateStats();
  playersResults();
  updateVotesAccrued();
  updatePlayerRates();
  updateHistory();
};

abstainButton.addEventListener("click", () => {
  checkAbstain();
});

const castVoteAbstain = () => {
  currentRound.abstained = true;
  disableVoteButtons();
  updateStats();
  playersResults();
  updateVotesAccrued();
  updatePlayerRates();
  updateHistory();
};

nextRoundButton.addEventListener("click", () => {
  if (currentRound.votedA || currentRound.votedB || currentRound.abstained) {
    goToNextRound();
  } else {
    checkNextRound();
  }
});

const goToNextRound = () => {
  if (!currentRound.votedA && !currentRound.votedB && !currentRound.abstained) {
    updateMissedRound();
    playersResults();
    updatePlayerRates();
    updateHistory();
    advanceRound();
  } else {
    advanceRound();
  }
  roundNumberDisplay.innerText = currentRound.number;
  roundWeightDisplay.innerText = currentRound.currentRoundWeight;
  voteButtonA.setAttribute("disabled", true);
  voteButtonB.setAttribute("disabled", true);
  abstainButton.removeAttribute("disabled");
  nextRoundButton.classList.remove("button-blink", "next-round-float");
  voteButtonA.innerText = "Vote A";
  voteButtonB.innerText = "Vote B";
  voteValueA.value = "0";
  voteValueB.value = "0";
  voteValueA.removeAttribute("disabled");
  voteValueB.removeAttribute("disabled");
  subtractButtonA.setAttribute("disabled", true);
  subtractButtonB.setAttribute("disabled", true);
  addButtonA.removeAttribute("disabled");
  addButtonB.removeAttribute("disabled");
  maxButtonA.removeAttribute("disabled");
  maxButtonB.removeAttribute("disabled");
  currentRound.votedA = false;
  currentRound.votedB = false;
  currentRound.abstained = false;
  currentRound.votesAccrued = 0;
  currentRound.votesUsed = 0;
  currentRound.status = "";
  currentRound.voteValueA = 0;
  currentRound.voteValueB = 0;
  window.scrollTo({ top: 96, behavior: "smooth" });
  percentVotedDisplay.innerText = "";
  playersVotedADisplay.innerText = "";
  playersAVotesDisplay.innerText = "";
  playersVotedBDisplay.innerText = "";
  playersBVotesDisplay.innerText = "";
  playersAbstainedDisplay.innerText = "";
  playersMissedDisplay.innerText = "";
  roundResultDisplay.innerText = "Waiting for vote...";
};

addButtonA.addEventListener("click", () => {
  voteValueA.value = +voteValueA.value + 1;
  handleValueChangeA(voteValueA.value);
});

addButtonB.addEventListener("click", () => {
  voteValueB.value = +voteValueB.value + 1;
  handleValueChangeB(voteValueB.value);
});

subtractButtonA.addEventListener("click", () => {
  voteValueA.value = +voteValueA.value - 1;
  handleValueChangeA(voteValueA.value);
});

subtractButtonB.addEventListener("click", () => {
  voteValueB.value = +voteValueB.value - 1;
  handleValueChangeB(voteValueB.value);
});

maxButtonA.addEventListener("click", () => {
  voteValueA.value = +currentRound.votesAvailable;
  voteButtonA.removeAttribute("disabled");
  addButtonA.setAttribute("disabled", true);
  subtractButtonA.removeAttribute("disabled");
  maxButtonA.setAttribute("disabled", true);
});

maxButtonB.addEventListener("click", () => {
  voteValueB.value = +currentRound.votesAvailable;
  voteButtonB.removeAttribute("disabled");
  addButtonB.setAttribute("disabled", true);
  subtractButtonB.removeAttribute("disabled");
  maxButtonB.setAttribute("disabled", true);
});

const handleValueChangeA = (value) => {
  if (value <= 0) {
    subtractButtonA.setAttribute("disabled", true);
    voteButtonA.setAttribute("disabled", true);
  } else if (value < currentRound.votesAvailable) {
    subtractButtonA.removeAttribute("disabled");
    addButtonA.removeAttribute("disabled");
    maxButtonA.removeAttribute("disabled");
    voteButtonA.removeAttribute("disabled");
  } else if (value == currentRound.votesAvailable) {
    addButtonA.setAttribute("disabled", true);
    maxButtonA.setAttribute("disabled", true);
  } else {
    subtractButtonB.setAttribute("disabled", true);
  }
};

const handleValueChangeB = (value) => {
  if (value <= 0) {
    subtractButtonB.setAttribute("disabled", true);
    voteButtonB.setAttribute("disabled", true);
  } else if (value < currentRound.votesAvailable) {
    subtractButtonB.removeAttribute("disabled");
    addButtonB.removeAttribute("disabled");
    maxButtonB.removeAttribute("disabled");
    voteButtonB.removeAttribute("disabled");
  } else if (value == currentRound.votesAvailable) {
    addButtonB.setAttribute("disabled", true);
    maxButtonB.setAttribute("disabled", true);
  } else {
    subtractButtonB.setAttribute("disabled", true);
  }
};

voteValueA.addEventListener("input", function (e) {
  if (this.value > currentRound.votesAvailable) {
    this.value = currentRound.votesAvailable;
  }
  handleValueChangeA(e.target.value);
});

voteValueB.addEventListener("input", function (e) {
  if (this.value > currentRound.votesAvailable) {
    this.value = currentRound.votesAvailable;
  }
  handleValueChangeB(e.target.value);
});
