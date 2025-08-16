// Mock student data
const MOCK_STUDENTS = [
    { id: "STU001", name: "Alice Johnson", address: "0xa1b2c3d4e5f6789012345678901234567890abcd" },
    { id: "STU002", name: "Bob Smith", address: "0xb2c3d4e5f6789012345678901234567890abcdef12" },
    { id: "STU003", name: "Carol Davis", address: "0xc3d4e5f6789012345678901234567890abcdef1234" }
];

let walletConnected = false;
let currentStudent = null;
let mockSubmissions = [];

// DOM elements
const connectWalletBtn = document.getElementById('connectWallet');
const studentId = document.getElementById('studentId');
const storeForm = document.getElementById('storeForm');
const readForm = document.getElementById('readForm');
const statusBar = document.getElementById('status');
const logResult = document.getElementById('logResult');
const resultContent = document.getElementById('resultContent');
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.querySelector('.theme-icon');

// Utility functions
function showStatus(message, type = 'info') {
    statusBar.textContent = message;
    statusBar.className = `status-bar status-${type}`;
    setTimeout(() => {
        statusBar.textContent = '';
        statusBar.className = 'status-bar';
    }, 3000);
}

function hexToUint8Array(hex) {
    const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
        bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
    }
    return Array.from(bytes);
}

function stringToUint8Array(str) {
    return Array.from(new TextEncoder().encode(str));
}

function uint8ArrayToString(arr) {
    return new TextDecoder().decode(new Uint8Array(arr));
}

function uint8ArrayToHex(arr) {
    return '0x' + Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSimpleHash(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
}

// Mock wallet connection
connectWalletBtn.addEventListener('click', () => {
    // Simulate connecting to a random mock student
    const randomStudent = MOCK_STUDENTS[Math.floor(Math.random() * MOCK_STUDENTS.length)];
    
    currentStudent = randomStudent;
    walletConnected = true;
    
    connectWalletBtn.textContent = 'Connected ✓';
    connectWalletBtn.style.background = '#4CAF50';
    studentId.textContent = `Student: ${currentStudent.name} (${currentStudent.id})`;
    
    showStatus(`Connected as ${currentStudent.name}! 🎓`, 'success');
});

// Store assignment submission (mock)
storeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!walletConnected) {
        showStatus('Please connect your student wallet first', 'error');
        return;
    }

    const logData = document.getElementById('logData').value;
    const proofHash = document.getElementById('proofHash').value;
    
    const submitBtn = storeForm.querySelector('.action-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Simulate submission delay
    setTimeout(() => {
        const submission = {
            student: currentStudent,
            data: logData,
            proofHash: proofHash,
            timestamp: Math.floor(Date.now() / 1000),
            date: new Date()
        };
        
        mockSubmissions.push(submission);
        
        showStatus('Assignment submitted successfully! 🎉', 'success');
        storeForm.reset();
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Assignment';
    }, 1500);
});

// Read assignment submissions (mock)
readForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const ownerAddress = document.getElementById('ownerAddress').value;
    
    const submitBtn = readForm.querySelector('.action-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Loading...';
    
    // Simulate loading delay
    setTimeout(() => {
        // Find student by address
        const student = MOCK_STUDENTS.find(s => s.address === ownerAddress);
        const submission = mockSubmissions.find(s => s.student.address === ownerAddress) || 
                          // Provide default submission for demo
                          {
                              student: student || { name: "Demo Student", id: "STU999" },
                              data: "Completed Math Assignment #5\n\nSolved all 10 problems:\n1. 2x + 5 = 15, x = 5\n2. Area of circle = πr² = 78.54 cm²\n3. Derivative of x³ = 3x²\n...",
                              proofHash: "0xabc123def456",
                              timestamp: Math.floor(Date.now() / 1000) - 3600,
                              date: new Date(Date.now() - 3600000)
                          };
        
        if (submission) {
            resultContent.innerHTML = `
                <div class="result-item">
                    <strong>📝 Assignment Details:</strong><br>
                    <pre>${submission.data}</pre>
                </div>
                <div class="result-item">
                    <strong>🔐 Assignment ID/Hash:</strong><br>
                    <code>${submission.proofHash}</code>
                </div>
                <div class="result-item">
                    <strong>📅 Submission Time:</strong><br>
                    ${submission.date.toLocaleString()}
                </div>
                <div class="result-item">
                    <strong>👤 Student:</strong><br>
                    ${submission.student.name} (${submission.student.id})
                </div>
                <div class="result-item">
                    <strong>📍 Student Address:</strong><br>
                    <code>${ownerAddress}</code>
                </div>
                <div class="result-item">
                    <strong>✅ Status:</strong><br>
                    <span style="color: #4CAF50; font-weight: bold;">Verified & Recorded</span>
                </div>
            `;
            
            logResult.style.display = 'block';
            showStatus('Assignment details loaded successfully! 📚', 'success');
        } else {
            showStatus('No assignments found for this student address', 'error');
            logResult.style.display = 'none';
        }
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'View Submissions';
    }, 1000);
});

// Generate hash button
document.getElementById('generateHash').addEventListener('click', function() {
    const logData = document.getElementById('logData').value;
    if (logData.trim()) {
        const hash = generateSimpleHash(logData);
        document.getElementById('proofHash').value = hash;
        showStatus('Hash generated from assignment details!', 'success');
    } else {
        showStatus('Please enter assignment details first', 'error');
    }
});

// Auto-fill current student address
document.getElementById('ownerAddress').addEventListener('focus', function() {
    if (walletConnected && currentStudent && !this.value) {
        this.value = currentStudent.address;
    }
});

// Show sample addresses button
document.getElementById('ownerAddress').addEventListener('click', function() {
    if (!this.value) {
        const addresses = MOCK_STUDENTS.map(s => s.address).join('\n');
        showStatus('Sample addresses: Click to copy any address', 'info');
        console.log('Available student addresses:', MOCK_STUDENTS);
    }
});

// Dark mode functionality
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function updateTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        darkModeToggle.title = 'Switch to Light Mode';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        darkModeToggle.title = 'Switch to Dark Mode';
    }
    localStorage.setItem('darkMode', isDarkMode);
}

darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    updateTheme();
    showStatus(`Switched to ${isDarkMode ? 'dark' : 'light'} mode! ✨`, 'success');
});

// Initialize theme
updateTheme();

// Initialize
showStatus('Welcome! Connect your student wallet to submit assignments 🎓', 'info');