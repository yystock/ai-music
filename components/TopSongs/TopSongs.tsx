"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./TopSongs.css";
import Song from "./Song";
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Song as SongType } from "@prisma/client";

interface TopFiveSongsProps {
  data: SongType[];
  id: string;
  message: string;
}
function TopFiveSongs({ data, id, message }: TopFiveSongsProps) {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [songPreview, setSongPreview] = useState("");
  const [letters, setLetters] = useState(0);

  const main = {
    in: { opacity: 1 },
    anim: {
      opacity: 1,
      transition: {
        staggerChildren: 5,
      },
    },
  };

  const stagger = {
    in: { opacity: 1 },
    anim: {
      opacity: 1,
      height: "0%",
      transition: {
        staggerChildren: 1.5,
        // when:"afterChildren",
        duration: 0.6,
        delay: 3.5,
      },
    },
    out: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };
  const staggerTwo = {
    in: { opacity: 1 },
    anim: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const slideIn = {
    in: { y: "210%" },
    anim: {
      y: "0%",
      transition: {
        duration: 1,
      },
    },
  };

  const songCard = {
    in: { opacity: 1 },
    anim: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  // const getSongData = async (name: string, artist: string) => {
  //   const { data } = await axios.get(`/api/search?q=${name}%20artist:${artist}`);
  //   return data.tracks.items[0];
  // };

  // useEffect(() => {
  //   async function GetAllSongs() {
  //     const promises = data.map((x) => getSongData(x.name, x.artist));
  //     const results: any[] = await Promise.all(promises);
  //     const letter = data.map((a) => a.name.length);
  //     setLetters(letter.reduce((a, b) => a + b, 0));
  //     setSongs(results);
  //     setLoaded(true);
  //   }
  //   GetAllSongs();

  //   // setSongPreview([7].preview_url);
  // }, []);
  useEffect(() => {
    setLoaded(false);
    const timeout = setTimeout(() => {
      setSongs(data);
      const letter = data.map((a) => a.name.length);

      setLetters(letter.reduce((a, b) => a + b, 0));
      const preview = data.find((song) => song.previewUrl !== null);

      setSongPreview(preview?.previewUrl || " ");
      setLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [data]);

  const getSong = (number: number) => {
    return <Song songName={songs[number].name} songImg={songs[number].imageUrl} songArtist={songs[number].artist} />;
  };

  return (
    <>
      <motion.div className="TopFiveSongs" exit={{ transition: { delay: 5 } }}>
        <motion.div
          className="initial-animate"
          variants={stagger}
          initial="in"
          animate="anim"
          exit="out"
          onAnimationComplete={() => {
            document.querySelector(".initial-animate")?.classList.add("display-none");
            document.querySelector(".top-song-list")?.classList.remove("display-none");
            document.querySelector(".text-bg")?.classList.remove("display-none");
          }}
        >
          <motion.div variants={staggerTwo} className="DIV ONE">
            <motion.div variants={slideIn}>But a year Like</motion.div>
            <motion.div variants={slideIn}>2023 required backup</motion.div>
          </motion.div>
          <motion.div variants={staggerTwo} className="DIV`">
            <motion.div variants={slideIn}>These were the other songs</motion.div>
            <motion.div variants={slideIn}>you had on repeat...</motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="top-song-list display-none" variants={songCard} initial="in" animate="anim">
          <div>{loaded ? getSong(0) : null}</div>
          <div>{loaded ? getSong(1) : null}</div>
          <div>{loaded ? getSong(2) : null}</div>
          <div>{loaded ? getSong(3) : null}</div>
          <div>{loaded ? getSong(4) : null}</div>
        </motion.div>
        <motion.div className="text-bg display-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6, duration: 0.5 }}>
          <p className={`${loaded ? `text-[${120 / (letters / 25)}vw]` : ""}`}>
            {loaded
              ? data.map((a) => {
                  return a.name;
                })
              : "loading"}
          </p>
        </motion.div>

        <motion.div className="pagination" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="prev">
            <Link href="/top_song">
              <ChevronUp style={{ color: "white" }} />
            </Link>
          </div>
          {/* <div className="page-no">
          <p>
            <span>3</span> / 4
          </p>
        </div> */}
          <div className="next">
            <Link href="/top_genre">
              <ChevronDown style={{ color: "white" }} />
            </Link>
          </div>
        </motion.div>
        {loaded ? <audio className="fixed w-48 right-0 top-0" id="audio" src={songPreview} controls autoPlay loop></audio> : null}
      </motion.div>
      {loaded && (
        <div className="flex flex-col items-center justify-center bg-orange-500 text-white font-bold w-full h-screen text-center px-28 py-16">
          <p className="mb-14 text-3xl">AI REVIEW:</p>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default TopFiveSongs;
