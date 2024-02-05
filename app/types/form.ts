export type FormDataProps = {
    name: string;
    telefone: string;
    email: string;
};

export type CardProps = {
    data: FormDataProps;  
    onBackClick: (formData: FormDataProps) => void;
};
