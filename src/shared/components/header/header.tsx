import {
  CheckCircleOutlined,
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Avatar, Modal, Popover } from 'antd'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { AdminScreenRoutesEnum } from '../../../modules/admin/routes'
import { HomeScreenRoutesEnum } from '../../../modules/homeScreen/routes'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import Button from '../button/button'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useGlobalReducer()
  const location = useLocation()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <header className="bg-white fixed top-0 left-0 right-0 h-[72px] w-full !px-9 flex items-center justify-between shadow-xs z-10">
      <div className="flex items-center gap-2">
        <img
          src="https://e7.pngegg.com/pngimages/289/995/png-clipart-marriage-monogram-engagement-convite-idea-monograma-love-miscellaneous.png"
          alt=""
          className="h-15 w-auto object-contain rounded-[50%]"
        />
        <span className="text-gray-700 text-xl font-semibold">Galeria Memorável</span>
      </div>
      <div className="flex justify-center gap-5 ">
        <div>
          {location.pathname == '/home' ? (
            <Button onClick={() => navigate(HomeScreenRoutesEnum.UPLOAD_SCREEN)}>
              <PlusOutlined /> Adicionar Fotos
            </Button>
          ) : (
            <div
              className="flex gap-1 hover:border-b hover:border-blue-600 hover:solid cursor-pointer"
              onClick={() => navigate(HomeScreenRoutesEnum.HOME_SCREEN)}
            >
              <HomeOutlined className="text-[12px]" /> Home
            </div>
          )}
        </div>
        <Modal
          title="Atenção!"
          //open={isModalOpen}
          //onOk={handleLogout}
          onCancel={handleCancel}
          okText="Sim"
          cancelText="Cancelar"
        >
          <p>Tem certeza que deseja sair?</p>
        </Modal>
        <Popover
          content={
            <div className="flex flex-col">
              <div
                className="!px-3 !py-1 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(HomeScreenRoutesEnum.HOME_SCREEN)}
              >
                <HomeOutlined className="text-[12px]" /> Home
              </div>
              <div
                className="!px-3 !py-1 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(AdminScreenRoutesEnum.APPROVE)}
              >
                <CheckCircleOutlined /> Aprovar fotos
              </div>
              <div
                className="!px-3 !py-1 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(AdminScreenRoutesEnum.USERS)}
              >
                <CheckCircleOutlined /> Usuários
              </div>
              <div
                className="!px-3 !py-1 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={showModal}
              >
                <LogoutOutlined /> Sair
              </div>
            </div>
          }
          title={
            <div className="flex gap-1">
              <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=`} />
              <div className="flex flex-col">
                <span>{`${user?.first_name} ${user?.last_name}`}</span>
                <span className="font-light text-[12px] text-gray-400">{user?.username}</span>
              </div>
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div className="flex cursor-pointer">
            <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=`} />
            <DownOutlined className="text-[10px] font-bold" />
          </div>
        </Popover>
      </div>
    </header>
  )
}

export default Header
