document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const questionSection = document.getElementById('question-section');
    const celebrationSection = document.getElementById('celebration-section');
    const container = document.querySelector('.container');

    // Make the "No" button run away
    noBtn.addEventListener('mouseover', () => {
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate maximum allowed positions within the container with a buffer
        const buffer = 30; // 30px buffer from edges
        const maxX = containerRect.width - btnRect.width - buffer;
        const maxY = containerRect.height - btnRect.height - buffer;

        // Ensure we have space to move
        if (maxX > 0 && maxY > 0) {
            const randomX = Math.max(10, Math.floor(Math.random() * maxX));
            const randomY = Math.max(10, Math.floor(Math.random() * maxY));

            // Apply new position
            noBtn.style.position = 'absolute';
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;

            // Optional: Fun text changes
            const funTexts = ["Nope 🏃", "Too slow!", "Can't catch me!", "Try again! 😜", "Not happening!"];
            noBtn.innerText = funTexts[Math.floor(Math.random() * funTexts.length)];
        }
    });

    // Handle "Yes" button click
    yesBtn.addEventListener('click', () => {
        // 1. Launch Confetti
        launchConfetti();

        // 2. Hide Buttons only (Keep the question visible as requested)
        document.querySelector('.buttons').style.display = 'none';

        // 3. Show Celebration
        celebrationSection.classList.remove('hidden');
        celebrationSection.classList.add('reveal-anim');

        // Optional: Trigger more confetti for a few seconds
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            launchConfetti();
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });

    function launchConfetti() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff8fa3', '#d32f2f', '#ffffff'] // Custom colors
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff8fa3', '#d32f2f', '#ffffff']
        });
    }

    // Post Box Logic
    const postBox = document.querySelector('.post-box');
    if (postBox) {
        postBox.addEventListener('click', () => {
            postBox.classList.toggle('open');
        });
    }

    // Floating Gallery Logic
    const galleryContainer = document.getElementById('gallery-container');
    const imageUrls = [
        "image/simran1.png",
        "image/simran2.png",
        "image/simran3.png",
        "image/simran4.png",
        "image/simran5.png",
        "image/simran6.png",
        "image/simran7.png",
        "image/simran8.png"
    ];

    function createFloatingPhoto() {
        const photo = document.createElement('div');
        photo.classList.add('floating-photo');

        // Random Frame Style
        const frameStyles = ['', 'frame-curvy', 'frame-fancy', 'frame-messy'];
        const randomStyle = frameStyles[Math.floor(Math.random() * frameStyles.length)];
        if (randomStyle) photo.classList.add(randomStyle);

        const img = document.createElement('img');
        img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        photo.appendChild(img);

        // Random Position & Rotation
        const startX = Math.random() * 90; // 0% to 90% view width
        const startY = Math.random() * 90; // 0% to 90% view height
        const rotation = (Math.random() * 30) - 15; // -15deg to +15deg
        const delay = Math.random() * 5; // 0-5s delay
        const duration = 15 + Math.random() * 10; // 15-25s duration

        photo.style.left = `${startX}%`;
        photo.style.top = `${startY}%`;
        photo.style.setProperty('--rotation', `${rotation}deg`);
        photo.style.animationDuration = `${duration}s`;
        photo.style.animationDelay = `${delay}s`;

        makeDraggable(photo);
        galleryContainer.appendChild(photo);
    }

    // Spawn existing photos
    for (let i = 0; i < 8; i++) {
        createFloatingPhoto();
    }

    // Drag Logic
    function makeDraggable(element) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;

            // Stop floating animation so it doesn't fight the drag
            element.style.animation = 'none';
            element.style.zIndex = '100'; // Bring to front

            startX = e.clientX;
            startY = e.clientY;

            // Get current position (computed style handles percentage conversion better)
            const rect = element.getBoundingClientRect();
            // We need to work in absolute pixels to prevent jumping, 
            // but we'll stick to offsetting the current style for simplicity
            initialLeft = element.offsetLeft;
            initialTop = element.offsetTop;

            element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent text selection

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            element.style.left = `${initialLeft + dx}px`;
            element.style.top = `${initialTop + dy}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'grab';
                element.style.zIndex = ''; // Reset z-index (or keep it high if preferred)
            }
        });
    }
});
