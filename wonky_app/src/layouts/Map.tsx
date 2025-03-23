import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import BotonEmergencia from '../components/BotonEmergencia';
import axios from 'axios';

const mapContainerStyle = {
    width: '90%',
    height: '300px',
    borderRadius: '15px',
};

const center = {
    lat: 21.9311352,
    lng: -102.2662378,
};

interface Zone {
    location: {
        coordinates: number[];
    };
    danger_level: string;
    description: string;
}

const Map: React.FC = () => {
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
        const fetchDangerZones = async () => {
            try {
                const response = await axios.get('http://localhost:4000/zones/all');
                if (response.status !== 200) {
                    throw new Error('Error al obtener zonas peligrosas');
                }
                const data = response.data;
                setZones(data);
            } catch (error) {
                console.error('Error al obtener las zonas:', error);
            }
        };
        fetchDangerZones();
    }, []);

    if (!isLoaded) return <div className="w-full h-[100vh] grid place-items-center"><span className="loading loading-infinity loading-lg"></span></div>;

    return (
        <div className="w-full my-3 flex flex-col place-items-center space-y-6 bg-fondogris">
            <h2 className="!text-2xl !font-semibold !mb-10">Mapa de reportes</h2>
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
                        <div>
                            <h4>Nivel de Peligro: {selectedZone.danger_level}</h4>
                            <p>{selectedZone.description}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            <div className="w-[100%] grid place-items-center mt-4">
                <div className="w-[75px]">
                    <BotonEmergencia />
                </div>
            </div>
        </div>
    );
};

export default Map;
