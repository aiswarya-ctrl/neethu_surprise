document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    const nextBtn = document.getElementById('nextBtn');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    nextBtn.addEventListener('click', () => {
        step1.classList.remove('active');
        setTimeout(() => {
            step2.classList.add('active');
        }, 500); // Wait for transition
    });

    // Make the NO button run away
    noBtn.addEventListener('mouseover', function() {
        const maxX = window.innerWidth - this.clientWidth - 40;
        const maxY = window.innerHeight - this.clientHeight - 40;
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        this.style.position = 'fixed';
        this.style.left = randomX + 'px';
        this.style.top = randomY + 'px';
        this.style.zIndex = '100';
    });

    yesBtn.addEventListener('click', () => {
        step2.classList.remove('active');
        
        // Save Neethu's confession to MongoDB
        fetch('/api/confession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reaction: 'Yes, I am a monkey! 🐒' })
        })
        .then(res => res.json())
        .then(data => console.log('Server response:', data))
        .catch(err => console.error('Error recording response:', err));

        setTimeout(() => {
            step3.classList.add('active');
            createConfetti();
        }, 500);
    });

    function createConfetti() {
        const colors = ['#FFC312', '#C4E538', '#12CBC4', '#FDA7DF', '#ED4C67', '#F79F1F', '#A3CB38', '#1289A7', '#D980FA', '#B53471'];
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Randomly make some circular
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 6000);
        }
    }
});
