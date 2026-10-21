
<p align="center"> <img src="icon-512.png" alt="WorldOps Logo" width="180"> </p><h1 align="center">🛩️ WorldOps</h1><p align="center"> <strong>Crew Operations Platform</strong><br> <em>A web application for flight crews</em> </p><p align="center"> <a href="https://worldops.ch"> <img src="https://img.shields.io/badge/Live-worldops.ch-blue?style=for-the-badge" alt="Live App"> </a> <a href="LICENSE"> <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"> </a> </p><p align="center"> 🌍 <a href="https://worldops.ch">Live App</a> • ✨ <a href="#features">Features</a> • 🏗️ <a href="#architecture">Architecture</a> • 🚀 <a href="#getting-started">Getting Started</a> </p>

---

## Overview

Flight crews operate daily to multiple destinations worldwide, often with little time to prepare. Critical operational information (handling agents, hotel contacts, catering options, airport procedures) is typically shared informally through WhatsApp, emails, or word-of-mouth. Additionally, each crew member must track multiple travel documents (passports, visas) with different expiry dates.

**WorldOps** solves these problems by providing:

1. **Shared Destination Notes** — A collaborative knowledge base where crew members can add and search operational information by city or airport code (IATA/ICAO).
2. **Private Visa Management** — A secure personal area for passports and visas with automatic expiry alerts.
3. **Cross-platform Access** — PWA installable on iPhone, Android, and desktop.
4. **European Data Hosting** — Supabase (Frankfurt, EU) with a roadmap to Swiss hosting (Infomaniak).

🌍 **Live application**: [https://worldops.ch](https://worldops.ch)

---

## Features

### 📝 Destination Notes (Shared)
- Search airports by name, IATA code (e.g., `NCE`), or ICAO code (e.g., `LFMN`).
- Organize notes by category: Airport, Hotels, Catering, Handling, Language, Other.
- Real-time synchronization across all crew members via Supabase.
- Add custom destinations not in the database.

### 🔒 Private Area (Personal)
- Password-protected section (separate from the main app).
- Upload passports and visas with photos.
- Automatic expiry tracking.
- Color-coded alerts:
  - 🟢 **OK** — More than 60 days remaining.
  - 🟡 **Warning** — 30 to 60 days remaining.
  - 🔴 **Urgent** — Less than 30 days remaining.

### 📱 Progressive Web App
- Installable on home screen (iPhone, Android).
- Full-screen experience.

---

## Architecture

WorldOps runs entirely in the browser. No custom backend server is needed.

**System Components:**
- **Supabase** (Frankfurt, EU): PostgreSQL database for shared notes and real-time sync.
- **Woosmap** (France): API for airport suggestions by city name.
- **Airport Gap**: API for airport search by IATA code.
- **OurAirports**: Local SQLite database (85,000+ airports) loaded via WebAssembly.

**Why this design:**
- ✅ No server to manage 
- ✅ Redundancy — 3 search sources (if one fails, another works).
- ✅ Local SQLite ensures the core data is available even if external APIs fail.
- ✅ Data stays in Europe 

---

## Technology Stack

**Base**
HTML, CSS, JavaScript 

**Data (Browser)**
sql.js + OurAirports (85,000+ records)

**Data**
Supabase (PostgreSQL, Frankfurt 🇪🇺)

**APIs**
Woosmap 🇫🇷 (city autocomplete), Airport Gap 

**Hosting**
GitHub Pages (current)

---

## Security

**HTTPS**
Let's Encrypt via GitHub Pages

**Double Authentication**
App password + Private password (separate layers)

**Row-Level Security**
Supabase RLS policies (each crew member's data is protected)


**EU Data Hosting**
Supabase (Frankfurt, Germany)

**Swiss Roadmap**
Migration to Infomaniak (Geneva) for full data sovereignty, in the future.

---

## Getting Started

### Access the App
1. Open [https://worldops.ch](https://worldops.ch).
2. Enter the crew password: `LXICE`.
3. Search for a destination or click **Private** for visa management.

### Install as PWA
**On iPhone (Safari):**
1. Open the app in Safari.
2. Tap **Share** (□↑).
3. Tap **Add to Home Screen**.

**On Android (Chrome):**
1. Open the app in Chrome.
2. Tap **Install app** 

---

## Results

| Airport search response time | < 1 second |
| Supported airports | 85,000+ |
| Supported codes | IATA (3 letters) + ICAO (4 letters) |
| Alert types | 3 (🟢 OK, 🟡 Warning, 🔴 Urgent) |
| Supported devices | iPhone, Android, Desktop |
| Pilot Crew Members | 6 (LXICE crew) |

---
















---

## Contributors

**Laetitia Blanc** — Developer & LXICE crew member
- GitHub: [@mumin0](https://github.com/mumin0)
- Live app: [worldops.ch](https://worldops.ch)

---

## License

This project is licensed under the **MIT License**.

---

<p align="center">
  🇨🇭 Made with ❤️ in Switzerland<br>
  ✈️ For flight crews, by flight crews
</p>
