import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

// Vite's bundling of Leaflet's default marker assets needs this manual fix —
// otherwise markers render as broken images (a well-known Leaflet+Vite quirk).
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// react-leaflet only applies `center`/`zoom`/`bounds` when the map first
// mounts — changing them on a later render does nothing. So this component
// must not be mounted until the caller has real data ready (see TrailDetail,
// which now waits for the route to load before rendering this at all);
// otherwise the map gets stuck at whatever view it opened with.
export default function TrailMap({
  trails,
  className = "h-full w-full",
  zoom = 3,
  route = null,
}) {
  const center = trails.length ? [40.601073, -99.494038] : [39.8283, -98.5795]; // fallback: geographic center of the contiguous US

  const bounds = route && route.length > 1 ? L.latLngBounds(route) : null;

  return (
    <div className={className}>
      <MapContainer
        {...(bounds
          ? { bounds, boundsOptions: { padding: [40, 40] } }
          : { center, zoom })}
        scrollWheelZoom={false}
        className="h-full w-full rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {route && (
          <>
            <Polyline
              positions={route}
              pathOptions={{
                color: "#B5562A",
                weight: 4,
                opacity: 0.85,
                lineCap: "round",
              }}
            />
            {/* Distinct start marker — a filled circle rather than the
                generic pin, so the trailhead reads clearly against the route
                line instead of blending in with it. */}
            <CircleMarker
              center={route[0]}
              radius={9}
              pathOptions={{
                color: "#1F3A2E",
                weight: 3,
                fillColor: "#4B7455",
                fillOpacity: 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} permanent={false}>
                Start
              </Tooltip>
              <Popup>Trailhead — Start</Popup>
            </CircleMarker>
          </>
        )}

        {/* Home page's multi-trail pins — skipped when a single route is
            being shown, since the start marker above already covers it. */}
        {!route &&
          trails.map((trail) => (
            <Marker
              key={trail.id}
              position={[trail.lat, trail.lng]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="font-body">
                  <p className="font-semibold text-pine-700">{trail.name}</p>
                  <p className="text-xs text-pine-700/70">
                    {trail.nationalPark}, {trail.state}
                  </p>
                  <p className="mt-1 text-xs">
                    {trail.distance} mi · {trail.elevationGain} ft gain ·{" "}
                    {trail.difficulty}
                  </p>
                  <Link
                    to={`/trails/${trail.id}`}
                    className="mt-2 inline-block text-xs font-medium text-moss-600 underline"
                  >
                    View details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
