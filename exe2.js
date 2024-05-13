class FlightBookingSystem {
    constructor(agencyName) {
      this.agencyName = agencyName;
      this.flights = [];
      this.bookings = [];
      this.bookingsCount = 0;
    }
  
    addFlight(flightNumber, destination, departureTime, price) {
      for (const flight of this.flights) {
        if (flight.flightNumber === flightNumber) {
          return `Flight ${flightNumber} to ${destination} is already available.`;
        }
      }
  
      this.flights.push({
        flightNumber,
        destination,
        departureTime,
        price,
      });
  
      return `Flight ${flightNumber} to ${destination} has been added to the system.`;
    }
  
    bookFlight(passengerName, flightNumber) {
      const flight = this.flights.find((f) => f.flightNumber === flightNumber);
  
      if (!flight) {
        return `Flight ${flightNumber} is not available for booking.`;
      }
  
      this.bookings.push({
        passengerName,
        flightNumber,
      });
  
      this.bookingsCount++;
  
      return `Booking for passenger ${passengerName} on flight ${flightNumber} is confirmed.`;
    }
  
    cancelBooking(passengerName, flightNumber) {
      const index = this.bookings.findIndex(
        (booking) =>
          booking.passengerName === passengerName &&
          booking.flightNumber === flightNumber
      );
  
      if (index === -1) {
        throw new Error(
          `Booking for passenger ${passengerName} on flight ${flightNumber} not found.`
        );
      }
  
      this.bookings.splice(index, 1);
      this.bookingsCount--;
  
      return `Booking for passenger ${passengerName} on flight ${flightNumber} is cancelled.`;
    }
  
    showBookings(criteria) {
      if (this.bookingsCount === 0) {
        throw new Error("No bookings have been made yet.");
      }
  
      if (criteria === "all") {
        const bookingInfo = this.bookings.map(
          (booking) =>
            `${booking.passengerName} booked for flight ${booking.flightNumber}.`
        );
        return [`All bookings(${this.bookingsCount}):`, ...bookingInfo].join('\n');
      } else if (criteria === "cheap" || criteria === "expensive") {
        const filteredFlights = this.flights.filter((flight) =>
          criteria === "cheap" ? flight.price <= 100 : flight.price > 100
        );
  
        if (filteredFlights.length === 0) {
          return `No ${criteria} bookings found.`;
        }
  
        const bookingInfo = this.bookings
          .filter((booking) =>
            filteredFlights.some(
              (flight) => flight.flightNumber === booking.flightNumber
            )
          )
          .map(
            (booking) =>
              `${booking.passengerName} booked for flight ${booking.flightNumber}.`
          );
  
        return [`${criteria.charAt(0).toUpperCase() + criteria.slice(1)} bookings:`, ...bookingInfo].join('\n');
      } else {
        throw new Error("Invalid criteria. Use 'all', 'cheap', or 'expensive'.");
      }
    }
  }
  
  const system = new FlightBookingSystem("TravelWorld");
   console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));
   console.log(system.addFlight("BB202", "New York", "10:30 AM", 180));
   console.log(system.bookFlight("Alice", "AA101"));
   console.log(system.bookFlight("Bob", "BB202"));
   console.log(system.showBookings("expensive"));
   console.log(system.showBookings("cheap"));
  

