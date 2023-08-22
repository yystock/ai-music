"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

interface SongSearchProps {
  handleSelect: (song: { name: string; artist: string }[]) => void;
  getValues: { name: string; artist: string }[];
}

export default function SongSerach({ handleSelect, getValues }: SongSearchProps) {
  const [search, setSearch] = useState("");

  const debouncedSearchTerm = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: async () => {
      if (debouncedSearchTerm) {
        const { data } = await axios.get(`/api/search?q=${debouncedSearchTerm}`);
        console.log(data.tracks);
        return data.tracks;
      }
      return null;
    },
    retry: 1,
  });

  return (
    <div>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search Song..." />
      </div>
      {isError && <div className="text-destructive">Error</div>}

      {data?.items.length > 0 && (
        <SearchResult
          isLoading={isLoading}
          data={data.items}
          getValues={getValues}
          handleSelect={handleSelect}
          setSearch={(value) => setSearch(value)}
        />
      )}
    </div>
  );
}

function SearchResult({
  isLoading,
  data,
  handleSelect,
  setSearch,
  getValues,
}: {
  isLoading: boolean;
  data: any[];
  handleSelect: (song: { name: string; artist: string }[]) => void;
  setSearch: (value: string) => void;
  getValues: { name: string; artist: string }[];
}) {
  return (
    <div
      className="flex flex-col px-4 py-2
        w-full"
    >
      {isLoading && <div className=" py-2 px-4 text-center rounded-xl">Loading...</div>}

      {data &&
        data.map((item) => (
          <div
            key={item.id}
            onClick={(e) => {
              handleSelect([...getValues, { name: item.name, artist: item.artists[0].name }]);
              setSearch("");
            }}
            className={cn(
              "border-slate-300 dark:border-indigo-800 border-2 my-1 hover:border-indigo-600 hover:bg-background/80 dark:hover:bg-background/80 hover:cursor-pointer   py-2 px-4 flex items-center justify-between rounded-xl"
            )}
          >
            <Image src={item.album.images[1].url} height={44} width={44} alt="cover" />

            {item.artists[0].name && (
              <div>
                <p className="ml-4 text-left text-sm overflow-hidden"> {item.artists[0].name}</p>
              </div>
            )}
            <span className="flex-grow"></span>
            <div>
              <p className="text-sm text-right overflow-hidden">{item.name && item.name}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
