import React, { useEffect, useContext } from 'react';
import { Context } from "../../store/context";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; 

export const Review = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams(); 

    useEffect(() => {
        actions.getReviews(id); 
    }, [id, actions]);

    const handleDeleteReview = async (reviewId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar comentario'
        }).then(async (result) => {
            if (result.isConfirmed) {
                actions.deleteReview(reviewId, id); // Llamar a la acción deleteReview del Flux
            }
        });
    };

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
                                                <small className="text-white">{new Date(review.date).toLocaleString()}</small>
                                                {store.user && store.user.id === review.user.id && ( 
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-danger btn-sm" 
                                                        onClick={() => handleDeleteReview(review.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                )}
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