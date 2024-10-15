import React, { useEffect, useContext } from 'react';
import { Context } from "../../store/context";
import { useParams, useNavigate } from 'react-router-dom';

export const Review = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams(); // obtenemos el ID del camping desde la URL
  
  useEffect(() => {
    actions.getReviews(id); // llamar a la acción para obtener los comentarios del camping específico
  }, [id]);
  

  return (
    <>
      {Array.isArray(store.reviews) && store.reviews.length > 0 ? (
        store.reviews.map(review => (
          <div className='review' key={review.id}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="card-comment">
                    <div className="card-body"> 
                      <h5 className="card-title">{review.user.first_name} {review.user.last_name}</h5>
                      <div className="d-flex justify-content-end">
                        <div className="rating">
                          {`Calificación: ${review.rating}`}
                        </div>
                      </div>
                      <div className="footer-info-review-card">
                      <p className="card-text">{review.comment}</p>
                      <small className="text-muted">{new Date(review.date).toLocaleString()}</small>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay comentarios disponibles.</p>
      )}
    </>
  );
};













