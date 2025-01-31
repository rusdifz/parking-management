"use client";
import { useState } from "react";
import { db } from "@/lib/database";
import { calculateCost } from "@/lib/utils";

export default function ParkingForm() {
  const [plat, setPlat] = useState("");
  const [type, setType] = useState<"motor" | "mobil">("motor");
  const [action, setAction] = useState<"masuk" | "keluar">("masuk");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (action === "masuk") {
        await db.addVehicle({
          type,
          plat,
          lantai: type === "motor" ? 1 : 2,
        });
        setResult(`Kendaraan ${plat} masuk berhasil`);
      } else {
        const vehicles = await db.getVehicles();
        const vehicle = vehicles.find((v) => v.plat === plat && !v.keluar);

        if (vehicle) {
          await db.removeVehicle(vehicle.id);
          const cost = calculateCost(vehicle.type, vehicle.masuk, new Date());
          setResult(`Total biaya: Rp ${cost.toLocaleString()}`);
        } else {
          setResult("Kendaraan tidak ditemukan");
        }
      }

      setPlat("");
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as "masuk" | "keluar")}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
          </select>

          {action === "masuk" && (
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "motor" | "mobil")}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="motor">Motor</option>
              <option value="mobil">Mobil</option>
            </select>
          )}
        </div>

        <input
          type="text"
          placeholder="Nomor Plat"
          value={plat}
          onChange={(e) => setPlat(e.target.value.toUpperCase())}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            action === "masuk"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } transition-colors`}
        >
          {action === "masuk" ? "Masukkan" : "Keluar"}
        </button>
      </form>

      {result && (
        <div
          className="mt-4 p-3 rounded-lg text-center ${
          result.includes('berhasil') ? 'bg-green-100 text-green-800' : 
          result.includes('biaya') ? 'bg-blue-100 text-blue-800' : 
          'bg-red-100 text-red-800'
        }"
        >
          {result}
        </div>
      )}
    </div>
  );
}
