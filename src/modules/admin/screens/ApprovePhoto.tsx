import { Image, List, Select, Skeleton } from 'antd'

import Button from '../../../shared/components/button/button'
import Loading from '../../../shared/components/loading/loading'
import Screen from '../../../shared/components/screen/screen'
import { formatDate } from '../../../shared/functions/utils/conversions'
import { PhotoType } from '../../../shared/types/PhotoType'
import { useApprovePhoto } from '../hooks/useAprovePhoto'

const ApprovePhotoScreen = () => {
  const { photos, loading, filter, statusPhoto, handleChangeFilter, handleApprovePhoto } =
    useApprovePhoto()

  return (
    <Screen>
      <div className="flex h-full justify-center">
        <div className="w-full !pt-10 flex flex-col md:w-[70%] xl:w-[50%]">
          <div className="w-full flex justify-end">
            <Select
              labelInValue
              defaultValue={filter}
              value={filter}
              style={{ width: 200 }}
              onChange={handleChangeFilter}
              options={statusPhoto}
            />
          </div>
          {loading ? (
            <Loading />
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
                      <Button>Desaprovar</Button>
                    ) : (
                      <Button type="primary" onClick={() => handleApprovePhoto(item.id)}>
                        Aprovar
                      </Button>
                    ),
                  ]}
                >
                  <Skeleton avatar title={false} loading={loading} active>
                    <List.Item.Meta
                      avatar={<Image width={100} src={item.imagem} />}
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
