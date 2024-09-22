import React from 'react'

const users = [
   {

      id: 1,
      name: "Juan Perez",
      description: "¡Un lugar increíble para acampar! La naturaleza es espectacular.",
      image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
   }
   ,
   {
      id: 2,
      name: "Juan Perez",
      description: "¡Un lugar increíble para acampar! La naturaleza es espectacular.",
      image: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
   }
]

export const Review = () => {
   return (
      <div className='review'>
         <div class="container mt-3">
            <div class="row">
               {
                  users.map(user => {
                     return (
                        <div class="col-md-4">
                           <div class="card-comment">
                              <div class="card-body d-flex">
                                 <img src={user.image} alt="Perfil" class="profile-pic me-3"
                                    style={{ width: "5rem", height: "5rem" }} />
                                 <div>
                                    <h5 class="card-title">{user.name}</h5>
                                    <div class="rating">
                                       muy buena
                                    </div>
                                    <p class="card-text">{user.description}</p>
                                    <small class="text-muted">Hace 2 horas</small>
                                 </div>
                              </div>

                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </div>
   )
}