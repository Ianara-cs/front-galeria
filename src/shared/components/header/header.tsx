import {
  CheckCircleOutlined,
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Avatar, Image, Modal, Popover } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import logo from '/assets/logo1.png'
import avatar from '/assets/user.png'

import { AdminScreenRoutesEnum } from '../../../modules/admin/routes'
import { HomeScreenRoutesEnum } from '../../../modules/homeScreen/routes'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { logout } from '../../functions/connection/auth'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useGlobalReducer()

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
    <header className="bg-white fixed top-0 left-0 right-0 h-[72px] w-full !px-3 sm:!px-8 flex items-center justify-between shadow-xs z-10">
      <Link to="/home" className="flex items-center gap-2">
        <Image
          preview={false}
          src={logo}
          alt=""
          className="!h-12 mb:!h-14 object-contain rounded-full"
        />
        <span className="text-gray-700 text-xl font-semibold">Galeria</span>
      </Link>
      <div className="flex justify-center gap-5 ">
        <Modal
          title="Atenção!"
          open={isModalOpen}
          zIndex={20}
          onOk={() => logout(navigate)}
          onCancel={handleCancel}
          okText="Sim"
          cancelText="Cancelar"
        >
          <p>Tem certeza que deseja sair?</p>
        </Modal>
        <Popover
          zIndex={15}
          content={
            <div className="flex flex-col">
              <div
                className="!px-3 !py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(HomeScreenRoutesEnum.HOME_SCREEN)}
              >
                <HomeOutlined className="text-[14px] !pr-2" /> Home
              </div>
              <div
                className="!px-3 !py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(HomeScreenRoutesEnum.UPLOAD_SCREEN)}
              >
                <PlusOutlined className="text-[14px] !pr-2" /> Adicionar Fotos
              </div>
              {user?.is_staff && (
                <div
                  className="!px-3 !py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(AdminScreenRoutesEnum.APPROVE)}
                >
                  <CheckCircleOutlined className="text-[14px] !pr-2" /> Aprovar fotos
                </div>
              )}
              {user?.is_staff && (
                <div
                  className="!px-3 !py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate(AdminScreenRoutesEnum.USERS)}
                >
                  <UsergroupAddOutlined className="text-[14px] !pr-2" /> Usuários
                </div>
              )}
              <div
                className="!px-3 !py-3 rounded-xl cursor-pointer hover:bg-gray-100"
                onClick={showModal}
              >
                <LogoutOutlined className="text-[14px] !pr-2" /> Sair
              </div>
            </div>
          }
          title={
            <div className="flex gap-3">
              <Avatar src={avatar} />
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
          <div className="flex gap-1 border border-gray-300 !p-2 rounded-lg solid cursor-pointer">
            <Avatar src={avatar} />
            <DownOutlined className="text-[10px] font-bold" />
          </div>
        </Popover>
      </div>
    </header>
  )
}

export default Header
