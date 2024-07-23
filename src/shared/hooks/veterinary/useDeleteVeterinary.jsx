import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteVeterinaryRequest } from '../../../services/api'

export const useDeleteVeterinary = () => {
  const [error, setError] = useState(null)

  const deleteVeterinary = async (id) => {
    try {
      const response = await deleteVeterinaryRequest(id)
      if (response.error) {
        setError('Error al eliminar el veterinario: ' + response.err.message)
        toast.error('Error al eliminar el veterinario')
        return false
      } else {
        toast.success('Veterinario eliminado correctamente')
        return true
      }
    } catch (error) {
      setError('Error al eliminar el veterinario: ' + error.message)
      toast.error('Error al eliminar el veterinario')
      return false
    }
  }
  return {
    deleteVeterinary, error, setError
  }
}