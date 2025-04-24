// Main JavaScript for interactions

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
    
    // Handle theme toggle changes
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    // Initialize Feather Icons
    feather.replace();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.navbar nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-nav-active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Update navbar with trip planner link
    const navbarList = document.querySelector('.navbar nav ul');
    if (navbarList) {
        const tripPlannerItem = document.createElement('li');
        const tripPlannerLink = document.createElement('a');
        tripPlannerLink.href = '#trip-planner';
        tripPlannerLink.textContent = 'Trip Planner';
        tripPlannerItem.appendChild(tripPlannerLink);
        
        // Insert before Contact
        const contactItem = navbarList.querySelector('a[href="#contact"]').parentElement;
        navbarList.insertBefore(tripPlannerItem, contactItem);
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle the current answer
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.style.display = 'none';
            });
            
            document.querySelectorAll('.faq-toggle').forEach(t => {
                t.style.transform = 'rotate(0deg)';
            });
            
            // Open/close the current answer
            if (isOpen) {
                answer.style.display = 'none';
                toggle.style.transform = 'rotate(0deg)';
            } else {
                answer.style.display = 'block';
                toggle.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for links that don't point to an element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                if (nav.classList.contains('mobile-nav-active')) {
                    nav.classList.remove('mobile-nav-active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-item, .pricing-card, .testimonial-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.feature-item, .pricing-card, .testimonial-card, .faq-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // AI Trip Suggestion Form
    const aiSuggestionForm = document.getElementById('ai-suggestion-form');
    if (aiSuggestionForm) {
        aiSuggestionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const destinationType = document.getElementById('destination-type').value;
            const budget = document.getElementById('budget').value;
            const duration = document.getElementById('trip-duration').value;
            const preferences = document.getElementById('preferences').value;
            
            // Validate form
            if (!destinationType || !budget || !duration) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Generating...';
            submitButton.disabled = true;
            
            // Simulate AI processing delay
            setTimeout(() => {
                // Create suggestion result
                showTripSuggestion(destinationType, budget, duration, preferences);
                
                // Reset form and button
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Function to display AI-generated trip suggestion
    function showTripSuggestion(destinationType, budget, duration, preferences) {
        // Create suggestion container if it doesn't exist
        let suggestionContainer = document.querySelector('.trip-suggestion-result');
        
        if (!suggestionContainer) {
            suggestionContainer = document.createElement('div');
            suggestionContainer.className = 'trip-suggestion-result';
            document.querySelector('.ai-planner-container').after(suggestionContainer);
        }
        
        // Generate suggestion based on inputs
        const destinations = {
            beach: ['Maldives', 'Bali', 'Cancun', 'Hawaii', 'Phuket'],
            mountain: ['Swiss Alps', 'Rocky Mountains', 'Himalayas', 'Patagonia', 'New Zealand'],
            city: ['Tokyo', 'Paris', 'New York', 'Barcelona', 'Singapore'],
            countryside: ['Tuscany', 'Provence', 'Cotswolds', 'Vermont', 'Hokkaido'],
            historical: ['Rome', 'Athens', 'Cairo', 'Kyoto', 'Istanbul']
        };
        
        // Select random destination from the category
        const destinationOptions = destinations[destinationType] || destinations.beach;
        const randomDestination = destinationOptions[Math.floor(Math.random() * destinationOptions.length)];
        
        // Generate activities based on preferences
        let activities = '';
        if (preferences) {
            if (preferences.includes('food')) {
                activities += '<li>Culinary tour of local cuisine</li>';
            }
            if (preferences.includes('adventure')) {
                activities += '<li>Outdoor adventure activities</li>';
            }
            if (preferences.includes('relax')) {
                activities += '<li>Spa and wellness experiences</li>';
            }
            if (preferences.includes('family')) {
                activities += '<li>Family-friendly attractions</li>';
            }
        }
        
        // If no specific activities mentioned, add generic ones
        if (!activities) {
            activities = `
                <li>Explore local attractions</li>
                <li>Experience local cuisine</li>
                <li>Visit popular landmarks</li>
            `;
        }
        
        // Create suggestion HTML
        suggestionContainer.innerHTML = `
            <div class="suggestion-card">
                <h3>Your Personalized Trip Suggestion</h3>
                <div class="suggestion-details">
                    <p class="suggestion-destination"><i data-feather="map-pin"></i> <strong>${randomDestination}</strong></p>
                    <p class="suggestion-info"><i data-feather="calendar"></i> <strong>Duration:</strong> ${getDurationText(duration)}</p>
                    <p class="suggestion-info"><i data-feather="dollar-sign"></i> <strong>Budget:</strong> ${getBudgetText(budget)}</p>
                    <div class="suggestion-activities">
                        <h4>Recommended Activities:</h4>
                        <ul>
                            ${activities}
                        </ul>
                    </div>
                    <p class="suggestion-note">This is a personalized AI suggestion based on your preferences. Contact our travel experts for a detailed itinerary!</p>
                    <a href="#contact" class="btn btn-primary">Contact Travel Expert</a>
                </div>
            </div>
        `;
        
        // Initialize feather icons for the new content
        feather.replace();
        
        // Scroll to suggestion
        suggestionContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Helper functions for text formatting
    function getDurationText(duration) {
        switch(duration) {
            case 'weekend': return '2-3 days';
            case 'week': return '7 days';
            case 'twoweeks': return '14 days';
            case 'month': return '30 days';
            default: return '7 days';
        }
    }
    
    function getBudgetText(budget) {
        switch(budget) {
            case 'budget': return '$500-$1000';
            case 'mid': return '$1000-$2500';
            case 'luxury': return '$2500+';
            default: return 'Flexible';
        }
    }
});