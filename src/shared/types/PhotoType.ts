export interface PhotoType {
  id: number
  imagem: string
  descricao: string
  aprovada: string
  data_envio: string
  curtido: boolean
  usuario: {
    id: number
    username: string
  }
}
