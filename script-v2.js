

//  WORLDOPS - SCRIPT COMPLET

// ─── Config ───
const PASSWORD = "G650Crew";
// ─── Supabase ───
const SUPABASE_URL = "https://qgtqcfaljzjnykdyxatg.supabase.co";  
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndHFjZmFsanpqbnlrZHl4YXRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4NzU5NTAsImV4cCI6MjEwNzQ1MTk1MH0.VFgatFTipJlg3aJktO0WIO_uktgKTw_SOLdyPhECCIc";
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STORAGE_KEY = "worldops_documents";
const NOTES_STORAGE_KEY = "worldops_notes";
const CITIES_STORAGE_KEY = "worldops_custom_cities";
const SMARTPHONE_API_KEY = "M5Z3rL8JIIhPGcMuxSw1RGTMEVyg7XWqB8G%2FSF6QphUPdcQsj0c5GHhSvcOHWUAd";

// ─── Sections ───
const public = document.getElementById("public");
const login = document.getElementById("login");
const visa = document.getElementById("visa");

// ─── Menu ───
const menuPublic = document.getElementById("menuPublic");
const menuPrivate = document.getElementById("menuPrivate");

// ─── Login ───
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");
const logoutButton = document.getElementById("logoutButton");

// ─── Visa / Passport ───
const addVisaButton = document.getElementById("addVisaButton");
const addForm = document.getElementById("addForm");
const saveVisaButton = document.getElementById("saveVisaButton");
const cancelVisaButton = document.getElementById("cancelVisaButton");
const visaList = document.getElementById("visaList");
const crewName = document.getElementById("crewName");
const country = document.getElementById("country");
const docType = document.getElementById("docType");
const expiryDate = document.getElementById("expiryDate");
const photoInput = document.getElementById("photoInput");

// ─── Destination Notes ───
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const searchButton = document.getElementById("searchButton");
const addNoteForm = document.getElementById("addNoteForm");
const noteCity = document.getElementById("noteCity");
const noteCategory = document.getElementById("noteCategory");
const noteAuthor = document.getElementById("noteAuthor");
const noteText = document.getElementById("noteText");
const saveNoteButton = document.getElementById("saveNoteButton");
const cancelNoteButton = document.getElementById("cancelNoteButton");
const notesList = document.getElementById("notesList");

// ─── Add Destination ───
const addDestinationButton = document.getElementById("addDestinationButton");
const addDestinationForm = document.getElementById("addDestinationForm");
const saveDestinationButton = document.getElementById("saveDestinationButton");
const cancelDestinationButton = document.getElementById("cancelDestinationButton");
const newCity = document.getElementById("newCity");
const newCountry = document.getElementById("newCountry");
const newCode = document.getElementById("newCode");

// ─── Données ───
let documents = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let notes = JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY)) || [];
let customCities = JSON.parse(localStorage.getItem(CITIES_STORAGE_KEY)) || [];
let currentCity = "";
let currentCategory = "";



//  SQLITE - Chargement en arrière-plan


let airportsDb = null;
let sqliteReady = false;

(async function loadSqlite() {
    try {
        console.log("🔄 Chargement de SQLite en arrière-plan...");
        
        const SQL = await initSqlJs({
            locateFile: file => `https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/${file}`
        });
        
        const response = await fetch('/airports.sqlite');
        const buffer = await response.arrayBuffer();
        
        airportsDb = new SQL.Database(new Uint8Array(buffer));
        sqliteReady = true;
        
        console.log("✅ SQLite chargé ! (85 000 aéroports)");
    } catch (error) {
        console.error("❌ SQLite error:", error);
    }
})();


//  APP LOGIN (mot de passe global)



const APP_PASSWORD = "LXICE";

const appLoginScreen = document.getElementById("appLoginScreen");
const appPasswordInput = document.getElementById("appPasswordInput");
const appLoginButton = document.getElementById("appLoginButton");
const appLoginError = document.getElementById("appLoginError");

// Vérifier si déjà connecté DANS CETTE SESSION
if (sessionStorage.getItem("appLoggedIn") === "true") {
    // Déjà connecté dans cette session
    appLoginScreen.style.display = "none";
    document.querySelector(".sidebar").style.display = "block";
    document.querySelector(".main-content").style.display = "block";
} else {
    // Pas connecté → cacher l'app
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".main-content").style.display = "none";
    appLoginScreen.style.display = "flex";
}

