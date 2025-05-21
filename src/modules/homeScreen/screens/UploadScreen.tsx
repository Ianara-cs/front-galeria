import { UploadOutlined } from '@ant-design/icons'
import { Upload } from 'antd'

import Button from '../../../shared/components/button/button'
import Screen from '../../../shared/components/screen/screen'
import { useUpload } from '../hooks/useUpload'

const UploadScreen = () => {
  const { handleUpload, loading, uploadProps, fileList } = useUpload()

  return (
    <Screen>
      <div className="min-h-full flex items-center justify-center">
        <div className="bg-white !p-6 rounded-2xl inset-shadow-sm shadow-xl w-full max-w-md flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Escolha as fotos</h2>
          <Upload {...uploadProps} className="flex justify-center items-center max-w-md">
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={loading}
            className="!my-4"
          >
            {loading ? 'Enviando' : 'Enviar'}
          </Button>
        </div>
      </div>
    </Screen>
  )
}

export default UploadScreen
