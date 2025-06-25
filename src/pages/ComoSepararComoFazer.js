import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ComoSepararComoFazer() {
    return (
        <>
            <Helmet>
                <title>Como Fazer a Separação? - Coleta Seletiva</title>
                <meta name="description" content="Aprenda como separar corretamente os resíduos recicláveis." />
            </Helmet>
            <main>
                <section id="como-fazer" className="info-section">
                    <div className="container">
                        <h2>
                            <FontAwesomeIcon icon={faTrash} />
                            Como fazer a separação?
                        </h2>
                        <p>
                            <p className="texto-destaque">
                                É muito fácil!
                            </p>
                        </p>
                        <p>
                            Separe os resíduos recicláveis, considerando o que for de papel, plástico, vidro e metal.
                        </p>
                        <p>
                            Enxágue as embalagens e as coloque no saco de ráfia ou reaproveite sacolas e caixas de papelão.
                            Depois, coloque na frente de sua casa/comércio, mas lembrando, é necessário que seja nos dias e
                            períodos específicos, para o caminhão da <strong>“Coleta Amiga”</strong> passar recolhendo esses
                            materiais, que são encaminhados para a Unidade de Valorização de Recicláveis do município.
                        </p>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/n9DEAh9c6vI" // Link corrigido para exemplo funcional
                            title="Vídeo do YouTube: Guia prático sobre como separar o lixo em casa"
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

export default ComoSepararComoFazer;