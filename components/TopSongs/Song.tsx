"use client";
import React, { useEffect } from "react";
import "./Song.css";
import { motion } from "framer-motion";
import Image from "next/image";

interface SongProps {
  songName: string;
  songImg: string | null;
  songArtist: string;
}
function Song({ songName, songImg, songArtist }: SongProps) {
  const popUp = {
    in: { y: "200%" },
    anim: {
      y: "0%",
      transition: {
        duration: 1.2,
        delay: 3.6,
      },
      out: {
        y: "-200%",
        transition: {
          duration: 1.2,
        },
      },
    },
  };

  return (
    <motion.div className="Song" variants={popUp} initial="in" animate="anim" exit="out">
      <div className="song-img">
        <Image src={songImg || ""} alt="" />
      </div>
      <div className="song-info">
        <h1 className="song-name text-white text-xl">{songName}</h1>
        <h2 className="song-artist  text-white text-lg">{songArtist}</h2>
      </div>
    </motion.div>
  );
}

export default Song;
