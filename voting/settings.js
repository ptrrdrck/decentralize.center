let antiDictatorStatus = true;
let newVoteAccrualRate = 0;
let newActiveStreakThreshold = 0;
let newActiveStreakAccrualRate = 0;

const antiDictatorInput = document.getElementById('anti-dictator-input');
const voteAccrualRateInput = document.getElementById('vote-accrual-rate-input');
const activeStreakThresholdInput = document.getElementById('active-streak-threshold-input');
const activeStreakAccrualRateInput = document.getElementById('active-streak-accrual-rate-input');

const antiDictatorText = document.getElementById('anti-text');
const rateSetButton = document.getElementById('rate-set-button');
const thresholdSetButton = document.getElementById('threshold-set-button');
const streakRateSetButton = document.getElementById('streak-rate-set-button');

antiDictatorInput.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    antiDictatorInput.setAttribute('checked', true);
    antiDictatorStatus = true;
    antiDictatorText.textContent = "On";
  } else {
    antiDictatorInput.removeAttribute('checked');
    antiDictatorStatus = false;
    antiDictatorText.textContent = "Off"
  } 
});

voteAccrualRateInput.addEventListener('change', function(e) { 
  newVoteAccrualRate = e.target.value; 
});

const setVoteAccrualRate = () => {
  voteAccrualRate = newVoteAccrualRate;
  totalPlayerVotes = (players + 1) * voteAccrualRate;
  quotaVotes = totalPlayerVotes * quota;
  rateSetButton.setAttribute('onclick', 'resetVoteAccrualRate()');
  rateSetButton.textContent = 'Reset';
}

const resetVoteAccrualRate = () => {
  voteAccrualRate = 10;
  rateSetButton.setAttribute('onclick', 'setVoteAccrualRate()');
  rateSetButton.textContent = 'Set';
  voteAccrualRateInput.value = 10;
}

activeStreakThresholdInput.addEventListener('change', function(e) { 
  newActiveStreakThreshold = e.target.value; 
});

const setActiveStreakThreshold = () => {
  activeStreakThreshold = newActiveStreakThreshold;
  thresholdSetButton.setAttribute('onclick', 'resetActiveStreakThreshold()');
  thresholdSetButton.textContent = 'Reset';
}

const resetActiveStreakThreshold = () => {
  activeStreakThreshold = 10;
  thresholdSetButton.setAttribute('onclick', 'setActiveStreakThreshold()');
  thresholdSetButton.textContent = 'Set';
  activeStreakThresholdInput.value = 10;
}

activeStreakAccrualRateInput.addEventListener('change', function(e) { 
  newActiveStreakAccrualRate = e.target.value; 
});

const setActiveStreakAccrualRate = () => {
  activeStreakAccrualRate = newActiveStreakAccrualRate;
  streakRateSetButton.setAttribute('onclick', 'resetActiveStreakAccrualRate()');
  streakRateSetButton.textContent = 'Reset';
}

const resetActiveStreakAccrualRate = () => {
  activeStreakAccrualRate = 20;
  streakRateSetButton.setAttribute('onclick', 'setActiveStreakAccrualRate()');
  streakRateSetButton.textContent = 'Set';
  activeStreakAccrualRateInput.value = 20;
}