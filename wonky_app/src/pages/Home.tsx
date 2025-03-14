import { IonTabButton } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Map from '../layouts/Map';

const Home: React.FC = () => {

  const layouts: Record<string, JSX.Element> = {
    mapa: <Map/>,
    report: <p className='text-2xl'>andale</p>,
    chat: <p className='text-2xl'>zero miedo</p>
  }

  const [currentComponent, setCurrentComponent] = useState<keyof typeof layouts>("mapa");

  const history = useHistory();

  return (
    <>
      <div className='w-[100%] h-[100vh] text-black bg-gray-900 relative'>
        <nav className='w-[100%] h-[10vh] border-b-2 border-gray-600 py-3 px-5 flex place-items-center justify-between'>
          <a href="/logout"><i className='bx bx-chevron-left text-4xl text-white'></i></a>
          <img src='../assets/logo.png' alt='avatar' className='w-[50px] rounded-full' />
        </nav>

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
          <IonTabButton className='font-semibold join-item btn bg-gray-900 border-0' tab="chat" onClick={() => setCurrentComponent("chat")}>
            <i className='bx bx-chat text-3xl !text-white'></i>
          </IonTabButton>
        </footer>
      </div>
    </>
  );
};

export default Home;
