import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import Logo from './logo';
import Button from './button';
import ArrowIcon from './arrow';
import ArrowBack from './arrow-back';
import { FormDataProps } from '@/app/types/form'

type CardProps = {
  data?: FormDataProps;
  onBackClick: (formData: FormDataProps) => void;
};

const Card: React.FC<CardProps> = ({ data, onBackClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormDataProps>({
    name: data?.name || '',
    phone: data?.phone || '',
    email: data?.email || '',
  });
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);



  const handleDownload = async () => {
    const cardElement = cardRef.current;

     if (cardElement && !isDownloading && !downloaded) {

      try {
        const pdfOptions = {
          margin: 10,
          filename: 'cartao.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        await html2pdf().from(cardElement).set(pdfOptions).save();
        setIsDownloading(true);
        setDownloaded(true);

      } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
      } 
    }
  };

  const handleVoltarClick = () => {
    onBackClick(formData);
  };


  return (
    <>
      <div className="flex flex-col justify-start">
      <button onClick={handleVoltarClick} className="hover:text-slate-200 font-nunito font-normal text-white text-sm2x sm:text-lg mb-5 flex items-center"><ArrowBack width={21} height={21} />Gere outro cartão</button>
      <div className="flex justify-center center flex-row items-center rounded-3xl bg-white sm:w-[100%] h-[159px] sm:h-[217px] pl-6 sm:pl-0 break-all mb-5" id="card" ref={cardRef}>
        <Logo width={70} height={60} text={false} />
        <div className="flex flex-col justify-center sm:h-[130px] border-l-2 border-solid border-gray-light-3x ml-4 px-5 font-nunito font-normal text-sm2x sm:text-base">
          <p>{data?.name}</p>
          <p className="mt-5 mb-5">{data?.phone}</p>
          <p>{data?.email}</p>
        </div>
      </div>
      <Button width={100} height={48} size="medium" onClick={handleDownload} 
       text={downloaded ? "Cartão Baixado" : "Baixar Cartão"}
       disabled={isDownloading || downloaded}
       className={downloaded ? 'btn-rd-disabled' : 'btn-rd hover:bg-[#F8DCA0]'}  />
      
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

export default Card;
