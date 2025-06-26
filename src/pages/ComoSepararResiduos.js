import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faNewspaper, faBottleWater, faWineBottle, faSprayCan } from '@fortawesome/free-solid-svg-icons';

const materiaisReciclaveis = [
    {
        id: 'papeis',
        categoria: 'Papéis',
        icone: faNewspaper,
        itens: 'papelão, embalagens cartonadas, caixas de ovos, cadernos usados, caixas de leite longa vida, jornais, revistas, entre outros.'
    },
    {
        id: 'plasticos',
        categoria: 'Plásticos',
        icone: faBottleWater,
        itens: 'garrafa pet, embalagens de detergente, amaciante, óleo de cozinha, álcool, tampas de plástico, pacotes em gerais, frascos de xampu, potinhos de iogurte, sacolas de supermercados, copos descartáveis, balde, PVC, entre outros.'
    },
    {
        id: 'vidros',
        categoria: 'Vidros',
        icone: faWineBottle,
        itens: 'garrafas de bebida, potes de conserva, frascos de perfume, potes de geleia, entre outros.'
    },
    {
        id: 'metais',
        categoria: 'Metais',
        icone: faSprayCan,
        itens: 'latinhas de cerveja e refrigerante, latas de doces, leite em pó, azeite, latinhas de sardinha, arames, embalagens metálicas, latinhas de milho e ervilha, entre outros.'
    }
];

const categorias = ['Todos', 'Papéis', 'Plásticos', 'Vidros', 'Metais'];

function ComoSepararResiduos() {
    const [filtro, setFiltro] = useState('Todos');

    const resultadosFiltrados = filtro === 'Todos'
        ? materiaisReciclaveis
        : materiaisReciclaveis.filter(material => material.categoria === filtro);

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
                        
                        <p style={{textAlign: 'center', marginBottom: '15px'}}>Filtre por categoria:</p>

                        {/* ======================================================= */}
                        {/* 1. FILTRO PARA DESKTOP (BOTÕES)                        */}
                        {/* ======================================================= */}
                        <div className="filter-container-desktop">
                            {categorias.map(categoria => (
                                <button
                                    key={categoria}
                                    className={`filter-button ${filtro === categoria ? 'active' : ''}`}
                                    onClick={() => setFiltro(categoria)}
                                >
                                    {categoria}
                                </button>
                            ))}
                        </div>

                        {/* ======================================================= */}
                        {/* 2. FILTRO PARA CELULAR (MENU DE SELEÇÃO)                */}
                        {/* ======================================================= */}
                        <div className="filter-container-mobile">
                            <select 
                                className="category-select" 
                                value={filtro} 
                                onChange={(e) => setFiltro(e.target.value)}
                            >
                                {categorias.map(categoria => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* LISTA FILTRADA RENDERIZADA */}
                        <ul style={{marginTop: '40px'}}>
                            {resultadosFiltrados.map(material => (
                                <li key={material.id}>
                                    <FontAwesomeIcon icon={material.icone} className="lista-icone" />
                                    <span><strong>{material.categoria}:</strong> {material.itens}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ComoSepararResiduos;