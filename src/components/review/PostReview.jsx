import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/context"; 
import { StarFill, Star } from "react-bootstrap-icons";
import Swal from 'sweetalert2'; 

export function PostReview() {
    const { store, actions } = useContext(Context);
    const { id: campingId } = useParams(); 
    const navigate = useNavigate();  

    const [reviewPost, setReviewPost] = useState({
        user_id: store.user?.id || '',
        camping_id: campingId || '', 
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

    const handleStarClick = (ratingValue) => {
        setReviewPost({
            ...reviewPost,
            rating: ratingValue
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (reviewPost.comment.trim() === "" || reviewPost.rating === 0) {
            Swal.fire({
                icon: 'warning',
                title: '¡Campos incompletos!',
                text: 'Por favor, escribe un comentario y selecciona una calificación.',
            });
            return;
        }


        if (!store.user) {
            Swal.fire({
                icon: 'info',
                title: '¡Debes iniciar sesión!',
                text: 'Para poder crear un comentario, necesitas iniciar sesión en tu cuenta.',
                showCancelButton: true, 
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'No, quiero quedarme', 
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login'); 
                }
            });
            return; 
        }

        Swal.fire({
            title: 'Enviando comentario...',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false, 
            allowEscapeKey: false, 
        });

        try {
            const result = await actions.postReviewForCamping(reviewPost);

            if (result) { 
                Swal.fire({
                    icon: 'success',
                    title: '¡Comentario creado!',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Limpiar el formulario después de enviar
                setReviewPost({
                    ...reviewPost,
                    comment: "",
                    rating: 0
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear el comentario',
                    text: 'Por favor, inténtalo de nuevo.'
                });
            }
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el comentario',
                text: 'Por favor, inténtalo de nuevo.'
            });
        }

    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {  
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
                <form onSubmit={handleOnSubmit} className="review-form-container"> {/* Agregado className al form */}
                    <div className="form-group"> {/* Agregado className al div */}
                        <label htmlFor="comment">Comentario:</label> {/* Agregado htmlFor para conectar con el textarea */}
                        <textarea
                            id="comment"
                            value={reviewPost.comment}
                            name="comment"
                            onChange={handleOnChange}
                            className="form-control"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group"> {/* Agregado className al div */}
                        <label className="form-label">Calificanos:</label>
                        <div className="rating-stars-icons">{renderStars()}</div> 
                    </div>
                    <div className="form-group"> {/* Agregado className al div */}
                        <button className="button-for-submit-review btn btn-warning" type="submit">
                            Añadir Comentario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}