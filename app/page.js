"use client";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
      const router = useRouter();
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <LeadForm />
      <Footer />
    </>
  );
}