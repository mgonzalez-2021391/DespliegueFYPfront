import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getVetsRequest } from '../../../services/api'

export const useGetAllVets = () => {
    const [getVets, setGetVets] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)

    const getAllVets = useCallback(async () => {
        setIsFetching(true)
        setError(null)
        try {
            const response = await getVetsRequest()
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener los veterinarios')
                setError(response.err)
            } else {
                console.log('Veterinarios obtenidos:', response.vets)
                setGetVets(response.vets)
            }
        } catch (error) {
            toast.error('Error al obtener los veterinarios')
            setError(error)
        } finally {
            setIsFetching(false)
        }
    }, [])

    return {
        getVets,
        isFetching,
        error,
        getAllVets
    }
}