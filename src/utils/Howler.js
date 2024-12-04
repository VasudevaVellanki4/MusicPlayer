import { Howl } from 'howler';

const useHowler = (src) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const newSound = new Howl({
      src: [src],
      html5: true,
    });
    setSound(newSound);

    return () => {
      newSound.unload();
    };
  }, [src]);

  return sound;
};

export default useHowler;