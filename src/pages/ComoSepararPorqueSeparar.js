// src/pages/ComoSepararPorqueSeparar.js

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Ícone 'faSeedling' trocado por 'faLeaf' para melhor alinhamento
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

function ComoSepararPorqueSeparar() {
    return (
        <>
            <Helmet>
                <title>Por que Separar os Resíduos? - Coleta Seletiva</title>
                <meta name="description" content="Descubra os benefícios de separar os resíduos recicláveis." />
            </Helmet>
            <main>
                <section id="porque-separar" className="info-section">
                    <div className="container">
                        <h2 className="titulo-multilinha">
                            <FontAwesomeIcon icon={faLeaf} />
                            POR QUE SEPARAR OS RESÍDUOS RECICLÁVEIS DOS ORGÂNICOS E REJEITOS?
                        </h2>
                        <p>
                            A separação poupa a natureza e traz mais qualidade de vida. O plástico usado, por exemplo, quando
                            reciclado se transforma em plástico novo. Isso também acontece com o papel, vidro e metal. Para se
                            ter uma ideia, cada 50 quilos de papel usado transformado em novo, evita que uma árvore seja
                            cortada. Imagine quantas árvores nós podemos salvar!
                        </p>
                        <p>
                            O descarte correto de resíduos e rejeitos também é muito importante para evitar diversos tipos de
                            prejuízo ao meio ambiente e até mesmo a nossa saúde, além de contribuir para a economia de recursos
                            naturais, como água e a energia.
                        </p>
                        <iframe
                            className="youtube-video"
                            src="https://www.youtube.com/embed/e2bnTHNV0Zw"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ComoSepararPorqueSeparar;
