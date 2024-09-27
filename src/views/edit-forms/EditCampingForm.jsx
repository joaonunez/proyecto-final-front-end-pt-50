import React from 'react'
import { useParams } from 'react-router-dom'
import FormEditCamping from '../../components/formularios/FormEditCamping'

export function EditCampingForm() {
  const { campingId } = useParams()
  return (
    <>
      < FormEditCamping id={campingId} />
    </>
  )
}
