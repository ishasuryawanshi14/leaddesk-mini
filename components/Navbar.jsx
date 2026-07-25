import Link from "next/link";
export default function Navbar() {
  return (
   <nav className="flex justify-between items-center px-10 py-5">

  <h1 className="text-3xl font-bold text-blue-600">
    LeadDesk Mini
  </h1>

  <div className="flex gap-4">

    <a
      href="#contact"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
      Get Started
    </a>
    <Link
          href="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Admin Login
        </Link>


    
    

  </div>

</nav>
  );
}