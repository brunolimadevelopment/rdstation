export type ButtonProps = {    
    width:  number | undefined;
    height:  number | undefined;
    text?: string;
    onClick?: () => Promise<void>;
    status?: boolean;
}