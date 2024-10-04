import React from "react";
import { Context } from "../../store/context";
import { useState, useEffect, useContext } from "react";

export function PostReview() {
    const { store, actions } = useContext(Context);
    
    
    const [reviewPost, setReviewPost] = useState({
        user_id: '',
        camping_id: '',
        comment: '',
        rating: ''
    });

    
    const handleOnChange = (e) => {
        setReviewPost({
            ...reviewPost,
            [e.target.name]: e.target.value,
        });
    };

    // Enviar el formulario
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await actions.postReviewForCamping(reviewPost); 
    };

    return (
        <div className="comentarios">
<div className="container-form-postReview">
            <h2 className="username-id-creating-review">Crea tu Comentario</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="review-form" style={{ maxWidth: "83rem"}}>
                    <label>Nombre de Usuario</label>
                    <input
                        type="text"
                        value={reviewPost.user_id}
                        name="user_id"
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="review-form" style={{ maxWidth: "83rem"}}>
                    <label>Nombre de Camping</label>
                    <input
                        type="text"
                        value={reviewPost.camping_id}
                        name="camping_id"
                        onChange={handleOnChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="review-form" style={{ maxWidth: "83rem"}}>
                    <label>Comentario:</label>
                    <textarea
                        value={reviewPost.comment}
                        name="comment"
                        onChange={handleOnChange}
                        className="form-control"
                        rows="3"
                        required
                    />
                </div>
                <div className="review-form">
                    <label className="form-label">Rating:</label>
                    <input
                        type="number"
                        value={reviewPost.rating}
                        name="rating"
                        onChange={handleOnChange}
                        className="rating-for-camping-reviewed mt-2"
                        min={1}
                        max={10}
                        required
                    />
                </div>
                <div className="review-form">
                    <button className="button-for-submit-review btn btn-warning" type="submit">
                        Añadir Comentario
                    </button>
                </div>
            </form>
        </div>      





        </div>
      
 
    );
}
