import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateVetRequest } from '../../../services/api'

export const useUpdateVet = () => {
    const [updateVet, setUpdateVet] = useState(null)

    const updatedVet = async (id, vetData) => {
        const response = await updateVetRequest(id, vetData)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar el veterinario'
            )
        }
        setUpdateVet(response.data)
        toast.success('Veterinario actualizado correctamente')
    }
    return {
        updateVet,
        isFetching: !updatedVet,
        updatedVet
    }
}