import { ArrowLeftOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { Link } from 'react-router'

import avatar from '/assets/user.png'

import Button from '../../../shared/components/button/button'
import TextArea from '../../../shared/components/inputs/textArea/textArea'
import Loading from '../../../shared/components/loading/loading'
import Screen from '../../../shared/components/screen/screen'
import { formatDate } from '../../../shared/functions/utils/conversions'
import { usePhoto } from '../hooks/usePhoto'

const PhotoScreen = () => {
  const {
    loading,
    photo,
    insertComment,
    onChangeInputText,
    handleLike,
    verifyLike,
    handleComment,
    handleDislike,
    comments,
  } = usePhoto()

  return (
    <Screen>
      {/* Botão de voltar */}
      <Link
        to="/home"
        className="fixed top-[80px] left-4 z-50 flex items-center gap-2 bg-white !p-2 rounded-full shadow hover:text-black transition"
      >
        <ArrowLeftOutlined className="text-2xl" />
      </Link>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <Loading size="large" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:flex-2 h-full gap-4">
          {/* Imagem */}
          <div className="md:flex-1 w-full flex items-center justify-center">
            <Image
              src={photo?.imagem_url || photo?.imagem}
              alt="Visualização"
              className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
            />
          </div>

          {/* Comentários */}
          <div className="sm:flex-[1] w-full bg-white rounded-xl shadow-lg !p-4 flex flex-col sm:overflow-hidden">
            <div className="!p-2 !mb-2 flex gap-3">
              {verifyLike == true ? (
                <LikeFilled onClick={handleDislike} style={{ fontSize: '20px', color: '#08c' }} />
              ) : (
                <LikeOutlined onClick={handleLike} style={{ fontSize: '20px' }} />
              )}
              {photo!.quantidade_curtidas > 1 ? (
                <span>{photo!.quantidade_curtidas} curtidas</span>
              ) : (
                <span>{photo!.quantidade_curtidas} curtida</span>
              )}
            </div>
            <div className="flex gap-1 items-center">
              <TextArea
                className="flex-5/6"
                onChange={onChangeInputText}
                value={insertComment.texto}
                style={{ height: 50, resize: 'none' }}
                placeholder="Faça um comentário"
              />
              <Button
                disabled={!insertComment.texto}
                className="flex-1/6"
                type="primary"
                onClick={handleComment}
              >
                Enviar
              </Button>
            </div>

            <h2 className="text-sm font-semibold !my-4">Comentários</h2>

            <div className="overflow-y-auto max-h-[60vh] !pr-2 space-y-2">
              {comments.length === 0 ? (
                <div className="text-center text-gray-400 italic mt-4">
                  Nenhum comentário ainda.
                </div>
              ) : (
                comments.map((c, i) => (
                  <div key={i} className="flex gap-3 !p-2 rounded-md">
                    <Avatar className="" src={avatar} />
                    <div className="flex flex-col gap-0.5 w-full break-words overflow-hidden">
                      <div className="text-sm">
                        <span className="font-bold">{c.usuario.nome || c.usuario.username}</span>{' '}
                        {c.texto}
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {formatDate(c.data_criacao)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Screen>
  )
}

export default PhotoScreen