// Login
appLoginButton.addEventListener("click", function() {
    if (appPasswordInput.value === APP_PASSWORD) {
        // Bon mot de passe → sauvegarder dans sessionStorage
        sessionStorage.setItem("appLoggedIn", "true");
        
        appLoginScreen.style.display = "none";
        document.querySelector(".sidebar").style.display = "block";
        document.querySelector(".main-content").style.display = "block";
        appPasswordInput.value = "";
        appLoginError.style.display = "none";
    } else {
        appLoginError.style.display = "block";
        appPasswordInput.value = "";
        appPasswordInput.focus();
    }
});

// Touche Entrée
appPasswordInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") appLoginButton.click();
});

appPasswordInput.focus();

//  NAVIGATION


function showSection(section) {
    public.style.display = "none";
    login.style.display = "none";
    visa.style.display = "none";
    section.style.display = "block";
}

function setActiveMenu(activeItem) {
    menuPublic.classList.remove("active");
    menuPrivate.classList.remove("active");
    activeItem.classList.add("active");
}

menuPublic.addEventListener("click", function() {
    showSection(public);
    setActiveMenu(menuPublic);
    
    // Réinitialiser la page Destination
    searchInput.value = "";
    notesList.innerHTML = "";
    currentCity = "";
    currentCategory = "";
    addNoteForm.style.display = "none";
});

menuPrivate.addEventListener("click", function() {
    showSection(login);
    setActiveMenu(menuPrivate);
    passwordInput.value = "";
    loginError.style.display = "none";
    passwordInput.focus();
});


//  LOGIN


loginButton.addEventListener("click", function() {
    if (passwordInput.value === PASSWORD) {
        showSection(visa);
        loginError.style.display = "none";
        passwordInput.value = "";
        renderDocuments();
    } else {
        loginError.style.display = "block";
        passwordInput.value = "";
        passwordInput.focus();
    }
});

passwordInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") loginButton.click();
});

logoutButton.addEventListener("click", function() {
    showSection(login);
    passwordInput.value = "";
    loginError.style.display = "none";
    passwordInput.focus();
});


//  ALERTES


function getAlert(expiryDateStr) {
    const today = new Date();
    const expiry = new Date(expiryDateStr);
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (days < 30) {
        return { color: "#e53e3e", icon: "🔴", label: "URGENT", days: days };
    } else if (days < 60) {
        return { color: "#dd6b20", icon: "🟡", label: "WARNING", days: days };
    } else {
        return { color: "#38a169", icon: "🟢", label: "OK", days: days };
    }
}


//  AFFICHAGE DES DOCUMENTS


function renderDocuments() {
    if (documents.length === 0) {
        visaList.innerHTML = `<p style="color: #a0aec0; text-align: center; padding: 30px;">📭 No documents yet.</p>`;
        return;
    }
    
    const sorted = [...documents].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    
    visaList.innerHTML = sorted.map((doc) => {
        const alert = getAlert(doc.expiryDate);
        const typeLabel = doc.type === "Passport" ? "📄 Passport" : "🛂 Visa";
        const photoHtml = doc.photo ? `<img src="${doc.photo}" style="max-width: 100%; max-height: 150px; border-radius: 8px; margin-top: 10px;">` : '';
        
        return `
            <div style="background: white; border-left: 6px solid ${alert.color}; border-radius: 12px; padding: 16px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 8px;">
                    <div>
                        <div style="font-size: 16px; font-weight: 700; color: #1a202c; margin-bottom: 6px;">👤 ${doc.crewName}</div>
                        <div style="font-size: 14px; color: #4a5568; margin-bottom: 4px;">🌍 ${doc.country} — ${typeLabel}</div>
                        <div style="font-size: 13px; color: #718096;">📅 Expires: ${new Date(doc.expiryDate).toLocaleDateString('en-GB')}</div>
                        <div style="font-size: 14px; font-weight: 700; color: ${alert.color}; margin-top: 8px;">${alert.icon} ${alert.label} — ${alert.days} days</div>
                    </div>
                    <button onclick="deleteDocument(${doc.id})" style="background: #fc8181; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">✕ Delete</button>
                </div>
                ${photoHtml}
            </div>
        `;
    }).join('');
}


//  AJOUT DOCUMENT


addVisaButton.addEventListener("click", function() {
    addForm.style.display = "block";
    crewName.focus();
});

