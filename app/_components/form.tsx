'use client';
import { useState, ChangeEvent, FormEvent, useRef } from 'react';
import dynamic from 'next/dynamic';
import Button from './button';
const Card = dynamic(() => import('./card'), { ssr: false });
import { FormDataProps } from '@/app/types/form'
import InputMask from 'react-input-mask';
import { z } from "zod"

const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'O nome deve ter pelo menos dois caracteres' }).refine(value => value.trim() !== '', { message: 'Nome é obrigatório' }),
    telefone: z.string().refine(value => value.trim() !== '', { message: 'Telefone é obrigatório' }),
    email: z.string().email({ message: 'E-mail inválido' }).refine(value => value.trim() !== '', { message: 'E-mail é obrigatório' }),
})

const Form = () => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const initialFormData: FormDataProps = {
        name: '',
        telefone: '',
        email: '',
    };

    const [formData, setFormData] = useState<FormDataProps>(initialFormData);
    const [showForm, setShowForm] = useState(true);

    const validationResult = contactFormSchema.safeParse(formData);

    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value || '',
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (!validationResult.success) {
            const nameError = validationResult.error.errors.find((error) => error.path[0] === 'name');
            
            if (nameError) {
                console.error(nameError.message);
            }
            if (nameInputRef.current) {
                nameInputRef.current.focus();
            }

        } else {
            setShowForm(false);            
        }

    };

    const handleBackClick = () => {
        setFormData(initialFormData);
        setShowForm(true);
        
    };

    return ( 
        
        <>
            {showForm ? (
                
                <form onSubmit={handleSubmit} className="sm:w-[620px] grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label className="text-white font-nunito font-bold mb-4 text-sm">Nome*</label>
                        <div className="mt-2">
                            <input 
                                ref={nameInputRef}
                                type="text" 
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="nome@email.com"
                                name="name" 
                                id="name" 
                                className="block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label  className="text-white font-nunito font-bold mb-4 text-sm">Telefone</label>
                        <div className="mt-2">
                            <InputMask 
                                mask="(99) 9 9999-9999"
                                maskChar=""
                                type="text" 
                                name="telefone" 
                                id="telefone" 
                                placeholder="(00) 0 0000-0000"
                                className="block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6"
                                value={formData.telefone}
                                onChange={handleChange}
                                />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label  className="text-white font-nunito font-bold mb-4 text-sm">E-mail*</label>
                        <div className="mt-2">
                            <input 
                                
                                type="text" 
                                name="email" 
                                id="email"
                                placeholder="nome@email.com" 
                                className="block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6"
                                value={formData.email}
                                onChange={handleChange}
                                />
                        </div>
                    </div>
                    <div className="col-span-full text-gray-light-2x pt-4 font-nunito font-normal text-sm leading-5 w-full">
                        <ul className="list-disc pl-4">
                            <li>Ao preencher o formulário, concordo * em receber comunicações de acordo com meus interesses.</li>
                            <li>Ao informar meus dados, eu concordo com a <a href="https://legal.rdstation.com/pt/privacy-policy/" title="Política de Privacidade" target="_blank" rel="noopener noreferrer" className="font-nunito font-normal underline text-white hover:text-slate-200">Política de privacidade.</a></li>
                        </ul>
                        <p className="mt-5">* Você pode alterar suas permissões de comunicação a qualquer tempo.</p>
                    </div>
                    <div className="sm:col-span-full">
                        <Button width={100} height={48} size="large" text="Gerar Cartão Grátis" status="enabled" type="submit" />
                    </div>
                </form>
                
            ) : (
                <Card data={formData} onBackClick={handleBackClick} />
            )}
        </>
    );
}
 
export default Form;