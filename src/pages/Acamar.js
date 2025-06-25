// src/pages/Acamar.js

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// 1. A imagem da UVR é importada corretamente.
import uvrImg from '../assets/imagens/foto-acamar-uvr.jpg'; 

function Acamar() {
    return (
        <>
            <Helmet>
                <title>Quem Somos - Coleta Seletiva</title>
                <meta name="description" content="Conheça o Programa Coleta Amiga, a ACAMAR e o destino dos recicláveis em Assis Chateaubriand." />
            </Helmet>
            <main>
                <section id="quem-somos" className="info-section">
                    <div className="container">
                        <h2>
                            <FontAwesomeIcon icon={faUsers} />
                            Quem Somos
                        </h2>

                        {/* --- Seção 1: Coleta Amiga --- */}
                        <h3>O que é o Programa Coleta Amiga?</h3>
                        <p>
                            O Programa Coleta Amiga foi instituído através da <a href="#" target="_blank" rel="noopener noreferrer">Lei Municipal n° 3250 em 03 de maio de 2022</a>. Seus principais objetivos são:
                        </p>
                        <ul className="objetivos-lista">
                            <li>
                                <FontAwesomeIcon icon={faCheckCircle} className="lista-icone" />
                                <span>Regularizar a Coleta Seletiva de Resíduos Sólidos Recicláveis do Município;</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheckCircle} className="lista-icone" />
                                <span>Valorizar os constantes investimentos realizados na Unidade de Valorização de Recicláveis – UVR;</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheckCircle} className="lista-icone" />
                                <span>Desenvolver medidas em defesa do Meio Ambiente, articulando-as com planos e políticas em níveis nacional, estadual e municipal;</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheckCircle} className="lista-icone" />
                                <span>Estimular a geração de emprego e receita, em especial, para famílias de baixa renda.</span>
                            </li>
                        </ul>
                        <p>
                            É oportuno ressaltar que a legislação também impulsiona ações de educação ambiental formal e informal específicas sobre resíduos sólidos recicláveis.
                        </p>

                        {/* --- Seção 2: ACAMAR --- */}
                        <h3>O que é a ACAMAR?</h3>
                        <p>
                            A ACAMAR é a <strong>Associação dos Catadores de Materiais Recicláveis de Assis Chateaubriand - PR</strong>, fundada em 10 de outubro de 2001. Ela é considerada uma Entidade de Utilidade Pública, conforme a <a href="#" target="_blank" rel="noopener noreferrer">Lei Municipal n° 3.217 de 23 de abril de 2020</a>.
                        </p>
                        <p>
                            Constituída por associados catadores, o trabalho da ACAMAR resulta em benefícios sociais, ambientais e econômicos significativos para o município. Isso se deve ao gradativo aumento do material separado pela população e aos constantes investimentos realizados pelo Município de Assis Chateaubriand, Itaipu Binacional, InPAR, entre outros parceiros.
                        </p>

                        {/* --- Seção 3: Destino dos Recicláveis --- */}
                        <h3>Qual o local de destino dos recicláveis?</h3>
                        <p>
                            Todo material previamente separado pela população e recolhido com auxílio dos caminhões da Coleta Amiga é encaminhado para a <strong>Unidade de Valorização de Recicláveis (UVR)</strong>. Atualmente, é o único local em Assis Chateaubriand dedicado ao aprimoramento da gestão de resíduos recicláveis.
                        </p>
                        <p>
                            Neste local, a Associação de Catadores de Materiais Recicláveis (ACAMAR) realiza a triagem, prensagem e disponibilização dos recicláveis para as indústrias, que irão transformar esses materiais em novos produtos de consumo.
                        </p>

                        {/* 2. Imagem da UVR posicionada no final de todo o conteúdo. */}
                        <img src={uvrImg} alt="Unidade de Valorização de Recicláveis (UVR) com catadores trabalhando" />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Acamar;
