// Configuration - Change this to match your backend service URL
const API_BASE_URL = 'http://localhost/books'; // This will be your Kubernetes service URL

// DOM Elements
const addBookForm = document.getElementById('addBookForm');
const bookTitleInput = document.getElementById('bookTitle');
const bookAuthorInput = document.getElementById('bookAuthor');
const booksContainer = document.getElementById('booksContainer');
const loadingElement = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const emptyState = document.getElementById('emptyState');
const refreshBtn = document.getElementById('refreshBtn');
const successMessage = document.getElementById('successMessage');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');

// State
let books = [];
let bookToDelete = null;

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Book Library App Started!');
    loadBooks();
    setupEventListeners();
});

// Set up all event listeners
function setupEventListeners() {
    // Form submission
    addBookForm.addEventListener('submit', handleAddBook);
    
    // Refresh button
    refreshBtn.addEventListener('click', loadBooks);
    
    // Delete modal buttons
    confirmDeleteBtn.addEventListener('click', handleConfirmDelete);
    cancelDeleteBtn.addEventListener('click', hideDeleteModal);
    
    // Close modal when clicking outside
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            hideDeleteModal();
        }
    });
}

// Load all books from the API
async function loadBooks() {
    console.log('📖 Loading books...');
    showLoading();
    hideError();
    
    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        books = await response.json();
        console.log(`✅ Loaded ${books.length} books`);
        displayBooks();
        
    } catch (error) {
        console.error('❌ Error loading books:', error);
        showError('Failed to load books. Make sure your backend service is running.');
    } finally {
        hideLoading();
    }
}

// Handle adding a new book
async function handleAddBook(event) {
    event.preventDefault();
    
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    
    if (!title || !author) {
        alert('Please fill in both title and author!');
        return;
    }
    
    console.log(`📝 Adding book: "${title}" by ${author}`);
    
    // Show loading state on button
    const submitBtn = addBookForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                author: author
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newBook = await response.json();
        console.log('✅ Book added successfully:', newBook);
        
        // Clear form
        bookTitleInput.value = '';
        bookAuthorInput.value = '';
        
        // Show success message
        showSuccess();
        
        // Reload books
        loadBooks();
        
    } catch (error) {
        console.error('❌ Error adding book:', error);
        alert('Failed to add book. Please try again.');
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        submitBtn.disabled = false;
    }
}

// Display books in the grid
function displayBooks() {
    if (books.length === 0) {
        showEmptyState();
        return;
    }
    
    hideEmptyState();
    
    booksContainer.innerHTML = books.map(book => `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-title">
                📖 ${escapeHtml(book.title)}
            </div>
            <div class="book-author">
                ✍️ ${escapeHtml(book.author)}
            </div>
            <div class="book-id">
                ID: ${book.id}
            </div>
            <div class="book-actions">
                <button class="btn-danger btn-small" onclick="showDeleteModal(${book.id})">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Show delete confirmation modal
function showDeleteModal(bookId) {
    bookToDelete = books.find(book => book.id === bookId);
    if (bookToDelete) {
        deleteModal.classList.remove('hidden');
        console.log(`🗑️ Showing delete modal for: "${bookToDelete.title}"`);
    }
}

// Hide delete modal
function hideDeleteModal() {
    deleteModal.classList.add('hidden');
    bookToDelete = null;
}

// Handle confirmed delete
async function handleConfirmDelete() {
    if (!bookToDelete) return;
    
    console.log(`🗑️ Deleting book: "${bookToDelete.title}"`);
    
    try {
        const response = await fetch(`${API_BASE_URL}/${bookToDelete.id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('✅ Book deleted successfully');
        hideDeleteModal();
        loadBooks(); // Reload the books list
        
    } catch (error) {
        console.error('❌ Error deleting book:', error);
        alert('Failed to delete book. Please try again.');
    }
}

// Show success message
function showSuccess() {
    successMessage.classList.remove('hidden');
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 3000);
}

// Show loading state
function showLoading() {
    loadingElement.classList.remove('hidden');
    booksContainer.classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    loadingElement.classList.add('hidden');
    booksContainer.classList.remove('hidden');
}

// Show error message
function showError(message) {
    errorMessage.querySelector('p').textContent = `❌ ${message}`;
    errorMessage.classList.remove('hidden');
}

// Hide error message
function hideError() {
    errorMessage.classList.add('hidden');
}

// Show empty state
function showEmptyState() {
    emptyState.classList.remove('hidden');
    booksContainer.classList.add('hidden');
}

// Hide empty state
function hideEmptyState() {
    emptyState.classList.add('hidden');
    booksContainer.classList.remove('hidden');
}

// Utility function to escape HTML and prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Global function for delete button (called from HTML)
window.showDeleteModal = showDeleteModal;

console.log('🚀 Book Library JavaScript loaded successfully!');
