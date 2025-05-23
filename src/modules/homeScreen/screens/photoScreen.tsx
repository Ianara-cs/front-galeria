import { ArrowLeftOutlined, EditOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import { Avatar, Image, Modal } from 'antd'
import { Link } from 'react-router'

import avatar from '/assets/user.png'

import Button from '../../../shared/components/button/button'
import TextArea from '../../../shared/components/inputs/textArea/textArea'
import Loading from '../../../shared/components/loading/loading'
import Screen from '../../../shared/components/screen/screen'
import { formatDate } from '../../../shared/functions/utils/conversions'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { usePhoto } from '../hooks/usePhoto'

const PhotoScreen = () => {
  const {
    loading,
    photo,
    insertComment,
    loadingSendComment,
    isModalOpen,
    editComment,
    loadingComment,
    onChangeInputText,
    handleLike,
    verifyLike,
    handleComment,
    handleDislike,
    showModal,
    handleCancel,
    onChangeInputTextEdit,
    comments,
  } = usePhoto()
  const { user } = useGlobalReducer()

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
              <span>{photo?.quantidade_curtidas}</span>
            </div>
            <div className="flex gap-1 items-center">
              <TextArea
                className="flex-5/6"
                onChange={onChangeInputText}
                value={insertComment.texto}
                style={{ height: 60, resize: 'none' }}
                placeholder="Faça um comentário"
              />
              <Button
                disabled={!insertComment.texto}
                loading={loadingSendComment}
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
                  <div key={i} className="flex gap-2 !p-2 rounded-md">
                    <Avatar src={avatar} />
                    <div className="flex flex-col gap-0.5 w-full break-words overflow-hidden">
                      <div className="text-sm">
                        <span className="font-bold">{c.usuario.nome || c.usuario.username}</span>{' '}
                        {c.texto}
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {formatDate(c.data_criacao)}
                      </span>
                    </div>
                    {user?.id == c.usuario.id && <EditOutlined onClick={() => showModal(c.id)} />}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <Modal
        open={isModalOpen}
        onOk={handleComment}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !editComment.texto }}
        okText="Editar"
        cancelText="Cancelar"
        loading={loadingComment}
        closable={false}
      >
        <TextArea
          onChange={onChangeInputTextEdit}
          value={editComment.texto}
          style={{ height: 80 }}
        />
      </Modal>
    </Screen>
  )
}

export default PhotoScreen