cancelVisaButton.addEventListener("click", function() {
    addForm.style.display = "none";
    clearForm();
});

function clearForm() {
    crewName.value = "";
    country.value = "";
    docType.value = "Passport";
    expiryDate.value = "";
    photoInput.value = "";
}

saveVisaButton.addEventListener("click", function() {
    if (!crewName.value.trim() || !country.value.trim() || !expiryDate.value) {
        alert("Please fill in Crew Name, Country, and Expiry Date.");
        return;
    }
    
    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) { saveDocument(e.target.result); };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        saveDocument(null);
    }
});

function saveDocument(photoData) {
    const newDoc = {
        id: Date.now(),
        crewName: crewName.value.trim(),
        country: country.value.trim(),
        type: docType.value,
        expiryDate: expiryDate.value,
        photo: photoData
    };
    documents.push(newDoc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    clearForm();
    addForm.style.display = "none";
    renderDocuments();
}

window.deleteDocument = function(id) {
    if (!confirm("Delete this document?")) return;
    documents = documents.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    renderDocuments();
};

       
//  SUGGESTIONS D'AÉROPORTS (Woosmap 🇫🇷)
// ═══════════════════════════════════════════


const WOOSMAP_API_KEY = "woos-dd8d1dbb-df54-328f-9e5e-556984559e37";

    if (searchInput && suggestions) {
    let debounceTimer;
    
    searchInput.addEventListener("input", function() {
        clearTimeout(debounceTimer);
        const value = this.value.trim();
        
        if (value.length < 2) {
            suggestions.style.display = "none";
            return;
        }
        
        debounceTimer = setTimeout(async () => {
            
            // ⚡ RECHERCHE PAR CODE (IATA ou ICAO)
            if (value.length === 3 || value.length === 4) {
                const code = value.toUpperCase();
                
                // ─── CAS 1 : Code de 3 lettres (IATA) → Airport Gap ───
                if (value.length === 3) {
                    try {
                        const response = await fetch(`https://airportgap.com/api/airports/${code}`);
                        if (response.ok) {
                            const data = await response.json();
                            const airport = data.data.attributes;
                            suggestions.innerHTML = `
                                <div class="suggestion-item" data-city="${airport.city}" style="padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f7fafc; font-size: 14px;">
                                    <span style="font-weight: 700; color: #2b6cb0;">${airport.iata}</span>
                                    <span style="color: #4a5568; font-size: 13px; margin-left: 8px;">— ${airport.name}</span>
                                    <span style="color: #a0aec0; font-size: 12px; margin-left: 8px;">${airport.city}, ${airport.country}</span>
                                </div>
                            `;
                            suggestions.style.display = "block";
                            suggestions.querySelector(".suggestion-item").addEventListener("click", function() {
                                searchInput.value = this.dataset.city;
                                suggestions.style.display = "none";
                                searchInput.focus();
                                currentCity = this.dataset.city;
                                renderNotesForCity(this.dataset.city);
                            });
                            return;
                        }
                    } catch (error) {
                        console.error("Airport Gap error:", error);
                    }
                }
                
                // ─── CAS 2 : Code de 4 lettres (ICAO) → SQLite ───
                if (value.length === 4) {
                    if (sqliteReady && airportsDb) {
                        try {
                            const results = airportsDb.exec(`
                                SELECT ident, iata_code, name, municipality, iso_country
                                FROM airports
                                WHERE UPPER(ident) = '${code}' OR UPPER(iata_code) = '${code}'
                                LIMIT 5
                            `);
                            
                            if (results.length > 0 && results[0].values.length > 0) {
                                const airports = results[0].values;
                                suggestions.innerHTML = airports.map(a => {
                                    const [ident, iata, name, city, country] = a;
                                    return `
                                        <div class="suggestion-item" data-city="${city || name}" style="padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f7fafc; font-size: 14px;">
                                            <span style="font-weight: 700; color: #2b6cb0;">${ident}</span>
                                            <span style="color: #4a5568; font-size: 13px; margin-left: 8px;">— ${name}</span>
                                            <span style="color: #a0aec0; font-size: 12px; margin-left: 8px;">${city || ""}, ${country || ""}</span>
                                        </div>
                                    `;
                                }).join('');
                                suggestions.style.display = "block";
                                suggestions.querySelectorAll(".suggestion-item").forEach(item => {
                                    item.addEventListener("click", function() {
                                        searchInput.value = this.dataset.city;
                                        suggestions.style.display = "none";
                                        searchInput.focus();
                                        currentCity = this.dataset.city;
                                        renderNotesForCity(this.dataset.city);
                                    });
                                });
                                return;
                            }
                        } catch (error) {
                            console.error("SQLite error:", error);
                        }
                    } else {
                        console.log("⏳ SQLite pas encore prêt...");
                    }
                }
            }
            
            // 🌐 2. PUIS WOOSMAP
            try {
                const response = await fetch(
                    `https://api.woosmap.com/localities/autocomplete/?input=${encodeURIComponent(value)}&types=airport&key=${WOOSMAP_API_KEY}`
                );
                const data = await response.json();
                
                if (data && data.localities && data.localities.length > 0) {
                    suggestions.innerHTML = data.localities.map(item => {
                        const cityName = item.description || "";
                        const type = item.types ? item.types.join(", ") : "";
                        
                        return `
                            <div class="suggestion-item" data-city="${cityName}" style="padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f7fafc; font-size: 14px;">
                                <span style="font-weight: 700; color: #2b6cb0;">${cityName}</span>
                                <span style="color: #a0aec0; font-size: 12px; margin-left: 8px;">${type}</span>
                            </div>
                        `;
                    }).join('');
                    
                    suggestions.style.display = "block";
                    
                    suggestions.querySelectorAll(".suggestion-item").forEach(item => {
                        item.addEventListener("click", function() {
                            searchInput.value = this.dataset.city;
                            suggestions.style.display = "none";
                            searchInput.focus();
                            currentCity = this.dataset.city;
                            renderNotesForCity(this.dataset.city);
                        });
                        item.addEventListener("mouseenter", function() { this.style.background = "#ebf8ff"; });
                        item.addEventListener("mouseleave", function() { this.style.background = "white"; });
                    });
                } else {
                    suggestions.style.display = "none";
                }
            } catch (error) {
                console.error("Woosmap error:", error);
                suggestions.style.display = "none";
            }
        }, 300);
    });
    
    document.addEventListener("click", function(e) {
        if (!e.target.closest("#suggestions") && e.target !== searchInput) {
            suggestions.style.display = "none";
        }
    });
}
 

    


//  AJOUTER UNE DESTINATION


addDestinationButton.addEventListener("click", function() {
    addDestinationForm.style.display = "block";
    newCity.focus();
});


cancelDestinationButton.addEventListener("click", function() {
    addDestinationForm.style.display = "none";
    clearDestinationForm();
});

function clearDestinationForm() {
    newCity.value = "";
    newCountry.value = "";
    newCode.value = "";
}

saveDestinationButton.addEventListener("click", function() {
    if (!newCity.value.trim() || !newCountry.value.trim()) {
        alert("Please fill in City Name and Country.");
        return;
    }
    
    const newDestination = {
        code: newCode.value.trim().toUpperCase() || "---",
        city: newCity.value.trim(),
        country: newCountry.value.trim()
    };
    
    customCities.push(newDestination);
    localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(customCities));
    clearDestinationForm();
    addDestinationForm.style.display = "none";
    alert("✅ Destination added: " + newDestination.city);
});


