import React, { useState } from 'react';
import axios from 'axios';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { props } from '../interfaces/Interfaces';

const mapContainerStyle = {
    width: '90%',
    height: '280px',
    borderRadius: '15px',
};

const center = {
    lat: 21.9311352,
    lng: -102.2662378,
};
 
const Report: React.FC<props> = ({ _id }) => {

    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [danger_level, setDangerLevel] = useState<string>('low');
    const [description, setDescription] = useState<string>('');
    const user_id = _id


    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setSelectedLocation({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });
        }
    };

    const handleSubmit = async () => {
        if (selectedLocation) {

            if (!danger_level || !description || !selectedLocation) {
                alert("Por favor completa todos los campos");
                return;
            }

            const zoneData = {
                location: {
                    coordinates: [selectedLocation.lng, selectedLocation.lat],
                },
                danger_level,
                description,
                user_id
            };

            try {
                console.log(zoneData)
                const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/zones/add`, zoneData);
                if (response) alert("Se levanto el reporte");
                // Reset form
                setDangerLevel('');
                setDescription('');
                setSelectedLocation(null);
            } catch (error) {
                alert("No se leanto el reporte de forma correcta");
            }
        }
    };

    return (
        <div className='w-[100%] h-screen overflow-y-auto flex flex-col place-items-center'>
            <h1 className='p-4 text-2xl font-semibold'>Reportar Zona</h1>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                onClick={handleMapClick}
            >
                {selectedLocation && (
                    <Marker
                        position={selectedLocation}
                    />
                )}
            </GoogleMap>
            <div className='grid place-items-center my-6'>
                <select
                    onChange={e => setDangerLevel(e.target.value)}
                    value={danger_level}
                    className="w-[90%] bg-fondogris rounded-xl my-2 border-1 p-1"
                >
                    <option disabled selected>Nivel de Peligro</option>
                    <option value="low">Bajo</option>
                    <option value="medium">Medio</option>
                    <option value="high">Alto</option>
                </select>

                <input
                    type="text"
                    placeholder="Descripción"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-[90%] !my-2 border-1 rounded-xl p-1 bg-fondogris text-white"
                />
                <button onClick={handleSubmit} className="bg-blue-800 text-white font-bold w-[90%] !p-2 !rounded-xl m-2">Agregar Zona</button>
            </div>
        </div>
    );
};

export default Report;