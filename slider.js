/* Taken from Stackoverflow (can't remember the link) */
const injectCSS = (css) => {
    const styleElement = document.createElement("style")
    styleElement.type = "text/css"
    styleElement.innerText = css
    document.head.appendChild(styleElement)
    return styleElement
}

injectCSS(`
    .custom-slider {
        display: flex;
        overflow-x: hidden;
        scroll-snap-type: x mandatory;
        -webkit-scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
    }
    
    .custom-slider img {
        width: 75%;
        scroll-snap-align: center;
        -webkit-scroll-snap-align: center;
        object-fit: cover;
    }
`)

export class Slider {
    #imageCallbacks = []

    constructor(selector, images) {
        if (
            !selector ||
            !images ||
            !Array.isArray(images) ||
            images.length === 0
        ) {
            throw new Error("You need to specify the arguments correctly.")
        }

        this.parentElement = document.querySelector(selector)
        if (!this.parentElement) {
            throw new Error("Could not find element.")
        }

        this.images = images
        this.imageElements = []
        this.currentImageIndex = 0

        this.#init()
    }

    addImageIndexCallback(callback) {
        this.#imageCallbacks.push(callback)
    }

    #init() {
        this.parentElement.classList.add("custom-slider")

        const fragment = document.createDocumentFragment()

        this.#createImageElement(this.images[1], fragment)
        this.#createImageElement(this.images[this.images.length - 1], fragment)
        this.images.forEach((image) =>
            this.#createImageElement(image, fragment)
        )
        this.#createImageElement(this.images[0], fragment)
        this.#createImageElement(this.images[1], fragment)

        this.parentElement.appendChild(fragment)

        window.addEventListener("load", () => {
            this.#resetScroll(
                this.imageElements[0].offsetWidth +
                    this.imageElements[1].offsetWidth
            )
        })
    }

    #createImageElement(src, fragment) {
        const imgElement = document.createElement("img")
        imgElement.src = src
        fragment.appendChild(imgElement)
        this.imageElements.push(imgElement)
    }

    nextSlide() {
        const slideWidth = this.imageElements[0].offsetWidth

        if (
            this.parentElement.scrollLeft >=
            this.parentElement.scrollWidth - slideWidth * 4
        ) {
            const resetPosition = slideWidth * 1
            this.#resetScroll(resetPosition)
            this.parentElement.scrollLeft += slideWidth
        } else {
            this.parentElement.scrollLeft += slideWidth
        }

        this.#setImageIndex((this.currentImageIndex + 1) % this.images.length)
    }

    prevSlide() {
        const slideWidth = this.imageElements[0].offsetWidth

        if (this.parentElement.scrollLeft <= slideWidth * 1) {
            const resetPosition =
                this.parentElement.scrollWidth - slideWidth * 3
            this.#resetScroll(resetPosition)
            this.parentElement.scrollLeft -= slideWidth
        } else {
            this.parentElement.scrollLeft -= slideWidth
        }

        this.#setImageIndex(
            (this.currentImageIndex - 1 + this.images.length) %
                this.images.length
        )
    }

    #setImageIndex(index) {
        this.currentImageIndex = index

        this.#imageCallbacks.forEach((callback) =>
            callback(this.currentImageIndex)
        )
    }

    #resetScroll(position) {
        this.parentElement.style.scrollBehavior = "auto"
        this.parentElement.scrollLeft = position
        this.parentElement.style.scrollBehavior = "smooth"
    }
}
