import { useRef, useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  offsetX: number;
}

interface TrollAttempt {
  id: number;
  x: number;
  y: number;
}

export default function Home() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [trollAttempts, setTrollAttempts] = useState(0);
  const [trollPosition, setTrollPosition] = useState({ x: 200, y: 400 });
  const [showTrollMessage, setShowTrollMessage] = useState(false);
  const [trollMessage, setTrollMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const heartCounterRef = useRef(0);
  const trollButtonRef = useRef<HTMLButtonElement>(null);

  const trollMessages = [
    "Não!",
    "Você nunca vai me clicar!",
    "Tenta outra vez!",
    "Boa tentativa!",
    "Quase lá... não!",
  ];

  // Botão de amor - solta corações
  const handleLoveClick = () => {
    const button = containerRef.current?.querySelector(".love-button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Número de corações aumenta com cada clique
    const heartCount = Math.min(trollAttempts + 1, 10);

    const newHearts: FloatingHeart[] = [];
    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: heartCounterRef.current++,
        x: centerX,
        y: centerY,
        offsetX: (Math.random() - 0.5) * 200,
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) =>
        prev.filter((h) => !newHearts.some((nh) => nh.id === h.id))
      );
    }, 2500);
  };

  // Botão troll - teleporta
  const handleTrollHover = () => {
    const newX = Math.random() * (window.innerWidth - 200);
    const newY = Math.random() * (window.innerHeight - 100);
    setTrollPosition({ x: newX, y: newY });

    setTrollAttempts((prev) => prev + 1);

    // Mostra mensagem aleatória
    const randomMessage =
      trollMessages[Math.floor(Math.random() * trollMessages.length)];
    setTrollMessage(randomMessage);
    setShowTrollMessage(true);

    setTimeout(() => setShowTrollMessage(false), 1500);

    // Som aleatório (1 em 10 chances)
    if (Math.random() < 0.1) {
      playErrorSound();
    }
  };

  const playErrorSound = () => {
    // Simula um som de erro usando Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Easter egg - pressionar F para transformar fotos em escudo do Flamengo
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        const photos = containerRef.current?.querySelectorAll(".photo");
        if (photos) {
          photos.forEach((photo) => {
            (photo as HTMLElement).style.opacity = "0.3";
            (photo as HTMLElement).style.filter =
              "hue-rotate(0deg) brightness(0.5)";
          });

          setTimeout(() => {
            photos.forEach((photo) => {
              (photo as HTMLElement).style.opacity = "1";
              (photo as HTMLElement).style.filter = "none";
            });
          }, 2000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)",
      }}
    >
      {/* Fundo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Título */}
        <h1 className="text-6xl md:text-7xl font-bold text-center mb-4 text-red-500 drop-shadow-lg">
          Feliz Aniversário
          <br />
          Daniela Sofia Pinto de Carvalho
        </h1>

        {/* Subtítulo */}
        <p className="text-xl text-gray-300 text-center max-w-2xl mb-12">
          Hoje é seu dia! Você é uma pessoa incrível, especial, e merece toda a
          felicidade do mundo... Mas como somos amigos/irmãos, também merece uma
          leve trollada. Escolha sabiamente os botões abaixo! 😈❤️
        </p>

        {/* Fotos espalhadas */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/images/foto1.jpg"
            alt="Foto 1"
            className="photo absolute top-20 left-10 w-32 h-32 rounded-lg shadow-lg transform -rotate-12 opacity-80 object-cover"
          />
          <img
            src="/images/foto2.jpg"
            alt="Foto 2"
            className="photo absolute top-40 right-20 w-40 h-40 rounded-lg shadow-lg transform rotate-6 opacity-75 object-cover"
          />
          <img
            src="/images/foto3.jpg"
            alt="Foto 3"
            className="photo absolute bottom-32 left-20 w-32 h-32 rounded-lg shadow-lg transform rotate-12 opacity-70 object-cover"
          />
          <img
            src="/images/foto4.jpg"
            alt="Foto 4"
            className="photo absolute bottom-20 right-32 w-36 h-36 rounded-lg shadow-lg transform -rotate-6 opacity-75 object-cover"
          />
          <img
            src="/images/foto5.jpg"
            alt="Foto 5"
            className="photo absolute top-1/2 left-1/4 w-28 h-28 rounded-lg shadow-lg transform rotate-45 opacity-60 object-cover"
          />
        </div>

        {/* Botões */}
        <div className="flex gap-8 mb-12 z-20 relative">
          {/* Botão de Amor */}
          <button
            onClick={handleLoveClick}
            className="love-button px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold text-lg rounded-lg shadow-2xl hover:shadow-red-500/50 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2"
          >
            <Heart className="w-6 h-6 fill-current" />
            Te amo, Paulo! ❤️
          </button>

          {/* Botão Troll */}
          <button
            ref={trollButtonRef}
            onMouseEnter={handleTrollHover}
            onClick={handleTrollHover}
            className="fixed px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-lg shadow-lg border-2 border-red-500 transition-all duration-100 transform hover:scale-105 active:scale-95"
            style={{
              left: `${trollPosition.x}px`,
              top: `${trollPosition.y}px`,
              animation: "pulse 0.5s infinite",
            }}
          >
            Vai se fuder, Paulo! 😡
          </button>
        </div>

        {/* Contador de tentativas */}
        {trollAttempts > 0 && (
          <div className="text-center text-red-400 text-lg font-bold mb-8 z-20">
            Tentativas fracassadas de apagar o site: {trollAttempts}
          </div>
        )}

        {/* Mensagem do troll */}
        {showTrollMessage && (
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg font-bold animate-bounce z-30">
            {trollMessage}
          </div>
        )}
      </div>

      {/* Corações flutuantes */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animation: `floatUp 2.5s ease-out forwards`,
            "--float-offset": `${heart.offsetX}px`,
          } as React.CSSProperties & { "--float-offset": string }}
        >
          <Heart className="w-6 h-6 text-red-500 fill-red-500 drop-shadow-lg" />
        </div>
      ))}

      {/* Rodapé */}
      <div className="fixed bottom-4 left-0 right-0 text-center text-gray-500 text-sm z-20">
        Site desenvolvido com ❤️ e muita má vontade. O botão troll foi inspirado
        em você tentando ser pontual. Brinks! Feliz Aniversário mesmo!
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(0.8);
          }
          10% {
            transform: translateY(-20px) translateX(var(--float-offset)) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(-300px) translateX(var(--float-offset)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-350px) translateX(var(--float-offset)) scale(0.8);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
          }
        }

        .photo {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .photo:hover {
          transform: scale(1.1);
          filter: brightness(1.2);
        }
      `}</style>
    </div>
  );
}
