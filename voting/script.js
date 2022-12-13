let currentRoundNumber = 1;
let roundStatus = '';
let voteAccrualRate = 10;
let votesAccrued = 0;
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

const disableVoteButtons = () => {
  addButtonA.setAttribute('disabled', true);
  addButtonB.setAttribute('disabled', true);
  subtractButtonA.setAttribute('disabled', true);
  subtractButtonB.setAttribute('disabled', true);
  voteValueA.setAttribute('disabled', true);
  voteValueB.setAttribute('disabled', true);
  voteButtonA.setAttribute('disabled', true);
  voteButtonB.setAttribute('disabled', true);
  abstainButton.setAttribute('disabled', true);
  nextRoundButton.classList.add('button-glow');
}

const updateStats = () => {
  if (votedA == true) {
    roundsActive++;
    activeStreak++;
    roundStatus = 'Voted A';
    aTally++;
    aTallyWeight = parseFloat(aTallyWeight) + parseFloat(currentVoteValueA);
    votesUsed = currentVoteValueA;
    votesAvailable = votesAvailable - currentVoteValueA;
    totalVotesUsed = totalVotesAccrued - votesAvailable;
    if (activeStreak >= activeStreakThreshold) {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(activeStreakAccrualRate);
      votesAccrued = activeStreakAccrualRate;
    } 
    else {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(voteAccrualRate);
      votesAccrued = voteAccrualRate;
    }
    votesAvailable = totalVotesAccrued - totalVotesUsed;
  } else if (votedB == true) {
    roundsActive++;
    activeStreak++;
    roundStatus = 'Voted B';
    bTally++;
    bTallyWeight = parseFloat(bTallyWeight) + parseFloat(currentVoteValueB);
    votesUsed = currentVoteValueB;
    votesAvailable = votesAvailable - currentVoteValueB;
    totalVotesUsed = totalVotesAccrued - votesAvailable;
    if (activeStreak >= activeStreakThreshold) {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(activeStreakAccrualRate);
      votesAccrued = activeStreakAccrualRate;
    } 
    else {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(voteAccrualRate);
      votesAccrued = voteAccrualRate;
    }
    votesAvailable = totalVotesAccrued - totalVotesUsed;
  } else if (abstained == true) {
    roundsActive++;
    activeStreak++;
    roundStatus = 'Abstained';
    abstainTally++;
    votesUsed = 0;
    votesAvailable;
    totalVotesUsed;
    if (activeStreak >= activeStreakThreshold) {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(activeStreakAccrualRate);
      votesAccrued = activeStreakAccrualRate;
    } 
    else {
      totalVotesAccrued = parseFloat(totalVotesAccrued) + parseFloat(voteAccrualRate);
      votesAccrued = voteAccrualRate;
    }
    votesAvailable = totalVotesAccrued - totalVotesUsed;
  } else {
  }
  totalVotesAccruedDisplay.innerText = totalVotesAccrued;
  totalVotesUsedDisplay.innerText = totalVotesUsed;
  votesAvailableDisplay.innerText = votesAvailable;
  roundsActiveDisplay.innerText = roundsActive;
  activeStreakDisplay.innerText = activeStreak;
  aTallyDisplay.innerText = aTally;
  aTallyWeightDisplay.innerText = aTallyWeight;
  bTallyDisplay.innerText = bTally;
  bTallyWeightDisplay.innerText = bTallyWeight;
  abstainTallyDisplay.innerText = abstainTally;
}

const updateMissedRound = () => {
  roundsMissed++;
  roundStatus = 'Missed';
  activeStreak = 0;
  roundsMissedDisplay.innerText = roundsMissed;
  activeStreakDisplay.innerText = activeStreak;
}

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
}

const advanceRound = () => {
  currentRoundNumber++;
  currentRoundWeight = votesAvailable;
}

const ui = {
  confirm: async (message) => createConfirm(message)
};

const createConfirm = (message) => {
  return new Promise((complete, failed) => {
    $("#confirm-message").text(message);

    $("#confirm-yes").off("click");
    $("#confirm-no").off("click");

    $("#confirm-yes").on("click", () => {
      $(".confirm").hide();
      complete(true);
    });
    $("#confirm-no").on("click", () => {
      $(".confirm").hide();
      complete(false);
    });

    $(".confirm").show();
  });
};

const checkA = async () => {
  const confirm = await ui.confirm("Are you sure you want to vote for A?");
  if (confirm) {
    castVoteA();
  } else { 
  }
};

const checkB = async () => {
  const confirm = await ui.confirm("Are you sure you want to vote for B?");
  if (confirm) {
    castVoteB();
  } else {  
  }
};

const checkAbstain = async () => {
  const confirm = await ui.confirm("Are you sure you want to abstain?");
  if (confirm) {
    castVoteAbstain();
  } else { 
  }
};

const checkNextRound = async () => {
  const confirm = await ui.confirm("Are you sure you want to miss this round?");
  if (confirm) {
    goToNextRound();
  } else { 
  }
};

/*
const getAbsoluteDistance = (a, b) => {
  return Math.abs(a - b);
}
*/
