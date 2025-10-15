// Get form elements
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const loginLink = document.getElementById('loginLink');
const signupLink = document.getElementById('signupLink');
const messageDiv = document.getElementById('message');
const passwordInput = document.getElementById('password');
const passwordStrength = document.getElementById('password-strength');

// Toggle between signup and login forms with animation
loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginForm.style.animation = 'fadeIn 0.5s ease-out forwards';
});

signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupForm.style.animation = 'fadeIn 0.5s ease-out forwards';
});

// Password strength checker
passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    // Check password length
    if (password.length >= 8) strength += 1;
    
    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    
    // Check for numbers
    if (password.match(/\d/)) strength += 1;
    
    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    
    // Update strength indicator
    passwordStrength.className = 'password-strength';
    if (password.length === 0) {
        passwordStrength.style.display = 'none';
    } else {
        passwordStrength.style.display = 'block';
        if (strength < 2) {
            passwordStrength.classList.add('weak');
        } else if (strength < 4) {
            passwordStrength.classList.add('medium');
        } else {
            passwordStrength.classList.add('strong');
        }
    }
});

// Handle signup form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const membershipType = document.getElementById('membership-type').value;
    const terms = document.getElementById('terms').checked;
    
    // Enhanced validation
    if (password.length < 8) {
        showMessage('Password must be at least 8 characters long', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    if (!terms) {
        showMessage('You must agree to the Terms and Conditions', 'error');
        return;
    }
    
    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        showMessage('Email already registered!', 'error');
        return;
    }
    
    // Show loading animation
    showLoader();
    
    // Simulate server processing time (1.5 seconds)
    setTimeout(() => {
        // Create new user object with hashed password (simple hash for demo)
        const hashedPassword = hashPassword(password);
        const newUser = {
            fullname,
            email,
            phone,
            dob,
            password: hashedPassword,
            membershipType,
            joinDate: new Date().toISOString()
        };
        
        // Add user to the array (simulating database save)
        users.push(newUser);
        
        // Hide loader
        hideLoader();
        
        // Show success message
        showMessageWithLoader('Registration successful! Redirecting to login...', 'success');
        
        // Clear the form
        signupForm.reset();
        
        // Switch to login form after 5 seconds
        setTimeout(() => {
            // Hide the message before switching forms
            const messageDiv = document.getElementById('message');
            if (messageDiv) {
                hideMessage(messageDiv);
            }
            
            // Switch to login form with animation
            setTimeout(() => {
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
                loginForm.style.animation = 'fadeIn 0.5s ease-out forwards';
            }, 500); // Small delay after hiding message
        }, 5000);
    }, 1500);
});

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me')?.checked || false;
    
    // Find user by email
    const user = users.find(user => user.email === email);
    
    // Check if user exists and password matches (with hashing)
    if (user && user.password === hashPassword(password)) {
        showMessage('Login successful! Redirecting to dashboard...', 'success');
        
        // Store user info in storage (session or local based on remember me)
        const storage = rememberMe ? localStorage : sessionStorage;
        const userData = {...user};
        delete userData.password; // Don't store password in client storage
        
        storage.setItem('currentUser', JSON.stringify(userData));
        storage.setItem('authToken', generateAuthToken());
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    } else {
        showMessage('Invalid email or password!', 'error');
    }
});

// Function to show messages as pop-up notifications
function showMessage(message, type) {
    // Create message container if it doesn't exist
    let messageDiv = document.getElementById('message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        document.body.appendChild(messageDiv);
    }
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close');
    
    // Add event listener to close button
    closeButton.addEventListener('click', function() {
        hideMessage(messageDiv);
    });
    
    // Set message content and style
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.appendChild(closeButton);
    
    // Show the message with animation
    setTimeout(() => {
        messageDiv.classList.add('show');
        messageDiv.classList.add('popIn');
    }, 10);
    
    // Auto-hide message after 5 seconds
    const timer = setTimeout(() => {
        hideMessage(messageDiv);
    }, 5000);
    
    // Store the timer ID on the element to clear it if closed manually
    messageDiv.timer = timer;
}

// Function to hide the message
function hideMessage(messageDiv) {
    // Clear the auto-hide timer if it exists
    if (messageDiv.timer) {
        clearTimeout(messageDiv.timer);
    }
    
    // Add the fade out animation
    messageDiv.classList.remove('popIn');
    messageDiv.classList.remove('popInCenter');
    
    if (messageDiv.classList.contains('with-loader')) {
        messageDiv.classList.add('popOutCenter');
    } else {
        messageDiv.classList.add('popOut');
    }
    
    // Remove the element after animation completes
    setTimeout(() => {
        messageDiv.classList.remove('show');
        messageDiv.classList.remove('popOut');
        messageDiv.classList.remove('popOutCenter');
        messageDiv.textContent = '';
        messageDiv.className = '';
    }, 500);
}

// Simple password hashing function (for demo purposes only)
function hashPassword(password) {
    // In a real application, use a proper hashing library
    // This is just a simple hash for demonstration
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16); // Convert to hex string
}

// Generate a simple auth token
function generateAuthToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Function to show loader
function showLoader() {
    const loaderContainer = document.getElementById('loader-container');
    loaderContainer.classList.add('show');
}

// Function to hide loader
function hideLoader() {
    const loaderContainer = document.getElementById('loader-container');
    loaderContainer.classList.remove('show');
}

// Function to show message with loader background
function showMessageWithLoader(message, type) {
    // Create message container if it doesn't exist
    let messageDiv = document.getElementById('message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        document.body.appendChild(messageDiv);
    }
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close');
    
    // Add event listener to close button
    closeButton.addEventListener('click', function() {
        hideMessage(messageDiv);
    });
    
    // Set message content and style
    messageDiv.textContent = message;
    messageDiv.className = type + ' with-loader';
    messageDiv.appendChild(closeButton);
    
    // Show the message with animation
    setTimeout(() => {
        messageDiv.classList.add('show');
        messageDiv.classList.add('popInCenter');
    }, 10);
    
    // Auto-hide message after 5 seconds
    const timer = setTimeout(() => {
        hideMessage(messageDiv);
    }, 5000);
    
    // Store the timer ID on the element to clear it if closed manually
    messageDiv.timer = timer;
}