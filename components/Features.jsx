export default function Features() {
  return (
    <section className="py-20 bg-gray-50">

      <h2 className="text-4xl text-center font-bold">
        Why Choose LeadDesk?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-bold text-xl">Fast Lead Capture</h3>
          <p className="mt-2">
            Collect customer enquiries instantly.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-bold text-xl">Easy Management</h3>
          <p className="mt-2">
            Track every lead in one place.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-bold text-xl">Secure Dashboard</h3>
          <p className="mt-2">
            Manage leads with authentication.
          </p>
        </div>

      </div>

    </section>
  );
}