import { dataFormSchema } from "@/app/types/zod";

export type CardProps = {
    data?: dataFormSchema;
    onBackClick: (dataFom: dataFormSchema) => void;
}