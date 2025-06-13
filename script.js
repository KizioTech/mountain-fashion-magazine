 // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const navbar = document.getElementById('navbar');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Dropdown functionality
        const dropdown = document.getElementById('featuresDropdown');
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        // Handle dropdown hover
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('active');
        });

        // Handle dropdown click for mobile
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll indicator
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollIndicator').style.width = scrollPercent + '%';
        });

        // Page navigation system
        function navigateToPage(pageId) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });

            // Hide all sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show the selected section
            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');

            // Close dropdown if open
            dropdown.classList.remove('active');

            // Update URL
            history.pushState(null, null, `#${pageId}`);
        }

        // Set up navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                if (pageId) {
                    navigateToPage(pageId);
                    // Close dropdown if open (for mobile)
                    dropdown.classList.remove('active');
                }
            });
        });

        // Set up hero CTA buttons
        document.querySelectorAll('.hero-cta .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = btn.getAttribute('data-page');
                if (pageId) {
                    navigateToPage(pageId);
                }
            });
        });

        // Home link
        document.getElementById('homeLink').addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('home');
        });

        // Handle initial page load
        function handleInitialLoad() {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                navigateToPage(hash);
            } else {
                navigateToPage('home');
            }
        }

        // Handle back/forward navigation
        window.addEventListener('popstate', handleInitialLoad);

        // Initialize the page
        document.addEventListener('DOMContentLoaded', handleInitialLoad);

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Newsletter form handling
        document.getElementById('newsletterForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Simple validation
            if (email) {
                // Simulate subscription
                alert('Thank you for subscribing! Welcome to Mountain Fashion Magazine.');
                this.reset();
            }
        });

        // Login modal functionality
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');

        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Login form handling
        document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            // Simple validation
            if (email && password) {
                alert('Login successful! Welcome back to Mountain Fashion.');
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.reset();
            }
        });

        // Dynamic typing effect for hero subtitle
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            let currentText = '';
            let index = 0;

            function typeWriter() {
                if (index < originalText.length) {
                    currentText += originalText.charAt(index);
                    subtitle.textContent = currentText;
                    index++;
                    setTimeout(typeWriter, 50);
                }
            }

            // Start typing effect after page loads
            window.addEventListener('load', () => {
                setTimeout(() => {
                    subtitle.textContent = '';
                    typeWriter();
                }, 1000);
            });
        }
        // Marketplace functionality
        document.addEventListener('DOMContentLoaded', function () {
            // Category filtering
            const categoryBtns = document.querySelectorAll('.category-btn');
            const productCards = document.querySelectorAll('.product-card');

            categoryBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    // Update active button
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const category = this.dataset.category;

                    // Filter products
                    productCards.forEach(card => {
                        if (category === 'all' || card.dataset.category === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Quick view functionality
            const quickViewBtns = document.querySelectorAll('.quick-view');

            quickViewBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    const productId = this.dataset.product;
                    // In a real implementation, this would show a modal with product details
                    alert(`Quick view for product ${productId} would open here`);
                });
            });

            // Wishlist functionality
            const wishlistBtns = document.querySelectorAll('.add-wishlist');

            wishlistBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    this.classList.toggle('far');
                    this.classList.toggle('fas');
                    this.classList.toggle('active');

                    if (this.classList.contains('active')) {
                        // In a real implementation, this would add to wishlist
                        alert('Added to wishlist');
                    } else {
                        // In a real implementation, this would remove from wishlist
                        alert('Removed from wishlist');
                    }
                });
            });

            // Book consultation button
            const bookConsultationBtn = document.getElementById('bookConsultation');
            if (bookConsultationBtn) {
                bookConsultationBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.getElementById('appointmentModal').style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            }

            // Close appointment modal
            const closeAppointmentModal = document.getElementById('closeAppointmentModal');
            if (closeAppointmentModal) {
                closeAppointmentModal.addEventListener('click', function () {
                    document.getElementById('appointmentModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }

            // Appointment form submission
            const appointmentForm = document.getElementById('appointmentForm');
            if (appointmentForm) {
                appointmentForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    alert('Appointment booked successfully! We will contact you to confirm.');
                    document.getElementById('appointmentModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                    this.reset();
                });
            }

            // Payment method selection
            const methodOptions = document.querySelectorAll('.method-option');
            const paymentDetails = document.querySelectorAll('.payment-details');

            methodOptions.forEach(option => {
                option.addEventListener('click', function () {
                    methodOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');

                    const method = this.dataset.method;

                    paymentDetails.forEach(detail => {
                        if (detail.id === `${method}Details`) {
                            detail.style.display = 'block';
                        } else {
                            detail.style.display = 'none';
                        }
                    });
                });
            });

            // Confirm payment button
            const confirmPaymentBtn = document.querySelector('.payment-confirm');
            if (confirmPaymentBtn) {
                confirmPaymentBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    alert('Payment processed successfully! Thank you for your purchase.');
                    document.getElementById('paymentModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }

            // Close payment modal
            const closePaymentModal = document.getElementById('closePaymentModal');
            if (closePaymentModal) {
                closePaymentModal.addEventListener('click', function () {
                    document.getElementById('paymentModal').style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
        });

        // Replace the existing cart-related JavaScript code with this:

        // Cart functionality
        let cart = [];

        document.addEventListener('DOMContentLoaded', function () {
            // Add to cart functionality
            document.querySelectorAll('.btn-add-cart').forEach((btn) => {
                btn.addEventListener('click', () => {
                    const productCard = btn.closest('.product-info');
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    cart.push(productTitle);
                    updateCartCount();
                });
            });

            // Update cart count
            function updateCartCount() {
                document.getElementById('cartCount').textContent = cart.length;
            }

            // Open cart
            document.getElementById('floatingCart').addEventListener('click', () => {
                const cartOverlay = document.getElementById('cartOverlay');
                updateCartDisplay();
                cartOverlay.classList.remove('hidden');
            });

            // Update cart display
            function updateCartDisplay() {
                const cartItems = document.getElementById('cartItems');
                cartItems.innerHTML = '';
                cart.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    cartItems.appendChild(li);
                });
            }

            // Close cart button
            document.getElementById('closeCart').addEventListener('click', () => {
                const cartOverlay = document.getElementById('cartOverlay');
                cartOverlay.classList.add('hidden');
            });

            // Close cart when clicking outside
            document.getElementById('cartOverlay').addEventListener('click', (e) => {
                if (e.target === document.getElementById('cartOverlay')) {
                    document.getElementById('cartOverlay').classList.add('hidden');
                }
            });

            // Show the payment modal when "Proceed to Pay" is clicked
            document.getElementById('proceedToPay').addEventListener('click', function () {
                document.getElementById('cartOverlay').classList.add('hidden');
                document.getElementById('simplePaymentModal').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });

            // Close modal with X button
            document.getElementById('closeSimplePaymentModal').addEventListener('click', function () {
                document.getElementById('simplePaymentModal').style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            // Optional: Close modal when clicking outside the form
            document.getElementById('simplePaymentModal').addEventListener('click', function (e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

            // Handle payment form submission
            document.getElementById('simplePaymentForm').addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Payment processed successfully! Thank you for your purchase.');
                document.getElementById('simplePaymentModal').style.display = 'none';
                document.body.style.overflow = 'auto';
                this.reset();
            });
        });
        // Add the new page to the navigation system
        document.addEventListener('DOMContentLoaded', function() {
            // Add navigation for Designer's Spotlight
            document.querySelectorAll('[data-page="designers"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateToPage('designers');
                });
            });
            
            // Add the existing navigation function
            function navigateToPage(pageId) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-page') === pageId) {
                        link.classList.add('active');
                    }
                });

                // Hide all sections
                document.querySelectorAll('.page-section').forEach(section => {
                    section.classList.remove('active');
                });

                // Show the selected section
                const targetSection = document.getElementById(pageId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }

                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                navLinks.classList.remove('active');
                const icon = document.getElementById('menuToggle').querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');

                // Close dropdown if open
                const dropdown = document.getElementById('featuresDropdown');
                dropdown.classList.remove('active');

                // Update URL
                history.pushState(null, null, `#${pageId}`);
            }
        });
        
        const designerSinUpBtn = document.getElementById('designerSignUp');
        if (designerSinUpBtn) {
            designerSinUpBtn.addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementById('loginModal').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        }
        // Dark Mode Toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        
        // Check for saved dark mode preference
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            body.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        darkModeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.setAttribute('data-theme', 'light');
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });

        // AI Assistant
        const aiButton = document.getElementById('aiAssistantButton');
        const aiPanel = document.getElementById('aiPanel');
        const closeAiPanel = document.getElementById('closeAiPanel');
        const aiMessages = document.getElementById('aiMessages');
        const aiInput = document.getElementById('aiInput');
        const sendButton = document.getElementById('sendMessage');
        
        // Toggle AI panel visibility
        aiButton.addEventListener('click', () => {
            aiPanel.classList.toggle('active');
        });
        
        closeAiPanel.addEventListener('click', () => {
            aiPanel.classList.remove('active');
        });
        
        // Send message function
        function sendMessage() {
            const message = aiInput.value.trim();
            if (!message) return;
            
            // Add user message
            addMessage(message, 'user');
            aiInput.value = '';
            
            // Simulate AI response after delay
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                addMessage(aiResponse, 'ai');
            }, 1000);
        }
        
        // Add message to chat
        function addMessage(text, sender) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', `${sender}-message`);
            messageElement.textContent = text;
            aiMessages.appendChild(messageElement);
            
            // Scroll to bottom
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }
        
        // Generate AI response
        function generateAIResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Fashion-related responses
            if (lowerMessage.includes('malawi') || lowerMessage.includes('african') || lowerMessage.includes('chitenje')) {
                return "Malawian fashion beautifully blends traditional elements with contemporary designs. The Chitenje fabric is central to our cultural expression, often featuring vibrant patterns that tell stories. Many designers are now incorporating these traditional fabrics into modern silhouettes.";
            }
            
            if (lowerMessage.includes('magazine') || lowerMessage.includes('issue') || lowerMessage.includes('vol')) {
                return "Our latest issue (Vol. 3: The 'Heritage Bloom' Issue) explores how ancestral artistry is blossoming into contemporary masterpieces. It features stunning editorials from the Zomba Plateau and interviews with Malawi's top designers.";
            }
            
            if (lowerMessage.includes('design') || lowerMessage.includes('create') || lowerMessage.includes('inspiration')) {
                return "For design inspiration, I recommend exploring our Pattern Library with hundreds of authentic Malawian patterns. Our Digital Moodboard tool can help you visualize concepts. Consider blending traditional motifs with modern cuts for a unique look.";
            }
            
            if (lowerMessage.includes('subscribe') || lowerMessage.includes('pro') || lowerMessage.includes('access')) {
                return "You can subscribe to our Pro experience for $19.99/month. This gives you access to exclusive interviews, behind-the-scenes content, early access to collections, and a digital magazine subscription. Visit our Pricing section for more details.";
            }
            
            if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
                return "You can reach us at mount.fas.magazine@gmail.com or call +265 885 157 566. We're also active on Instagram @MountainMagazine265. For collaborations or queries, feel free to reach out anytime!";
            }
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                return "Hello! I'm your AI fashion assistant. How can I help you with Malawian fashion, our magazine, or style advice?";
            }
            
            // Default response
            return "I'm an AI assistant specializing in Malawian fashion and Mountain Fashion Magazine. You can ask me about traditional fabrics, current issues, designer spotlights, or subscription options. How can I assist you today?";
        }
        
        // Event listeners for sending messages
        sendButton.addEventListener('click', sendMessage);
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Scroll indicator
        window.addEventListener('scroll', () => {
            const scrollIndicator = document.getElementById('scrollIndicator');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;
            scrollIndicator.style.width = `${scrollPercent}%`;
        });
