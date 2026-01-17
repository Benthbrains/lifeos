# ✨ LifeOS - AI-Powered Daily Schedule Generator

A modern, intelligent productivity app that generates personalized daily schedules based on your goals. Uses natural language processing to understand what you need to accomplish and creates an optimized schedule tailored to your mood and age.

🎯 **Live Demo:** Deploy to GitHub Pages for instant access!

## 🚀 Features

### 🤖 AI Schedule Generation
- **Natural Language Parsing**: Input goals like "I have 2 hours of homework, meeting at 3pm, need exercise"
- **Smart Task Extraction**: Automatically detects task names, durations, and specific times
- **Optimized Scheduling**: Creates 5-step daily plans with intelligent time blocking
- **Smart Breaks**: Inserts optimal break durations based on task intensity

### 🎭 Mood-Based Personalization
- **Happy** 😊: Standard schedule with motivating emojis
- **Stressed** 😰: Frequent breaks (5 min per 30 min work), shorter tasks
- **Motivated** 🔥: Longer focus blocks (90 min), minimal breaks
- **Tired** 😴: Extra breaks (10 min per 25 min), power nap suggestions

### 🎂 Age-Based Adjustments
- **Teen (13-19)**: 45-min focus blocks, gaming/social breaks
- **Adult (20-64)**: 60-min focus blocks, coffee breaks
- **Senior (65+)**: 30-min focus blocks, health monitoring

### 🎮 Gamification System
- **Points**: Earn points for completing scheduled tasks
- **Streaks**: Build daily completion streaks
- **Progress Tracking**: Visual stats dashboard
- **Persistent Data**: All progress saved locally

### 📱 Multi-Page Experience
1. **Login** - Profile setup with mood selection
2. **Main App** - AI schedule generation and management
3. **Schedule Detail** - View, edit, and export individual schedules
4. **History** - Browse all generated schedules with timestamps
5. **Settings** - Profile, preferences, data management
6. **Author** - About the creator and roadmap

### 💾 Export & Sharing
- Copy schedule to clipboard
- Download as PDF
- Export as JSON
- Share via link

### 🎨 Design Features
- **Mobile-First**: Fully responsive (320px - 1920px)
- **Dark/Light Mode**: Theme toggle for comfortable viewing
- **Smooth Animations**: Modern UX with transitions
- **Accessibility**: Keyboard navigation throughout
- **Touch-Friendly**: 48px+ buttons for mobile

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser localStorage (100% private)
- **Deployment**: GitHub Pages ready (no backend needed)
- **Architecture**: Single-page app with multi-page navigation

## 📋 How to Use

### 1. **First Time Setup**
- Open the app and enter your name, age, and mood
- Accept the welcome notification

### 2. **Generate a Schedule**
- Describe your day in natural language
- Examples:
  - "I have 2 hours of homework and a meeting at 3pm"
  - "Need to exercise for 30 mins, then work on presentation"
  - "Study math 90 mins, lunch, then relax"
- Click "AI Generate Schedule"

### 3. **View Your Schedule**
- See your 5-step optimized daily plan
- Each step shows time blocks (HH:MM format)
- Descriptions include task duration and break suggestions

### 4. **Track Progress**
- Complete tasks and earn points
- Build your daily streak
- Check stats in the sidebar

### 5. **Manage Schedules**
- View history of all generated schedules
- Edit existing schedules
- Export as PDF, PNG, or JSON
- Save favorites for quick reference

## 🚀 Getting Started

### Local Development
```bash
# Clone the repository
git clone https://github.com/Benthbrains/lifeos.git

# Navigate to project
cd lifeos

# Start a local server (Python 3)
python -m http.server 8000

# Open in browser
# http://localhost:8000
```

### Deploy to GitHub Pages

1. **Create a new GitHub repository** named `lifeos`
2. **Add remote and push**:
```bash
git remote add origin https://github.com/YOUR-USERNAME/lifeos.git
git branch -M main
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "GitHub Pages" section
   - Select "main" branch as source
   - Save

4. **Access your site**:
   - Your app will be live at: `https://YOUR-USERNAME.github.io/lifeos`

