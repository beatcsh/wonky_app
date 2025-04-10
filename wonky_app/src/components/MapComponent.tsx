import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { Zone } from '../interfaces/Interfaces';

const mapContainerStyle = {
    width: '90%',
    height: '300px',
    borderRadius: '15%',
};

const center = {
    lat: 21.9311352,
    lng: -102.2662378,
};

const MapComponent: React.FC = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    });

    const dangerIcons: { [key: string]: string } = {
        low: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        medium: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        high: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        default: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
    };

    const [zones, setZones] = useState<Zone[]>([]);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    useEffect(() => {
        if (!isLoaded) return;
        const fetchDangerZones = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/zones/all`);
                if (response.status !== 200) {
                    throw new Error('Error al obtener zonas peligrosas');
                }
                const data = response.data;
                setZones(data);
            } catch (error) {
                alert("No pudimos obtener los reportes")
            }
        };
        fetchDangerZones();
    }, [isLoaded]);

    if (!isLoaded) return <div className="w-full h-[100vh] grid place-items-center"><span className="loading loading-infinity loading-lg"></span></div>;

    const nivelesTraducidos: { [key: string]: string } = {
        high: 'Alto',
        medium: 'Medio',
        low: 'Bajo',
    };


    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
        >
            {zones.map((zone, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: zone.location.coordinates[1],
                        lng: zone.location.coordinates[0],
                    }}
                    icon={dangerIcons[zone.danger_level] || dangerIcons.default}
                    onClick={() => setSelectedZone(zone)}
                />
            ))}
            {selectedZone && (
                <InfoWindow
                    position={{
                        lat: selectedZone.location.coordinates[1],
                        lng: selectedZone.location.coordinates[0],
                    }}
                    onCloseClick={() => setSelectedZone(null)}
                >
                    <div className='text-black pb-4 px-2'>
                        <h4 className={`font-bold ${selectedZone.danger_level === 'high'
                            ? 'text-red-600'
                            : selectedZone.danger_level === 'medium'
                                ? 'text-yellow-500'
                                : 'text-green-600'
                            }`}>
                            Nivel de Peligro: {nivelesTraducidos[selectedZone.danger_level]}
                        </h4>
                        <p style={{ margin: 0 }}>{selectedZone.description}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}

export default MapComponent;