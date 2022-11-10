import React from "react";
import { CSSReset } from "../src/components/CSSReset";
import { ThemeProvider } from "styled-components";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorModeProvider";
import RegisterVideo from "../src/components/RegisterVideo";

// Arquivo reconhecido pelo Next.js como se fosse um index;
// Esse arquivo é carregado primeiro, antes de qualquer coisa;
// Por isso, temas globaispodem e devem ser definidos aqui;

// ThemeProvider é algo do styled-components para facilitar o uso de themas pela aplicação;
// ColorProvider criado para prover o state de light/dark;

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};

// Componente criado com o intuito de ter o contexto carregado, antes de chamar o ThemeProvider;
// para estabelecer a cores definidas;
function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={"light"}>
            {props.children}
        </ColorModeProvider>
    );
}

function MyApp({ Component, pageProps }) {
    const contexto = React.useContext(ColorModeContext);

    return (
        /* Utilizando o ThemeProvider, todos os styled-components irão receber o "theme" como Props.
            Basta, dentro de cada componente, puxar o valor dentro dos atributos: cor, background... */
        < ThemeProvider theme={theme[contexto.mode]} >
            <CSSReset />
            <Component {...pageProps} />
            <RegisterVideo />
        </ThemeProvider >
    );
}

// Criação dessa função, somente parar forçar a execução da ordem correta, ou seja
// ter o contexto carregado, antes de executar o compomente ThemeProvider para alterar os tema.
export default function _App(props) {

    return (
        <ProviderWrapper>
            <MyApp {...props} />
        </ProviderWrapper>
    );
};