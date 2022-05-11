import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface MyMapProps {
  lat: number;
  lon: number;
}

interface center {
  lat: number;
  lng: number;
}
function MyMap({ lat, lon }: MyMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY as any,
  });
  const containerStyle = {
    width: "300px",
    height: "300px",
  };

  const center: center = {
    lat: lat,
    lng: lon,
  };
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map: any) {
    map.setZoom(16);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <Marker
          position={center}
          icon={require("../images/FDPin.png")}
        ></Marker>
      </>
    </GoogleMap>
  ) : (
    <div key={map}></div>
  );
}

export default MyMap;
