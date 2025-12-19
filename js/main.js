// Main JavaScript for Meme Community

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeIcon = document.getElementById('themeIcon');
    const themeIconMobile = document.getElementById('themeIconMobile');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
    
    function toggleTheme() {
        const isDark = html.classList.contains('dark');
        html.classList.toggle('dark', !isDark);
        const newTheme = !isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(!isDark);
    }
    
    function updateThemeIcon(isDark) {
        const icon = isDark ? '🌙' : '☀️';
        if (themeIcon) themeIcon.textContent = icon;
        if (themeIconMobile) themeIconMobile.textContent = icon;
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Category Tab Switching
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => {
                t.classList.remove('active', 'bg-gradient-to-r', 'from-neon-pink', 'to-neon-purple', 'text-white');
                t.classList.add('bg-gray-900', 'border', 'text-gray-300');
            });
            
            // Add active class to clicked tab
            this.classList.add('active', 'bg-gradient-to-r', 'from-neon-pink', 'to-neon-purple', 'text-white');
            this.classList.remove('bg-gray-900', 'border', 'text-gray-300');
            
            const category = this.getAttribute('data-category');
            filterMemesByCategory(category);
        });
    });

    // Initialize
    if (typeof loadTrendingMemes === 'function') {
        loadTrendingMemes();
    }
    if (typeof loadLatestMemes === 'function') {
        loadLatestMemes();
    }
});

// Filter memes by category
function filterMemesByCategory(category) {
    const memeCards = document.querySelectorAll('.meme-card');
    memeCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Like/Upvote/Downvote handlers
function handleLike(memeId) {
    console.log('Liked meme:', memeId);
    // Add your like logic here
    updateLikeCount(memeId, 1);
}

function handleUpvote(memeId) {
    console.log('Upvoted meme:', memeId);
    updateVoteCount(memeId, 1);
}

function handleDownvote(memeId) {
    console.log('Downvoted meme:', memeId);
    updateVoteCount(memeId, -1);
}

function updateLikeCount(memeId, change) {
    const likeElement = document.getElementById(`likes-${memeId}`);
    if (likeElement) {
        let currentLikes = parseInt(likeElement.textContent) || 0;
        likeElement.textContent = currentLikes + change;
    }
}

function updateVoteCount(memeId, change) {
    const voteElement = document.getElementById(`votes-${memeId}`);
    if (voteElement) {
        let currentVotes = parseInt(voteElement.textContent) || 0;
        voteElement.textContent = currentVotes + change;
    }
}

// Share functionality
function shareMeme(platform, memeId) {
    const memeUrl = `${window.location.origin}/meme.html?id=${memeId}`;
    const shareUrls = {
        whatsapp: `https://wa.me/?text=Check out this meme: ${memeUrl}`,
        instagram: 'https://www.instagram.com/',
        twitter: `https://twitter.com/intent/tweet?text=Check out this meme:&url=${memeUrl}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank');
    }
}

// Save/Bookmark handler
function toggleSave(memeId) {
    const saveBtn = document.getElementById(`save-btn-${memeId}`);
    if (saveBtn) {
        saveBtn.classList.toggle('text-neon-pink');
        saveBtn.classList.toggle('text-gray-400');
        console.log('Saved/Unsaved meme:', memeId);
    }
}


