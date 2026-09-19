import { useState, useEffect, useRef } from 'react';

const keys = [
  {
    key: 'Q', emoji: '😀', name: 'തളരരുത് രാമൻകുട്ടി കലാകാരൻ അല്ലാത്തവരെ സമൂഹം അംഗീകരിക്കില്ല', sounds: [
      "../public/audio/salim1.ogg"
    ]
  },
  {
    key: 'W', emoji: '😢', name: 'എളുപ്പം അല്ല ട്ടോ ഇജ്ജാവതി ഓരോ സാധനങ്ങൾ കിട്ടാൻ', sounds: [
      "../public/audio/innocent1.ogg"
    ]
  },
  {
    key: 'E', emoji: '😠', name: 'kittendathu okke kittiyello samaadhanam aayello', sounds: [
      "../public/audio/salim2.ogg"
    ]
  },
  {
    key: 'A', emoji: '😎', name: 'ബെട്ടിയിട്ട ബായ തണ്ട് പോലെ കേടക്ന കേടപ്പ് കണ്ടോ', sounds: [
      "../public/audio/mohanlal.ogg"
    ]
  },
  {
    key: 'S', emoji: '😍', name: 'Case kodukkennam pillecho 😐🐔🐔 meesa madhavan Cochin Haneefa Jagathy', sounds: [
      "../public/audio/cohinhaneefa.ogg"
    ]
  },
  {
    key: 'D', emoji: '😴', name: 'ippo sheri aakki theraam thamarasheri chorram Vellanakalude Naadu Mohanlal kuthiravattam pappu Maniyanpilla Raju', sounds: [
      "../public/audio/ipposheriakkitheram.ogg"
    ]
  },
  {
    key: 'Z', emoji: '🤔', name: 'ingalu enthu veruppikal aanu vayankara bidal aanallo ningal ithokke ingalkku ingalde veettil veruppichaal porre m80 moosa', sounds: [
      "../public/audio/verupikkal.ogg"
    ]
  },
  {
    key: 'X', emoji: '🤯', name: 'ayyayye mohanlal pappu aye auto', sounds: [
      "../public/audio/ayyeayye.ogg"
    ]
  },
  {
    key: 'C', emoji: '🤗', name: 'നിന്റെ ബുദ്ധി ഇല്ലായ്മ നീ ഒരിക്കൽ കൂടി തെളിയിച്ചിരിക്കുന്നു ninte budhi illaymma nee orikkal koodi theliyichirikkunnu mohanlal srinivasan pattana pravesham cid vesha prachannar', sounds: [
      "../public/audio/mohanlal1.ogg"
    ]
  },
  {
    key: 'R', emoji: '🤩', name: 'starstruck', sounds: [
      "../public/audio/salim1.ogg"
    ]
  },
  {
    key: 'T', emoji: '😇', name: 'innocent', sounds: [
      "../public/audio/salim1.ogg"
    ]
  },
  {
    key: 'Y', emoji: '😈', name: 'devilish', sounds: [
      "../public/audio/salim1.ogg"
    ]
  },
  {
    key: 'U', emoji: '🤤', name: 'drooling', sounds: [
      "../public/audio/salim1.ogg"
    ]
  },
  {
    key: 'I', emoji: '🤪', name: 'zany', sounds: [
      "../public/audio/salim1.ogg"
    ]
  },
];

function App() {
  const [pressedKey, setPressedKey] = useState(null);
  const [currentSound, setCurrentSound] = useState('Noting is playing...');
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef(null);

  const playSound = (key) => {
    const selectedKey = keys.find((item) => item.key === key);

    if (!selectedKey) return;

    setPressedKey(key);

    const randomIndex = Math.floor(
      Math.random() * selectedKey.sounds.length
    );

    const soundPath = selectedKey.sounds[randomIndex];

    // 🔴 Stop the previous audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // 🟢 Create new audio
    const newAudio = new Audio(soundPath);

    newAudio.volume = volume;

    // Store it immediately in the ref
    audioRef.current = newAudio;

    newAudio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });

    newAudio.onended = () => {
      if (audioRef.current === newAudio) {
        audioRef.current = null;
      }
    };

    setCurrentSound(
      `${selectedKey.emoji} ${selectedKey.name}`
    );

    setTimeout(() => {
      setPressedKey(null);
    }, 150);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat) return;

      const key = event.key.toUpperCase();

      playSound(key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}

      <header className="border-b border-zinc-800">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-black">
              😂 Funny<span className="text-purple-500">Deck</span>
            </h1>

            <p className="text-sm text-zinc-500">
              Press a key. Cause chaos.
            </p>
          </div>



        </div>
      </header>


      {/* Main */}

      <main className="mx-auto max-w-6xl px-6 py-12">

        {/* Hero */}

        <section className="text-center mb-12">

          <div className="inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-400 mb-5">
            🎧 Keyboard troll voice over
          </div>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            Press a key.
            <br />

            <span className="text-red-500">
              Make noise. 😂
            </span>
          </h2>

          <p className="mt-5 text-zinc-500">
            Try pressing any of the keys below.
          </p>

        </section>


        {/* Keyboard */}

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-10">

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3">

            {keys.map((item) => (

              <button
                key={item.key}
                onClick={() => playSound(item.key)}
                className={`
                  aspect-square rounded-2xl
                  border border-zinc-700
                  bg-zinc-900
                  transition-all duration-100
                  hover:border-purple-500
                  hover:bg-zinc-800
                  active:scale-90
                  flex flex-col
                  items-center
                  justify-center
                  gap-2
                  ${pressedKey === item.key
                    ? "scale-90 border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                    : ""
                  }
                `}
              >

                <span className="text-3xl">
                  {item.emoji}
                </span>

                <span className="text-lg font-black">
                  {item.key}
                </span>

                <span className="text-xs text-zinc-500">
                  {item.name}
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* Now Playing */}

        <section className="mt-8">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="flex items-center gap-5">

              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl">
                🔊
              </div>

              <div>

                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  Now Playing
                </p>

                <h3 className="text-xl font-bold mt-1">
                  {currentSound}
                </h3>

              </div>



            </div>
            <div className="mt-5 flex items-center gap-4">

              <span className="text-sm">
                🔊
              </span>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) =>
                  setVolume(Number(event.target.value))
                }
                className="w-full"
              />

              <span className="text-sm text-zinc-500 w-12">
                {Math.round(volume * 100)}%
              </span>

            </div>

          </div>

        </section>


        {/* Random button */}

        <section className="mt-8 text-center">

          <button
            onClick={() => {
              const random =
                keys[Math.floor(Math.random() * keys.length)];

              playSound(random.key);
            }}
            className="
              rounded-2xl
              bg-purple-600
              px-8
              py-4
              font-bold
              transition
              hover:bg-purple-500
              active:scale-95
            "
          >
            🎲 RANDOM CHAOS
          </button>

        </section>

      </main>

    </div>
  );
}

export default App;