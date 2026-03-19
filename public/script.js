document.addEventListener('DOMContentLoaded', () => {
    // Array of all steps
    const steps = [
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4'),
        document.getElementById('step5')
    ];

    const nextBtn = document.getElementById('nextBtn');
    
    // Step 1 -> Step 2
    nextBtn.addEventListener('click', () => {
        steps[0].classList.remove('active');
        setTimeout(() => {
            steps[1].classList.add('active');
        }, 500); // Wait for transition
    });

    // Make ALL "No" buttons run away
    const noBtns = document.querySelectorAll('.no-btn');
    noBtns.forEach(btn => {
        btn.addEventListener('mouseover', function() {
            const maxX = window.innerWidth - this.clientWidth - 40;
            const maxY = window.innerHeight - this.clientHeight - 40;
            
            const randomX = Math.max(20, Math.floor(Math.random() * maxX));
            const randomY = Math.max(20, Math.floor(Math.random() * maxY));
            
            this.style.position = 'fixed';
            this.style.left = randomX + 'px';
            this.style.top = randomY + 'px';
            this.style.zIndex = '100';
        });
    });

    // Handle all "Yes" buttons progressing to the next step
    const yesBtns = document.querySelectorAll('.yes-btn');
    yesBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const currentStep = steps[index + 1]; // Because yesBtns start at index 0 which corresponds to step2
            const nextStep = steps[index + 2];
            
            currentStep.classList.remove('active');
            
            if (index === yesBtns.length - 1) {
                // Last question answered! Confession complete.
                fetch('/api/confession', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reaction: 'Confessed to being a monkey, eating bananas all day, and escaping to the jungle! 🐒🍌🌳' })
                })
                .then(res => res.json())
                .catch(err => console.error('Error recording response:', err));

                setTimeout(() => {
                    nextStep.classList.add('active');
                    createConfetti();
                }, 500);
            } else {
                // Progress to the next middle question
                setTimeout(() => {
                    nextStep.classList.add('active');
                }, 500);
            }
        });
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
