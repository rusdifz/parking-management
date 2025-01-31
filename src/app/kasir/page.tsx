"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/database";
import ParkingForm from "@/components/ParkingForm";
import ParkingCard from "@/components/ParkingCard";

export default function KasirPage() {
  const [parkingStatus, setParkingStatus] = useState({
    1: { used: 0, max: 10, type: "motor" },
    2: { used: 0, max: 6, type: "mobil" },
  });
  const [vehicles, setVehicles]: any = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setParkingStatus(await db.getParkingStatus());
      setVehicles(await db.getVehicles());
    };

    loadData();
    const unsubscribe = db.subscribe(loadData);

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">
        Kasir Parking System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ParkingCard
          lantai={1}
          used={parkingStatus[1].used}
          max={parkingStatus[1].max}
          type={parkingStatus[1].type}
        />
        <ParkingCard
          lantai={2}
          used={parkingStatus[2].used}
          max={parkingStatus[2].max}
          type={parkingStatus[2].type}
        />
      </div>

      <ParkingForm />

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Kendaraan Aktif</h2>
        <div className="space-y-2">
          {vehicles
            .filter((v) => !v.keluar)
            .map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <div>
                  <span className="font-medium">{vehicle.plat}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    Lantai {vehicle.lantai}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(vehicle.masuk).toLocaleTimeString()}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
