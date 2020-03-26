import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident(event) {
        event.preventDefault()
        
        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')
        } catch (erro) {
            alert('Error when registering incident, try again.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Register new incident</h1>
                    <p>Describe the incident in detail to find a hero to solve this.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16}  color="#E02041" />
                        Back to home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Incident title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />

                    <input
                        placeholder="Value in R$"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}
