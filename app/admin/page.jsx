"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function AdminPage() {
  const router = useRouter();


  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [search]);

  
  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
    }
  };


  const fetchLeads = async () => {
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (!error) {
      setLeads(data);
    }
  };

  
  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (!error) {
      fetchLeads();
    }
  };

  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/");
};

  return (
    <div className="min-h-screen bg-slate-100 p-10">
     

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Lead Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer enquiries in one place.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
        >
          Logout
        </button>

      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <p className="text-gray-500">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {leads.length}
          </h2>
        </div>

        <div className="bg-yellow-100 rounded-xl shadow p-6 hover:shadow-lg transition">
          <p className="text-gray-600">
            New
          </p>

          <h2 className="text-4xl font-bold">
            {
              leads.filter(
                (lead) => lead.status === "New"
              ).length
            }
          </h2>
        </div>

        <div className="bg-green-100 rounded-xl shadow p-6 hover:shadow-lg transition">
          <p className="text-gray-600">
            Contacted
          </p>

          <h2 className="text-4xl font-bold">
            {
              leads.filter(
                (lead) =>
                  lead.status === "Contacted"
              ).length
            }
          </h2>
        </div>

        <div className="bg-red-100 rounded-xl shadow p-6 hover:shadow-lg transition">
          <p className="text-gray-600">
            Closed
          </p>

          <h2 className="text-4xl font-bold">
            {
              leads.filter(
                (lead) =>
                  lead.status === "Closed"
              ).length
            }
          </h2>
        </div>

      </div>

      

      <div className="mb-8">

        <input
          type="text"
          placeholder="🔍 Search by Name or Email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border rounded-2xl p-4 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

    

      <div className="bg-white rounded-xl shadow overflow-hidden overflow-x-auto">

        <table className="min-w-full divide-y divide-gray-200">

          <thead className="bg-blue-600 text-white">

            <tr>
  <th className="px-4 py-3 text-center">Sr no.</th>
  <th className="px-4 py-3 text-center">Name</th>
  <th className="px-4 py-3 text-center">Email</th>
  <th className="px-4 py-3 text-center">Phone</th>
  <th className="px-4 py-3 text-center">Budget</th>
  <th className="px-4 py-3 text-center">Message</th>
  <th className="px-4 py-3 text-center">Status</th>
  <th className="px-4 py-3 text-center">Created</th>
</tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
  {leads.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        className="text-center py-12 text-gray-500"
      >
        <div>
          <h2 className="text-2xl font-semibold">
            No Leads Yet
          </h2>
          <p className="mt-2">
            New enquiries will appear here.
          </p>
        </div>
      </td>
    </tr>
  ) : (
    leads.map((lead, index) => (
      <tr
        key={lead.id}
        className="hover:bg-gray-50 transition"
      >
        <td className="px-4 py-4 text-center">
  {index + 1}
</td>

<td className="px-4 py-4 text-center">
  {lead.name}
</td>

        <td className="px-4 py-4 text-center">{lead.email}</td>
        <td className="px-4 py-4 text-center">{lead.phone}</td>

        <td className="px-4 py-4 text-center">{lead.budget}</td>

        <td className="px-4 py-4 max-w-xs text-center">
          {lead.message}
        </td>

        <td className="px-4 py-4">
          <select
            value={lead.status}
            onChange={(e) =>
              updateStatus(lead.id, e.target.value)
            }
            className={`px-3 py-2 rounded-lg font-medium border outline-none ${
              lead.status === "New"
                ? "bg-yellow-100 text-yellow-800"
                : lead.status === "Contacted"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <option value="New">New</option>
            <option value="Contacted"> Contacted</option>
            <option value="Closed">Closed</option>
          </select>
        </td>
        

        <td className="px-4 py-4">
          {new Date(
            lead.created_at
          ).toLocaleDateString()}
        </td>
      </tr>
    ))
  )}
          </tbody>
        </table>
      </div>
    </div>
  );
}