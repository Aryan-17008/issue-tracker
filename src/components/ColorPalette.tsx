import { ThemeColors } from '../types';

interface ColorPaletteProps {
  currentTheme: string;
  onThemeChange: (themeName: string, colors: ThemeColors) => void;
}

const themes: Record<string, ThemeColors> = {
  naruto: {
    primary: '#ff6600',
    primaryHover: '#e55a00',
    bg: '#ff8c00',
    surface: '#ffffff',
    text: '#1a0a00',
    textSecondary: '#4d2600',
    border: '#cc5200',
    openBg: '#ffaa33',
    openText: '#802e00',
    closedBg: '#66cc66',
    closedText: '#004d00',
    lowBg: '#ffcc66',
    lowText: '#664400',
    mediumBg: '#ff9933',
    mediumText: '#803300',
    highBg: '#ff4444',
    highText: '#660000',
    fontFamily: "'Bangers', 'Impact', 'Arial Black', cursive",
  },
  demonSlayer: {
    primary: '#00d4ff',
    primaryHover: '#00a8cc',
    bg: '#1a0033',
    surface: '#2d004d',
    text: '#ffffff',
    textSecondary: '#cc99ff',
    border: '#6600cc',
    openBg: '#440088',
    openText: '#00d4ff',
    closedBg: '#006600',
    closedText: '#66ff66',
    lowBg: '#4d0080',
    lowText: '#bb99ff',
    mediumBg: '#6600cc',
    mediumText: '#ffcc00',
    highBg: '#990000',
    highText: '#ff6666',
    fontFamily: "'Cinzel', 'Trajan Pro', 'Times New Roman', serif",
  },
  sailorMoon: {
    primary: '#ff0066',
    primaryHover: '#cc0052',
    bg: '#ff99cc',
    surface: '#ffe6f2',
    text: '#660029',
    textSecondary: '#99004d',
    border: '#ff3399',
    openBg: '#ffb3d9',
    openText: '#99004d',
    closedBg: '#ccffcc',
    closedText: '#006600',
    lowBg: '#ffccff',
    lowText: '#800080',
    mediumBg: '#ff99cc',
    mediumText: '#660033',
    highBg: '#ff6666',
    highText: '#660000',
    fontFamily: "'Pacifico', 'Comic Sans MS', 'Brush Script MT', cursive",
  },
  ghibli: {
    primary: '#228b22',
    primaryHover: '#1a6b1a',
    bg: '#90ee90',
    surface: '#f0fff0',
    text: '#0d330d',
    textSecondary: '#2d5a2d',
    border: '#2e8b57',
    openBg: '#98fb98',
    openText: '#006400',
    closedBg: '#87ceeb',
    closedText: '#004d80',
    lowBg: '#c1ffc1',
    lowText: '#2d5a2d',
    mediumBg: '#90ee90',
    mediumText: '#1a5c1a',
    highBg: '#ff6b6b',
    highText: '#800000',
    fontFamily: "'Nunito', 'Quicksand', 'Segoe UI', sans-serif",
  },
  onePiece: {
    primary: '#0044cc',
    primaryHover: '#003399',
    bg: '#0066ff',
    surface: '#e6f0ff',
    text: '#001a4d',
    textSecondary: '#003d99',
    border: '#0055ff',
    openBg: '#3399ff',
    openText: '#002266',
    closedBg: '#ffaa00',
    closedText: '#663d00',
    lowBg: '#66b3ff',
    lowText: '#002266',
    mediumBg: '#ffcc00',
    mediumText: '#664400',
    highBg: '#ff3333',
    highText: '#660000',
    fontFamily: "'Lilita One', 'Titan One', 'Arial Black', sans-serif",
  },
  berserk: {
    primary: '#8b0000',
    primaryHover: '#5c0000',
    bg: '#0a0a0a',
    surface: '#141414',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#660000',
    openBg: '#1a0000',
    openText: '#ff1a1a',
    closedBg: '#0d0d0d',
    closedText: '#666666',
    lowBg: '#1a1a1a',
    lowText: '#999999',
    mediumBg: '#330000',
    mediumText: '#cc0000',
    highBg: '#660000',
    highText: '#ff0000',
    fontFamily: "'Metal Mania', 'Creepster', 'Impact', fantasy",
  },
  pacman: {
    primary: '#ffff00',
    primaryHover: '#e6e600',
    bg: '#000000',
    surface: '#1a1a2e',
    text: '#ffffff',
    textSecondary: '#ffaa00',
    border: '#2121de',
    openBg: '#1a1a3e',
    openText: '#00ffff',
    closedBg: '#0d0d1a',
    closedText: '#ff69b4',
    lowBg: '#1a1a2e',
    lowText: '#ffb8ae',
    mediumBg: '#2121de',
    mediumText: '#ffffff',
    highBg: '#ff0000',
    highText: '#ffff00',
    fontFamily: "'Press Start 2P', 'Courier New', monospace",
  },
};

const themeEmojis: Record<string, string> = {
  naruto: '🔥',
  demonSlayer: '⚔️',
  sailorMoon: '🌙',
  ghibli: '🌿',
  onePiece: '⚓',
  berserk: '🗡️',
  pacman: '👾',
};

const themeNames: Record<string, string> = {
  naruto: 'Naruto',
  demonSlayer: 'Demon Slayer',
  sailorMoon: 'Sailor Moon',
  ghibli: 'Ghibli',
  onePiece: 'One Piece',
  berserk: 'Berserk',
  pacman: 'Pac-Man',
};

function ColorPalette({ currentTheme, onThemeChange }: ColorPaletteProps) {
  return (
    <div className="color-palette">
      <label>Anime Theme</label>
      <div className="palette-buttons">
        {Object.entries(themes).map(([name, colors]) => (
          <button
            key={name}
            className={`palette-btn ${currentTheme === name ? 'active' : ''}`}
            onClick={() => onThemeChange(name, colors)}
            title={themeNames[name]}
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <span className="palette-emoji">{themeEmojis[name]}</span>
            {currentTheme === name && <span className="checkmark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorPalette;
