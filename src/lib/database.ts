type Vehicle = {
  id: string;
  type: "motor" | "mobil";
  plat: string;
  lantai: number;
  masuk: Date;
  keluar?: Date;
};

class ParkingDB {
  private vehicles: Vehicle[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadFromLocalStorage();
    window.addEventListener("storage", this.handleStorageEvent);
  }

  private handleStorageEvent = (e: StorageEvent) => {
    if (e.key === "parkingData") {
      this.loadFromLocalStorage();
      this.notifyListeners();
    }
  };

  private loadFromLocalStorage() {
    const data = localStorage.getItem("parkingData");
    if (data) {
      this.vehicles = JSON.parse(data, (key, value) => {
        if (key === "masuk" || key === "keluar") return new Date(value);
        return value;
      });
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem("parkingData", JSON.stringify(this.vehicles));
    window.dispatchEvent(new Event("parkingDataChanged"));
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Mock API Methods
  async getVehicles(): Promise<Vehicle[]> {
    return [...this.vehicles];
  }

  async addVehicle(vehicle: Omit<Vehicle, "id" | "masuk">) {
    const newVehicle = {
      ...vehicle,
      id: Math.random().toString(36).substr(2, 9),
      masuk: new Date(),
    };

    this.vehicles.push(newVehicle);
    this.saveToLocalStorage();
    return newVehicle;
  }

  async removeVehicle(id: string) {
    const vehicle = this.vehicles.find((v) => v.id === id);
    if (vehicle) {
      vehicle.keluar = new Date();
      this.saveToLocalStorage();
    }
    return vehicle;
  }

  async getParkingStatus() {
    return {
      1: {
        used: this.vehicles.filter((v) => v.lantai === 1 && !v.keluar).length,
        type: "motor",
        max: 10,
      },
      2: {
        used: this.vehicles.filter((v) => v.lantai === 2 && !v.keluar).length,
        type: "mobil",
        max: 6,
      },
    };
  }
}

export const db = new ParkingDB();
