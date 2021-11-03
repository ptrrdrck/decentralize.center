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
  },
  two: {
    "--primaryColor": "hsla(203, 100%, 74%, 1)",
    "--secondaryColor": "hsla(81, 80%, 16%, 1)",
    "--filterColor": "hue-rotate(100deg)"
  },
  three: {
    "--primaryColor": "hsla(39, 100%, 71%, 1)",
    "--secondaryColor": "hsla(261, 80%, 16%, 1)",
    "--filterColor": "hue-rotate(280deg)"
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