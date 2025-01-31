"use client";

type ParkingCardProps = {
  lantai: number;
  used: number;
  max: number;
  type: string;
};

export default function ParkingCard({
  lantai,
  used,
  max,
  type,
}: ParkingCardProps) {
  const percentage = (used / max) * 100;
  const isFull = used >= max;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Lantai {lantai}</h3>
          <p className="text-sm text-gray-500 capitalize">{type}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            isFull ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {isFull ? "Penuh" : "Tersedia"}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{used} Terpakai</span>
          <span>{max} Total</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isFull ? "bg-red-400" : "bg-cyan-400"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        {type === "motor" ? (
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        )}
        <span className="text-2xl font-bold text-gray-700">
          {max - used}
          <span className="text-sm font-normal ml-1 text-gray-500">
            Slot tersisa
          </span>
        </span>
      </div>
    </div>
  );
}
