import React from 'react';
import { Helmet } from 'react-helmet-async';
import graficoTotalColetado from '../assets/imagens/grafico-total-coletado.png';

function TotalColetado() {
    return (
        <>
            <Helmet>
                <title>Total Coletado - Coleta Seletiva</title>
                <meta name="description" content="Evolução do total de resíduos recicláveis coletados." />
            </Helmet>
            <main>
                <section id="evolucao-coleta" className="info-section">
                    <div className="container">
                        <h2>Evolução do Total Coletado</h2>
                        <img src={graficoTotalColetado} alt="Gráfico de barras mostrando a quantidade de material reciclável coletado." className="grafico-responsivo" />
                    </div>
                </section>
            </main>
        </>
    );
}

export default TotalColetado;