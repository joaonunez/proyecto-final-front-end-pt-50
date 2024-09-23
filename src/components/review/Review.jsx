import React, { useEffect, useContext } from 'react';
import { Context } from "../../store/context";
import { useParams } from 'react-router-dom';

export const Review = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams(); // obtenemos el ID del camping desde la URL

  useEffect(() => {
    actions.getReviews(id); // llamar a la acción para obtener los comentarios del camping específico
  }, [id]);

  return (
    <>
      {store.reviews.map(review => (

        <div className='review'>
          <div className="container mt-3">
            <div className="row">

              <div className="col-md-4" key={review.id}>
                <div className="card-comment">
                  <div className="card-body">
                    <h5 className="card-title">{review.user.first_name} {review.user.last_name}</h5>
                    <div className="rating">
                      {`Calificación: ${review.rating}`}
                    </div>
                    <p className="card-text">{review.comment}</p>
                    <small className="text-muted">{new Date(review.date).toLocaleString()}</small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      ))}


    </>

  );
};












