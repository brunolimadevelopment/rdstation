import ArrowIcon from "./arrow";

export type ButtonProps = {    
  width: string | number | undefined;
  height: string | number | undefined;
  size: string;
  text: string;
  onClick?: () => Promise<void>;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  status?: "enabled" | "disabled" | undefined;
  disabled?: boolean;
}

function Button(props: ButtonProps) {

  const { width, height, text, status, type, disabled, ...rest } = props;

  const buttonStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <button type={type} style={buttonStyle} className={disabled ? 'btn-rd-disabled': 'btn-rd'} {...rest}>
      {props.text}
      <ArrowIcon width={25} height={24} className="ml-2" color="#100C27"/>
    </button>
  )
}

export default Button
