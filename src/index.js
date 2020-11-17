import imgWebpack from "./assets/images/img_webpack.png"
import "./assets/scss/style.scss"

function createImgElement() {
  const imgElement = document.createElement("img")
  imgElement.src = imgWebpack
  imgElement.alt = "webpack từ A đến Á cùng kentrung"
  return imgElement
}

document.getElementById("root").appendChild(createImgElement())

var author = "kentrung"
console.log("Webpack từ A đến Á cùng " + author)

// import 'bootstrap'
// import sum from '@src/my-test';

// $(document).ready(function () {
//     $('.carousel').carousel({
//         interval: 1000,
//         ride: 'carousel'
//     })
//     sum();
// })