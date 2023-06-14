import { useRef, useState } from "react";

import HomeLink from "../home-link";

type Song = {
  name: string;
  src: string;
};

const AudioPlayer = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState(-1);
  const [shuffle, setShuffle] = useState(false);

  const [repeat, setRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileAdd = (ev: React.ChangeEvent) => {
    const files = (ev?.target as HTMLInputElement)?.files;
    if (!files) return;

    setSongs((prev) => {
      const newSongs = [...files].map((file) => ({
        name: file.name.split(".mp3")[0],
        src: URL.createObjectURL(file),
      }));
      return [...prev, ...newSongs];
    });
    if (currentSong === -1) {
      setCurrentSong(0);
      audioRef?.current?.load();
    }
  };

  const handleSongClick = (index: number) => {
    setCurrentSong(index);
  };

  const handleEnded = () => {
    audioRef?.current?.pause();
    if (shuffle) {
      let random = Math.floor(Math.random() * songs.length);
      while (random === currentSong) {
        random = Math.floor(Math.random() * songs.length);
      }
      setCurrentSong(random);
      return;
    }

    if (currentSong !== songs.length - 1) {
      setCurrentSong((prev) => prev + 1);
    }
    if (repeat && currentSong === songs.length - 1) {
      setCurrentSong(0);
    }
  };

  const handleSetSong = (inc: number) => {
    audioRef?.current?.pause();
    if (inc === 1) {
      if (currentSong === songs.length - 1) {
        setCurrentSong(0);
        return;
      }
    }

    if (inc === -1) {
      if (currentSong === 0) {
        setCurrentSong(songs.length - 1);
        return;
      }
    }

    setCurrentSong((prev) => prev + inc);
  };

  const song = songs[currentSong] || null;

  return (
    <div className="flex flex-col w-screen">
      <header className="bg-green-400 flex flex-row justify-center gap-4 p-4 items-center">
        <HomeLink />
        <h1 className="text-2xl font-bold text-white">Audio Player</h1>
      </header>
      <main className="flex flex-col  justify-center items-center p-4">
        <div className="flex flex-col my-2 p-2 text-center items-center justify-center">
          <label
            htmlFor="sound-file"
            className="my-2 text-large font-bold text-xl"
          >
            Add an audio file
          </label>
          <input
            type="file"
            accept="audio/*"
            className="p-2"
            id="sound-file"
            multiple
            onChange={handleFileAdd}
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <audio
            ref={audioRef}
            controls
            src={song?.src}
            className="my-2"
            onEnded={handleEnded}
            onCanPlay={() => audioRef?.current?.play()}
          />
          <div className="flex flex-row w-full gap-2 items-center justify-center">
            <button
              className={`${
                !repeat && currentSong <= 0 ? "bg-gray-400" : "bg-green-400"
              } p-4 rounded-lg`}
              onClick={() => handleSetSong(-1)}
              disabled={!repeat && currentSong <= 0}
            >
              Prev
            </button>
            <button
              className={`${
                !repeat && currentSong === songs.length - 1
                  ? "bg-gray-400"
                  : "bg-green-400"
              } p-4 rounded-lg`}
              onClick={() => handleSetSong(1)}
              disabled={!repeat && currentSong === songs.length - 1}
            >
              Next
            </button>
          </div>
          <div className="flex flex-col items-center w-full my-2 gap-2">
            <p className="font-bold pt-4 text-lg">Playlist</p>
            <div className="flex flex-row">
              <input
                type="checkbox"
                id="repeat"
                checked={repeat}
                onChange={() => setRepeat((prev) => !prev)}
              ></input>
              <label htmlFor="repeat" className="p-2 text-sm font-bold">
                Repeat
              </label>
              <input
                type="checkbox"
                id="shuffle"
                checked={shuffle}
                onChange={() => setShuffle((prev) => !prev)}
              ></input>
              <label htmlFor="shuffle" className="p-2 text-sm font-bold">
                Shuffle
              </label>
            </div>
            {songs?.map((song, i) => {
              return (
                <button
                  key={`song-${i}`}
                  className={`${
                    i === currentSong ? "bg-green-400" : "bg-green-200"
                  } border-2 w-full text-white text-bold p-4 rounded-lg`}
                  onClick={() => handleSongClick(i)}
                >
                  {song.name}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AudioPlayer;
