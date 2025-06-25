import React from 'react';
import { Helmet } from 'react-helmet-async'; // Importe o Helmet
import fotoAcamarUvr from '../assets/imagens/foto-acamar-uvr.jpg';

function Acamar() {
  return (
    <>
      <Helmet>
        <title>Quem Somos - Coleta Seletiva</title>
        <meta name="description" content="Informações sobre o Programa Coleta Amiga e a ACAMAR." />
      </Helmet>
      <main>
        <div className="container page-title-container" style={{ paddingTop: '30px', textAlign: 'center' }}>
        </div>

        <section id="acamar-uvr-destino" className="info-section">
          <h2>O que é o Programa Coleta Amiga?</h2>
          <p>
            O Programa Coleta Amiga foi instituído através da <a href="http://leismunicipa.is/dnozx" target="_blank"
              rel="noopener noreferrer">Lei Municipal n° 3250 em 03 de maio de 2022</a>. Seus principais objetivos
            são:
          </p>
          <ul>
            <li>Regularizar a Coleta Seletiva de Resíduos Sólidos Recicláveis do Município;</li>
            <li>Valorizar os constantes investimentos realizados na Unidade de Valorização de Recicláveis – UVR;
            </li>
            <li>Desenvolver medidas em defesa do Meio Ambiente, articulando-as com planos e políticas em níveis
              nacional, estadual e municipal;</li>
            <li>Estimular a geração de emprego e receita, em especial, para famílias de baixa renda.</li>
          </ul>
          <p>
            É oportuno ressaltar que a legislação também impulsiona ações de educação
            ambiental formal e informal específicas sobre resíduos sólidos recicláveis.
          </p>


          <section id="sobre-acamar" className="info-section">
            <div className="container">
              <h2>O que é a ACAMAR?</h2>
              <p>
                A ACAMAR é a <strong>Associação dos Catadores de Materiais Recicláveis de Assis Chateaubriand -
                  PR</strong>,
                fundada em 10 de outubro de 2001. Ela é considerada uma Entidade de Utilidade
                Pública, conforme a <a href="http://leismunicipa.is/htnfz" target="_blank"
                  rel="noopener noreferrer">Lei Municipal n° 3.217 de 23 de abril de 2020</a>.
              </p>
              <p>
                Constituída por associados catadores, o trabalho da ACAMAR resulta em benefícios sociais,
                ambientais e econômicos significativos para o município. Isso se deve ao gradativo aumento do
                material separado pela população e aos constantes investimentos realizados pelo Município de
                Assis Chateaubriand, Itaipu Binacional, InPAR, entre outros parceiros.
              </p>
            </div>
          </section>

          <div className="container">
            <h2>Qual o local de destino dos recicláveis?</h2>
            <p>
              Todo material previamente separado pela população e recolhido com auxílio dos
              caminhões da Coleta Amiga é encaminhado para a <strong>Unidade de Valorização de
                Recicláveis (UVR)</strong>. Atualmente, é o único local em Assis Chateaubriand dedicado ao
              aprimoramento da gestão de resíduos recicláveis.
            </p>
            <p>
              Neste local, a <strong>Associação de Catadores de Materiais Recicláveis (ACAMAR)</strong> realiza a
              triagem, prensagem e disponibilização dos recicláveis para as indústrias, que irão transformar
              esses materiais em novos produtos de consumo.
            </p>
            <img src={fotoAcamarUvr}
              alt="Foto da fachada da Unidade de Valorização de Recicláveis (UVR) de Assis Chateaubriand."
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px', margin: '20px auto 30px auto' }} />
          </div>
        </section>

        <section id="programa-coleta-amiga" className="info-section">
          <div className="container">
          </div>
        </section>
      </main>
    </>
  );
}

export default Acamar;