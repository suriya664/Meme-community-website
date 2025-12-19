// Meme Detail Page JavaScript

function addEmoji(emoji) {
    const commentInput = document.getElementById('commentInput');
    commentInput.value += emoji;
    commentInput.focus();
}

function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim();
    
    if (!comment) {
        alert('Please enter a comment');
        return;
    }

    const commentsList = document.getElementById('commentsList');
    const newComment = document.createElement('div');
    newComment.className = 'comment p-4 bg-gray-800 rounded-lg';
    newComment.innerHTML = `
        <div class="flex items-start space-x-3">
            <img src="https://via.placeholder.com/40" alt="User" class="w-10 h-10 rounded-full">
            <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                    <span class="font-semibold text-neon-cyan">@you</span>
                    <span class="text-xs text-gray-400">just now</span>
                </div>
                <p class="text-gray-300 mb-2">${comment}</p>
                <div class="flex items-center space-x-4 text-sm">
                    <button class="text-gray-400 hover:text-neon-pink transition">❤️ 0</button>
                    <button class="text-gray-400 hover:text-neon-cyan transition">Reply</button>
                </div>
            </div>
        </div>
    `;
    
    commentsList.insertBefore(newComment, commentsList.firstChild);
    commentInput.value = '';
    
    // Update comment count
    const commentCount = document.getElementById('commentCount');
    commentCount.textContent = parseInt(commentCount.textContent) + 1;
}

function followCreator() {
    const btn = event.target;
    if (btn.textContent === '+ Follow') {
        btn.textContent = '✓ Following';
        btn.classList.remove('from-neon-pink', 'to-neon-purple');
        btn.classList.add('bg-gray-800');
    } else {
        btn.textContent = '+ Follow';
        btn.classList.add('from-neon-pink', 'to-neon-purple');
        btn.classList.remove('bg-gray-800');
    }
}

function reportMeme() {
    const reason = prompt('Please select a reason:\n1. Spam\n2. Offensive Content\n3. Copyright Violation\n4. Other');
    if (reason) {
        alert('Thank you for reporting. We will review this content.');
    }
}

// Load meme data (in production, fetch from API based on URL parameter)
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const memeId = urlParams.get('id');
    
    // In production, fetch meme data based on ID
    console.log('Loading meme:', memeId);
});




