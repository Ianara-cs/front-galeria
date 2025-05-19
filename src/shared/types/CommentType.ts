export interface CommentType {
  id: number
  foto_id: number
  texto: string
  data_criacao: string
  usuario: {
    id: number
    username: string
    nome: string
  }
}
