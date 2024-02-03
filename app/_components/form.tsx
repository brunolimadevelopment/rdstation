'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const Card = dynamic(() => import('./card'), { ssr: false });

const Form = () => {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
      });
    
      const [showForm, setShowForm] = useState(true);
    
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e: any) => {
        e.preventDefault();
        setShowForm(false);
      };

    return ( 
        <div>
            {showForm ? (
                <>
                    <h1>Formulário React</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nome:
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className="input"
                            />
                        </label>
                        <br />
                        <label>
                            Telefone:
                            <input
                                type="tel"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                className="input"
                            />
                        </label>
                        <br />
                        <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                        />
                        </label>
                        <br />
                        <button type="submit">Enviar</button>
                    </form>
                </>
            ) : (
                <Card data={formData} />
            )}
        </div>
    );
}
 
export default Form;