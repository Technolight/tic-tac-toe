"use client";
import React, { useState, useEffect } from "react";
import Box from "@/components/box";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Announcement from "@/components/announcement";

const Table = () => {
  const { theme, setTheme } = useTheme();
  const [winner, setWinner] = useState<string | null>(null);
  const [turn, setTurn] = useState<string>("🐶"); // default
  const [board, setBoard] = useState(Array(9).fill(""));
  const [open, setOpen] = useState(false);

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Return proper symbols based on theme
  const getSymbols = () => {
    if (theme === "dark") {
      return { player1: "🐺", player2: "🦊" };
    }
    return { player1: "🐶", player2: "🐱" };
  };

  // Swap existing emojis when theme changes
  useEffect(() => {
    const { player1, player2 } = getSymbols();

    setBoard((prevBoard) =>
      prevBoard.map((cell) => {
        if (["🐶", "🐺"].includes(cell)) return player1;
        if (["🐱", "🦊"].includes(cell)) return player2;
        return cell;
      })
    );

    // also update the current turn
    setTurn((prevTurn) => {
      if (["🐶", "🐺"].includes(prevTurn)) return player1;
      if (["🐱", "🦊"].includes(prevTurn)) return player2;
      return prevTurn;
    });
  }, [theme]);

  const handleClick = (index: number) => {
    if (board[index] !== "") return;

    const { player1, player2 } = getSymbols();
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    setTurn((prev) => (prev === player1 ? player2 : player1));
    checkWinner(newBoard);
  };

  const resetBoard = () => {
    setBoard(Array(board.length).fill(""));
    setWinner(null);
    const { player1 } = getSymbols();
    setTurn(player1);
  };

  const checkWinner = (currentBoard: string[]) => {
    winConditions.forEach((condition) => {
      const firstAnimal = currentBoard[condition[0]];
      if (!firstAnimal) return;

      const allMatch = condition.every((i) => currentBoard[i] === firstAnimal);
      if (allMatch) {
        setWinner(firstAnimal);
        setOpen(true);
      }
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Announcement
        winner={winner}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            resetBoard();
          }
        }}
      />

      <div className="grid md:grid-cols-2 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg place-items-center">
        <div className="grid grid-cols-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg text-center">
          {board.map((value, i) => (
            <Box
              key={i}
              input={value}
              onClick={() => handleClick(i)}
              index={i}
            />
          ))}
        </div>
        <div>
          <h2 className="text-2xl text-center m-5">
            Player {turn}&apos;s Turn
          </h2>
          <Button variant="ghost" onClick={resetBoard}>
            Reset Board
          </Button>
          <Button className="capitalize" variant="ghost" onClick={toggleTheme}>
            {theme} mode
          </Button>
        </div>
      </div>
    </>
  );
};

export default Table;
