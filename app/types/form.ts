export type FormDataProps = {
    name: string;
    phone: string;
    email: string;
};

export type CardProps = {
    data: FormDataProps;  
    onBackClick: (formData: FormDataProps) => void;
};
