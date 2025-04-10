import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { IUser } from "../interfaces/Interfaces";
 
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
        const { name, value } = e.target;

        if (["streetName", "subdivision", "number"].includes(name)) {
            setData(prevData => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [name]: name === "number" ? parseInt(value) : value,
                }
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    const onSubmit = async () => {
        if (data.password !== confirmPass) {
            alert("No coinciden tus contraseñas")
            return
        }
        try {
            await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/add`, data)
            alert("Registro exitoso")
            history.push("/login")
        } catch (err: any) {
            alert("No pudismos levantar el registro")
        }
    }

    return (
        <>
            <div className="w-[100%] h-screen overflow-y-auto bg-gray-900 grid grid-cols-1 place-items-center py-10">
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
                        name="email"
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
                        name="numberPhone"
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