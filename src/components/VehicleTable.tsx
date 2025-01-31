"use client";
import { Vehicle } from "@/lib/database";

export default function VehicleTable({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden shadow-md">
      <table className="w-full bg-white">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">
              Plat
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">
              Jenis
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">
              Lantai
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">
              Masuk
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">
              Keluar
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm">{vehicle.plat}</td>
              <td className="px-6 py-4 text-sm capitalize">{vehicle.type}</td>
              <td className="px-6 py-4 text-sm">Lantai {vehicle.lantai}</td>
              <td className="px-6 py-4 text-sm">
                {new Date(vehicle.masuk).toLocaleTimeString()}
              </td>
              <td className="px-6 py-4 text-sm">
                {vehicle.keluar
                  ? new Date(vehicle.keluar).toLocaleTimeString()
                  : "-"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vehicle.keluar
                      ? "bg-gray-100 text-gray-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {vehicle.keluar ? "Selesai" : "Parkir"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
