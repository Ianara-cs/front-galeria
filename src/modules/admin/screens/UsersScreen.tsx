import { EditOutlined } from '@ant-design/icons'
import { Avatar, List, Modal, Tag } from 'antd'
import { useState } from 'react'

import Button from '../../../shared/components/button/button'
import Input from '../../../shared/components/inputs/input/input'
import Screen from '../../../shared/components/screen/screen'
import Select from '../../../shared/components/select/select'
import { useInsertUser } from '../hooks/useInsertUser'
import { useUsers } from '../hooks/useUsers'

const UsersScreen = () => {
  const { participants, getUsers } = useUsers()
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const {
    isEdit,
    loadingParticipant,
    participant,
    handleChangeSelect,
    handleInsertParticipant,
    onChangeInput,
  } = useInsertUser(userId)

  const showModal = (user?: number) => {
    setUserId(user ? `${user}` : '')
    setOpen(true)
  }

  const handleOk = async () => {
    await handleInsertParticipant()
    await getUsers()
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const statusUserOptions = [
    {
      value: 'true',
      label: 'Ativo',
    },
    {
      value: 'false',
      label: 'Desativado',
    },
  ]

  const typeUserOptions = [
    {
      value: 'false',
      label: 'Comun',
    },
    {
      value: 'true',
      label: 'Admin',
    },
  ]

  return (
    <Screen>
      <div className="flex h-full justify-center">
        <Modal
          open={open}
          title={isEdit ? 'Editar Usuário' : 'Criar Usuário'}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div key={1} className="flex justify-end !pt-4">
              <div className="flex gap-1 sm:w-[50%]">
                <Button key="back" onClick={handleCancel}>
                  Cancelar
                </Button>
                ,
                <Button key="submit" type="primary" loading={loadingParticipant} onClick={handleOk}>
                  {isEdit ? 'Salvar' : 'Criar'}
                </Button>
                ,
              </div>
            </div>,
          ]}
        >
          <div className="!px-5">
            <Input
              title="Nome:"
              value={participant.first_name}
              onChange={(event) => onChangeInput(event, 'first_name')}
            />
            <Input
              title="Sobrenome:"
              value={participant.last_name}
              onChange={(event) => onChangeInput(event, 'last_name')}
            />
            <Input
              title="Username:"
              value={participant.username}
              onChange={(event) => onChangeInput(event, 'username')}
            />
            <Input
              title="email:"
              value={participant.email}
              type="email"
              onChange={(event) => onChangeInput(event, 'email')}
            />
            <div className="flex gap-2">
              <Input
                title="Senha:"
                type="password"
                onChange={(event) => onChangeInput(event, 'password')}
              />
              <Input
                title="Senha Novamente:"
                type="password"
                onChange={(event) => onChangeInput(event, 'passwordAgain')}
              />
            </div>
            <div className="flex gap-2">
              <Select
                onChange={(event) => handleChangeSelect(event, 'is_active')}
                defaultValue={`${participant.is_active}`}
                value={`${participant.is_active}`}
                title="Status:"
                options={statusUserOptions}
              />
              <Select
                onChange={(event) => handleChangeSelect(event, 'is_staff')}
                defaultValue={`${participant.is_staff}`}
                value={`${participant.is_staff}`}
                title="Tipo de Usuário:"
                options={typeUserOptions}
              />
            </div>
          </div>
        </Modal>
        <div className="w-full !py-8 flex flex-col gap-2 md:w-[70%] xl:w-[50%]">
          <div className="w-full shadow-md !p-4 !mb-8 solid flex flex-wrap gap-2 rounded">
            <div className="w-full sm:flex-3">
              <Input title="Nome:" />
            </div>
            <div className="w-full sm:flex-1">
              <Input title="Nome:" />
            </div>
            <div className="w-full sm:flex-1">
              <Input title="Nome:" />
            </div>
          </div>
          <div className="flex justify-between">
            <div>Lista de Usuários</div>
            <div className="w-[30%]">
              <Button type="primary" onClick={() => showModal()}>
                Criar Usuário
              </Button>
            </div>
          </div>

          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={participants}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => showModal(item.id)}>
                    <EditOutlined className="" /> Editar
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={60}
                      src="https://i.pinimg.com/236x/a1/fe/0e/a1fe0e555897cba0069f16b1b22336fe.jpg"
                    />
                  }
                  title={<span>{`${item.first_name} ${item.last_name}`}</span>}
                  description={
                    <div className="flex flex-col">
                      <span>Username: {item.username}</span>
                      <span>{item.email}</span>
                      <div>
                        {item.is_staff ? (
                          <Tag color="purple">Admin</Tag>
                        ) : (
                          <Tag color="blue">Comun</Tag>
                        )}
                        {item.is_active ? (
                          <Tag color="success">Ativo</Tag>
                        ) : (
                          <Tag color="red">Não Ativo</Tag>
                        )}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </Screen>
  )
}

export default UsersScreen
