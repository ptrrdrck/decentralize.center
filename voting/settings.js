/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const antiDictatorStatus = {
  value: true,
  input: document.getElementById("anti-dictator-input"),
  text: document.getElementById("anti-text"),
  updateStatus: function () {
    if (this.input.checked) {
      this.value = true;
      this.text.textContent = "On";
    } else {
      this.value = false;
      this.text.textContent = "Off";
    }
  },
};

const newVoteAccrualRate = {
  value: 0,
  input: document.getElementById("vote-accrual-rate-input"),
  button: document.getElementById("rate-set-button"),
  setRate: function () {
    currentRound.voteAccrualRate = this.value;
    players.totalPlayerVotes =
      (players.count + 1) * currentRound.voteAccrualRate;
    players.quotaVotes = players.totalPlayerVotes * players.quota;
    newVoteAccrualRate.button.setAttribute(
      "onclick",
      "newVoteAccrualRate.resetRate()"
    );
    newVoteAccrualRate.button.textContent = "Reset";
  },
  resetRate: function () {
    currentRound.voteAccrualRate = 10;
    newVoteAccrualRate.button.setAttribute(
      "onclick",
      "newVoteAccrualRate.setRate()"
    );
    newVoteAccrualRate.button.textContent = "Set";
    this.input.value = 10;
  },
};

const newActiveStreakThreshold = {
  value: 0,
  input: document.getElementById("active-streak-threshold-input"),
  button: document.getElementById("threshold-set-button"),
  setThreshold: function () {
    currentRound.activeStreakThreshold = this.value;
    newActiveStreakThreshold.button.setAttribute(
      "onclick",
      "newActiveStreakThreshold.resetThreshold()"
    );
    newActiveStreakThreshold.button.textContent = "Reset";
  },
  resetThreshold: function () {
    currentRound.activeStreakThreshold = 10;
    newActiveStreakThreshold.button.setAttribute(
      "onclick",
      "newActiveStreakThreshold.setThreshold()"
    );
    newActiveStreakThreshold.button.textContent = "Set";
    this.input.value = 10;
  },
};

const newActiveStreakAccrualRate = {
  value: 0,
  input: document.getElementById("active-streak-accrual-rate-input"),
  button: document.getElementById("streak-rate-set-button"),
  setRate: function () {
    currentRound.activeStreakAccrualRate = this.value;
    newActiveStreakAccrualRate.button.setAttribute(
      "onclick",
      "newActiveStreakAccrualRate.resetRate()"
    );
    newActiveStreakAccrualRate.button.textContent = "Reset";
  },
  resetRate: function () {
    currentRound.activeStreakAccrualRate = 20;
    newActiveStreakAccrualRate.button.setAttribute(
      "onclick",
      "newActiveStreakAccrualRate.setRate()"
    );
    newActiveStreakAccrualRate.button.textContent = "Set";
    this.input.value = 20;
  },
};

antiDictatorStatus.input.addEventListener("change", () => {
  antiDictatorStatus.updateStatus();
});

newVoteAccrualRate.input.addEventListener("change", (e) => {
  newVoteAccrualRate.value = e.target.value;
});

newActiveStreakThreshold.input.addEventListener("change", (e) => {
  newActiveStreakThreshold.value = e.target.value;
});

newActiveStreakAccrualRate.input.addEventListener("change", (e) => {
  newActiveStreakAccrualRate.value = e.target.value;
});
