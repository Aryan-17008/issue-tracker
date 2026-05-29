import { useEffect, useState } from 'react';

interface CelebrationPopupProps {
  message: string;
  emoji: string;
  onClose: () => void;
}

function CelebrationPopup({ message, emoji, onClose }: CelebrationPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    requestAnimationFrame(() => setVisible(true));

    // Auto-close after 2.5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`celebration-popup ${visible ? 'visible' : ''}`}>
      <div className="celebration-content">
        <span className="celebration-emoji">{emoji}</span>
        <span className="celebration-message">{message}</span>
      </div>
    </div>
  );
}

export default CelebrationPopup;
