<div align="center">

<img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-6.20.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
<img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" />

</div>

<br/>

<div align="center">
  <h1>💳 SubTracker</h1>
  <p><strong>A modern, responsive subscription management tool built with React.js</strong></p>
  <p>Track, manage, and analyze all your recurring subscription expenses in one place</p>
</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Available Categories](#-available-categories)
- [Billing Frequencies](#-billing-frequencies)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🧾 About The Project

SubTracker is a **college project** built to solve a real-world problem — people subscribe to dozens of services (Netflix, Spotify, AWS, Notion, etc.) and lose track of:

- 💸 How much they spend monthly / yearly
- 📅 When their next payment is due
- 📊 Which categories consume the most budget

SubTracker solves this with an intuitive dashboard, smart category breakdowns, and a 30-day upcoming payment forecast — all without needing a backend or database.

---

## 🌐 Live Demo

> 🔗 **[View Live Demo](https://your-deployment-url.netlify.app)**
> *(Deploy to Netlify or Vercel for free — see [Deployment](#deployment) section)*

---

## 📸 Screenshots

| Dashboard | Add Subscription |
|-----------|-----------------|
| ![Dashboard](https://via.placeholder.com/500x300/1a1a2e/6366f1?text=Dashboard+View) | ![Add Form](https://via.placeholder.com/500x300/f0f2f5/1a1a2e?text=Add+Subscription+Form) |

| Subscription List | Upcoming Payments |
|-------------------|------------------|
| ![List](https://via.placeholder.com/500x300/f0f2f5/1a1a2e?text=Subscription+List) | ![Upcoming](https://via.placeholder.com/500x300/f0f2f5/1a1a2e?text=Upcoming+Payments) |

---

## ✨ Features

### 📊 Dashboard
- **Monthly Expense Summary** — Total cost across all active subscriptions
- **Active Service Counter** — How many services are currently running
- **Upcoming Payment Count** — Payments due within the next 30 days
- **Category Breakdown** — Visual progress bars showing spending per category
- **Upcoming Payments Preview** — Next 5 payments with urgency color coding

### ➕ Add Subscription
- Simple form with full **client-side validation**
- Fields: Service name, Category, Cost, Frequency, Start date
- **Live preview card** updates as you type
- Success notification + auto-redirect after submission

### 📋 Subscription List
- **Card-based grid layout** for all subscriptions
- **Real-time search** by service name
- **Filter by Category** and **Status** (Active / Paused)
- **Pause / Resume** toggle per subscription
- **Delete** with confirmation dialog
- Monthly equivalent cost calculated and displayed

### ⏰ Upcoming Payments
- **30-day payment forecast**
- **Timeline UI** with category-colored dots
- Urgency indicators:
  - 🔴 Due in ≤ 3 days
  - 🟡 Due in ≤ 7 days
  - 🟢 Due in > 7 days
- Total upcoming amount shown in header

### 📱 Responsive Design
- Sidebar navigation on **desktop**
- Bottom tab navigation on **mobile**
- Adaptive grid layouts for all screen sizes

### 💾 Data Persistence
- All data saved to **localStorage**
- Survives page refresh without any backend
- Pre-loaded with **6 sample subscriptions**

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React.js](https://reactjs.org/) | 18.2.0 | Frontend UI library |
| [React Router DOM](https://reactrouter.com/) | 6.20.0 | Client-side routing / SPA navigation |
| [React Icons](https://react-icons.github.io/react-icons/) | 4.12.0 | Icon components (Feather icons) |
| [Context API](https://react.dev/reference/react/useContext) | Built-in | Global state management |
| [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Browser | Data persistence |
| CSS3 | — | Custom styling (Grid, Flexbox, Animations) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node --version   # v16.0.0 or higher
npm --version    # v7.0.0 or higher
```

> Download Node.js from [nodejs.org](https://nodejs.org/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/subtracker.git
cd subtracker
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env
```

### Running the App

**Development server**

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

**Production build**

```bash
npm run build
```

Creates an optimized build in the `/build` folder.

**Run tests**

```bash
npm test
```

---

## 📁 Project Structure

```
subtracker/
│
├── public/
│   └── index.html              # HTML entry point
│
├── src/
│   ├── components/             # React UI components
│   │   ├── Navbar.jsx          # Sidebar/bottom navigation
│   │   ├── Dashboard.jsx       # Main analytics dashboard
│   │   ├── AddSubscription.jsx # Form to add new service
│   │   ├── SubscriptionList.jsx# All subscriptions with CRUD
│   │   └── UpcomingPayments.jsx# 30-day payment timeline
│   │
│   ├── context/
│   │   └── SubscriptionContext.jsx  # Global state (Context API)
│   │
│   ├── utils/
│   │   └── helpers.js          # Utility/calculation functions
│   │
│   ├── App.jsx                 # Root component + Router setup
│   ├── App.css                 # Global CSS styles
│   └── index.js                # React DOM entry point
│
├── .env.example                # Environment variable template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── README.md                   # Project documentation
├── CONTRIBUTING.md             # Contribution guidelines
├── CHANGELOG.md                # Version history
└── LICENSE                     # MIT License
```

---

## 📖 Usage Guide

### Adding a Subscription

1. Click **"Add New"** in the navigation
2. Fill in the form:
   - **Service Name** — e.g., "Netflix"
   - **Category** — Select from dropdown (Entertainment, Music, etc.)
   - **Cost** — Enter the billing amount in ₹
   - **Frequency** — How often you're billed
   - **Start Date** — When the subscription started or next billing date
3. Watch the **live preview card** update
4. Click **"Add Subscription"**

### Managing Subscriptions

| Action | How To |
|---|---|
| **Search** | Type in the search box on the List page |
| **Filter by Category** | Use the category dropdown filter |
| **Pause a service** | Click the ⏸️ pause button on the card |
| **Resume a service** | Click the ▶️ play button on the card |
| **Delete a service** | Click the 🗑️ delete button → confirm dialog |

### Understanding the Dashboard

```
Monthly Expense  = Sum of all active subscription costs (normalized to monthly)
Yearly Estimate  = Monthly Expense × 12
Upcoming Count   = Active subs with next payment in next 30 days
Category %       = (Category monthly cost / Total monthly cost) × 100
```

---

## 🏷️ Available Categories

| Category | Icon | Example Services |
|---|---|---|
| Entertainment | 🎬 | Netflix, Disney+, YouTube Premium |
| Music | 🎵 | Spotify, Apple Music, YouTube Music |
| Productivity | ⚡ | Notion, Todoist, Slack |
| Cloud Storage | ☁️ | Google One, Dropbox, iCloud |
| Education | 📚 | Coursera, Udemy, Skillshare |
| Fitness | 💪 | Gym membership, Fitbit Premium |
| News | 📰 | NYT, Medium, The Hindu |
| Gaming | 🎮 | Xbox Game Pass, PS Plus, Steam |
| Software | 💻 | Adobe CC, GitHub Pro, Figma |
| Other | 📦 | Anything else |

---

## 🔄 Billing Frequencies

| Frequency | Billing Cycle | Monthly Cost Formula |
|---|---|---|
| Weekly | Every 7 days | `cost × 4.33` |
| Monthly | Every month | `cost × 1` |
| Quarterly | Every 3 months | `cost ÷ 3` |
| Yearly | Every 12 months | `cost ÷ 12` |

---

## 🚢 Deployment

### Deploy to Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build"
# "deploy": "gh-pages -d build"
# "homepage": "https://your-username.github.io/subtracker"

npm run deploy
```

---

## 🗺️ Roadmap

- [x] Dashboard with monthly expense summary
- [x] Add subscription form with validation
- [x] Subscription list with CRUD operations
- [x] Upcoming payments timeline
- [x] Category-wise spending breakdown
- [x] Responsive mobile design
- [x] LocalStorage persistence
- [ ] User authentication (Firebase)
- [ ] Email/push notifications for due payments
- [ ] Charts with historical spending data
- [ ] Backend API (Node.js + MongoDB)
- [ ] Multi-currency support
- [ ] Export to CSV / PDF
- [ ] Dark mode toggle
- [ ] Budget limit alerts per category

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

**Quick steps:**

```bash
# 1. Fork the project
# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m "feat: add AmazingFeature"

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**.
See [LICENSE](LICENSE) for more information.

---

## 👨‍💻 Author

**Your Name**

[![GitHub](https://img.shields.io/badge/GitHub-your--username-181717?style=flat-square&logo=github)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-your--name-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/your-name)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/) — Official React docs
- [React Icons](https://react-icons.github.io/react-icons/) — Icon library
- [React Router](https://reactrouter.com/) — Routing library
- [Inter Font](https://fonts.google.com/specimen/Inter) — UI typography
- [PptxGenJS](https://gitbrand.com/gitbranching/PptxGenJS) — PPT generation

---

<div align="center">
  <p>Made with ❤️ for College Project</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
