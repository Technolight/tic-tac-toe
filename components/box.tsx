"use client";

type BoxProps = {
  input: string;
  onClick: () => void;
  index: number;
};

const Box = ({ input, onClick, index }: BoxProps) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  const borders = `
    ${row < 2 ? "border-b-1" : ""} 
    ${col < 2 ? "border-r-1" : ""}
    border-gray-300
  `;

  return (
    <button
      className={`w-28 h-28 flex items-center justify-center text-5xl ${borders}`}
      onClick={onClick}
    >
      {input}
    </button>
  );
};

export default Box;
