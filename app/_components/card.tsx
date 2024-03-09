import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF, { jsPDFOptions } from 'jspdf';
import Logo from './logo';
import Button from './button';
import ArrowIcon from './arrow';
import ArrowBack from './arrow-back';
import { CardProps } from '@/app/types/card'

export function Card({ data, onBackClick }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [dataFom, setDataForm] = useState({
    name:  "",
    phone: "",
    email: "",
  });
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [disabled, setStatus] = useState(false);
  const [texto, setTexto] = useState('Baixar Cartão');

  

  const handleDownload = async () => {
    
    const cardElement = cardRef.current;

     if (cardElement && !isDownloading && !downloaded) {

      try {

        const canvas = await html2canvas(cardElement);
        const imgData = canvas.toDataURL('image/jpeg', 0.98);

        const cardWidth = 96.6; // Largura do cartão em milímetros
        const cardHeight = 44; // Altura do cartão em milímetros

        // Ajuste as dimensões para orientação horizontal
        const pdfWidth = cardWidth;
        const pdfHeight = cardHeight;

        const pdfOptions: jsPDFOptions = {
          unit: 'mm',
          format: [pdfWidth, pdfHeight], 
          orientation: 'landscape',
        };

        const pdf = new jsPDF(pdfOptions);

        const margin = 0; 

        pdf.addImage(imgData, 'JPEG', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
        pdf.save('cartao.pdf');

        setIsDownloading(true);
        setDownloaded(true);
        setStatus(true)
        setTexto('Cartão Baixado');

      } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
      } 
    }
  };

  const handleVoltarClick = () => {
    onBackClick(dataFom);
    setStatus(false)
    setTexto('Gerar Cartão');
  };


  return (
    <>
      <div className="flex flex-col justify-start">
        <button onClick={handleVoltarClick} className="hover:text-slate-200 font-nunito font-normal text-white text-sm2x sm:text-lg mb-5 flex items-center"><ArrowBack width={21} height={21} />Gere outro cartão</button>
        <div className="flex justify-center center flex-row items-center rounded-3xl bg-white sm:w-[100%] h-[159px] sm:h-[217px] pl-6 sm:pl-0 break-all mb-5" id="card" ref={cardRef}>
          <Logo width={70} height={60}  />
          <div className="flex flex-col justify-center sm:h-[130px] border-l-2 border-solid border-gray-light-3x ml-4 px-5 font-nunito font-normal text-sm2x sm:text-base">
            <p>{data?.name}</p>
            <p className="mt-5 mb-5">{data?.phone}</p>
            <p>{data?.email}</p>
          </div>
        </div>
        <Button width={100} height={48} onClick={handleDownload} 
        text={texto} status={disabled}
       />
        
        <a href="https://app.rdstation.com.br/signup" 
          className="text-white hover:text-slate-200 font-nunito font-extrabold text-sm2x sm:text-base uppercase w-full text-center mt-6 flex items-center center" 
          title="Fazer um teste grátis do rd station marketing" target="_blank" rel="noopener noreferrer" >
            Fazer um teste grátis do rd station marketing 
            <ArrowIcon width={25} height={24} className="ml-2" color="#FFF" />
        </a>
      </div>
    </>
  );
};
