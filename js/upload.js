// Upload Meme JavaScript

let selectedFile = null;

document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadForm = document.getElementById('uploadForm');

    // Click to upload
    dropZone.addEventListener('click', () => fileInput.click());

    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-neon-green', 'bg-gray-900');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-neon-green', 'bg-gray-900');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-neon-green', 'bg-gray-900');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Form submission
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit();
    });
});

function handleFile(file) {
    selectedFile = file;
    const previewArea = document.getElementById('previewArea');
    const previewContainer = document.getElementById('previewContainer');
    
    previewArea.classList.remove('hidden');

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewContainer.innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="max-w-full h-auto rounded-lg mx-auto">
            `;
        };
        reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewContainer.innerHTML = `
                <video src="${e.target.result}" controls class="max-w-full h-auto rounded-lg mx-auto"></video>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function removePreview() {
    selectedFile = null;
    document.getElementById('previewArea').classList.add('hidden');
    document.getElementById('fileInput').value = '';
}

function toggleSchedule() {
    const scheduleSection = document.getElementById('scheduleSection');
    scheduleSection.classList.toggle('hidden');
}

function saveDraft() {
    const formData = {
        title: document.getElementById('memeTitle').value,
        category: document.querySelector('input[name="category"]:checked')?.value,
        tags: document.getElementById('memeTags').value,
        nsfw: document.getElementById('nsfwToggle').checked
    };
    
    localStorage.setItem('memeDraft', JSON.stringify(formData));
    alert('Draft saved!');
}

function handleSubmit() {
    if (!selectedFile) {
        alert('Please select a file to upload');
        return;
    }

    const title = document.getElementById('memeTitle').value;
    const category = document.querySelector('input[name="category"]:checked')?.value;
    
    if (!title || !category) {
        alert('Please fill in all required fields');
        return;
    }

    // Simulate upload
    const uploadBtn = document.querySelector('button[type="submit"]');
    uploadBtn.innerHTML = '⏳ Uploading...';
    uploadBtn.disabled = true;

    setTimeout(() => {
        alert('Meme uploaded successfully! 🎉');
        window.location.href = 'index.html';
    }, 2000);
}




