import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

// Vite's bundling of Leaflet's default marker assets needs this manual fix —
// otherwise markers render as broken images (a well-known Leaflet+Vite quirk).
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function TrailMap({ trails, className = 'h-full w-full', zoom = 4, route = null }) {
  const center = trails.length
    ? [trails[0].lat, trails[0].lng]
    : [39.8283, -98.5795] // fallback: geographic center of the contiguous US

  const bounds = route && route.length > 1 ? L.latLngBounds(route) : null

  return (
    <div className={className}>
      <MapContainer
        {...(bounds ? { bounds, boundsOptions: { padding: [28, 28] } } : { center, zoom })}
        scrollWheelZoom={false}
        className="h-full w-full rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {route && (
          <Polyline
            positions={route}
            pathOptions={{ color: '#B5562A', weight: 4, opacity: 0.85, lineCap: 'round' }}
          />
        )}

        {trails.map((trail) => (
          <Marker key={trail.id} position={[trail.lat, trail.lng]} icon={defaultIcon}>
            <Popup>
              <div className="font-body">
                <p className="font-semibold text-pine-700">{trail.name}</p>
                <p className="text-xs text-pine-700/70">
                  {trail.nationalPark}, {trail.state}
                </p>
                <p className="mt-1 text-xs">
                  {trail.distance} mi · {trail.elevationGain} ft gain · {trail.difficulty}
                </p>
                <Link to={`/trails/${trail.id}`} className="mt-2 inline-block text-xs font-medium text-moss-600 underline">
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
