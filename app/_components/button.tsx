import ArrowIcon from "./arrow";
import { ButtonProps } from '@/app/types/button'

function Button(props: ButtonProps) {

  const { width, height, text, status, ...rest } = props;

  const buttonStyle: React.CSSProperties = {
    width: `${width}%`,
    height: `${height}px`,
  };

  return (
    <button className={ status ?  'btn-rd-disabled' : 'btn-rd'} style={buttonStyle} {...rest}>
      <ArrowIcon width={25} height={24} />
      {text}
    </button>
  )
}

export default Button
