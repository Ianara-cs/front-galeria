import { Input as InputAnt, InputProps as InputPropsAnt } from 'antd'
import clsx from 'clsx'

export interface InputProps extends InputPropsAnt {
  title?: string
  className?: string
}

const Input = ({ title, className, ...props }: InputProps) => {
  return (
    <div className={clsx('flex flex-col items-start w-full')}>
      {title && (
        <label className="not-italic font-normal text-gray-700 text-sm !my-1 !mx-1">{title}</label>
      )}
      <InputAnt className={className} {...props} />
    </div>
  )
}

export default Input
