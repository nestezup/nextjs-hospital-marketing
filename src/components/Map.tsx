'use client'

/**
 * GOOGLE MAPS FRONTEND INTEGRATION - ESSENTIAL GUIDE
 *
 * USAGE FROM PARENT COMPONENT:
 * ======
 *
 * const mapRef = useRef<google.maps.Map | null>(null);
 *
 * <MapView
 *   initialCenter={{ lat: 40.7128, lng: -74.0060 }}
 *   initialZoom={15}
 *   onMapReady={(map) => {
 *     mapRef.current = map; // Store to control map from parent anytime, google map itself is in charge of the re-rendering, not react state.
 * </MapView>
 *
 * ======
 * Available Libraries and Core Features:
 * -------------------------------
 * 📍 MARKER (from `marker` library)
 * - Attaches to map using { map, position }
 * new google.maps.marker.AdvancedMarkerElement({
 *   map,
 *   position: { lat: 37.7749, lng: -122.4194 },
 *   title: "San Francisco",
 * });
 *
 * -------------------------------
 * 🏢 PLACES (from `places` library)
 * - Does not attach directly to map; use data with your map manually.
 * const place = new google.maps.places.Place({ id: PLACE_ID });
 * await place.fetchFields({ fields: ["displayName", "location"] });
 * map.setCenter(place.location);
 * new google.maps.marker.AdvancedMarkerElement({ map, position: place.location });
 *
 * -------------------------------
 * 🧭 GEOCODER (from `geocoding` library)
 * - Standalone service; manually apply results to map.
 * const geocoder = new google.maps.Geocoder();
 * geocoder.geocode({ address: "New York" }, (results, status) => {
 *   if (status === "OK" && results[0]) {
 *     map.setCenter(results[0].geometry.location);
 *     new google.maps.marker.AdvancedMarkerElement({
 *       map,
 *       position: results[0].geometry.location,
 *     });
 *   }
 * });
 *
 * -------------------------------
 * 📐 GEOMETRY (from `geometry` library)
 * - Pure utility functions; not attached to map.
 * const dist = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
 *
 * -------------------------------
 * 🛣️ ROUTES (from `routes` library)
 * - Combines DirectionsService (standalone) + DirectionsRenderer (map-attached)
 * const directionsService = new google.maps.DirectionsService();
 * const directionsRenderer = new google.maps.DirectionsRenderer({ map });
 * directionsService.route(
 *   { origin, destination, travelMode: "DRIVING" },
 *   (res, status) => status === "OK" && directionsRenderer.setDirections(res)
 * );
 *
 * -------------------------------
 * 🌦️ MAP LAYERS (attach directly to map)
 * - new google.maps.TrafficLayer().setMap(map);
 * - new google.maps.TransitLayer().setMap(map);
 * - new google.maps.BicyclingLayer().setMap(map);
 *
 * -------------------------------
 * ✅ SUMMARY
 * - “map-attached” → AdvancedMarkerElement, DirectionsRenderer, Layers.
 * - “standalone” → Geocoder, DirectionsService, DistanceMatrixService, ElevationService.
 * - “data-only” → Place, Geometry utilities.
 */

/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

const API_KEY = process.env.NEXT_PUBLIC_FORGE_API_KEY || '';
const FORGE_BASE_URL =
  process.env.NEXT_PUBLIC_FORGE_API_URL ||
  "https://forge.butterfly-effect.dev";
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;

function loadMapScript() {
  return new Promise((resolve, reject) => {
    // Avoid injecting multiple times
    const existing = document.querySelector<HTMLScriptElement>("script[data-google-maps]");
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve(null);
      existing.onload = () => resolve(null);
      existing.onerror = () => reject(new Error("Failed to load Google Maps script"));
      return;
    }

    const script = document.createElement("script");
    script.dataset.googleMaps = "true";
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve(null);
    };
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });
}

interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
}

export function MapView({
  className,
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 12,
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // If API key is missing, skip loading to avoid console errors and show a simple placeholder.
  const isApiConfigured = Boolean(API_KEY);

  const init = usePersistFn(async () => {
    if (!isApiConfigured) {
      setLoadError("지도 API 키가 설정되지 않았습니다.");
      return;
    }
    await loadMapScript();
    if (!mapContainer.current) {
      setLoadError("Map container not found");
      return;
    }
    map.current = new window.google.maps.Map(mapContainer.current, {
      zoom: initialZoom,
      center: initialCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true,
      mapId: "DEMO_MAP_ID",
    });
    if (onMapReady) {
      onMapReady(map.current);
    }
  });

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      setLoadError("Google Maps 로드를 실패했습니다.");
    });
  }, [init]);

  if (!isApiConfigured || loadError) {
    return (
      <div className={cn("w-full h-[320px] bg-muted/50 flex items-center justify-center text-sm text-muted-foreground rounded-xl border border-dashed border-border", className)}>
        지도는 상담 시 별도 안내드립니다.
      </div>
    );
  }

  return (
    <div ref={mapContainer} className={cn("w-full h-[500px]", className)} />
  );
}

export default function Map() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto">
            {/* 문의 정보 */}
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900 text-center">문의 정보</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">전화</h4>
                    <p className="text-gray-600">0504-401-5339</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">이메일</h4>
                    <div className="text-gray-600">
                      <p>docdoc7@naver.com</p>
                      <p>withwinbiz@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-xl">🔗</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">웹사이트</h4>
                    <a
                      href="https://withwinbiz.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                    >
                      withwinbiz.com
                    </a>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-6 mt-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💡</span>
                    <h4 className="font-semibold text-gray-900">참고</h4>
                  </div>
                  <p className="text-gray-600">
                    온라인 미팅으로 전국 어디서나 협업 가능합니다.
                  </p>
                </div>
              </div>
            </div>

            </div>
        </div>
      </div>
    </section>
  );
}
