import { Image, List, Skeleton } from 'antd'

import Button from '../../../shared/components/button/button'
import Loading from '../../../shared/components/loading/loading'
import Screen from '../../../shared/components/screen/screen'
import Select from '../../../shared/components/select/select'
import { formatDate } from '../../../shared/functions/utils/conversions'
import { PhotoType } from '../../../shared/types/PhotoType'
import { useApprovePhoto } from '../hooks/useAprovePhoto'

const ApprovePhotoScreen = () => {
  const {
    photos,
    loading,
    filter,
    statusPhoto,
    handleChangeFilter,
    handleApprovePhoto,
    handleDisapprovePhoto,
  } = useApprovePhoto()

  return (
    <Screen>
      <div className="flex h-full justify-center">
        <div className="w-full !pt-8 mb:!pt-10 flex flex-col md:w-[70%] xl:w-[50%]">
          <div className="w-full flex justify-between items-center !pb-4">
            <div className="font-medium">Lista de fotos</div>
            <Select
              title="Status:"
              defaultValue={`${filter.aprovada}`}
              value={`${filter.aprovada}`}
              onChange={(event) => handleChangeFilter(event, 'aprovada')}
              options={statusPhoto}
              className="w-[150px] mb:w-[200px]"
            />
          </div>
          {loading ? (
            <div className="flex h-full justify-center items-center">
              <Loading />
            </div>
          ) : (
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
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
