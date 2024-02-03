// Card.tsx
import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

interface CardProps {
  data: {
    nome: string;
    telefone: string;
    email: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const cardElement = cardRef.current;

    if (cardElement) {
      const downloadButton = cardElement.querySelector(
        '.download-button'
      ) as HTMLButtonElement | null;

      // Oculta temporariamente o botão antes de gerar o PDF
      if (downloadButton) {
        downloadButton.style.display = 'none';
      }

      try {
        const pdfOptions = {
          margin: 10,
          filename: 'cartao.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        await html2pdf().from(cardElement).set(pdfOptions).save();
      } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
      } finally {
        // Restaura a visibilidade do botão após a conclusão do download
        if (downloadButton) {
          downloadButton.style.display = 'block';
        }
      }
    }
  };

  return (
    <div className="card" id="card" ref={cardRef}>
      <h2>Dados do Usuário</h2>
      <p>
        <strong>Nome:</strong> {data.nome}
      </p>
      <p>
        <strong>Telefone:</strong> {data.telefone}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <button onClick={handleDownload} className="download-button">
        Baixar Cartão
      </button>
    </div>
  );
};

export default Card;
