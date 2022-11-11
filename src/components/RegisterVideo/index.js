import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://xldpmfurahqzbdbqqzao.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZHBtZnVyYWhxemJkYnFxemFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzI2MjYsImV4cCI6MTk4Mzc0ODYyNn0.6raT1OcRUKTdu4Im4tDxnx34w-NyBZh8cBZwTORigqw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
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

                    supabase.from("video").insert({
                        title: values.titulo,
                        url: values.url,
                        thumb: "testeAluraTube",
                        playlist: "jogos",
                    })
                        .then((oqueveio) => {
                            console.log(oqueveio)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    setValues({
                        titulo: "",
                        url: "",
                    })
                    setFormVisivel(false)
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