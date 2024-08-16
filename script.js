import { Slider } from "./slider.js"

const images = []

for (let i = 1; i <= 10; i++) {
    images.push(`https://picsum.photos/1920/1080?random=${i}`)
}

window.slider = new Slider(".slides", images)

window.slider.addImageIndexCallback((index) => {
    document.querySelector("#display-text").innerText = `Billede ${index + 1}`
})

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        slider.prevSlide()
    }

    if (event.key === "ArrowRight") {
        slider.nextSlide()
    }
})

alert(
    `FYI så lagger det lidt første gang man går igennem, men efter det kan jeg hvertfald ikke se seams
Det kan være billederne loader, idk orkede hellere ikke fikse det`
)
