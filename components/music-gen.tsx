import { FC } from "react";

interface GeneratedMusicProps {
  result: string;
}

const GeneratedMusic: FC<GeneratedMusicProps> = ({ result }) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-blue-600">
      <audio className="w-1/2" id="audio" src={result} controls autoPlay loop></audio>
    </div>
  );
};

export default GeneratedMusic;
