import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { addVeterinaryRequest } from '../../../services/api'

export const useAddVeterinary = () => {
  const [addVeterinary, setAddVeterinary] = useState(false)

  const registerVeterinary = async (veterinaryData) => {
    setAddVeterinary(true)
    try {
      const response = await addVeterinaryRequest(veterinaryData)
      if (response.error) {
        throw new Error(response.error)
      }
      toast.success('Veterinaria guardada correctamente')
    } catch (error) {
      toast.error('No se pudo guardar la veterinaria correctamente')
    } finally {
      setAddVeterinary(false)
    }
  }

  return {
    registerVeterinary,
    addVeterinary,
  }
}