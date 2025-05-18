import { Select as SelectAnt, SelectProps as SelectPropsAnt } from 'antd'
import clsx from 'clsx'

interface SelectProps extends SelectPropsAnt {
  title?: string
  className?: string
}

const Select = ({ title, className, ...props }: SelectProps) => {
  return (
    <div className={clsx(`flex flex-col items-start w-full ${className}`)}>
      {title && (
        <div className="not-italic font-normal text-gray-700 text-sm !my-1 !mx-1">{title}</div>
      )}
      <SelectAnt style={{ width: '100%' }} {...props} />
    </div>
  )
}

export default Select
