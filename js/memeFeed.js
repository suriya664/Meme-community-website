// Meme Feed JavaScript

// Function to generate image URL based on meme title and category
function getMemeImage(title, category, id) {
    // Create a data URL with SVG that displays the meme text in a styled way
    const colors = {
        relatable: { bg: '#0a0a0a', text: '#ff00ff', accent: '#00ffff', border: '#ff00ff', glow: '#ff00ff' },
        tech: { bg: '#000a14', text: '#00ffff', accent: '#ff00ff', border: '#00ffff', glow: '#00ffff' },
        student: { bg: '#0a140a', text: '#00ff00', accent: '#ffff00', border: '#00ff00', glow: '#00ff00' },
        dark: { bg: '#0a0a0a', text: '#ffff00', accent: '#ff00ff', border: '#ffff00', glow: '#ffff00' },
        funny: { bg: '#140a14', text: '#cc00ff', accent: '#00ffff', border: '#cc00ff', glow: '#cc00ff' }
    };
    
    const colorScheme = colors[category] || colors.funny;
    
    // Split title into words for better layout (meme style - usually 2 lines)
    const words = title.split(' ');
    const midPoint = Math.ceil(words.length / 2);
    const line1 = words.slice(0, midPoint).join(' ');
    const line2 = words.slice(midPoint).join(' ') || '';
    
    // Create SVG with meme text styled like a classic meme
    const svg = `
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgGrad${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${colorScheme.bg};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
                </linearGradient>
                <filter id="glow${id}">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <rect width="500" height="500" fill="url(#bgGrad${id})"/>
            <rect x="5" y="5" width="490" height="490" fill="none" stroke="${colorScheme.border}" stroke-width="4" rx="15" opacity="0.6"/>
            ${line1 ? `
                <text x="250" y="180" 
                      font-family="Impact, Arial Black, sans-serif" 
                      font-size="42" 
                      font-weight="900" 
                      fill="${colorScheme.text}" 
                      text-anchor="middle"
                      stroke="#000000"
                      stroke-width="8"
                      stroke-linejoin="round"
                      paint-order="stroke fill"
                      filter="url(#glow${id})">
                    ${line1.toUpperCase()}
                </text>
            ` : ''}
            ${line2 ? `
                <text x="250" y="280" 
                      font-family="Impact, Arial Black, sans-serif" 
                      font-size="42" 
                      font-weight="900" 
                      fill="${colorScheme.text}" 
                      text-anchor="middle"
                      stroke="#000000"
                      stroke-width="8"
                      stroke-linejoin="round"
                      paint-order="stroke fill"
                      filter="url(#glow${id})">
                    ${line2.toUpperCase()}
                </text>
            ` : ''}
            <circle cx="250" cy="380" r="35" fill="none" stroke="${colorScheme.accent}" stroke-width="3" opacity="0.8"/>
            <text x="250" y="390" font-family="Arial" font-size="32" fill="${colorScheme.accent}" text-anchor="middle" opacity="0.9">😂</text>
        </svg>
    `.trim().replace(/\s+/g, ' ');
    
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// Function to generate avatar URL based on author name
function getAvatarUrl(author, id) {
    const seed = id * 50;
    return `https://i.pravatar.cc/150?img=${seed % 70 + 1}`;
}

// Sample meme data (in production, this would come from an API)
const sampleMemes = [
    {
        id: 1,
        title: "When you realize it's Monday",
        image: getMemeImage("When you realize it's Monday", "relatable", 1),
        category: "relatable",
        likes: 1247,
        comments: 89,
        votes: 892,
        author: "meme_lord_69",
        authorAvatar: getAvatarUrl("meme_lord_69", 1),
        tags: ["#monday", "#relatable", "#work"],
        trending: true
    },
    {
        id: 2,
        title: "Tech support in a nutshell",
        image: getMemeImage("Tech support in a nutshell", "tech", 2),
        category: "tech",
        likes: 2156,
        comments: 156,
        votes: 1834,
        author: "tech_memer",
        authorAvatar: getAvatarUrl("tech_memer", 2),
        tags: ["#tech", "#support", "#funny"],
        trending: true
    },
    {
        id: 3,
        title: "Student life",
        image: getMemeImage("Student life", "student", 3),
        category: "student",
        likes: 3421,
        comments: 234,
        votes: 2890,
        author: "student_memes",
        authorAvatar: getAvatarUrl("student_memes", 3),
        tags: ["#student", "#college", "#life"],
        trending: true
    },
    {
        id: 4,
        title: "Dark humor incoming",
        image: getMemeImage("Dark humor incoming", "dark", 4),
        category: "dark",
        likes: 892,
        comments: 67,
        votes: 623,
        author: "dark_jokes",
        authorAvatar: getAvatarUrl("dark_jokes", 4),
        tags: ["#dark", "#humor"],
        trending: false
    },
    {
        id: 5,
        title: "Just another day",
        image: getMemeImage("Just another day", "funny", 5),
        category: "funny",
        likes: 567,
        comments: 45,
        votes: 489,
        author: "daily_memes",
        authorAvatar: getAvatarUrl("daily_memes", 5),
        tags: ["#funny", "#daily"],
        trending: false
    },
    {
        id: 6,
        title: "Relatable content",
        image: getMemeImage("Relatable content", "relatable", 6),
        category: "relatable",
        likes: 1234,
        comments: 98,
        votes: 1056,
        author: "relatable_memes",
        authorAvatar: getAvatarUrl("relatable_memes", 6),
        tags: ["#relatable", "#life"],
        trending: false
    },
    {
        id: 7,
        title: "Tech problems",
        image: getMemeImage("Tech problems", "tech", 7),
        category: "tech",
        likes: 789,
        comments: 56,
        votes: 678,
        author: "tech_humor",
        authorAvatar: getAvatarUrl("tech_humor", 7),
        tags: ["#tech", "#problems"],
        trending: false
    },
    {
        id: 8,
        title: "College struggles",
        image: getMemeImage("College struggles", "student", 8),
        category: "student",
        likes: 1456,
        comments: 123,
        votes: 1234,
        author: "college_memes",
        authorAvatar: getAvatarUrl("college_memes", 8),
        tags: ["#student", "#college", "#struggles"],
        trending: false
    }
];

let currentPage = 1;
const memesPerPage = 8;

// Load trending memes
function loadTrendingMemes() {
    const trendingContainer = document.getElementById('trendingMemes');
    if (!trendingContainer) return;
    
    const trending = sampleMemes.filter(meme => meme.trending);
    trendingContainer.innerHTML = trending.map(meme => createMemeCard(meme)).join('');
}

// Load latest memes
function loadLatestMemes() {
    const latestContainer = document.getElementById('latestMemes');
    if (!latestContainer) return;
    
    const start = (currentPage - 1) * memesPerPage;
    const end = start + memesPerPage;
    const memesToShow = sampleMemes.slice(start, end);
    
    if (currentPage === 1) {
        latestContainer.innerHTML = memesToShow.map(meme => createMemeCard(meme)).join('');
    } else {
        latestContainer.innerHTML += memesToShow.map(meme => createMemeCard(meme)).join('');
    }
}

// Create meme card HTML
function createMemeCard(meme) {
    return `
        <div class="meme-card bg-gray-900 rounded-lg overflow-hidden border border-gray-800" data-category="${meme.category}">
            <a href="meme.html?id=${meme.id}">
                <img src="${meme.image}" alt="${meme.title}" class="w-full h-auto cursor-pointer">
            </a>
            <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <img src="${meme.authorAvatar}" alt="${meme.author}" class="w-8 h-8 rounded-full border-2 border-neon-cyan">
                        <span class="text-sm text-neon-cyan">@${meme.author}</span>
                    </div>
                    <span class="text-xs px-2 py-1 rounded-full bg-gray-800 text-neon-pink">${meme.category}</span>
                </div>
                <h3 class="font-semibold mb-3 text-white">${meme.title}</h3>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${meme.tags.map(tag => `<span class="text-xs text-neon-green hover:text-neon-cyan cursor-pointer">${tag}</span>`).join('')}
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button onclick="handleLike(${meme.id})" class="flex items-center space-x-1 text-gray-400 hover:text-neon-pink transition">
                            <span>❤️</span>
                            <span id="likes-${meme.id}">${meme.likes}</span>
                        </button>
                        <button onclick="handleUpvote(${meme.id})" class="flex items-center space-x-1 text-gray-400 hover:text-neon-green transition">
                            <span>⬆️</span>
                            <span id="votes-${meme.id}">${meme.votes}</span>
                        </button>
                        <a href="meme.html?id=${meme.id}" class="flex items-center space-x-1 text-gray-400 hover:text-neon-cyan transition">
                            <span>💬</span>
                            <span>${meme.comments}</span>
                        </a>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="shareMeme('whatsapp', ${meme.id})" class="text-gray-400 hover:text-green-400 transition p-2 rounded-lg hover:bg-gray-800" title="Share on WhatsApp">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                        </button>
                        <button onclick="shareMeme('twitter', ${meme.id})" class="text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-gray-800" title="Share on X">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </button>
                        <button onclick="toggleSave(${meme.id})" id="save-btn-${meme.id}" class="text-gray-400 hover:text-neon-pink transition p-2 rounded-lg hover:bg-gray-800" title="Save">🔖</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load more memes (infinite scroll)
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            loadLatestMemes();
            // In a real app, you'd check if there are more memes to load
        });
    }
    
    // Infinite scroll implementation
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
            currentPage++;
            loadLatestMemes();
        }
    });
});




