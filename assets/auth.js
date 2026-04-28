// ==========================================
// SUPABASE CONFIGURATION
// ==========================================
const SUPABASE_URL = 'https://wetbynbishrjgnnhtour.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldGJ5bmJpc2hyamdubmh0b3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NzkyNDEsImV4cCI6MjA5MjI1NTI0MX0.kIhKmgvdKMIDWRvksYEwJurqMeKXJYaTfpIR7NkpYxM';

// Base n8n form URL — user identity appended as query params on redirect
const N8N_FORM_URL = 'https://mehak.app.n8n.cloud/form/35d813a6-f246-4608-94c5-b2eb36753f53';

// Build personalised n8n URL with user identity
function buildFormURL(user) {
    const params = new URLSearchParams({
        user_id: user.id,
        user_email: user.email,
        user_name: (user.user_metadata && user.user_metadata.full_name)
            ? user.user_metadata.full_name
            : ''
    });
    return N8N_FORM_URL + '?' + params.toString();
}

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// MODAL STATE & DOM REFS
// ==========================================
// Modes: 'signin' | 'signup' | 'forgot' | 'reset'
let currentAuthMode = 'signin';

const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const authModalTitle = document.getElementById('authModalTitle');
const authModalSubtitle = document.getElementById('authModalSubtitle');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authToggleText = document.getElementById('authToggleText');
const authToggleBtn = document.getElementById('authToggleBtn');
const authModalFooter = document.getElementById('authModalFooter');
const nameGroup = document.getElementById('nameGroup');
const passwordGroup = document.getElementById('passwordGroup');
const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const authName = document.getElementById('authName');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authConfirmPassword = document.getElementById('authConfirmPassword');
const authFormStatus = document.getElementById('authFormStatus');

// ==========================================
// DETECT PASSWORD RESET FLOW ON PAGE LOAD
// Supabase appends #access_token=...&type=recovery to the URL
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
        // Parse tokens from hash so Supabase SDK picks up the session
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken) {
            // Set the session so updateUser() works
            supabaseClient.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
                .then(() => {
                    // Clean the URL
                    window.history.replaceState(null, '', window.location.pathname);
                    // Auto-open the modal in reset mode
                    openAuthModal('reset');
                });
        }
    }
});

// ==========================================
// MODAL OPEN / CLOSE
// ==========================================
window.openAuthModal = function (mode = 'signin') {
    currentAuthMode = mode;
    updateModalUI();
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeAuthModal = function () {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        authForm.reset();
        setStatus('', '');
    }, 300);
};

// ==========================================
// MODE SWITCHERS
// ==========================================
window.toggleAuthMode = function () {
    currentAuthMode = currentAuthMode === 'signin' ? 'signup' : 'signin';
    updateModalUI();
    setStatus('', '');
};

window.goToForgotPassword = function () {
    currentAuthMode = 'forgot';
    updateModalUI();
    setStatus('', '');
};

window.goBackToSignIn = function () {
    currentAuthMode = 'signin';
    updateModalUI();
    setStatus('', '');
};

// ==========================================
// UPDATE MODAL UI PER MODE
// ==========================================
function updateModalUI() {
    // Reset all optional fields to hidden defaults
    nameGroup.style.display = 'none';
    confirmPasswordGroup.style.display = 'none';
    authEmail.parentElement.style.display = 'block';  // always show email unless reset mode
    authEmail.setAttribute('required', 'true');
    authName.removeAttribute('required');
    authConfirmPassword.removeAttribute('required');

    // Reset footer toggle onclick
    authToggleBtn.onclick = window.toggleAuthMode;
    if (forgotPasswordLink) forgotPasswordLink.onclick = window.goToForgotPassword;

    if (currentAuthMode === 'signin') {
        authModalTitle.textContent = 'Sign In';
        authModalSubtitle.textContent = 'Welcome back to Alicorn AI';
        authSubmitBtn.textContent = 'Sign In';
        passwordGroup.style.display = 'block';
        authPassword.setAttribute('required', 'true');
        if (forgotPasswordLink) forgotPasswordLink.style.display = 'inline';
        authModalFooter.style.display = 'block';
        authToggleText.textContent = "Don't have an account?";
        authToggleBtn.textContent = 'Sign Up';

    } else if (currentAuthMode === 'signup') {
        authModalTitle.textContent = 'Create Account';
        authModalSubtitle.textContent = 'Start amplifying your brand today';
        authSubmitBtn.textContent = 'Sign Up';
        nameGroup.style.display = 'block';
        authName.setAttribute('required', 'true');
        passwordGroup.style.display = 'block';
        authPassword.setAttribute('required', 'true');
        if (forgotPasswordLink) forgotPasswordLink.style.display = 'none';
        authModalFooter.style.display = 'block';
        authToggleText.textContent = 'Already have an account?';
        authToggleBtn.textContent = 'Sign In';

    } else if (currentAuthMode === 'forgot') {
        authModalTitle.textContent = 'Forgot Password';
        authModalSubtitle.textContent = "Enter your email and we'll send a reset link";
        authSubmitBtn.textContent = 'Send Reset Link';
        passwordGroup.style.display = 'none';
        authPassword.removeAttribute('required');
        if (forgotPasswordLink) forgotPasswordLink.style.display = 'none';
        authModalFooter.style.display = 'block';
        authToggleText.textContent = '';
        authToggleBtn.textContent = '← Back to Sign In';
        authToggleBtn.onclick = window.goBackToSignIn;

    } else if (currentAuthMode === 'reset') {
        authModalTitle.textContent = 'Set New Password';
        authModalSubtitle.textContent = 'Choose a strong new password for your account';
        authSubmitBtn.textContent = 'Update Password';
        // Hide email — session already established from the token
        authEmail.parentElement.style.display = 'none';
        authEmail.removeAttribute('required');
        passwordGroup.style.display = 'block';
        authPassword.setAttribute('required', 'true');
        // Show confirm field
        confirmPasswordGroup.style.display = 'block';
        authConfirmPassword.setAttribute('required', 'true');
        if (forgotPasswordLink) forgotPasswordLink.style.display = 'none';
        // Hide the toggle footer entirely in reset mode
        authModalFooter.style.display = 'none';
    }
}

