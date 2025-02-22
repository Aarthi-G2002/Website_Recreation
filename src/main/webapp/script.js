 		const welcomeContainer = document.getElementById('welcomeContainer');
        const hero = document.getElementById('hero');

       
        gsap.fromTo(welcomeContainer, 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );

        
        gsap.to(welcomeContainer, {
            opacity: 0,
            delay: 2,
            duration: 1,
            ease: "power2.in",
            onComplete: () => {
                welcomeContainer.style.display = 'none'; 

                
                gsap.to(hero, {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                });
            }
        });

       
        const images = document.querySelectorAll('.image');

        images.forEach(image => {
            image.dataset.original = image.style.backgroundImage;

            let isHovered = false;

           
            image.addEventListener('mouseenter', () => {
                isHovered = true;
                images.forEach(otherImage => {
                    if (otherImage !== image) {
                        gsap.to(otherImage, { opacity: 0, duration: 0.5 });
                        otherImage.classList.add('inactive');
                        otherImage.style.backgroundImage = "url('image/border.png')";
                        gsap.to(otherImage, { opacity: 1, duration: 0.5 });
                    }
                });

                gsap.to(image, { opacity: 1, duration: 0.5 });
                image.classList.add('active');
            });

            
            image.addEventListener('mouseleave', () => {
                isHovered = false;
                images.forEach(otherImage => {
                    gsap.to(otherImage, { opacity: 1, duration: 0.5 });
                    otherImage.classList.remove('inactive');
                    otherImage.classList.remove('active');
                    otherImage.style.backgroundImage = otherImage.dataset.original;
                });

               
                gsap.to(image, { x: 0, y: 0, duration: 0.3 });
                const text = image.querySelector('.image-text');
                const desc = image.querySelector('.image-desc');
                gsap.to([text, desc], { x: 0, y: 0, duration: 0.3 });
            });

            
            image.addEventListener('mousemove', (e) => {
                if (isHovered) {
                    const rect = image.getBoundingClientRect();
                    const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.2; // Adjust sensitivity
                    const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.2;

                 
                    gsap.to(image, { x: offsetX, y: offsetY, duration: 0.3, ease: "power2.out" });
                    const text = image.querySelector('.image-text');
                    const desc = image.querySelector('.image-desc');
                    gsap.to([text, desc], { x: offsetX, y: offsetY, duration: 0.3, ease: "power2.out" });
                }
            });
        });