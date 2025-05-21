import { Button as ButtonAnt } from 'antd'
import { ButtonProps } from 'antd/es/button'
import clsx from 'clsx'

interface ButtonCurrentProps extends ButtonProps {
  className?: string
}

const Button = ({ className, ...props }: ButtonCurrentProps) => {
  return <ButtonAnt className={clsx('w-full !py-4 !px-3 mb:!py-5', className)} {...props} />
}

export default Button
