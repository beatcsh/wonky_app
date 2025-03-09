import BotonEmergencia from "../components/BotonEmergencia";

const Start: React.FC = () => {
    return (
        <>
            <div className="h-[100vh] w-full bg-gray-900 flex flex-col justify-center place-items-center space-y-6">
                <div className="grid place-items-center w-[90%] space-y-8 my-3">
                    <p className="">Presiona el Icono en Caso de Emergencia (doble click para cancelar)</p>
                    <div className="w-[170px]">
                        <BotonEmergencia />
                    </div>
                    <h1 className="text-3xl font-bold">WonkyApp</h1>
                </div>
                <div className="w-full flex flex-row justify-center space-x-4 my-2">
                    <a href="/login"><button className="w-[125px] h-[35px] !rounded-xl font-bold mx-3 bg-blue-400 text-white">Iniciar Sesion</button></a>
                    <a href="/register"><button className="w-[125px] h-[35px] !rounded-xl font-bold mx-3 bg-blue-400 text-white">Crear Cuenta</button></a>
                </div>
            </div>
        </>
    )
};

export default Start;