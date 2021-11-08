function renderEthPrice(data) {
  const price = document.getElementById("ethprice");
  price.innerHTML = data.ethusd;
}

fetch("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=JM7KNW3YVXNSH1YY93PBQH3B7FIXI1HEE3")
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderEthPrice(data);
    });


const themes = {
  zero: {
    "--primaryColor": "rgba(255, 255, 255, 1)",
    "--secondaryColor": "rgba(0, 0, 0, 1)",
    "--filterColor": "grayscale(1)"
  },
  one: {
    "--primaryColor": "rgba(0, 0, 0, 1)",
    "--secondaryColor": "rgba(255, 255, 255, 1)",
    "--filterColor": "invert(1)"
  }
};

var themesIndex = 0;

document.getElementById("change").addEventListener("click", function () {
  themesIndex++;
  var themeCount = Object.keys(themes).length;
  themesIndex = themesIndex <= themeCount - 1 ? themesIndex : 0;
  var theme = themes[Object.keys(themes)[themesIndex]];
  change(theme);
});

function change(theme) {
  for (let prop in theme) {
    document.querySelector(":root").style.setProperty(prop, theme[prop]);
  }
}