//  NOTES PAR CATÉGORIE

searchButton.addEventListener("click", function() {
    const city = searchInput.value.trim();
    if (!city) return;
    currentCity = city;
    renderNotesForCity(city);
});

async function renderNotesForCity(city) {
    const categories = [
        { name: "Airport", icon: "🛫" },
        { name: "Hotels", icon: "🏨" },
        { name: "Catering", icon: "🍽️" },
        { name: "Handling", icon: "🛫" },
        { name: "Language", icon: "🗣️" },
        { name: "Other", icon: "📌" }
    ];
    
    const { data: cityNotes, error } = await supabaseClient
        .from('notes')
        .select('*')
        .ilike('city', city);
    
    if (error) {
        console.error("Supabase error:", error);
        return;
    }
    
    let html = `<h3 style="margin-bottom: 20px;">📍 ${city}</h3>`;
    
    categories.forEach(cat => {
        const count = cityNotes.filter(n => n.category === cat.name).length;
        const badge = count > 0 
            ? `<span style="background: #4299e1; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-left: 8px;">${count}</span>` 
            : `<span style="color: #a0aec0; font-size: 12px; margin-left: 8px;">empty</span>`;
        
        html += `
            <div onclick="showCategory('${city}', '${cat.name}')" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin-bottom: 10px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onmouseover="this.style.borderColor='#4299e1';" onmouseout="this.style.borderColor='#e2e8f0';">
                <span style="font-size: 16px; font-weight: 600; color: #2b6cb0;">${cat.icon} ${cat.name}</span>
                <span style="display: flex; align-items: center;">${badge}<span style="margin-left: 12px; color: #a0aec0; font-size: 20px;">›</span></span>
            </div>
        `;
    });
    
    notesList.innerHTML = html;
}


