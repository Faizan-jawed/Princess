let highestZ = 1;

class Paper {
    holdingPaper = false;
    preMouseX = 0;
    preMouseY = 0;
    mouseX = 0;
    mouseY = 0;
    velocityX = 0;
    velocityY = 0;
    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        // When the user starts holding the paper
        paper.addEventListener('mousedown', (e) => {
            if (e.button === 0) { // Left mouse button
                this.holdingPaper = true;

                // Bring the paper to the front
                paper.style.zIndex = highestZ;
                highestZ += 1;

                // Initialize mouse positions
                this.preMouseX = e.clientX;
                this.preMouseY = e.clientY;

                console.log('Mouse down on paper');
            }
        });

        // Handle dragging the paper
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.velocityX = this.mouseX - this.preMouseX;
            this.velocityY = this.mouseY - this.preMouseY;

            if (this.holdingPaper) {
                this.currentPaperX += this.velocityX;
                this.currentPaperY += this.velocityY;

                this.preMouseX = this.mouseX;
                this.preMouseY = this.mouseY;

                paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
            }
        });

        // When the user releases the paper
        window.addEventListener('mouseup', () => {
            if (this.holdingPaper) {
                this.holdingPaper = false;
                console.log('Mouse button released');
                this.holdingPaper = false;

            }
        });
    }
}

// Initialize all draggable papers
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
    const p = new Paper();
    p.init(paper);
});
