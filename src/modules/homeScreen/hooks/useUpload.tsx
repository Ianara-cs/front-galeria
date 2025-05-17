import { UploadFile, UploadProps } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { URL_SEND_PHOTOS } from '../../../shared/constants/urls'
import { useRequests } from '../../../shared/hooks/useRequest'
import { HomeScreenRoutesEnum } from '../routes'

export const useUpload = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { loading, requestUpload } = useRequests()
  const navigate = useNavigate()

  const handleUpload = async () => {
    await requestUpload({
      url: URL_SEND_PHOTOS,
      nameCampo: 'imagens',
      body: fileList,
      message: 'Fotos enviadas com sucesso!',
    }).then(() => {
      navigate(HomeScreenRoutesEnum.HOME_SCREEN, { replace: true })
    })
  }
  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },

    beforeUpload: (file) => {
      setFileList([
        ...fileList,
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: URL.createObjectURL(file),
          originFileObj: file,
        },
      ])

      return false
    },
    fileList,
    listType: 'picture-card',
    accept: 'image/*',
    showUploadList: {
      showRemoveIcon: true,
    },
  }
  return {
    handleUpload,
    loading,
    uploadProps,
    fileList,
  }
}
