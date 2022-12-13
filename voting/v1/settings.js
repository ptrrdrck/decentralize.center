let newVoteAccrualRate = 0;
let newActiveStreakThreshold = 0;
let newActiveStreakAccrualRate = 0;

const voteAccrualRateInput = document.getElementById('vote-accrual-rate-input');
const activeStreakThresholdInput = document.getElementById('active-streak-threshold-input');
const activeStreakAccrualRateInput = document.getElementById('active-streak-accrual-rate-input');

const rateSetButton = document.getElementById('rate-set-button');
const thresholdSetButton = document.getElementById('threshold-set-button');
const streakRateSetButton = document.getElementById('streak-rate-set-button');

voteAccrualRateInput.addEventListener('change', function(e) { 
  newVoteAccrualRate = e.target.value; 
});

const setVoteAccrualRate = () => {
  voteAccrualRate = newVoteAccrualRate;
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