// ==========================================
// HELPERS
// ==========================================
function setStatus(message, type) {
    authFormStatus.textContent = message;
    authFormStatus.style.color = type === 'success' ? '#34D399' : type === 'error' ? '#F87171' : '';
}

function setLoading(isLoading, label) {
    authSubmitBtn.style.opacity = isLoading ? '0.7' : '1';
    authSubmitBtn.style.pointerEvents = isLoading ? 'none' : 'auto';
    authSubmitBtn.textContent = isLoading ? 'Please wait...' : label;
}

const modeLabels = {
    signin: 'Sign In',
    signup: 'Sign Up',
    forgot: 'Send Reset Link',
    reset: 'Update Password'
};

// ==========================================
// FORM SUBMIT HANDLER
// ==========================================
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = authEmail.value.trim();
    const password = authPassword.value.trim();
    const name = authName.value.trim();
    const confirmPassword = authConfirmPassword.value.trim();

    setStatus('', '');
    setLoading(true, '');

    try {

        // ---- SET NEW PASSWORD (reset flow) ----
        if (currentAuthMode === 'reset') {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters.');
            }
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match. Please try again.');
            }
            const { error } = await supabaseClient.auth.updateUser({ password });
            if (error) throw error;

            // Get the current session user to build the personalised URL
            const { data: sessionData } = await supabaseClient.auth.getUser();
            const redirectURL = sessionData && sessionData.user
                ? buildFormURL(sessionData.user)
                : N8N_FORM_URL;

            setStatus('✅ Password updated successfully!', 'success');
            setTimeout(() => { handlePostLogin(sessionData.user); }, 1500);
            setLoading(false, modeLabels.reset);
            return;
        }

        // ---- FORGOT PASSWORD ----
        if (currentAuthMode === 'forgot') {
            const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/'
            });
            if (error) throw error;
            setStatus('✅ Reset link sent! Check your inbox.', 'success');
            setLoading(false, modeLabels.forgot);
            return;
        }

        // ---- SIGN UP ----
        if (currentAuthMode === 'signup') {
            if (password.length < 6) throw new Error('Password must be at least 6 characters.');
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: { data: { full_name: name } }
            });
            if (error) throw error;
            // Detect duplicate email (Supabase returns empty identities silently)
            if (data.user && data.user.identities && data.user.identities.length === 0) {
                throw new Error('An account with this email already exists. Please sign in instead.');
            }
            // Email verification is disabled — user is signed in immediately
            setStatus('✅ Account created successfully!', 'success');
            setTimeout(() => { handlePostLogin(data.user); }, 1000);
            setLoading(false, modeLabels.signup);
            return;
        }

        // ---- SIGN IN ----
        if (currentAuthMode === 'signin') {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) throw error;
            setStatus('✅ Sign in successful!', 'success');
            setTimeout(() => { handlePostLogin(data.user); }, 1000);
        }

    } catch (err) {
        setStatus(err.message, 'error');
    } finally {
        setLoading(false, modeLabels[currentAuthMode]);
    }
});

// ==========================================
// AUTH STATE MANAGEMENT
// ==========================================
let currentUser = null;

