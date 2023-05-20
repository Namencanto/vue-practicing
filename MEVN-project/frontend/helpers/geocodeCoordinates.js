export async function geocodeCoordinates(latitude, longitude) {
  console.log(latitude, longitude);
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lon=${latitude}&lat=${longitude}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const address = data.display_name;
    return address;
  } catch (error) {
    console.error("Error geocoding coordinates:", error);
    return null;
  }
}
