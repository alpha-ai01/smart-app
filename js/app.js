let currentLang = config.defaultLang;

function init() {
    renderPosts(postsDatabase);
    updateTexts();
}

function renderPosts(posts) {
    const grid = document.getElementById('article-grid');
    grid.innerHTML = '';
    posts.forEach(post => {
        grid.innerHTML += `
            <div class="card" onclick="openReader('${post.id}')">
                <div class="card-img" style="background-image: url('${post.coverImage}')"></div>
                <div class="card-content">
                    <span class="badge ${post.category}">${post.category.toUpperCase()}</span>
                    <h3 style="margin-bottom: 10px;">${post.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">${post.excerpt}</p>
                </div>
            </div>
        `;
    });
}

function openReader(id) {
    const post = postsDatabase.find(p => p.id === id);
    if(!post) return;
    document.getElementById('landing-view').style.display = 'none';
    document.getElementById('reader-view').style.display = 'block';
    window.scrollTo(0, 0);
    
    document.getElementById('reader-title').innerText = post.title;
    document.getElementById('reader-cover').src = post.coverImage;
    document.getElementById('reader-body').innerHTML = post.content;
    
    const shopBox = document.getElementById('reader-shop');
    if(post.shopLink) {
        shopBox.style.display = 'flex';
        document.getElementById('shop-link').href = post.shopLink;
    } else {
        shopBox.style.display = 'none';
    }
}

function closeReader() {
    document.getElementById('reader-view').style.display = 'none';
    document.getElementById('landing-view').style.display = 'block';
}

function filterCategory(cat) {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    if(cat === 'all') renderPosts(postsDatabase);
    else renderPosts(postsDatabase.filter(p => p.category === cat));
}

function updateTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = config.translations[currentLang][key];
    });
    document.querySelector('[data-i18n-placeholder]').placeholder = config.translations[currentLang]['searchPlace'];
}

function setLang(lang) {
    currentLang = lang;
    updateTexts();
}

window.onload = init;
