import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Convertly</h1>
      <p className="text-lg mb-8">
        Effortlessly convert media files in your browser.
      </p>
    </section>
  );
}
