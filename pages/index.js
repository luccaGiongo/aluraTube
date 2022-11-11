import React from "react";
import { useState } from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = "https://xldpmfurahqzbdbqqzao.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZHBtZnVyYWhxemJkYnFxemFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzI2MjYsImV4cCI6MTk4Mzc0ODYyNn0.6raT1OcRUKTdu4Im4tDxnx34w-NyBZh8cBZwTORigqw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = useState("");
    const [playlists, setPlaylists] = React.useState({ "jogos": [] });

    // requisição para pegar os dados do banco;
    // assync e await já é feito por baixo dos panos automáticamente;
    // com *, estamos pegando todos os dados da tabela;
    React.useEffect(() => {
        supabase.from("video")
            .select("*")
            .then((dados) => {
                const novasPlaylists = { ...playlists };
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = [];
                    }
                    novasPlaylists[video.playlist].push(video);
                })
                setPlaylists({ ...playlists })
            })
    }, [])

    console.log("pronto playlist", playlists)

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${({ bg }) => bg});
    height: 400px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            {/* <img src="banner" /> */}
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...propriedades }) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(propriedades.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}