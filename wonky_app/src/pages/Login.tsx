import { useState } from "react";
import { useHistory } from "react-router";
// import Swal from "sweetalert2";
import axios from "axios";
 
const Login: React.FC = () => {
    const [data, setData] = useState({});
    const history = useHistory();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async () => {
        try {

            const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/login`, data);
            alert("Bienvenido de nuevo")

            const authToken = response.data.token;
            localStorage.setItem("authToken", authToken);
            history.push("/home",{ token: authToken })

        } catch (err: any) {
            alert("No se pudo iniciar la sesion")
        }
    };

    return (
        <div className="h-[100vh] bg-gray-900 flex flex-col justify-center items-center w-full space-y-6">
            <div className="w-full grid grid-cols-1 place-items-center space-y-4">
                <img src="../assets/logo.png" alt="logo" className="w-1/2 rounded-full" />
                <p className="font-semibold text-white">Bienvenido una vez más</p>
            </div>
            <div className="w-full grid grid-cols-1 place-items-center gap-4">
                <input type="email" name="email" id="email" onChange={onChange} placeholder="Email" className="w-4/5 bg-white border p-2 rounded-lg !text-black placeholder-gray-700" />
                <input type="password" name="password" id="password" onChange={onChange} placeholder="Contraseña" className="w-4/5 bg-white border p-2 rounded-lg !text-black placeholder-gray-700" />
                <button onClick={onSubmit} type="submit" className="w-4/5 bg-violet-600 border !p-3 !rounded-lg text-white font-semibold hover:bg-violet-500 transition-all duration-300">Iniciar Sesión</button>
                <p className="font-semibold text-white">¿No tienes cuenta? <a href="/register" className="hover:text-blue-200">Regístrate</a></p>
            </div>
        </div>
    );
};

export default Login;
