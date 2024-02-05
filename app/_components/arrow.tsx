import { IconProps } from '@/app/types/icons'

function ArrowIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.385 8.143l3.974 4.013a.49.49 0 010 .688l-3.974 4.013a.48.48 0 01-.822-.344v-2.878H4.982a.484.484 0 01-.482-.487v-1.296c0-.269.216-.487.482-.487h10.581V8.487a.48.48 0 01.822-.344z"
        fill={props.color}
      />
    </svg>
  )
}
  
export default ArrowIcon