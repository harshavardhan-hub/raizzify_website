export const splitText = (text: string) => {
  return text.split(' ').map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block overflow-hidden whitespace-pre">
      <span className="inline-block split-word">
        {word}
      </span>
      {wordIndex !== text.split(' ').length - 1 && ' '}
    </span>
  ));
};

export const splitChars = (text: string) => {
  return text.split('').map((char, charIndex) => (
    <span key={charIndex} className="inline-block overflow-hidden">
      <span className="inline-block split-char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    </span>
  ));
};
