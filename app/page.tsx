import Table from "@/components/table";

export default function Home() {
  return (
    <div className="transition-color duration-300 ease-in-out h-dvh flex flex-col justify-center items-center bg-[url('/background_01.jpg')] dark:bg-[url('/background_01_dark.jpg')] bg-cover bg-center">
      <h1 className="text-7xl m-6 text-center">Gab's Tic-Tac-Toe</h1>
      <Table />
    </div>
  );
}
