export function getNextBus(buses: any[], route: string) {
  const now = new Date();

  const filtered = buses
    .filter(b => b.route_name === route)
    .sort((a, b) => a.departure_time.localeCompare(b.departure_time));

  return filtered.find(b => {
    const busTime = new Date(`1970-01-01T${b.departure_time}`);
    return busTime > now;
  });
}
