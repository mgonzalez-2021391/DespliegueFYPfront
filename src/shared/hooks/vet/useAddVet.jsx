import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { addVetRequest } from '../../../services/api'

export const useAddVet = () => {
    const [addVet, setAddVet] = useState(false)

    const registerVet = async (vetData) => {
        setAddVet(true)
        try {
            const response = await addVetRequest(vetData)
            if (response.error) {
                throw new Error(response.error)
            }
            toast.success('Veterinario guardado correctamente')
        } catch (error) {
            toast.error('No se pudo guardar el veterinario correctamente')
        } finally {
            setAddVet(false)
        }
    }

    return {
        registerVet,
        addVet,
    }
}