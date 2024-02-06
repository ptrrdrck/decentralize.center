/* © 2023 Peter Rodrick <pete@lftlc.xyz> */

const ui = {
  confirm: async (message) => createConfirm(message),
};

function createConfirm(message) {
  return new Promise((resolve, reject) => {
    $("#confirm-message").text(message);

    $("#confirm-yes").off("click");
    $("#confirm-no").off("click");

    $("#confirm-yes").on("click", () => {
      $(".confirm").hide();
      resolve(true);
    });
    $("#confirm-no").on("click", () => {
      $(".confirm").hide();
      resolve(false);
    });

    $(".confirm").show();
  });
}

async function checkVote(confirmMessage, voteFunction) {
  const confirm = await ui.confirm(confirmMessage);
  if (confirm) {
    voteFunction();
  }
}

const checkA = () => {
  checkVote("Are you sure you want to vote for A?", castVoteA);
};

const checkB = () => {
  checkVote("Are you sure you want to vote for B?", castVoteB);
};

const checkAbstain = () => {
  checkVote("Are you sure you want to abstain?", castVoteAbstain);
};

const checkNextRound = () => {
  checkVote("Are you sure you want to miss this round?", goToNextRound);
};

const labels = document.querySelectorAll(".accordion-item__label");
const tabs = document.querySelectorAll(".accordion-tab");

function toggleShow() {
  const target = this;
  const item = target.classList.contains("accordion-tab")
    ? target
    : target.parentElement;
  const group = item.dataset.actabGroup;
  const id = item.dataset.actabId;

  tabs.forEach(function (tab) {
    if (tab.dataset.actabGroup === group) {
      tab.classList.toggle("accordion-active", tab.dataset.actabId === id);
    }
  });

  labels.forEach(function (label) {
    const tabItem = label.parentElement;

    if (tabItem.dataset.actabGroup === group) {
      tabItem.classList.toggle(
        "accordion-active",
        tabItem.dataset.actabId === id
      );
    }
  });
}

labels.forEach(function (label) {
  label.addEventListener("click", toggleShow);
});

tabs.forEach(function (tab) {
  tab.addEventListener("click", toggleShow);
});
