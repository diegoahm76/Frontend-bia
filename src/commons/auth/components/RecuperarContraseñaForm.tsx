

import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from '../../../api/axios';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperacionContraseña:  React.FC = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit: handle_submit ,
    formState: { errors },
  } = useForm<{ email: string }>({ defaultValues: { email: "" } });

  const on_submit_recovery_password: SubmitHandler<{ email: string }> = async (data: { email: string }) => {
    const body_axios = {
      email: data.email,
      redirect_url: process.env.NODE_ENV === "production" ? "https://macareniafrontdevelop.netlify.app//#/actualizar-contrasena" : "http://localhost:3000/#/actualizar-contrasena",
    };
    const { data: data_recovery_password } = await api.post(
      "users/request-reset-email/",
      body_axios
    );
    void Swal.fire({
      position: "center",
      icon: "info",
      title: data_recovery_password?.detail,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundColor: "rgb(4,47,74)",
      }}
     >
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <h3 className="mt-4 mb-0 text-center mb-2">
                Recuperar contraseña
              </h3>
              <div className="card-body">
                <form
                  className="text-start"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={handle_submit(on_submit_recovery_password)}
                >
                  <label>
                    Escriba el correo electronico relacionado a su usuario para
                    recuperar su contraseña
                  </label>
                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control border rounded-pill px-3"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value: /^\w+([\\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Escriba un correo válido",
                        },
                      })}
                    />
                  </div>
                  {(Boolean(errors.email)) && (
                    <small className="text-danger">
                      {errors.email?.message}
                    </small>
                  )}

                  <div className="text-center mt-4">
                    <button
                      className="mb-0 btn-image text-capitalize d-block ms-auto bg-white border boder-none"
                      type="submit"
                    >
                      {/* <img src={boton_registrarse} alt="" title="Validar" /> */}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};