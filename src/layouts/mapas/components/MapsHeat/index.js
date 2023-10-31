import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function MapHeat() {
  const [allDoencas, setAllDoencas] = useState([]);
  const [allPragas, setAllPragas] = useState([]); // State for fetching data from /pragas

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backendUrl}/doencas`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
      setAllDoencas(response.data);
      const responsePragas = await axios.get(`${backendUrl}/pragas`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-access-token": authToken,
        },
      });
      setAllPragas(responsePragas.data);
    } catch (error) {
      console.error("Error fetching doencas data:", error);
    }
  };

  const zoom = 8;
  const lat = -4.6079513;
  const lng = -39.1166524;

  useEffect(() => {
    const map = L.map("mapHeat").setView([lat, lng], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const overlayMaps = {
      
    }; // Create an empty object to hold overlay layers

    allDoencas.forEach((disease) => {
      const marker = L.circleMarker([disease.latitude, disease.longitude], {
        color: "green",
        radius: disease.valorCalculado * 5,
        weight: 1,
      }).addTo(map).bindPopup(disease.nome);

      if (!overlayMaps[disease.nome]) {
        overlayMaps[disease.nome] = new L.FeatureGroup();
      }

      overlayMaps[disease.nome].addLayer(marker);
    });

    allPragas.forEach((praga) => {
      const marker = L.circleMarker([praga.latitude, praga.longitude], {
        color: praga.nome === 'traca' ? 'red' : 'blue',
        radius: praga.valorCalculado/10,
        weight: 1,
      }).addTo(map).bindPopup(praga.nome);

      if (!overlayMaps[praga.nome]) {
        overlayMaps[praga.nome] = new L.FeatureGroup();
      }

      overlayMaps[praga.nome].addLayer(marker);
    });

    // Add overlay layers to the map
    L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

    // Cleanup the map instance when the component unmounts
    return () => {
      map.remove();
    };

  }, [allDoencas, allPragas]);

  return <div id="mapHeat" style={{ height: "75vh", width: "100%", padding: "10px" }} />;
}