async function updateAuthState() {
    try {
        const { data: session } = await supabaseClient.auth.getUser();
        currentUser = session.user;

        const userSection = document.getElementById('userSection');
        const authSection = document.getElementById('authSection');
        const userName = document.getElementById('userName');

        if (currentUser) {
            // User is logged in
            userSection.style.display = 'flex';
            authSection.style.display = 'none';

            // Display user name
            const displayName = currentUser.user_metadata?.full_name ||
                              currentUser.email?.split('@')[0] ||
                              'User';
            userName.textContent = `Hi, ${displayName}`;
        } else {
            // User is not logged in
            userSection.style.display = 'none';
            authSection.style.display = 'flex';
            userName.textContent = '';
        }
    } catch (error) {
        console.error('Error updating auth state:', error);
        // Default to logged out state
        document.getElementById('userSection').style.display = 'none';
        document.getElementById('authSection').style.display = 'flex';
    }
}

// ==========================================
// SIGN OUT HANDLER
// ==========================================
window.handleSignOut = async function () {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
            return;
        }
        currentUser = null;
        updateAuthState();
        // Close any open modals
        closeProfileModal();
        closeCampaignModal();
    } catch (error) {
        console.error('Sign out error:', error);
        alert('Error signing out. Please try again.');
    }
};

// ==========================================
// INITIALIZE AUTH STATE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateAuthState();

    // Listen for auth state changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
        currentUser = session?.user || null;
        updateAuthState();
    });
});

// ==========================================
// PROFILE MODAL FUNCTIONS
// ==========================================
window.openProfileModal = function () {
    document.getElementById('profileModal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeProfileModal = function () {
    document.getElementById('profileModal').classList.remove('active');
    document.body.style.overflow = '';
};

// ==========================================
// CAMPAIGN MODAL FUNCTIONS
// ==========================================
window.openCampaignModal = function () {
    document.getElementById('campaignModal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeCampaignModal = function () {
    document.getElementById('campaignModal').classList.remove('active');
    document.body.style.overflow = '';
};

window.openCampaignSuccessModal = function () {
    document.getElementById('campaignSuccessModal').classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeCampaignSuccessModal = function () {
    document.getElementById('campaignSuccessModal').classList.remove('active');
    document.body.style.overflow = '';
};

// ==========================================
// BUTTON HANDLERS
// ==========================================
window.handleBuildProfile = async function () {
    const { data: session } = await supabaseClient.auth.getUser();
    if (!session.user) {
        openAuthModal('signin');
        return;
    }
    openProfileModal();
};

window.handleGenerateCampaign = async function () {
    const { data: session } = await supabaseClient.auth.getUser();
    if (!session.user) {
        openAuthModal('signin');
        return;
    }
    // Check if has profile
    try {
        const response = await fetch('/api/profile?user_id=' + session.user.id);
        const data = await response.json();
        if (data.profile) {
            openCampaignModal();
        } else {
            openProfileModal();
        }
    } catch (error) {
        console.error('Error checking profile:', error);
        openProfileModal();
    }
};

// ==========================================
// PROFILE FORM HANDLER
// ==========================================
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const { data: session } = await supabaseClient.auth.getUser();
    if (!session.user) {
        alert('Please sign in first');
        return;
    }

    const formData = {
        user_id: session.user.id,
        company_name: document.getElementById('companyName').value.trim(),
        brand_name: document.getElementById('brandName').value.trim(),
        brand_overview: document.getElementById('brandOverview').value.trim(),
        unique_value_proposition: document.getElementById('uniqueValueProposition').value.trim(),
        social_platforms: document.getElementById('socialPlatforms').value.trim(),
        product_category: document.getElementById('productCategory').value
    };

    const btn = document.getElementById('profileSubmitBtn');
    const status = document.getElementById('profileFormStatus');

    btn.textContent = 'Saving...';
    btn.disabled = true;
    status.textContent = '';

    try {
        const response = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            status.textContent = '✅ Profile saved successfully!';
            status.style.color = '#34D399';
            setTimeout(() => {
                closeProfileModal();
                openCampaignModal();
            }, 1500);
        } else {
            throw new Error(data.error || 'Failed to save profile');
        }
    } catch (error) {
        status.textContent = error.message;
        status.style.color = '#F87171';
    } finally {
        btn.textContent = 'Save Profile';
        btn.disabled = false;
    }
});

