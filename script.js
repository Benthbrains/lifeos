/* ========================================
   LIFEOS - PRODUCTION-READY JAVASCRIPT
   AI Schedule Generator with Gamification
   ======================================== */

// ========================================
// GLOBAL STATE
// ========================================

const state = {
  user: {
    name: null,
    age: null,
    mood: 'happy'
  },
  gamification: {
    streak: 0,
    points: 0,
    tasksCompleted: 0
  },
  timer: {
    running: false,
    paused: false,
    intervalId: null,
    totalSeconds: 0,
    remainingSeconds: 0
  },
  schedules: [] // Store generated schedules
};

// ========================================
// PLAN DATABASE (Age-Personalized)
// ========================================

const agePlanDatabase = {
  teen: {
    title: "Perfect for your energy level!",
    greeting: (name, mood) => {
      const greetings = {
        happy: `Hey ${name}! 🌟 You're in a great mood—let's make today amazing!`,
        stressed: `${name}, take a breath! 💙 Let's break this down into manageable steps.`,
        motivated: `${name}! 🔥 With that fire in you, let's conquer today!`,
        tired: `${name}, I see you're tired. 😴 Let's focus on what matters most.`
      };
      return greetings[mood] || greetings['happy'];
    },
    plans: [
      [
        "🎯 Start with something fun that motivates you.",
        "💪 Tackle your most important task while you're fresh.",
        "☕ Take a real break - stretch, grab a snack.",
        "✨ Work on something you care about.",
        "🎉 Reflect on what you accomplished today."
      ],
      [
        "⚡ Begin with a quick energizer activity.",
        "🎯 Focus on your top priority for 45 minutes.",
        "🤝 Help someone or do something meaningful.",
        "📚 Learn something new that interests you.",
        "🏆 Celebrate what you did today!"
      ],
      [
        "🌅 Start your day with purpose and intention.",
        "🔥 Attack your most challenging task first.",
        "🎨 Take time for creativity and expression.",
        "🚀 Push toward your goals with energy.",
        "😊 End proud of your progress."
      ]
    ]
  },
  adult: {
    title: "Balanced approach for your day",
    greeting: (name, mood) => {
      const greetings = {
        happy: `Welcome, ${name}! 😊 Let's make this a productive day.`,
        stressed: `${name}, we'll tackle this together. 💪 One step at a time.`,
        motivated: `${name}! Your energy is fantastic! 🚀 Let's channel it wisely.`,
        tired: `${name}, let's prioritize what truly matters today. 🎯`
      };
      return greetings[mood] || greetings['happy'];
    },
    plans: [
      [
        "🎯 Start with your most important task (90 min deep work).",
        "📧 Handle emails and quick admin tasks.",
        "🍽️ Lunch break - truly disconnect and recharge.",
        "🚀 Deep work session on a meaningful project.",
        "✅ Wrap up, plan tomorrow, then disengage for the evening."
      ],
      [
        "🌅 Morning routine to set the right tone.",
        "🎯 Prioritize and complete your top 3 goals.",
        "🤝 Collaborative work or meaningful meetings.",
        "📋 Administrative tasks and strategic planning.",
        "🌙 Evening wind-down and reflection."
      ],
      [
        "💼 Focus on high-value work first.",
        "🎨 Balance strategic thinking with execution.",
        "🧘 Mid-day pause for wellness.",
        "🎯 Tackle follow-ups and relationship building.",
        "🎬 Close the day with clarity for tomorrow."
      ]
    ]
  },
  senior: {
    title: "Sustainable pace for a fulfilling day",
    greeting: (name, mood) => {
      const greetings = {
        happy: `Good day, ${name}! ☀️ Let's make it a meaningful one.`,
        stressed: `${name}, let's simplify and focus on joy. 💝`,
        motivated: `${name}! Your energy is inspiring! 🌟 Let's use it wisely.`,
        tired: `${name}, honor your rhythms today. 🌿 Rest is productive too.`
      };
      return greetings[mood] || greetings['happy'];
    },
    plans: [
      [
        "🌅 Start with activities that energize and inspire you.",
        "🎨 Engage in meaningful work, hobbies, or passions.",
        "🍽️ Take a proper lunch break with time to truly relax.",
        "🤝 Connect with others - calls, visits, or meaningful collaboration.",
        "🌙 Reflect and wind down with intention and gratitude."
      ],
      [
        "🧘 Begin with light movement or meditation.",
        "🎯 Focus on what matters most to you.",
        "☕ Enjoy a mindful break and time to savor.",
        "📚 Pursue a passion, learning goal, or creative pursuit.",
        "💝 Share your experience with someone you care about."
      ],
      [
        "🌟 Honor your natural rhythms and energy levels.",
        "✨ Invest in what brings you joy and purpose.",
        "🌳 Connect with nature, people, or meaningful work.",
        "🎵 Create space for leisure and spontaneity.",
        "💖 End your day with peace and satisfaction."
      ]
    ]
  }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Determines age category based on user's age
 * @param {number} age - User's age
 * @returns {string} - 'teen', 'adult', or 'senior'
 */
function getAgeCategory(age) {
  if (age >= 13 && age <= 19) return 'teen';
  if (age >= 20 && age <= 64) return 'adult';
  return 'senior';
}

/**
 * Saves user data to localStorage
 * @param {string} name - User's name
 * @param {number} age - User's age
 * @param {string} mood - User's mood
 */
function saveUserToStorage(name, age, mood) {
  const userData = { name, age, mood };
  localStorage.setItem('lifeos_user', JSON.stringify(userData));
  localStorage.setItem('lifeos_firstLogin', 'false');
  state.user = userData;
}

/**
 * Loads user data from localStorage
 * @returns {object|null} - User object or null if not found
 */
function loadUserFromStorage() {
  const stored = localStorage.getItem('lifeos_user');
  if (stored) {
    const user = JSON.parse(stored);
    state.user = user;
    return user;
  }
  return null;
}

/**
 * Loads gamification data from localStorage
 */
function loadGamificationData() {
  const stored = localStorage.getItem('lifeos_gamification');
  if (stored) {
    state.gamification = JSON.parse(stored);
  }
}

/**
 * Saves gamification data to localStorage
 */
function saveGamificationData() {
  localStorage.setItem('lifeos_gamification', JSON.stringify(state.gamification));
}

/**
 * Clears user data from storage
 */
function clearUserData() {
  localStorage.removeItem('lifeos_user');
  localStorage.removeItem('lifeos_gamification');
  localStorage.removeItem('lifeos_firstLogin');
  state.user = { name: null, age: null, mood: 'happy' };
  state.gamification = { streak: 0, points: 0, tasksCompleted: 0 };
}

/**
 * Gets a random plan for the user's age category
 * @param {number} age - User's age
 * @returns {array} - Array of plan steps
 */
function getRandomPlan(age) {
  const ageCategory = getAgeCategory(age);
  const plans = agePlanDatabase[ageCategory].plans;
  return plans[Math.floor(Math.random() * plans.length)];
}

/**
 * Gets the personalization subtitle for user's age
 * @param {number} age - User's age
 * @returns {string} - Subtitle text
 */
function getPlanTitle(age) {
  const ageCategory = getAgeCategory(age);
  return agePlanDatabase[ageCategory].title;
}

/**
 * Gets greeting message based on age and mood
 * @param {string} name - User's name
 * @param {number} age - User's age
 * @param {string} mood - User's mood
 * @returns {string} - Greeting message
 */
function getGreetingMessage(name, age, mood) {
  const ageCategory = getAgeCategory(age);
  return agePlanDatabase[ageCategory].greeting(name, mood);
}

/**
 * Checks if user is on index.html (login page)
 * @returns {boolean}
 */
function isLoginPage() {
  return document.getElementById('loginForm') !== null;
}

/**
 * Checks if user is on lifeos.html (main app page)
 * @returns {boolean}
 */
function isMainPage() {
  return document.getElementById('planOutput') !== null;
}

/**
 * Logout function
 * @param {Event} e - Click event
 */
function logout(e) {
  e.preventDefault();
  if (confirm('Are you sure you want to logout?')) {
    clearUserData();
    window.location.href = 'index.html';
  }
}

/**
 * Plays a beep sound
 */
function playBeep() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 1000;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

// ========================================
// LOGIN PAGE LOGIC
// ========================================

if (isLoginPage()) {
  const loginForm = document.getElementById('loginForm');
  const nameInput = document.getElementById('nameInput');
  const ageInput = document.getElementById('ageInput');
  const moodInput = document.getElementById('moodInput');
  const moodBtns = document.querySelectorAll('.mood-btn');
  const welcomePopup = document.getElementById('welcomePopup');
  const closePopupBtn = document.getElementById('closePopup');
  const continueBtn = document.getElementById('continueBtn');

  // Check if user already has data - redirect to main page
  window.addEventListener('load', () => {
    const user = loadUserFromStorage();
    if (user) {
      window.location.href = 'lifeos.html';
    }
  });

  // Handle mood button selection
  moodBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      moodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      moodInput.value = btn.dataset.mood;
    });
  });

  // Set initial active mood
  document.querySelector('[data-mood="happy"]').classList.add('active');

  // Handle login form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const mood = moodInput.value;

    // Validate input
    if (!name || !age || age < 13 || age > 120) {
      alert('Please enter a valid name and age (13-120)');
      return;
    }

    // Save user and show welcome popup on first login
    saveUserToStorage(name, age, mood);
    
    const isFirstLogin = localStorage.getItem('lifeos_firstLogin') !== 'false';
    if (isFirstLogin) {
      welcomePopup.classList.remove('hidden');
    } else {
      window.location.href = 'lifeos.html';
    }
  });

  // Handle welcome popup
  closePopupBtn.addEventListener('click', () => {
    welcomePopup.classList.add('hidden');
  });

  continueBtn.addEventListener('click', () => {
    welcomePopup.classList.add('hidden');
    window.location.href = 'lifeos.html';
  });

  // Close popup when clicking outside
  welcomePopup.addEventListener('click', (e) => {
    if (e.target === welcomePopup) {
      welcomePopup.classList.add('hidden');
    }
  });
}

