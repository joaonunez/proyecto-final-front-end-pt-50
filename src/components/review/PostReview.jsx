import React from "react";
import { Context } from "../../store/context";
import { useState, useEffect, useContext } from "react";
import { StarFill, Star } from "react-bootstrap-icons";



export function PostReview() {
    const { store, actions } = useContext(Context);

    const [reviewPost, setReviewPost] = useState({
        user_id: store.user?.id || '',
        camping_id: store.selectedCamping?.id || '',
        comment: '',
        rating: 0
    });

    useEffect(() => {
        setReviewPost({
            ...reviewPost,
            user_id: store.user?.id || '',
            camping_id: store.selectedCamping?.id || ''
        });
    }, [store.user, store.selectedCamping]);


    const handleOnChange = (e) => {
        setReviewPost({
            ...reviewPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleStarClick = (ratingValue) => {
        setReviewPost({
            ...reviewPost,
            rating: ratingValue
        });
    }

    // Enviar el formulario
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await actions.postReviewForCamping(reviewPost);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 10; i++) {  
            stars.push(
                <span key={i} onClick={() => handleStarClick(i)} style={{ cursor: "pointer" }}>
                    {i <= reviewPost.rating ? (
                        <StarFill className="text-warning" size={30} /> 
                    ) : (
                        <Star className="text-warning" size={30} /> 
                    )}
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="comentarios">
            <div className="container-form-postReview">
                <h2 className="username-id-creating-review">Crea tu Comentario</h2>
                <form onSubmit={handleOnSubmit}>
                    {/* Campo para el comentario */}
                    <div className="review-form" style={{ maxWidth: "83rem" }}>
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

                    {/* Rating con estrellas */}
                    <div className="review-form">
                        <label className="form-label">Calificanos:</label>
                        <div>{renderStars()}</div> {/* Renderizamos las estrellas */}
                    </div>

                    {/* Botón para enviar la reseña */}
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