// ==========================================
// CAMPAIGN FORM HANDLER
// ==========================================
document.getElementById('campaignForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const { data: session } = await supabaseClient.auth.getUser();
    if (!session.user) {
        alert('Please sign in first');
        return;
    }

    const idealCustomerProfile = document.getElementById('idealCustomerProfile').value.trim();
    const contentPillars = document.getElementById('contentPillars').value.trim();
    const brandTone = document.getElementById('brandTone').value.trim();
    const postFrequency = document.getElementById('postFrequency').value.trim();
    const campaignIdea = document.getElementById('campaignIdea').value.trim();
    const imageFile = document.getElementById('productImage').files[0];
    const btn = document.getElementById('campaignSubmitBtn');
    const status = document.getElementById('campaignFormStatus');

    if (!idealCustomerProfile || !contentPillars || !brandTone || !postFrequency || !campaignIdea || !imageFile) {
        status.textContent = 'Please fill all campaign fields and upload a product image.';
        status.style.color = '#F87171';
        return;
    }

    if (isNaN(postFrequency) || parseInt(postFrequency, 10) <= 0) {
        status.textContent = 'Post frequency must be a positive number.';
        status.style.color = '#F87171';
        return;
    }

    btn.textContent = 'Preparing...';
    btn.disabled = true;
    status.textContent = '';

    const reader = new FileReader();
    reader.onload = async function() {
        const base64 = reader.result.split(',')[1];
        const data = {
            user_id: session.user.id,
            ideal_customer_profile: idealCustomerProfile,
            content_pillars: contentPillars,
            brand_tone: brandTone,
            post_frequency: parseInt(postFrequency, 10),
            campaign_idea: campaignIdea,
            product_image: base64,
            product_image_name: imageFile.name
        };
        await submitCampaign(data);
    };
    reader.onerror = function() {
        status.textContent = 'Unable to read the product image. Please try a different file.';
        status.style.color = '#F87171';
        btn.textContent = 'Generate Campaign';
        btn.disabled = false;
    };
    reader.readAsDataURL(imageFile);
});

async function submitCampaign(data) {
    const btn = document.getElementById('campaignSubmitBtn');
    const status = document.getElementById('campaignFormStatus');

    btn.textContent = 'Submitting...';
    btn.disabled = true;
    status.textContent = '';

    try {
        const response = await fetch('/api/campaign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            closeCampaignModal();
            openCampaignSuccessModal();
            status.textContent = '';
            setTimeout(() => {
                closeCampaignSuccessModal();
                document.getElementById('campaignForm').reset();
            }, 7000);
        } else {
            throw new Error(result.error || 'Failed to submit campaign');
        }
    } catch (error) {
        status.textContent = error.message;
        status.style.color = '#F87171';
    } finally {
        btn.textContent = 'Generate Campaign';
        btn.disabled = false;
    }
}

// ==========================================
// AUTH STATE MANAGEMENT
// ==========================================

async function updateAuthState() {
    try {
        const { data: session } = await supabaseClient.auth.getUser();
        currentUser = session.user;

        const userSection = document.getElementById('userSection');
        const authSection = document.getElementById('authSection');
        const userName = document.getElementById('userName');

        if (currentUser) {
            // User is logged in
            userSection.style.display = 'flex';
            authSection.style.display = 'none';

            // Display user name
            const displayName = currentUser.user_metadata?.full_name ||
                              currentUser.email?.split('@')[0] ||
                              'User';
            userName.textContent = `Hi, ${displayName}`;
        } else {
            // User is not logged in
            userSection.style.display = 'none';
            authSection.style.display = 'flex';
            userName.textContent = '';
        }
    } catch (error) {
        console.error('Error updating auth state:', error);
        // Default to logged out state
        document.getElementById('userSection').style.display = 'none';
        document.getElementById('authSection').style.display = 'flex';
    }
}

// ==========================================
// POST LOGIN HANDLER
// ==========================================
async function handlePostLogin(user) {
    closeAuthModal();
    setStatus('', '');
    currentUser = user;
    updateAuthState();

    // Check if user has profile
    try {
        const response = await fetch('/api/profile?user_id=' + user.id);
        const data = await response.json();
        if (data.profile) {
            // Has profile, open campaign modal
            openCampaignModal();
        } else {
            // No profile, open profile modal
            openProfileModal();
        }
    } catch (error) {
        console.error('Error checking profile:', error);
        // Default to profile modal
        openProfileModal();
    }
}

// ==========================================
// SIGN OUT HANDLER
// ==========================================
window.handleSignOut = async function () {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
            return;
        }
        currentUser = null;
        updateAuthState();
        // Close any open modals
        closeProfileModal();
        closeCampaignModal();
    } catch (error) {
        console.error('Sign out error:', error);
        alert('Error signing out. Please try again.');
    }
};

// ==========================================
// INITIALIZE AUTH STATE ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateAuthState();

    // Listen for auth state changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
        currentUser = session?.user || null;
        updateAuthState();
    });
});
