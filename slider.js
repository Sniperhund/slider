const injectCSS = (css) => {
    let el = document.createElement("style")
    el.type = "text/css"
    el.innerText = css
    document.head.appendChild(el)
    return el
}

/** Slider class */
export class Slider {
    /**
     *
     * @param {string} selector - The selector for a slider div or section
     * @param {string[i]} images
     */
    constructor(selector, images) {
        if (
            !selector ||
            !images ||
            !Array.isArray(images) ||
            images.length < 0
        ) {
            throw new Error("You need to specify the arguments correctly")
        }

        this.parentElement = document.querySelector(selector)

        if (!this.parentElement) {
            throw new Error("Could not find element")
        }

        this.images = images
        this.imageObjects = []

        this.#init()
    }

    #init() {
        injectCSS(`
            .custom-slider {
                display: flex;
                overflow-x: hidden;

                scroll-snap-type: x mandatory;
                -webkit-scroll-snap-type: x mandatory;
                scroll-behavior: smooth;

                img {
                    width: 100%;
                    scroll-snap-align: center;
                    -webkit-scroll-snap-align: center;

                    object-fit: cover;
                }
            }
            `)

        this.parentElement.classList.add("custom-slider")
        console.log(this.parentElement)

        this.images.forEach((image, i) => {
            const imageElement = document.createElement("img")

            imageElement.src = image

            this.parentElement.appendChild(imageElement)

            this.imageObjects.push(imageElement)
        })

        const imageElement = document.createElement("img")

        imageElement.src = this.images[0]

        this.parentElement.appendChild(imageElement)

        this.imageObjects.push(imageElement)
    }

    nextSlide() {
        if (
            this.parentElement.scrollLeft +
                this.imageObjects[this.imageObjects.length - 1].offsetWidth ==
            this.parentElement.scrollWidth
        ) {
            this.parentElement.style.scrollBehavior = "auto"
            this.parentElement.scrollLeft = 0
            this.parentElement.style.scrollBehavior = "smooth"

            this.nextSlide()
        } else {
            this.parentElement.scrollLeft += this.imageObjects[0].offsetWidth
        }
    }

    prevSlide() {
        if (this.parentElement.scrollLeft == 0) {
            this.parentElement.style.scrollBehavior = "auto"
            this.parentElement.scrollLeft =
                this.parentElement.scrollWidth -
                this.imageObjects[this.imageObjects.length - 1].offsetWidth
            this.parentElement.style.scrollBehavior = "smooth"

            this.prevSlide()
        } else {
            this.parentElement.scrollLeft -= this.imageObjects[0].offsetWidth
        }
    }
}
