"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "@/lib/validation";

export default function LeadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data) => {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Result:", result);

    if (response.ok) {
      alert("Lead submitted successfully!");
      reset();
    } else {
      alert(result.error || "Something went wrong");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

  return (
    <section
      id="contact"
      className="py-20 max-w-3xl mx-auto px-6"
    >
      <h2 className="text-4xl font-bold text-center mb-10">
       Let's Discuss Your Project!
      
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Name */}

        <div>
          <input
            {...register("name")}
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
  <input
    type="tel"
    placeholder="Phone Number"
    {...register("phone")}
    className="w-full p-4 border rounded-lg"
  />

  {errors.phone && (
    <p className="text-red-500 mt-1">
      {errors.phone.message}
    </p>
  )}
</div>

        

        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg p-3"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        

        <div>
          <select
            {...register("budget")}
           className="w-full border rounded-lg p-3 text-gray-500"
>
          
            <option value="">Select Budget</option>

            <option value="1000-5000">
              ₹1,000 - ₹5,000
            </option>

            <option value="5000-10000">
              ₹5,000 - ₹10,000
            </option>

            <option value="10000-50000">
              ₹10,000 - ₹50,000
            </option>

            <option value="50000+">
              ₹50,000+
            </option>
          </select>

          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">
              {errors.budget.message}
            </p>
          )}
        </div>

        

        <div>
          <textarea
            {...register("message")}
            rows="5"
            placeholder="Tell us about your project..."
            className="w-full border rounded-lg p-3"
          />

          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

      

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}