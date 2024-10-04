import React from 'react';
import { useParams } from 'react-router-dom';
import FormEditCamping from '../../components/formularios/FormEditCamping';
import { Context } from '../../store/context';
import { useContext } from 'react';

export function EditCampingForm() {
  const { campingId } = useParams();
  const { store } = useContext(Context);

  // Obtener el providerId directamente del store
  const providerId = store.user?.id;

  return (
    <>
      <FormEditCamping campingId={campingId} providerId={providerId} />
    </>
  );
}

export default EditCampingForm;