// ========================================
// MAIN APP PAGE LOGIC
// ========================================

if (isMainPage()) {
  // DOM Elements
  const greetingMessage = document.getElementById('greetingMessage');
  const userAgeEl = document.getElementById('userAge');
  const userMoodEl = document.getElementById('userMood');
  const userInput = document.getElementById('userInput');
  const generateBtn = document.getElementById('generateBtn');
  const regenerateBtn = document.getElementById('regenerateBtn');
  const planOutput = document.getElementById('planOutput');
  const planList = document.getElementById('planList');
  const charCount = document.getElementById('charCount');
  const planPersonalization = document.getElementById('planPersonalization');
  
  // Timer elements
  const timerMinutes = document.getElementById('timerMinutes');
  const timerSeconds = document.getElementById('timerSeconds');
  const timerTime = document.getElementById('timerTime');
  const timerDisplay = document.getElementById('timerDisplay');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resumeBtn = document.getElementById('resumeBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  // Gamification elements
  const streakDisplay = document.getElementById('streakDisplay');
  const pointsDisplay = document.getElementById('pointsDisplay');
  const tasksDisplay = document.getElementById('tasksDisplay');
  const streakCounter = document.getElementById('streakCounter');
  const pointsCounter = document.getElementById('pointsCounter');

  // ========================================
  // TIMER FUNCTIONALITY
  // ========================================

  /**
   * Formats time in MM:SS format
   */
  function formatTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Updates timer display
   */
  function updateTimerDisplay() {
    timerTime.textContent = formatTimerDisplay(state.timer.remainingSeconds);
  }

  /**
   * Starts the timer
   */
  function startTimer() {
    if (state.timer.running) return;
    
    const mins = parseInt(timerMinutes.value) || 0;
    const secs = parseInt(timerSeconds.value) || 0;
    
    if (mins === 0 && secs === 0) {
      alert('Please enter a time greater than 0');
      return;
    }

    state.timer.totalSeconds = mins * 60 + secs;
    state.timer.remainingSeconds = state.timer.totalSeconds;
    state.timer.running = true;
    state.timer.paused = false;

    timerMinutes.disabled = true;
    timerSeconds.disabled = true;
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    timerDisplay.classList.add('active');

    state.timer.intervalId = setInterval(() => {
      state.timer.remainingSeconds--;
      updateTimerDisplay();

      if (state.timer.remainingSeconds <= 0) {
        clearInterval(state.timer.intervalId);
        state.timer.running = false;
        timerDisplay.classList.add('complete');
        pauseBtn.classList.add('hidden');
        startBtn.classList.remove('hidden');
        timerMinutes.disabled = false;
        timerSeconds.disabled = false;
        
        playBeep();
        alert('⏰ Timer complete! Great work!');
        
        // Add points for completed timer session
        state.gamification.points += 5;
        updateGamificationDisplay();
        saveGamificationData();
      }
    }, 1000);
  }

  /**
   * Pauses the timer
   */
  function pauseTimer() {
    clearInterval(state.timer.intervalId);
    state.timer.running = false;
    state.timer.paused = true;
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.remove('hidden');
  }

  /**
   * Resumes the timer
   */
  function resumeTimer() {
    if (state.timer.paused) {
      state.timer.running = true;
      state.timer.paused = false;
      resumeBtn.classList.add('hidden');
      pauseBtn.classList.remove('hidden');

      state.timer.intervalId = setInterval(() => {
        state.timer.remainingSeconds--;
        updateTimerDisplay();

        if (state.timer.remainingSeconds <= 0) {
          clearInterval(state.timer.intervalId);
          state.timer.running = false;
          timerDisplay.classList.add('complete');
          pauseBtn.classList.add('hidden');
          startBtn.classList.remove('hidden');
          timerMinutes.disabled = false;
          timerSeconds.disabled = false;
          
          playBeep();
          alert('⏰ Timer complete! Great work!');
          
          state.gamification.points += 5;
          updateGamificationDisplay();
          saveGamificationData();
        }
      }, 1000);
    }
  }

  /**
   * Resets the timer
   */
  function resetTimer() {
    clearInterval(state.timer.intervalId);
    state.timer.running = false;
    state.timer.paused = false;
    state.timer.remainingSeconds = 0;
    
    timerMinutes.disabled = false;
    timerSeconds.disabled = false;
    timerMinutes.value = 25;
    timerSeconds.value = 0;
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');
    timerDisplay.classList.remove('active');
    timerDisplay.classList.remove('complete');
    
    updateTimerDisplay();
  }

  // ========================================
  // AI SCHEDULE PARSING & GENERATION ENGINE
  // ========================================

  /**
   * Natural Language Parser for schedule extraction
   * Extracts tasks, durations, and times from natural language input
   * @param {string} input - User's natural language input
   * @returns {array} - Array of parsed tasks
   */
  function parseNaturalLanguage(input) {
    const tasks = [];
    const text = input.toLowerCase();

    // Define task types and keywords
    const taskTypeKeywords = {
      homework: ['homework', 'study', 'math', 'science', 'english', 'history', 'project', 'assignment'],
      work: ['work', 'project', 'task', 'deadline', 'meeting', 'presentation', 'report'],
      exercise: ['exercise', 'workout', 'run', 'gym', 'yoga', 'walk', 'sport', 'train'],
      break: ['break', 'rest', 'relax', 'chill', 'nap', 'sleep'],
      meals: ['lunch', 'breakfast', 'dinner', 'eat', 'meal', 'snack'],
      social: ['meet', 'call', 'chat', 'friend', 'family', 'hang out', 'socialize'],
      meetings: ['meeting', 'appointment', 'call', 'zoom']
    };

    // Duration extraction regex patterns
    const durationPatterns = [
      /(\d+)\s*(hours?|hrs?|h)(?:\s+and\s+)?(\d+)?\s*(minutes?|mins?|m)?/gi,
      /(\d+)\s*(minutes?|mins?|m)/gi,
      /half\s+hour/gi,
      /quarter\s+hour/gi
    ];

    // Time extraction patterns (e.g., "at 3pm", "2:30am", "10:00")
    const timePatterns = [
      /at\s+(\d{1,2}):?(\d{2})?\s*(am|pm)?/gi,
      /(\d{1,2}):?(\d{2})?\s*(am|pm)?/gi
    ];

    // Split input by common separators
    const lines = text.split(/[,;.!?]|and\s+(?!a)|then/).filter(l => l.trim());

    for (let line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length < 3) continue;

      const task = {
        name: trimmedLine,
        type: 'general',
        duration: null,
        specificTime: null
      };

      // Extract task type
      for (const [type, keywords] of Object.entries(taskTypeKeywords)) {
        if (keywords.some(kw => trimmedLine.includes(kw))) {
          task.type = type;
          break;
        }
      }

      // Extract duration
      durationPatterns.forEach(pattern => {
        const match = pattern.exec(trimmedLine);
        if (match) {
          if (match[2].match(/hour|hr|h/i)) {
            let mins = parseInt(match[1]) * 60;
            if (match[3]) mins += parseInt(match[3]);
            task.duration = mins;
          } else if (match[1] && match[2].match(/minute|min|m/i)) {
            task.duration = parseInt(match[1]);
          }
        }
      });

      // Extract specific time
      timePatterns.forEach(pattern => {
        const match = pattern.exec(trimmedLine);
        if (match) {
          const hour = parseInt(match[1]);
          const minute = match[2] ? parseInt(match[2]) : 0;
          const period = match[3] ? match[3].toLowerCase() : 'am';
          
          let adjustedHour = hour;
          if (period === 'pm' && hour !== 12) adjustedHour += 12;
          if (period === 'am' && hour === 12) adjustedHour = 0;
          
          task.specificTime = adjustedHour * 60 + minute; // minutes since midnight
        }
      });

      // If no duration specified, estimate based on task type
      if (!task.duration) {
        const estimatedDurations = {
          homework: 90,
          work: 120,
          exercise: 30,
          break: 15,
          meals: 30,
          social: 45,
          meetings: 60,
          general: 45
        };
        task.duration = estimatedDurations[task.type] || 45;
      }

      tasks.push(task);
    }

    return tasks;
  }

  /**
   * Generates optimized schedule with smart breaks
   * @param {array} tasks - Array of parsed tasks
   * @param {string} mood - User's current mood
   * @param {number} age - User's age
   * @returns {array} - 5-step schedule
   */
  function generateOptimizedSchedule(tasks, mood, age) {
    // Get break multipliers based on mood
    const breakConfig = {
      happy: { multiplier: 0.15, suffix: 'Take a breather!' },
      stressed: { multiplier: 0.25, suffix: 'You got this! 💪' },
      motivated: { multiplier: 0.10, suffix: 'Keep pushing!' },
      tired: { multiplier: 0.35, suffix: 'Recharge your batteries' }
    };

    const config = breakConfig[mood] || breakConfig.happy;

    // Focus block duration based on age
    const focusDuration = {
      teen: 45,
      adult: 60,
      senior: 30
    }[getAgeCategory(age)] || 45;

    // Start from 6 AM or earliest mentioned time
    let currentTime = 6 * 60; // 6 AM in minutes
    const schedule = [];
    let tasksToSchedule = [...tasks];

    // Handle tasks with specific times
    const timedTasks = tasksToSchedule.filter(t => t.specificTime);
    const untimedTasks = tasksToSchedule.filter(t => !t.specificTime);

    // Sort timed tasks by time
    timedTasks.sort((a, b) => a.specificTime - b.specificTime);

    // Build schedule
    for (let task of [...timedTasks, ...untimedTasks]) {
      const taskDuration = Math.min(task.duration, focusDuration);
      
      // If task has specific time, use it
      if (task.specificTime && task.specificTime > currentTime) {
        currentTime = task.specificTime;
      }

      const startHour = Math.floor(currentTime / 60);
      const startMin = currentTime % 60;
      const endHour = Math.floor((currentTime + taskDuration) / 60);
      const endMin = (currentTime + taskDuration) % 60;

      const timeBlock = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')} - ${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
      
      const taskEmoji = {
        homework: '📚',
        work: '💼',
        exercise: '💪',
        break: '☕',
        meals: '🍽️',
        social: '👥',
        meetings: '🤝',
        general: '🎯'
      }[task.type] || '🎯';

      schedule.push({
        time: timeBlock,
        task: `${taskEmoji} ${task.name}`,
        duration: taskDuration,
        type: task.type
      });

      currentTime += taskDuration;

      // Add smart break after task if needed
      if (taskDuration > 25) {
        const breakDuration = Math.ceil(taskDuration * config.multiplier);
        const breakStartHour = Math.floor(currentTime / 60);
        const breakStartMin = currentTime % 60;
        const breakEndHour = Math.floor((currentTime + breakDuration) / 60);
        const breakEndMin = (currentTime + breakDuration) % 60;

        const breakTime = `${String(breakStartHour).padStart(2, '0')}:${String(breakStartMin).padStart(2, '0')} - ${String(breakEndHour).padStart(2, '0')}:${String(breakEndMin).padStart(2, '0')}`;

        schedule.push({
          time: breakTime,
          task: `☕ Break - ${config.suffix} (${breakDuration} mins)`,
          duration: breakDuration,
          type: 'break'
        });

        currentTime += breakDuration;
      }

      // Limit schedule to 5 main items (+ breaks)
      if (schedule.filter(s => s.type !== 'break').length >= 5) break;
    }

    return schedule.slice(0, 5);
  }

  // ========================================
  // PLAN GENERATION
  // ========================================

  /**
   * Generates and displays the 5-step plan
   */
  function generatePlan() {
    const text = userInput.value.trim();

    if (!text) {
      alert('Please tell us about your day!');
      userInput.focus();
      return;
    }

    // Use AI parser to extract tasks and times
    const parsedTasks = parseNaturalLanguage(text);
    
    // Generate optimized schedule based on mood and age
    const schedule = generateOptimizedSchedule(parsedTasks, state.user.mood, state.user.age);
    
    // Update plan header
    planPersonalization.textContent = `Your personalized schedule - ${getPlanTitle(state.user.age)}`;

    // Clear and populate plan list with AI-generated schedule
    planList.innerHTML = '';
    
    schedule.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `plan-item ${item.type === 'break' ? 'break-item' : ''}`;
      li.innerHTML = `
        <div class="schedule-block">
          ${item.time}: ${item.task}
        </div>
        <div class="schedule-meta">
          <span class="schedule-duration">${item.duration} minutes</span>
        </div>
      `;
      
      planList.appendChild(li);
    });

    // Save schedule to history
    const scheduleRecord = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      schedule: schedule,
      input: text,
      mood: state.user.mood,
      age: state.user.age
    };
    
    let schedules = JSON.parse(localStorage.getItem('lifeos_schedules')) || [];
    schedules.unshift(scheduleRecord);
    schedules = schedules.slice(0, 50); // Keep last 50 schedules
    localStorage.setItem('lifeos_schedules', JSON.stringify(schedules));
    state.schedules = schedules;

    // Award points for generating schedule
    state.gamification.points += 5;
    updateGamificationDisplay();
    saveGamificationData();

    // Show plan output and scroll
    planOutput.classList.remove('hidden');
    planOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Updates gamification display
   */
  function updateGamificationDisplay() {
    streakDisplay.textContent = state.gamification.streak;
    pointsDisplay.textContent = state.gamification.points;
    tasksDisplay.textContent = state.gamification.tasksCompleted;
    streakCounter.textContent = state.gamification.streak;
    pointsCounter.textContent = state.gamification.points;
  }

  // ========================================
  // INITIALIZATION
  // ========================================

  window.addEventListener('load', () => {
    const user = loadUserFromStorage();

    if (!user) {
      window.location.href = 'index.html';
      return;
    }

    // Load gamification data
    loadGamificationData();

    // Set user info
    greetingMessage.textContent = getGreetingMessage(user.name, user.age, user.mood);
    userAgeEl.textContent = user.age;
    userMoodEl.textContent = {
      happy: '😊 Happy',
      stressed: '😰 Stressed',
      motivated: '🔥 Motivated',
      tired: '😴 Tired'
    }[user.mood] || user.mood;

    // Initialize timer display
    updateTimerDisplay();
    
    // Initialize gamification display
    updateGamificationDisplay();
    
    userInput.focus();
  });

  // ========================================
  // EVENT LISTENERS
  // ========================================

  userInput.addEventListener('input', () => {
    charCount.textContent = userInput.value.length;
  });

  generateBtn.addEventListener('click', generatePlan);

  regenerateBtn.addEventListener('click', () => {
    generatePlan();
    planOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Timer event listeners
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resumeBtn.addEventListener('click', resumeTimer);
  resetBtn.addEventListener('click', resetTimer);

  // Allow Enter key to generate plan (Shift+Enter for new line)
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generatePlan();
    }
  });
}
