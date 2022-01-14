
import React, { Fragment, useState } from 'react'


function Formularios() {
    const [lista, setLista] = useState([])
    const [Datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        ciudad: ''
    })

    const agregarUsuario = (event) => {

        setDatos({
            ...Datos,
            [event.target.name]: event.target.value
        })

    }


    const enviarDatos = (event) => {
        event.preventDefault();

        const nuevosDatos = {
            ...Datos,
            nombre: Datos.nombre,
            apellido: Datos.apellido,
            ciudad: Datos.ciudad
        }

        setLista([...lista, nuevosDatos])
    }


    return (
        <Fragment>
            <div>
                <h2 > Formulario</h2>
                <form className='row' onSubmit={enviarDatos} >
                    <div className='col-md-3 '>
                        <input
                            className='control-form'
                            type='text'
                            placeholder='ingrese su nombre'
                            name='nombre'
                            onChange={agregarUsuario}
                        />
                    </div>
                    <div className='col-md-3 '>
                        <input
                            className='control-form'
                            type='text'
                            placeholder='ingrese su apellido'
                            name='apellido'
                            onChange={agregarUsuario}
                        />
                    </div>
                    <div className='col-md-3 '>
                        <input
                            className='control-form'
                            type='text'
                            placeholder='ciudad'
                            name='ciudad'
                            onChange={agregarUsuario}
                        />
                    </div>
                    <div className='col-md-3 '>
                        <button className='control-form btn btn-dark'
                            type='submit'> enviar</button>
                    </div>

                </form>

                <table className='table  mt-5'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Ciudad</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        lista.map((gente,index) => (
                            <tr key={index}>
                                <td>{gente.nombre}</td>
                                <td>{gente.apellido}</td>
                                <td>{gente.ciudad}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

        </Fragment>
    )
}

export default Formularios
