import { Image, List, Skeleton } from 'antd'

import Button from '../../../shared/components/button/button'
import Loading from '../../../shared/components/loading/loading'
import Screen from '../../../shared/components/screen/screen'
import Select from '../../../shared/components/select/select'
import { PAGE_SIZE } from '../../../shared/constants/configConstants'
import { formatDate } from '../../../shared/functions/utils/conversions'
import { PhotoType } from '../../../shared/types/PhotoType'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { useApprovePhoto } from '../hooks/useAprovePhoto'

const ApprovePhotoScreen = () => {
  const {
    photos,
    loading,
    filter,
    statusPhoto,
    users,
    loadingUsers,
    onChangePage,
    handleChangeFilter,
    handleApprovePhoto,
    handleDisapprovePhoto,
  } = useApprovePhoto()
  const { paginate } = useGlobalReducer()

  return (
    <Screen>
      <div className="flex h-full justify-center">
        <div className="w-full !pt-8 mb:!pt-10 flex flex-col md:w-[70%] xl:w-[50%]">
          <div className="w-full shadow-md !p-4 !mb-8 solid flex flex-wrap gap-2 rounded">
            <div className="w-full sm:flex-2">
              <Select
                onChange={(event) => handleChangeFilter(event, 'usuario_id')}
                showSearch
                loading={loadingUsers}
                placeholder="Selecione um usuário"
                title="Usuário:"
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: '',
                    label: 'Todos',
                  },
                  ...users.map((u) => {
                    return { value: u.id, label: `${u.username} (${u.first_name} ${u.last_name})` }
                  }),
                ]}
              />
            </div>
            <div className="w-full sm:flex-1">
              <Select
                title="Status:"
                defaultValue={`${filter.aprovada}`}
                value={`${filter.aprovada}`}
                onChange={(event) => handleChangeFilter(event, 'aprovada')}
                options={statusPhoto}
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center !pb-4">
            <div className="font-medium">Lista de fotos</div>
          </div>
          {loading ? (
            <div className="flex h-full justify-center items-center">
              <Loading />
            </div>
          ) : (
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              pagination={{
                onChange: (page) => {
                  onChangePage(page)
                },
                align: 'center',
                pageSize: PAGE_SIZE,
                current: paginate?.currentPage,
                total: paginate?.totalData,
              }}
              dataSource={photos}
              renderItem={(item: PhotoType) => (
                <List.Item
                  className="flex justify-center"
                  actions={[
                    item.aprovada ? (
                      <Button type="primary" danger onClick={() => handleDisapprovePhoto(item.id)}>
                        Desaprovar
                      </Button>
                    ) : (
                      <Button type="primary" onClick={() => handleApprovePhoto(item.id)}>
                        Aprovar
                      </Button>
                    ),
                  ]}
                >
                  <Skeleton avatar title={false} loading={loading} active>
                    <List.Item.Meta
                      avatar={<Image width={100} src={item.imagem_url || item.imagem} />}
                      title={<span>Enviado por {item.usuario.username}</span>}
                      description={<span>Data: {formatDate(item.data_envio)}</span>}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
    </Screen>
  )
}

export default ApprovePhotoScreen
