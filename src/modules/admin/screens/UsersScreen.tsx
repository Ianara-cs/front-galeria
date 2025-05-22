import { EditOutlined } from '@ant-design/icons'
import { Avatar, List, Modal, Tag } from 'antd'

import avatar from '/assets/user.png'

import Button from '../../../shared/components/button/button'
import Input from '../../../shared/components/inputs/input/input'
import Loading from '../../../shared/components/loading/loading'
import Screen from '../../../shared/components/screen/screen'
import Select from '../../../shared/components/select/select'
import { useUsers } from '../hooks/useUsers'

const UsersScreen = () => {
  const {
    participants,
    loading,
    isEdit,
    loadingParticipant,
    participant,
    canSend,
    open,
    onChangeInput,
    handleChangeSelect,
    handleFilterSelect,
    handleChangeFilter,
    handleCancel,
    handleOk,
    showModal,
  } = useUsers()

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
              <div className="flex gap-1 w-full sm:w-[50%]">
                <Button key="back" type="primary" danger onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  disabled={canSend}
                  key="submit"
                  type="primary"
                  loading={loadingParticipant}
                  onClick={handleOk}
                >
                  {isEdit ? 'Salvar' : 'Criar'}
                </Button>
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
                value={participant.password ?? ''}
                type="password"
                onChange={(event) => onChangeInput(event, 'password')}
              />
              <Input
                title="Senha Novamente:"
                value={participant.passwordAgain ?? ''}
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
                className="w-full"
              />
              <Select
                onChange={(event) => handleChangeSelect(event, 'is_staff')}
                defaultValue={`${participant.is_staff}`}
                value={`${participant.is_staff}`}
                title="Tipo de Usuário:"
                options={typeUserOptions}
                className="w-full"
              />
            </div>
          </div>
        </Modal>
        <div className="w-full !pb-8 flex flex-col gap-2 md:w-[70%] xl:w-[60%]">
          <div className="w-full shadow-md !p-4 !mb-8 solid flex flex-wrap gap-2 rounded">
            <div className="w-full sm:flex-3">
              <Input title="Nome:" onChange={(event) => handleChangeFilter(event, 'first_name')} />
            </div>
            <div className="w-full sm:flex-1">
              <Select
                onChange={(event) => handleFilterSelect(event, 'is_active')}
                defaultValue={{
                  value: '',
                  label: 'Todos',
                }}
                title="Status:"
                options={[
                  {
                    value: '',
                    label: 'Todos',
                  },
                  ...statusUserOptions,
                ]}
              />
            </div>
            <div className="w-full sm:flex-1">
              <Select
                onChange={(event) => handleFilterSelect(event, 'is_staff')}
                defaultValue={{
                  value: '',
                  label: 'Todos',
                }}
                title="Tipo:"
                options={[
                  {
                    value: '',
                    label: 'Todos',
                  },
                  ...typeUserOptions,
                ]}
              />
            </div>
          </div>
          <div className="flex justify-between items-center !pb-3 border-b border-gray-300 solid">
            <div className="text-base">Lista de Usuários</div>
            <div className="mb:w-[30%]">
              <Button type="primary" onClick={() => showModal()}>
                Criar Usuário
              </Button>
            </div>
          </div>
          {loading ? (
            <div className="flex h-full justify-center items-center">
              <Loading size="large" />
            </div>
          ) : (
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
                    avatar={<Avatar size={60} src={avatar} />}
                    title={
                      <span className="text-base">{`${item.first_name} ${item.last_name}`}</span>
                    }
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
          )}
        </div>
      </div>
    </Screen>
  )
}

export default UsersScreen
