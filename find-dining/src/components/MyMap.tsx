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
    googleMapsApiKey: "AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M",
  });
  const containerStyle = {
    width: "400px",
    height: "300px",
  };

  const center: center = {
    lat: lat,
    lng: lon,
  };
  const [map, setMap] = React.useState(null);
  console.log(map);
  const onLoad = React.useCallback(function callback(map: any) {
    map.setZoom(16);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  console.log(map);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker
          position={center}
          icon={require("../images/FDMenuLogocopy.png")}
        ></Marker>
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MyMap;
