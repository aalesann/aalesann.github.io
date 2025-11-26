const articles = [
    {
        id: 1,
        title: "Top 10 OWASP Vulnerabilities 2024",
        category: "pentesting",
        excerpt: "An in-depth analysis of the latest OWASP Top 10 list. Injection flaws and broken access control top the charts again...",
        date: "2024-11-20"
    },
    {
        id: 2,
        title: "Setting up a Blue Team Lab",
        category: "blue-team",
        excerpt: "Learn how to build a defensive security lab using SIEM tools like Wazuh and Splunk to detect simulated attacks...",
        date: "2024-11-18"
    },
    {
        id: 3,
        title: "Introduction to Quantum Cryptography",
        category: "crypto",
        excerpt: "Quantum computing poses a threat to RSA. Explore post-quantum algorithms and how they aim to secure the future...",
        date: "2024-11-15"
    },
    {
        id: 4,
        title: "Kali Linux: Essential Tools for Beginners",
        category: "pentesting",
        excerpt: "Nmap, Metasploit, Wireshark. A guide to the must-know tools for anyone starting their journey in ethical hacking...",
        date: "2024-11-10"
    },
    {
        id: 5,
        title: "Threat Hunting with YARA Rules",
        category: "blue-team",
        excerpt: "Write custom YARA rules to identify malware families and indicators of compromise (IoCs) in your network...",
        date: "2024-11-05"
    },
    {
        id: 6,
        title: "Understanding Zero Knowledge Proofs",
        category: "crypto",
        excerpt: "How to prove you know a secret without revealing the secret itself. The math behind privacy-preserving protocols...",
        date: "2024-11-01"
    }
];

const blogGrid = document.getElementById('blog-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderArticles(filter = 'all') {
    blogGrid.innerHTML = '';

    const filteredArticles = filter === 'all'
        ? articles
        : articles.filter(article => article.category === filter);

    filteredArticles.forEach(article => {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="card-tag">${article.category.toUpperCase()}</div>
            <h3 class="card-title">${article.title}</h3>
            <p class="card-excerpt">${article.excerpt}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #666; font-size: 0.8rem;">${article.date}</span>
                <a href="#" class="read-more">READ_LOG ></a>
            </div>
        `;
        blogGrid.appendChild(card);
    });
}

// Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter articles
        const filterValue = btn.getAttribute('data-filter');
        renderArticles(filterValue);
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
});