## 📊 Project Structure

```
lifeos/
├── index.html              # Login page
├── lifeos.html             # Main app page
├── schedule-detail.html    # Individual schedule view
├── history.html            # Schedule history
├── settings.html           # User settings
├── author.html             # About the creator
├── style.css               # All styling
├── script.js               # Complete app logic
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

## 💡 AI Schedule Algorithm

The schedule generator uses intelligent parsing to:

1. **Extract Tasks** - Identifies "homework", "meeting", "exercise", etc.
2. **Parse Durations** - Converts "2 hours" → 120 minutes
3. **Find Times** - Recognizes "3pm" → 15:00
4. **Categorize** - Labels tasks by type (work, break, health, social)
5. **Optimize** - Arranges chronologically, fills gaps, adds breaks
6. **Personalize** - Adjusts breaks and focus time by mood/age

**Example:**
```
Input: "I have 2 hours of homework, meeting at 3pm, need exercise"

Output:
🎯 9:00 AM - 10:30 AM: Math Homework (90 mins) - Focus on problem sets
☕ 10:30 AM - 10:45 AM: Break (15 mins) - Stretch and hydrate
📚 10:45 AM - 12:00 PM: Science Homework (75 mins) - Research phase
🍽️ 12:00 PM - 1:00 PM: Lunch (60 mins) - Fuel up
⚡ 1:00 PM - 3:00 PM: Exercise (120 mins) - Get moving
🤝 3:00 PM - 4:00 PM: Meeting (60 mins) - Collaboration time
😊 4:00 PM: Celebrate! You crushed it today!
```

## 🔐 Privacy & Data

- **100% Private**: All data stored locally in your browser
- **No Backend**: No servers, no tracking, no data collection
- **Local Storage**: Your schedules stay on your device
- **Export Control**: Download your data anytime

## 🎯 Roadmap

### Phase 2 - Planned Features
- 🔗 Cloud sync (optional)
- 📊 Advanced analytics & insights
- 🤖 Real AI integration (OpenAI API)
- 📱 Mobile app (React Native)
- 🔔 Push notifications
- 👥 Social features & sharing
- 📈 Success tracking & predictions

### Phase 3 - Future Ideas
- Team schedules & collaboration
- Calendar integration (Google, Outlook)
- Smart reminders & nudges
- Habit tracking integration
- Voice input for schedule creation

## 🐛 Troubleshooting

### Schedule not generating?
- Check your input has at least one task mention
- Ensure browser localStorage is enabled
- Try refreshing the page

### Timer not working?
- Enable browser notifications for sound alerts
- Check that you entered minutes (1-120)
- Try resetting from the Start menu

### Data disappeared?
- Clear browser cache can delete localStorage
- Use Settings → Export Data to back up
- Schedule history auto-saves to localStorage

## 🤝 Contributing

Found a bug or have a feature idea?
- Create an issue on GitHub
- Fork and submit a pull request
- Share feedback on the Author page

## 📝 License

MIT License - feel free to use, modify, and share!

## 👨‍💻 About the Creator

**Benjamin** - Full-stack developer passionate about productivity tools and AI.

- 🐙 GitHub: [@Benthbrains](https://github.com/Benthbrains)
- 📺 YouTube: [@Historicaltimemachine](https://www.youtube.com/@Historicaltimemachine-i6c)
- 📧 Contact: via GitHub

---

**Made with ❤️ for productivity lovers everywhere.**

*"Organize your time. Organize your life. Organize your future."* ✨

---

## 🚀 Quick Links

- [Try it Live](https://benthbrains.github.io/lifeos) *(after deploying)*
- [GitHub Repository](https://github.com/Benthbrains/lifeos)
- [Report a Bug](https://github.com/Benthbrains/lifeos/issues)
- [Creator on YouTube](https://www.youtube.com/@Historicaltimemachine-i6c)
