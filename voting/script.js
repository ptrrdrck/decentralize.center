/* 
Button click confirmations
*/
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
  }
};

const checkB = async () => {
  const confirm = await ui.confirm("Are you sure you want to vote for B?");
  if (confirm) {
    castVoteB();
  }
};

const checkAbstain = async () => {
  const confirm = await ui.confirm("Are you sure you want to abstain?");
  if (confirm) {
    castVoteAbstain();
  }
};

const checkNextRound = async () => {
  const confirm = await ui.confirm("Are you sure you want to miss this round?");
  if (confirm) {
    goToNextRound();
  }
};

/* 
Content tabbing
*/
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
			if (tab.dataset.actabId === id) {
				tab.classList.add("accordion-active");
			} else {
				tab.classList.remove("accordion-active");
			}
		}
	});

	labels.forEach(function (label) {
		const tabItem = label.parentElement;

		if (tabItem.dataset.actabGroup === group) {
			if (tabItem.dataset.actabId === id) {
				tabItem.classList.add("accordion-active");
			} else {
				tabItem.classList.remove("accordion-active");
			}
		}
	});
}

labels.forEach(function (label) {
	label.addEventListener("click", toggleShow);
});

tabs.forEach(function (tab) {
	tab.addEventListener("click", toggleShow);
});

/*
const getAbsoluteDistance = (a, b) => {
  return Math.abs(a - b);
}
*/