import { useEffect, useState } from "react"
import axios from 'axios'

const initialState = {
    name: '',
    username: '',
    phone: ''
}

export const FormularioAxios = () => {
    const [lista, setLista] = useState([])
    const [editando, setEditando] = useState(false)
    const [datos, setDatos] = useState(initialState)

    ///////////// GET ///////////////  read

    const getUsers = async () => {
        const gente = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(gente.data)
        setLista(gente.data)
    }

    ///////////// POST ///////////////  create

    const postUsers = async () => {
        const gente = await axios.post('https://jsonplaceholder.typicode.com/users', datos)
        setLista([...lista, gente.data])
    }

    ///////////// PUT /////////////// update

    const putUsers = async () => {
        const gente = await axios.put(`https://jsonplaceholder.typicode.com/users/${datos.id}`, datos)
        const newUser = lista.map(user => {
            if (user.id === gente.data.id) {
                user.name = gente.data.name
                user.username = gente.data.username
                user.phone = gente.data.phone
            }
            return user
        })
        setLista(newUser)

    }

     ///////////// DELETE /////////////// delete

    const deleteUser = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        const userFiltered = lista.filter(user => user.id !== id)
        setLista(userFiltered)

    }

    const handleCreateorEdit = (e) => {
        e.preventDefault()
        if (editando) {
            putUsers()
            setEditando(false)
        }
        else postUsers()
        setDatos(initialState)
    }

    const handleEdit = (user) => {
        setDatos(user)
        setEditando(true)
    }

    const elCambiazo = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div className="row id">
            <form className="formulario col-6 " onSubmit={handleCreateorEdit} >
                <div>
                    <input
                        className="form-control m-2 "
                        type="text"
                        placeholder="ingrese nombre"
                        name="name"
                        onChange={elCambiazo}
                        value={datos.name}

                    />
                </div>
                <div>
                    <input
                        className="form-control m-2"
                        type="text"
                        placeholder="ingrese su apodo"
                        name="username"
                        value={datos.username}
                        onChange={elCambiazo}
                    />
                </div>
                <div>
                    <input
                        className="form-control m-2"
                        type="text"
                        placeholder="telefono"
                        name="phone"
                        value={datos.phone}
                        onChange={elCambiazo}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-dark m-2 form-control">
                        {editando ? 'Editar' : 'Enviar'}
                    </button>
                </div>
            </form>

            <div className="tabla col-6">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th> Apodo</th>
                            <th>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lista.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.phone}</td>
                                    <td className="d-flex justify-content-between">
                                        <button onClick={() => handleEdit(user)} className="btn btn-dark mx-1"> <i className="fas fa-edit"></i></button>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-danger"> <i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}