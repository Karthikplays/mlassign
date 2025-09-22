// Presentation controller - Compatible with older browsers
(function() {
    'use strict';
    
    // State variables
    var currentSlide = 1;
    var totalSlides = 10;
    var isAnimating = false;
    
    // DOM elements
    var slides = document.querySelectorAll('.slide');
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    var currentSlideSpan = document.getElementById('current-slide');
    var totalSlidesSpan = document.getElementById('total-slides');
    
    // Initialize presentation
    function init() {
        // Set total slides counter
        totalSlidesSpan.textContent = totalSlides;
        
        // Add event listeners
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            previousSlide();
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        // Update initial state
        updateNavigation();
        restartAnimations();
        
        // Ensure first slide is visible
        showSlide(1);
    }
    
    // Show specific slide
    function showSlide(slideNumber) {
        // Hide all slides first
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active', 'prev');
        }
        
        // Show target slide
        var targetSlide = document.querySelector('.slide[data-slide="' + slideNumber + '"]');
        if (targetSlide) {
            targetSlide.classList.add('active');
        }
        
        currentSlide = slideNumber;
        currentSlideSpan.textContent = currentSlide;
        updateNavigation();
    }
    
    // Navigate to specific slide
    function goToSlide(slideNumber) {
        if (isAnimating || slideNumber === currentSlide || slideNumber < 1 || slideNumber > totalSlides) {
            return;
        }
        
        isAnimating = true;
        
        // Hide current slide
        var currentSlideEl = document.querySelector('.slide[data-slide="' + currentSlide + '"]');
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
            
            // Add appropriate transition class
            if (slideNumber < currentSlide) {
                currentSlideEl.classList.add('prev');
            }
        }
        
        // Show new slide after brief delay
        setTimeout(function() {
            // Remove all active and prev classes
            for (var i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active', 'prev');
            }
            
            // Show target slide
            var newSlideEl = document.querySelector('.slide[data-slide="' + slideNumber + '"]');
            if (newSlideEl) {
                newSlideEl.classList.add('active');
            }
            
            currentSlide = slideNumber;
            currentSlideSpan.textContent = currentSlide;
            updateNavigation();
            restartAnimations();
            
            isAnimating = false;
        }, 100);
    }
    
    // Navigate to next slide
    function nextSlide() {
        if (currentSlide < totalSlides && !isAnimating) {
            goToSlide(currentSlide + 1);
        }
    }
    
    // Navigate to previous slide
    function previousSlide() {
        if (currentSlide > 1 && !isAnimating) {
            goToSlide(currentSlide - 1);
        }
    }
    
    // Update navigation button states
    function updateNavigation() {
        // Update previous button
        if (currentSlide <= 1) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.6';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
        }
        
        // Update next button
        if (currentSlide >= totalSlides) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.6';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
        }
    }
    
    // Handle keyboard navigation
    function handleKeyboard(event) {
        // Prevent default behavior for arrow keys and spacebar
        if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 32) {
            event.preventDefault();
        }
        
        switch(event.keyCode) {
            case 37: // Left arrow
                previousSlide();
                break;
            case 39: // Right arrow
            case 32: // Spacebar
                nextSlide();
                break;
            case 36: // Home
                goToSlide(1);
                break;
            case 35: // End
                goToSlide(totalSlides);
                break;
        }
    }
    
    // Restart animations for current slide
    function restartAnimations() {
        var currentSlideEl = document.querySelector('.slide[data-slide="' + currentSlide + '"]');
        if (!currentSlideEl) return;
        
        // Remove and re-add animation classes for bullet points
        var bulletPoints = currentSlideEl.querySelectorAll('.bullet-point');
        for (var i = 0; i < bulletPoints.length; i++) {
            var bullet = bulletPoints[i];
            // Reset animation
            bullet.style.animation = 'none';
            bullet.style.opacity = '0';
            bullet.style.transform = 'translateY(20px)';
            
            // Force reflow
            bullet.offsetHeight;
            
            // Restart animation with delay
            setTimeout(function(element, index) {
                return function() {
                    element.style.animation = '';
                    element.style.opacity = '';
                    element.style.transform = '';
                };
            }(bullet, i), i * 200 + 200);
        }
        
        // Restart other animations
        var elementsToAnimate = [
            currentSlideEl.querySelector('.slide-title'),
            currentSlideEl.querySelector('.main-title'),
            currentSlideEl.querySelector('.subtitle'),
            currentSlideEl.querySelector('.key-takeaway')
        ];
        
        for (var j = 0; j < elementsToAnimate.length; j++) {
            var element = elementsToAnimate[j];
            if (element) {
                element.style.animation = 'none';
                element.offsetHeight;
                element.style.animation = '';
            }
        }
        
        // Restart description animations
        var descriptions = currentSlideEl.querySelectorAll('.description');
        for (var k = 0; k < descriptions.length; k++) {
            var desc = descriptions[k];
            desc.style.animation = 'none';
            desc.offsetHeight;
            desc.style.animation = '';
        }
    }
    
    // Add touch/swipe support for mobile devices
    var touchStartX = null;
    var touchStartY = null;
    
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }
    
    function handleTouchMove(event) {
        if (!touchStartX || !touchStartY) {
            return;
        }
        
        var touchEndX = event.touches[0].clientX;
        var touchEndY = event.touches[0].clientY;
        
        var deltaX = touchStartX - touchEndX;
        var deltaY = touchStartY - touchEndY;
        
        // Prevent scrolling during horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            event.preventDefault();
        }
    }
    
    function handleTouchEnd(event) {
        if (!touchStartX || !touchStartY) {
            return;
        }
        
        var touchEndX = event.changedTouches[0].clientX;
        var touchEndY = event.changedTouches[0].clientY;
        
        var deltaX = touchStartX - touchEndX;
        var deltaY = touchStartY - touchEndY;
        
        var minSwipeDistance = 50;
        
        // Horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                previousSlide();
            }
        }
        
        touchStartX = null;
        touchStartY = null;
    }
    
    // Add touch event listeners
    function addTouchSupport() {
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', handleTouchStart, {passive: false});
            document.addEventListener('touchmove', handleTouchMove, {passive: false});
            document.addEventListener('touchend', handleTouchEnd, {passive: true});
        }
    }
    
    // Preload all slides for smooth transitions
    function preloadSlides() {
        for (var i = 1; i <= totalSlides; i++) {
            var slide = document.querySelector('.slide[data-slide="' + i + '"]');
            if (slide) {
                // Force browser to parse and layout slide content
                slide.offsetHeight;
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            preloadSlides();
            addTouchSupport();
        });
    } else {
        init();
        preloadSlides();
        addTouchSupport();
    }
    
    // Expose public methods for external control
    window.Presentation = {
        nextSlide: nextSlide,
        previousSlide: previousSlide,
        goToSlide: goToSlide,
        getCurrentSlide: function() { return currentSlide; },
        getTotalSlides: function() { return totalSlides; }
    };
    
})();