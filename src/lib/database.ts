export type Vehicle = {
  id: string;
  type: "motor" | "mobil";
  plat: string;
  lantai: number;
  masuk: Date;
  keluar?: Date;
};

class ParkingDB {
  private vehicles: Vehicle[] = [];
  private readonly capacities = {
    1: { type: "motor", max: 10 },
    2: { type: "mobil", max: 6 },
  };

  constructor() {
    this.loadFromLocalStorage();
  }

  private notifyListeners() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("parkingUpdate"));
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem("parkingData", JSON.stringify(this.vehicles));
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem("parkingData");
    if (data) {
      this.vehicles = JSON.parse(data, (key, value) => {
        if (key === "masuk" || key === "keluar") {
          return new Date(value);
        }
        return value;
      });
    }
  }

  getParkingStatus() {
    const counts = {
      1: this.vehicles.filter((v) => v.lantai === 1 && !v.keluar).length,
      2: this.vehicles.filter((v) => v.lantai === 2 && !v.keluar).length,
    };

    return {
      1: { used: counts[1], ...this.capacities[1] },
      2: { used: counts[2], ...this.capacities[2] },
    };
  }

  addVehicle(vehicle: Omit<Vehicle, "id" | "masuk">) {
    const status: any = this.getParkingStatus();
    const floor = vehicle.lantai;

    if (status[floor].used >= status[floor].max) {
      throw new Error("Lantai penuh");
    }

    const newVehicle = {
      ...vehicle,
      id: Math.random().toString(36).substr(2, 9),
      masuk: new Date(),
    };

    this.vehicles.push(newVehicle);

    this.notifyListeners();

    return newVehicle;
  }

  removeVehicle(id: string) {
    const vehicle = this.vehicles.find((v) => v.id === id);
    if (vehicle) {
      vehicle.keluar = new Date();
    }
    this.notifyListeners();
    return vehicle;
  }

  getAllVehicles() {
    return this.vehicles;
  }

  getActiveVehicles() {
    return this.vehicles.filter((v) => !v.keluar);
  }
}

export const db = new ParkingDB();
