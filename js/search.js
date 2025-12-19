// Search functionality

const suggestions = ['#monday', '#relatable', '#coding', '#college', '#funny', '@meme_lord_69', '@tech_memer'];
let searchTimeout;

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsDiv = document.getElementById('suggestions');

    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        searchInput.value = decodeURIComponent(query);
        performSearch(query);
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.trim();

        clearTimeout(searchTimeout);
        
        if (query.length > 0) {
            searchTimeout = setTimeout(() => {
                showSuggestions(query);
                suggestionsDiv.classList.remove('hidden');
            }, 300);
        } else {
            suggestionsDiv.classList.add('hidden');
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            suggestionsDiv.classList.add('hidden');
            performSearch(this.value);
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.classList.add('hidden');
        }
    });
});

function showSuggestions(query) {
    const suggestionsDiv = document.getElementById('suggestions');
    const filtered = suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
    
    if (filtered.length > 0) {
        suggestionsDiv.innerHTML = filtered.map(s => `
            <div class="p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800 last:border-0" onclick="selectSuggestion('${s}')">
                ${s}
            </div>
        `).join('');
    } else {
        suggestionsDiv.innerHTML = '<div class="p-3 text-gray-400">No suggestions found</div>';
    }
}

function selectSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    document.getElementById('suggestions').classList.add('hidden');
    performSearch(suggestion);
}

function performSearch(query) {
    const resultsDiv = document.getElementById('searchResults');
    
    // Show loading
    resultsDiv.innerHTML = '<div class="text-center py-12"><div class="loading-spinner mx-auto mb-4"></div><p class="text-gray-400">Searching...</p></div>';

    // Simulate search (in production, fetch from API)
    setTimeout(() => {
        if (!query) {
            resultsDiv.innerHTML = '<div class="text-center py-12"><div class="text-6xl mb-4">🔍</div><p class="text-xl text-gray-400">Start typing to search</p></div>';
            return;
        }

        // Mock results
        resultsDiv.innerHTML = `
            <div class="mb-6">
                <h2 class="text-2xl font-poppins font-bold mb-4 text-neon-cyan">Results for "${query}"</h2>
                <p class="text-gray-400 mb-6">Found 24 results</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                ${generateMockResults(query)}
            </div>
        `;
    }, 500);
}

function generateMockResults(query) {
    // Generate mock meme cards
    let html = '';
    for (let i = 1; i <= 8; i++) {
        html += `
            <div class="meme-card bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <a href="meme.html?id=${i}">
                    <img src="https://via.placeholder.com/300x300?text=Meme+${i}" alt="Meme ${i}" class="w-full h-auto cursor-pointer">
                </a>
                <div class="p-4">
                    <h3 class="font-semibold mb-2">Meme Result ${i}</h3>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-neon-pink">❤️ ${Math.floor(Math.random() * 1000)}</span>
                        <span class="text-neon-cyan">💬 ${Math.floor(Math.random() * 100)}</span>
                    </div>
                </div>
            </div>
        `;
    }
    return html;
}

function filterBy(type) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-gradient-to-r', 'from-neon-pink', 'to-neon-purple');
        btn.classList.add('bg-gray-900', 'border', 'border-gray-700');
    });

    // Add active class to clicked button
    event.target.classList.add('active', 'bg-gradient-to-r', 'from-neon-pink', 'to-neon-purple');
    event.target.classList.remove('bg-gray-900', 'border', 'border-gray-700');

    // Perform filtered search
    const query = document.getElementById('searchInput').value;
    if (query) {
        performSearch(query);
    }
}




