import { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

interface IUser {
    name: String,
    apePat: String,
    apeMat: String,
    email: String,
    password: String,
    numberPhone: String,
    address: Object
}

const Register: React.FC = () => {

    const history = useHistory();

    const [data, setData] = useState<IUser>({
        name: "",
        apePat: "",
        apeMat: "",
        email: "",
        password: "",
        numberPhone: "",
        address: {
            streetName: "",
            subdivision: "",
            number: 0
        }
    })
    const [confirmPass, setConfirmPass] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data_temp: any = data;
        data_temp[e.target.name] = e.target.value;
        setData(data_temp);
    }

    const onSubmit = async () => {
        if (data.password !== confirmPass) {
            Swal.fire("Error", "Tus contraseñas no coinciden", "error");
            return
        }
        try {
            console.log(data);
            Swal.fire("Enviando datos");
            Swal.showLoading();
            await axios.post("http://localhost:5000/users/add", data)
            Swal.fire("Si funciona el register", "funciono", "success")
            history.push("/")
        } catch (err: any) {
            Swal.fire("Error al iniciar sesion", err.response.data.msg, "error")
        }
    }

    return (
        <>
            <div className="w-[100%] h-screen overflow-y-auto bg-gray-900 grid grid-cols-1 place-items-center py-10">
                {/* aqui iria el de emergencia */}
                <h2 className="font-bold">Ingresa tus datos</h2>
                <div className="w-[100%] grid place-items-center">
                    <input
                        type="text"
                        name="name"
                        onChange={onChange}
                        placeholder="Nombre(s)"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="text"
                        name="apePat"
                        onChange={onChange}
                        placeholder="Apellido Paterno"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="text"
                        name="apeMat"
                        onChange={onChange}
                        placeholder="Apellido Materno"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="email"
                        name="name"
                        onChange={onChange}
                        placeholder="Email"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        placeholder="Contraseña"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="password"
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="Confirmar Contraseña"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="text"
                        onChange={onChange}
                        placeholder="Telefono"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <h3 className="!font-semibold">Direccion</h3>
                    <input
                        type="text"
                        name="streetName"
                        onChange={onChange}
                        placeholder="Nombre de la calle"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="text"
                        name="subdivision"
                        onChange={onChange}
                        placeholder="Fraccionamiento"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <input
                        type="number"
                        name="number"
                        onChange={onChange}
                        placeholder="Numero"
                        className="!my-3 w-[80%] h-[50px] !rounded-lg bg-white border p-2 !text-black placeholder-gray-700"
                    />
                    <button
                        className="btn bg-blue-800 text-white font-bold w-[80%] h-[50px] !rounded-lg"
                        onClick={() => onSubmit()}
                    >
                        Crear Cuenta
                    </button>
                </div>
            </div>
        </>
    )
};

export default Register;