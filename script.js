// Function to animate the circular progress
function animateProgress(progressElement) {
    let progressValue = progressElement.querySelector('.progress-value');
    let targetValue = parseInt(progressElement.getAttribute('data-progress'));
    let currentValue = 0;
    let speed = 20; // Adjust speed as needed

    let progressAnimation = setInterval(() => {
        currentValue++;
        progressValue.textContent = `${currentValue}%`;

        // Update circular progress bar (conic-gradient)
        progressElement.style.background = `conic-gradient(
            #5B99C2 ${currentValue * 3.6}deg,
            #ededed 0deg
        )`;

        if (currentValue >= targetValue) {
            clearInterval(progressAnimation);
        }
    }, speed);
}

// Observer callback function
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start the animation when the element is in the viewport
            let progressElement = entry.target.querySelector('.circular-progress');
            animateProgress(progressElement);

            // Optional: Unobserve after the animation if you only want to animate once
            // observer.unobserve(entry.target);
        }
    });
}

// Create the observer
let options = {
    root: null, // viewport
    threshold: 0.1 // 10% of the element is visible
};
let observer = new IntersectionObserver(handleIntersection, options);

// Apply the observer to each skill progress container
document.querySelectorAll('.progress').forEach(progress => {
    observer.observe(progress);
});
