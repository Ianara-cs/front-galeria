export interface PhotoType {
  id: number
  imagem: string
  imagem_url: string
  descricao: string
  aprovada: string
  data_envio: string
  curtido: boolean
  quantidade_curtidas: number
  usuario: {
    id: number
    username: string
  }
}
