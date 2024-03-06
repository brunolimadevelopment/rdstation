import ArrowIcon from "./arrow";

export type ButtonProps = {    
  width:  number | undefined;
  height:  number | undefined;
  //size: string;
  //text: string | boolean;
  onClick?: () => Promise<void>;
  //className?: string;
  //type?: "submit" | "reset" | "button" | undefined;
  //status?: "enabled" | "disabled" | undefined;
  //disabled?: boolean;
}

function Button(props: ButtonProps) {

  const { width, height,   ...rest } = props;

  const buttonStyle: React.CSSProperties = {
    width: `${width}%`,
    height: `${height}px`,
  };

  return (
    <button  style={buttonStyle} {...rest}>
      <ArrowIcon width={25} height={24} />
    </button>
  )
}

export default Button
