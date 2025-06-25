import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 1. O ícone 'faGears' foi trocado por 'faSprayCan'
import { faRecycle, faNewspaper, faBottleWater, faWineBottle, faSprayCan } from '@fortawesome/free-solid-svg-icons';

function ComoSepararResiduos() {
    return (
        <>
            <Helmet>
                <title>Quais São os Resíduos Recicláveis? - Coleta Seletiva</title>
                <meta name="description" content="Lista de resíduos recicláveis: papéis, plásticos, vidros e metais." />
            </Helmet>
            <main>
                <section id="quais-residuos" className="info-section">
                    <div className="container">
                        <h2>
                            <FontAwesomeIcon icon={faRecycle} />
                            Quais são os resíduos recicláveis?
                        </h2>
                        
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={faNewspaper} className="lista-icone" />
                                <span><strong>Papéis:</strong> papelão, embalagens cartonadas, caixas de ovos, cadernos usados, caixas de leite longa vida, jornais, revistas, entre outros.</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faBottleWater} className="lista-icone" />
                                <span><strong>Plásticos:</strong> garrafa pet, embalagens de detergente, amaciante, óleo de cozinha, álcool, tampas de plástico, pacotes em gerais, frascos de xampu, potinhos de iogurte, sacolas de supermercados, copos descartáveis, balde, PVC, entre outros.</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faWineBottle} className="lista-icone" />
                                <span><strong>Vidros:</strong> garrafas de bebida, potes de conserva, frascos de perfume, potes de geleia, entre outros.</span>
                            </li>
                            {/* 2. Ícone atualizado aqui */}
                            <li>
                                <FontAwesomeIcon icon={faSprayCan} className="lista-icone" />
                                <span><strong>Metais:</strong> latinhas de cerveja e refrigerante, latas de doces, leite em pó, azeite, latinhas de sardinha, arames, embalagens metálicas, latinhas de milho e ervilha, entre outros.</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ComoSepararResiduos;