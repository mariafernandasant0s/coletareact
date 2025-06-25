import React from 'react';
import { Helmet } from 'react-helmet-async';

function Contato() {
    return (
        <>
            <Helmet>
                <title>Contato - Coleta Seletiva</title>
                <meta name="description" content="Entre em contato com a Secretaria de Meio Ambiente e a ACAMAR." />
            </Helmet>
            <main>
                <section id="contato-info" className="info-section">
                    <div className="container">
                        <h2>Entre em Contato</h2>
                        <p>
                            Tem dúvidas sobre a coleta seletiva, horários, separação de materiais ou gostaria de fazer
                            uma sugestão ou reclamação? Utilize os canais abaixo:
                        </p>

                        <div style={{ marginTop: '30px', lineHeight: '2' }}>
                            <h3>Secretaria de Meio Ambiente / Coleta Amiga:</h3>
                            <p><i className="fas fa-phone fa-fw"></i> <strong>Telefone:</strong> (44) 3528-XXXX (Adicione o número correto)</p>
                            <p><i className="fas fa-envelope fa-fw"></i> <strong>Email:</strong> meioambiente@assischateaubriand.pr.gov.br (Confirme o email)</p>
                            <p><i className="fas fa-map-marker-alt fa-fw"></i> <strong>Endereço:</strong> (Adicione o endereço se aplicável)</p>
                            <p><i className="fab fa-whatsapp fa-fw"></i> <strong>WhatsApp:</strong> (44) 9XXXX-XXXX (Adicione se houver)</p>

                            <h3 style={{ marginTop: '30px' }}>ACAMAR (Associação de Catadores):</h3>
                            <p><i className="fas fa-phone fa-fw"></i> <strong>Telefone:</strong> (44) XXXX-XXXX (Adicione o número correto)</p>
                            <p><i className="fab fa-instagram fa-fw"></i> <strong>Instagram:</strong> <a href="https://www.instagram.com/uvr_assis/" target="_blank" rel="noopener noreferrer">@uvr_assis</a></p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Contato;