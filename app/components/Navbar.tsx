import Link from "next/link";

const Navbar = () => {
    return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-wide">Convertly</h1>
        <div className="flex-grow flex justify-center">
            <nav className="hidden md:flex space-x-6">
            <Link href="/convert" className="hover:text-gray-400 text-white transition-colors duration-300">Convert</Link>
            <Link href="/dashboard" className="hover:text-gray-400 text-white transition-colors duration-300">Dashboard</Link>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;