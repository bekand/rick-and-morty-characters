import { useLocation } from "react-router";

// render the search params into the DOM so we can assert on them after navigation
export function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location-probe">{location.pathname + location.search}</div>;
}
