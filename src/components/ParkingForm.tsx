"use client";
import { useState } from "react";
import { db } from "@/lib/database";
import { calculateCost } from "@/lib/utils";

export default function ParkingForm({
  onVehicleAdded,
}: {
  onVehicleAdded: () => void;
}) {
  const [plat, setPlat] = useState("");
  const [type, setType] = useState<"motor" | "mobil">("motor");
  const [action, setAction] = useState<"masuk" | "keluar">("masuk");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (action === "masuk") {
        db.addVehicle({
          type,
          plat,
          lantai: type === "motor" ? 1 : 2,
        });
        setResult(`Kendaraan ${plat} masuk berhasil`);
      } else {
        const vehicle = db
          .getAllVehicles()
          .find((v) => v.plat === plat && !v.keluar);
        if (vehicle) {
          db.removeVehicle(vehicle.id);
          const cost = calculateCost(vehicle.type, vehicle.masuk, new Date());
          setResult(`Total biaya: Rp ${cost}`);
        }
      }
      onVehicleAdded();
      setPlat("");
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Terjadi kesalahan");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as "masuk" | "keluar")}
            className="p-2 border rounded"
          >
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
          </select>

          {action === "masuk" && (
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "motor" | "mobil")}
              className="p-2 border rounded"
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
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            action === "masuk" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {action === "masuk" ? "Masukkan" : "Keluar"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded">
          {result}
        </div>
      )}
    </div>
  );
}
