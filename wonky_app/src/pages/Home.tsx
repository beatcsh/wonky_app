import { IonTabButton } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Map from '../layouts/Map';
import axios from 'axios';
import Report from '../layouts/Report';
import Header from '../components/Header';
import AddContact from '../layouts/AddContact';
import { useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import { LocationStorage, decodedToken, props } from '../interfaces/Interfaces';

const Home: React.FC = () => {

  const location = useLocation<LocationStorage>();

  const token = location.state?.token || localStorage.getItem("authToken");

  let userId = '0'

  if (token) {
    const decodedToken: decodedToken = jwtDecode(token);
    userId = decodedToken._id;
  }

  const layouts: Record<string, JSX.Element> = {
    mapa: <Map _id={userId} />,
    report: <Report _id={userId} />,
    add_contact: <AddContact _id={userId} />
  }

  const [currentComponent, setCurrentComponent] = useState<keyof typeof layouts>("mapa");

  const history = useHistory();

  return (
    <>
      <div className='w-[100%] h-[100vh] text-black bg-gray-900 relative'>
        <Header />

        <div className='w-[100%] h-[82vh] bg-gray-900 text-white grid grid-cols-1 place-items-center'>
          {layouts[currentComponent]}
        </div>

        <footer className='absolute bottom-0 border-t-2 border-gray-600 w-[100%] h-[8vh] bg-gray-900 flex justify-between place-items-center mx-auto space-x-8 join'>
          <IonTabButton className='font-semibold join-item btn bg-gray-900 border-0' tab="logout" onClick={() => history.push('/start')}>
            <i className='bx bx-log-out text-3xl !text-white'></i>
          </IonTabButton>
          <IonTabButton className='font-semibold join-item btn bg-gray-900 border-0' tab="map" onClick={() => setCurrentComponent("mapa")}>
            <i className='bx bx-map-alt text-3xl !text-white' ></i>
          </IonTabButton>
          <IonTabButton className='font-semibold join-item btn bg-gray-900 border-0' tab="add-zone" onClick={() => setCurrentComponent("report")}>
            <i className='bx bx-current-location text-3xl !text-white'></i>
          </IonTabButton>
          <IonTabButton className='font-semibold join-item btn bg-gray-900 border-0' tab="chat" onClick={() => setCurrentComponent("add_contact")}>
            <i className='bx bx-user-plus text-3xl !text-white'></i>
          </IonTabButton>
        </footer>
      </div>
    </>
  );
};
 
export default Home;
