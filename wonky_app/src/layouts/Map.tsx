import BotonEmergencia from '../components/EmergencyButton';
import React, { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import { props } from '../interfaces/Interfaces';
import axios from 'axios';
 
const Map: React.FC<props> = ({ _id }) => {

    const [contacts, setContacts] = useState<any>([])

    useEffect(() => {
      const listContacts = async () => {
        try {
          const user = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/get-one`, {
            params: { _id: _id }
          })
          setContacts(user.data.emerContact)
        } catch (err: any) {
          console.log(err)
        }
      }
      listContacts();
    }, [])

    return (
        <div className="w-full my-3 flex flex-col place-items-center space-y-6 bg-fondogris">
            <h2 className="!text-2xl !font-semibold !mb-10">Mapa de reportes</h2>
            {<MapComponent />}
            <div className="w-[100%] grid place-items-center mt-4">
                <div className="w-[75px]">
                    <BotonEmergencia />
                </div>
            </div>
        </div>
    );
};

export default Map;
