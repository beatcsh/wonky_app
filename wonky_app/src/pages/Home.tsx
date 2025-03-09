import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Button } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Button className="text-4xl font-bold text-blue-400" variant="primary" size="lg">
          Large button
        </Button>
        <button className="btn btn-primary text-blue-200">Primary</button>
      </IonContent>
    </IonPage>
  );
};

export default Home;
