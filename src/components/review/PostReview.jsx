import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../store/context";
import { useParams, useNavigate } from "react-router-dom";
import { StarFill, Star } from "react-bootstrap-icons";

export function PostReview() {
    const { store, actions } = useContext(Context);
    const { id: campingId } = useParams();  // Obtenemos el camping_id desde la URL
    const navigate = useNavigate();         // Para redirigir si es necesario

    const [reviewPost, setReviewPost] = useState({
        user_id: store.user?.id || '',
        camping_id: campingId || '',  // Usamos el camping_id de la URL
        comment: '',
        rating: 0
    });

    useEffect(() => {
        setReviewPost({
            ...reviewPost,
            user_id: store.user?.id || '',
            camping_id: campingId || ''
        });
    }, [store.user, store.selectedCamping]);

    const handleOnChange = (e) => {
        setReviewPost({
            ...reviewPost,
            [e.target.name]: e.target.value,
        });
    };

    const handleRangeChange = (e) => {
        setReviewPost({
            ...reviewPost,
            rating: parseInt(e.target.value)  // Convertimos el valor del slider a número entero
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!reviewPost.comment || reviewPost.rating === 0) {
            alert("Por favor, asegúrate de agregar un comentario y una calificación.");
            return;
        }
        await actions.postReviewForCamping(reviewPost);
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

                    {/* Slider de calificación */}
                    <div className="review-form">
                        <label htmlFor="customRange2" className="form-label">Calificanos:</label>
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max="5"
                            step="1"
                            id="customRange2"
                            value={reviewPost.rating}
                            onChange={handleRangeChange}
                        />
                        <span>{reviewPost.rating} estrellas</span> {/* Mostramos la calificación seleccionada */}
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
