import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'

import { LoginRoutesEnum } from '../../login/routes'

const NotAuthorizedScreen = () => {
  const navigate = useNavigate()

  const handleOnClickButton = () => {
    navigate(LoginRoutesEnum.LOGIN)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Result
        status="403"
        title="403"
        subTitle="Desculpe, Você não tem autorização para acessar está pagina"
        extra={
          <Button onClick={handleOnClickButton} type="primary">
            Página de Inicial
          </Button>
        }
      />
    </div>
  )
}

export default NotAuthorizedScreen