window.showCategory = async function(city, category) {


    currentCity = city;
    currentCategory = category;
    
    const { data: categoryNotes, error } = await supabaseClient
        .from('notes')
        .select('*')
        .ilike('city', city)
        .eq('category', category);
    
    if (error) {
        console.error("Supabase error:", error);
        return;
    }
    
    const icons = { "Airport": "🛫", "Hotels": "🏨", "Catering": "🍽️", "Handling": "🛫", "Language": "🗣️", "Other": "📌" };
    
    let html = `
        <button onclick="renderNotesForCity('${city}')" style="background: #e2e8f0; color: #2d3748; margin-bottom: 15px;">← Back to ${city}</button>
        <h3 style="margin-bottom: 20px;">${icons[category]} ${category} — ${city}</h3>
    `;
    
    if (categoryNotes.length === 0) {
        html += `<p style="color: #a0aec0; text-align: center; padding: 20px;">📭 No notes yet.</p>`;
    } else {
        categoryNotes.forEach(note => {
            html += `
                <div style="background: white; border-left: 4px solid #4299e1; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
                    <p style="margin: 0 0 6px 0; color: #2d3748;">${note.text}</p>
                    <small style="color: #a0aec0;">👤 ${note.author} — ${new Date(note.created_at).toLocaleDateString('en-GB')}</small>
                </div>
            `;
        });
    }
    
    html += `<button onclick="openAddNote('${city}', '${category}')" style="margin-top: 20px;">➕ Add Note for ${category}</button>`;
    notesList.innerHTML = html;
};

window.openAddNote = function(city, category, iata, icao) {
    currentCity = city;
    currentIata = iata;
    currentIcao = icao;
    noteCity.value = city;
    if (category) noteCategory.value = category;
    addNoteForm.style.display = "block";
    noteAuthor.focus();
};

cancelNoteButton.addEventListener("click", function() {
    addNoteForm.style.display = "none";
    noteAuthor.value = "";
    noteText.value = "";
    noteCategory.value = "Airport";
});
  


saveNoteButton.addEventListener("click", async function() {
    if (!noteAuthor.value.trim() || !noteText.value.trim()) {
        alert("Please fill in your name and the note.");
        return;
    }
    
    const newNote = {
        city: currentCity,
        iata_code: currentIata, // <-- Enregistre le code IATA
        icao_code: currentIcao, // <-- Enregistre le code ICAO
        category: noteCategory.value,
        author: noteAuthor.value.trim(),
        text: noteText.value.trim()
    };
    const { error } = await supabaseClient
        .from('notes')
        .insert([newNote]);
    
    if (error) {
        console.error("Supabase error:", error);
        alert("Error saving note: " + error.message);
        return;
    }
    
    noteAuthor.value = "";
    noteText.value = "";
    noteCategory.value = "Airport";
    addNoteForm.style.display = "none";
    
    searchInput.value = "";
    notesList.innerHTML = "";
    searchInput.focus();
});

window.deleteNote = function(id) {
    if (!confirm("Delete this note?")) return;
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    if (currentCity) renderNotesForCity(currentCity);
};


//  DÉMARRAGE

public.style.display = "none";
login.style.display = "none";
visa.style.display = "none";
menuPublic.classList.add("active");
menuPrivate.classList.remove("active");

console.log("🛩️ WorldOps loaded — Password: G650Crew");


//  SERVICE WORKER

//if ("serviceWorker" in navigator) {
 //   window.addEventListener("load", function() {
   //     navigator.serviceWorker.register("/sw.js")
    //        .then(function(registration) {
     //           console.log("✅ Service Worker registered");
       //     })
       //     .catch(function(error) {
        //        console.log("❌ Service Worker failed:", error);
       //    });
  //  });
//} 


