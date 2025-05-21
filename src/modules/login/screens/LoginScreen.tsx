import Button from '../../../shared/components/button/button'
import Input from '../../../shared/components/inputs/input/input'
import { useLogin } from '../hooks/useLogin'

const LoginScreen = () => {
  const { signIn, handleLogin, onChangeInput } = useLogin()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 !px-4 !py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Lado esquerdo - imagem */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/logo1.png')" }}
        ></div>

        {/* Lado direito - formulário */}
        <div className="w-full md:w-1/2 !p-8 md:!p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-purple-800 !mb-6 text-center">
            Bem-vindo à Galeria
          </h2>

          <Input
            title="Usuário:"
            placeholder="Digite o seu usuário"
            onChange={(e) => onChangeInput(e, 'username')}
            value={signIn.username}
            className="!p-2"
          />

          <Input
            title="Senha:"
            type="password"
            placeholder="Digite a sua senha"
            onChange={(e) => onChangeInput(e, 'password')}
            value={signIn.password}
            className="!p-2"
          />

          <Button
            className="!mt-6 w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold !py-5 rounded transition duration-300"
            type="primary"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
