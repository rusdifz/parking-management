"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/database";
import VehicleTable from "@/components/VehicleTable";

export default function AdminPage() {
  const [vehicles, setVehicles]: any = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setVehicles(await db.getVehicles());
    };

    loadData();
    const unsubscribe = db.subscribe(loadData);

    return () => unsubscribe();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle: any) =>
    vehicle.plat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-600">
          Admin Dashboard
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari berdasarkan plat..."
            className="w-full max-w-md px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Daftar Kendaraan ({filteredVehicles.length})
          </h2>
          <VehicleTable vehicles={filteredVehicles} />
        </div>
      </div>
    </div>
  );
}
