import React from "react";
import { StyledRegisterVideo } from "./styles";

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(true);
    const [values, setValues] = React.useState({ titulo: "", url: "" });

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* {Operador de Curto-circuito} */}
            {formVisivel && (
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    setValues({
                        titulo: "",
                        url: "",
                    })
                    setFormVisivel(false)
                    console.log("aquiasdasd")
                }}>
                    <div>
                        <button className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Título do vídeo"
                            value={values.titulo}
                            onChange={(evento) => {
                                const value = evento.target.value;
                                setValues({
                                    ...values,
                                    titulo: value,
                                });
                            }} />
                        <input
                            placeholder="URL"
                            value={values.url}
                            onChange={(evento) => {
                                const value = evento.target.value;
                                setValues({
                                    ...values,
                                    url: value,
                                });
                            }} />
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            )
            }
        </StyledRegisterVideo >
    );
};