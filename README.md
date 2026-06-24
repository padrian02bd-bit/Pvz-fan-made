# PvZ Fangame - Phaser 3 Edition

A Plants vs. Zombies fangame built with **Phaser 3** and JavaScript. Play directly in your browser on mobile or desktop!

## 🎮 Features

- **Tower Defense Gameplay**: Plant defenders, manage sun currency
- **Original Plants**: Sunflower, Peashooter, Walnut
- **Zombie Waves**: Basic zombies spawn continuously
- **Mobile-Friendly**: Play on any device with a web browser
- **Real-time Action**: Dynamic plant-vs-zombie battles

## 🚀 Quick Start

### Option 1: Play Online (Easiest)
1. Open this repository in GitHub
2. Go to **Settings** → **Pages**
3. Enable GitHub Pages from the `main` branch
4. Visit the live URL to play!

### Option 2: Play Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/padrian02bd-bit/Pvz-fan-made.git
   cd Pvz-fan-made
   ```
2. Open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

## 📱 How to Play

1. **Select a Plant** - Click plant buttons at the top
2. **Place on Grid** - Tap a cell to plant
3. **Manage Sun** - You start with 100 sun
   - Sunflower: 50 sun (generates more sun)
   - Peashooter: 100 sun (attacks zombies)
   - Walnut: 150 sun (defensive)
4. **Defend** - Stop zombies from reaching the left side

## 🛠️ Game Mechanics

### Plants
- **Sunflower** 🌻 - Generates sun over time
- **Peashooter** 🟢 - Shoots projectiles at zombies
- **Walnut** 🟤 - High health, slows zombies

### Zombies
- **Basic Zombie** 🧟 - Standard enemy
- **Cone Zombie** (coming soon) - Armored variant
- **Bucket Zombie** (coming soon) - Heavy variant

## 📁 Project Structure

```
Pvz-fan-made/
├── index.html          # Main game page
├── js/
│   └── main.js        # Phaser 3 game code
├── README.md          # This file
└── .gitignore
```

## 🎨 Customization

Want to modify the game? Edit `js/main.js`:

- **Change grid size**: Modify `createGameGrid()` rows/cols
- **Adjust sun costs**: Edit `createPlantButtons()`
- **Change zombie speed**: Modify `Zombie.speed`
- **Add new plants**: Create new entries in `plantTypes`

## 📚 Resources

- [Phaser 3 Documentation](https://newdocs.phaser.io/)
- [Phaser Examples](https://phaser.io/examples)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🎯 Next Steps

- [ ] Add projectiles and collision detection
- [ ] Implement sun generation
- [ ] Create level progression
- [ ] Add sound effects
- [ ] Custom plant/zombie sprites
- [ ] Animations and particle effects
- [ ] Score system and leaderboard

## 📄 License

MIT License - Feel free to modify and share!

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

---

**Made with ❤️ and Phaser 3**
