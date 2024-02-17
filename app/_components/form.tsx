'use client';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import dynamic from 'next/dynamic';
import Button from './button';
const Card = dynamic(() => import('./card'), { ssr: false });
import InputMask from 'react-input-mask';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod" // validação do zod + hook form
import { isEmail } from "validator";

const formSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(11),
    email: z.string().email(),
})

type dataFormSchema = z.infer<typeof formSchema>

const Form = () => {
    const [dataFom, setDataForm] = useState<dataFormSchema>({
        name: "",
        phone: "",
        email: ""
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<dataFormSchema>({
        resolver: zodResolver(formSchema)
      })

    const [showForm, setShowForm] = useState(true);

   
    const onSubmit = (data: any) => {
        setDataForm(data)
        setShowForm(false);            
    }

    const handleBackClick = () => {
        setShowForm(true);
    };

    return ( 
        
        <>
            {showForm ? (
                
                <form onSubmit={handleSubmit(onSubmit)} className="sm:w-[620px] grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label className="text-white font-nunito font-bold mb-4 text-sm">Nome*</label>
                        <div className="mt-2">
                            <input 
                                {...register("name", { required: true })}
                                type="text" 
                                placeholder="nome@email.com"
                                className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.name ? 'border-2 border-red-500' : ''}`}/>
                                {errors.name && <span className="text-red-600 mt-1 flex font-medium">O campo nome é obrigatório.</span>}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label  className="text-white font-nunito font-bold mb-4 text-sm">Telefone</label>
                        <div className="mt-2">
                            <InputMask 
                                {...register("phone", { required: true })}
                                mask="(99) 9 9999-9999"
                                maskChar=""
                                type="text" 
                                placeholder="(00) 0 0000-0000"
                                className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors.phone ? 'border-2 border-red-500' : ''}`}/>
                                {errors.phone && <span className="text-red-600 mt-1 flex font-medium">O campo Telefone é obrigatório.</span>}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label  className="text-white font-nunito font-bold mb-4 text-sm">E-mail*</label>
                        <div className="mt-2">
                            <input 
                                {...register("email", { 
                                    required: true,
                                    validate: (value) => isEmail(value),                                 
                                })}
                                type="email" 
                                placeholder="nome@email.com" 
                                className={`block w-full px-2 h-9 font-nunito text-sm leading-5 placeholder:text-gray-light text-black sm:text-sm sm:leading-6 ${errors?.email && 'border-2 border-red-500' }`}
                                />
                                {errors?.email?.type === "invalid_string" && (
                                    <span className="text-red-600 mt-1 flex font-medium">O campo email é obrigatório.</span>
                                )}

                                {errors?.email?.type === "validate" && (
                                    <span className="text-red-600 mt-1 flex font-medium">Email is invalid.</span>
                                )}
                                

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
                
                <Card data={dataFom} onBackClick={handleBackClick} />
            )}
        </>
    );
}
 
export default Form;