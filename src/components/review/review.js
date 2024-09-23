import React, { useEffect, useContext } from 'react';
import { Context } from "../../store/context";

export const Review = ({ campingId }) => { 
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.user) {
      actions.getReviews(campingId); 
    }
  }, [store.user, actions, campingId]);

  return (
    <div className='review'>
      <div className="container mt-3">
        <div className="row">
          {store.reviews.map(review => (
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
          ))}
        </div>
      </div>
    </div>
  );
};