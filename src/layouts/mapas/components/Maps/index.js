import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
import iconOidio from '../../../../assets/images/xOidio.png'
import iconBroca from '../../../../assets/images/xBroca.png'
import iconTraca from '../../../../assets/images/xTraca.png'
export default function MapHeat() {
  const [allDoencas, setAllDoencas] = useState([]);
  const [allPragas, setAllPragas] = useState([]); // State for fetching data from /pragas
 
  const oidioIcon = L.icon({
    iconUrl: iconOidio,
    iconSize: [10, 10],
  });
  const brocaIcon = L.icon({
    iconUrl: iconBroca,
    iconSize: [10, 10],
  });
  const tracaIcon = L.icon({
    iconUrl: iconTraca,
    iconSize: [10, 10],
  });
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
    
      const marker = L.marker([disease.latitude, disease.longitude], { icon: oidioIcon }).addTo(map).bindPopup("Oídio.");

      if (!overlayMaps[disease.nome]) {
        overlayMaps[disease.nome] = new L.FeatureGroup();
      }

      overlayMaps[disease.nome].addLayer(marker);
    });

    allPragas.forEach((disease) => {
    
      const marker = L.marker([disease.latitude, disease.longitude], { icon: disease.nome === 'traca' ? tracaIcon: brocaIcon }).addTo(map).bindPopup(disease.nome === 'traca' ? "Traça." : "Broca.");

      if (!overlayMaps[disease.nome]) {
        overlayMaps[disease.nome] = new L.FeatureGroup();
      }

      overlayMaps[disease.nome].addLayer(marker);
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
