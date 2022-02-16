const img = document.querySelector(".uploaded-img");
const body = document.querySelector("body");
const imgInp = document.querySelector(".img-inp");
const palettesSec = document.querySelector(".palettes-sec");
const uploadLabel = document.querySelector(".upload-label");

imgInp.addEventListener("input", handleImageInput);

let colorsArr = [];
let uploadLabelContent = uploadLabel.innerHTML;

function handleImageInput(e) {
  img.src = URL.createObjectURL(e.target.files[0]);
  
  const colorThief = new ColorThief();

  img.addEventListener("load", function () {
    colorsArr = colorThief.getPalette(img, 5);
    displayPalettes();
  });
}

function displayPalettes() {
  palettesSec.innerHTML = "";

  for (let i = 0; i < colorsArr.length; i++) {
    const paletteColorBox = document.createElement("div");
    paletteColorBox.className = "palette-color-box";
    paletteColorBox.style.backgroundColor = `rgb(${colorsArr[i].toString()})`;
    palettesSec.appendChild(paletteColorBox);

    const paletteColorText = document.createElement("div");
    paletteColorText.className = "palette-color-text";
    paletteColorText.innerText = rgbToHex(colorsArr[i][0], colorsArr[i][1], colorsArr[i][2]);
    paletteColorBox.appendChild(paletteColorText);

    copyColor();
  }
}

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function copyColor(){
  const paletteColorTexts = document.querySelectorAll('.palette-color-text');

  paletteColorTexts.forEach(paletteColorText =>{
    paletteColorText.addEventListener('click',()=>{
      navigator.clipboard.writeText(paletteColorText.innerText);

      uploadLabel.innerHTML='Copied';
      setTimeout(()=>{
        uploadLabel.innerHTML=uploadLabelContent;
      },1000)
    })
  })
}

