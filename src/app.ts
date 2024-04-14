interface Shipment {
    pickupLocations: Set<string>;
    dropoffLocations: Set<string>;
  }
  
  interface Trip {
    pickups: Set<string>;
    warehouse?: string;
    dropoffs: Set<string>;
  }
  
  function isValidTrip(trip: Trip, shipment: Shipment): boolean {
    // Check if all pick-up locations are valid
    for (const pickup of trip.pickups) {
      if (!shipment.pickupLocations.has(pickup)) {
        return false;
      }
    }
  
    // Check if all drop-off locations are valid
    for (const dropoff of trip.dropoffs) {
      if (!shipment.dropoffLocations.has(dropoff)) {
        return false;
      }
    }
  
    return true;
  }
  
  function areTripsValid(trips: Trip[], shipment: Shipment): boolean {
    const seenPickups: Set<string> = new Set();
    const seenDropoffs: Set<string> = new Set();
  
    // Check if all trips are valid individually
    for (const trip of trips) {
      if (!isValidTrip(trip, shipment)) {
        return false;
      }
    }
  
    // Check if all shipment pick-up locations are covered
    for (const trip of trips) {
      for (const pickup of trip.pickups) {
        if (!seenPickups.has(pickup)) {
          seenPickups.add(pickup);
        } else {
          return false; // Duplicate pickup in a trip or across trips
        }
      }
    }
  
    // Check if all shipment drop-off locations are covered
    for (const trip of trips) {
      for (const dropoff of trip.dropoffs) {
        if (!seenDropoffs.has(dropoff)) {
          seenDropoffs.add(dropoff);
        } else {
          return false; // Duplicate drop-off in a trip or across trips
        }
      }
    }
  
    // All pick-ups and drop-offs are covered by valid trips
    return seenPickups.size === shipment.pickupLocations.size &&
           seenDropoffs.size === shipment.dropoffLocations.size;
  }
  
  // Example usage
  const shipment: Shipment = {
    pickupLocations: new Set(["A", "B"]),
    dropoffLocations: new Set(["C", "D"])
  };
  
  const validTrips: Trip[] = [
    { pickups: new Set(["A"]), warehouse: "W", dropoffs: new Set() },
    { pickups: new Set(["B"]), warehouse: "W", dropoffs: new Set() },
    { pickups: new Set(), warehouse: "W", dropoffs: new Set(["C"]) },
    { pickups: new Set(), warehouse: "W", dropoffs: new Set(["D"]) }
  ];
  
  const invalidTrips: Trip[] = [
    { pickups: new Set(["A"]), warehouse: "W1", dropoffs: new Set() }, // Invalid warehouse names
    { pickups: new Set(["B"]), warehouse: "W2", dropoffs: new Set() },
  ];
  