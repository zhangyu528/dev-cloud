import Image from "next/image";
import Head from 'next/head';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white">
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Home Page</h1>
      </main>
    </div>
  );
}
