"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/database";
import ParkingForm from "@/components/ParkingForm";
import ParkingCard from "@/components/ParkingCard";
import { protectRoute } from "@/lib/auth";

export default function KasirPage() {
  useEffect(() => {
    protectRoute(["kasir"]);
  }, []);

  const [parkingStatus, setParkingStatus] = useState(db.getParkingStatus());
  // const [vehicles, setVehicles] = useState(db.getAllVehicles());
  const [vehicles, setVehicles] = useState(db.getActiveVehicles());
  useEffect(() => {
    setParkingStatus(db.getParkingStatus());
    setVehicles([...db.getAllVehicles()]);
  }, []);

  const handleVehicleAdded = () => {
    setParkingStatus(db.getParkingStatus());
    setVehicles([...db.getAllVehicles()]);
  };

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

      <ParkingForm onVehicleAdded={handleVehicleAdded} />
    </div>
  );
}
