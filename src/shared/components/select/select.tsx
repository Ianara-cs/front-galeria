import { Select as SelectAnt, SelectProps as SelectPropsAnt } from 'antd'
import clsx from 'clsx'

interface SelectProps extends SelectPropsAnt {
  title?: string
  className?: string
}

const Select = ({ title, className, ...props }: SelectProps) => {
  return (
    <div className={clsx('flex flex-col items-start', className)}>
      {title && (
        <div className="not-italic font-normal text-gray-700 text-sm !my-1 !mx-1">{title}</div>
      )}
      <SelectAnt className="w-full" {...props} />
    </div>
  )
}

export default Select
