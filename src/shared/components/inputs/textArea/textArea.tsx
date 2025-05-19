import TextAreaAnt, { TextAreaProps as TextAreaAntProps } from 'antd/es/input/TextArea'
import clsx from 'clsx'

interface TextAreaProps extends TextAreaAntProps {
  title?: string
  className?: string
}

const TextArea = ({ title, className, ...props }: TextAreaProps) => {
  return (
    <div className={clsx('flex flex-col items-start w-full', className)}>
      {title && (
        <label className="not-italic font-normal text-gray-700 text-sm !my-1 !mx-1">{title}</label>
      )}
      <TextAreaAnt {...props} />
    </div>
  )
}

export default TextArea
