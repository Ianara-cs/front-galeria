import { Input as InputAnt, InputProps as InputPropsAnt } from 'antd'
import clsx from 'clsx'

export interface InputProps extends InputPropsAnt {
  title?: string
  className?: string
}

const Input = ({ title, className, ...props }: InputProps) => {
  return (
    <div className={clsx('flex flex-col items-start w-full', className)}>
      {title && <label className='not-italic font-medium text-sm !my-2 !mx-1' >{title}</label>}
      <InputAnt {...props} />
    </div>
  )
}

export default Input