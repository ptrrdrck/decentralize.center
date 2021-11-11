const themes = {
  light: {
    "--primaryColor": "rgba(255, 255, 255, 1)",
    "--secondaryColor": "rgba(0, 0, 0, 1)",
    "--filterColor": "grayscale(1)"
  },
  dark: {
    "--primaryColor": "rgba(0, 0, 0, 1)",
    "--secondaryColor": "rgba(255, 255, 255, 1)",
    "--filterColor": "grayscale(1) invert(1)"
  }
};

var themesIndex = 0;

function change(theme) {
  for (let prop in theme) {
    document.querySelector(":root").style.setProperty(prop, theme[prop]);
  }
}

document.getElementById("change").addEventListener("click", function () {
  themesIndex++;
  var themeCount = Object.keys(themes).length;
  themesIndex = themesIndex <= themeCount - 1 ? themesIndex : 0;
  var theme = themes[Object.keys(themes)[themesIndex]];
  change(theme);
});