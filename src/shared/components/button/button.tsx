import { ButtonProps } from 'antd/es/button'
import { Button as ButtonAnt } from 'antd'
import clsx from 'clsx'

interface ButtonCurrentProps extends ButtonProps {
  className?: string
}

const Button = ({ className, ...props }: ButtonCurrentProps) => {
  return <ButtonAnt className={clsx("w-full", className)} {...props} />
}

export default Button
