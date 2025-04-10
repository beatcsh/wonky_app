import React, { useState, useEffect } from "react";
import axios from "axios";
import { props, contact } from "../interfaces/Interfaces";
 
const AddContact: React.FC<props> = ({ _id }) => {

    const [data, setData] = useState<contact>({
        name: "",
        email: "",
        numberPhone: 0
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data_temp: any = data;
        data_temp[e.target.name] = e.target.value;
        setData(data_temp)
    }

    const onSubmit = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_API_URL}/users/add-contact`, data, {
                params: { _id: _id }
            })
            alert("Se añadio el contacto de emergencia")
        } catch (err: any) {
            alert("No se puede añadir el contacto por ahora");
            console.log(err)
        }
    }

    return (
        <>
            <div className="w-[100%] h-screen overflow-y-auto py-10">
                <h2 className="mx-10 !mb-6">Añadir Contactos de Emergencia</h2>
                <div className="w-[100%] grid place-items-center gap-6">
                    <input type="text" name="name" id="name" onChange={onChange} placeholder="Nombre" className="w-4/5 h-[50px] bg-white border p-2 rounded-lg !text-black placeholder-gray-700" />
                    <input type="email" name="email" id="email" onChange={onChange} placeholder="Email" className="w-4/5 h-[50px] bg-white border p-2 rounded-lg !text-black placeholder-gray-700" />
                    <input type="number" name="numberPhone" id="numberPhone" onChange={onChange} placeholder="Telefono" className="w-4/5 h-[50px] bg-white border p-2 rounded-lg !text-black placeholder-gray-700" />
                    <button
                        className="btn bg-blue-800 text-white font-bold w-[80%] h-[50px] !rounded-xl"
                        onClick={() => onSubmit()} >
                        Añadir Contacto +
                    </button>
                    <div className="px-10 text-justify">
                        <p>Las autoridades correspondientes se pondran en contacto con las personas  que añadas, proporciona datos reales, por favor.</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddContact;