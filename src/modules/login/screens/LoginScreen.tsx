import Button from '../../../shared/components/button/button'
import Input from '../../../shared/components/inputs/input/input'
import { useLogin } from '../hooks/useLogin'

const LoginScreen = () => {
  const { signIn, handleLogin, onChangeInput } = useLogin()

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-72 bg-white !p-8 rounded-[0.4rem] text-center flex flex-col items-center">
        <h1 className="!mb-4 text-[#333] font-bold text-xl">Login</h1>
        <Input
          title="Usuário:"
          placeholder="Digite o seu usuário"
          onChange={(e) => onChangeInput(e, 'username')}
          value={signIn.username}
        />
        <Input
          title="Senha:"
          type="password"
          placeholder="Digite a sua senha"
          onChange={(e) => onChangeInput(e, 'password')}
          value={signIn.password}
        />
        <Button className="!my-8" type="primary" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  )
}

export default LoginScreen
