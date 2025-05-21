import Loading from '../../../shared/components/loading/loading'
import Screen from '../../../shared/components/screen/screen'
import { PhotoType } from '../../../shared/types/PhotoType'
import { useHome } from '../hooks/useHome'

const HomeScreen = () => {
  const { photos, loading, handleSeePhoto } = useHome()

  return (
    <Screen>
      <div className="w-full">
        {loading ? (
          <div className="flex h-[70vh] justify-center items-center">
            <Loading size="large" />
          </div>
        ) : (
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {photos.map((item: PhotoType, index: number) => (
              <div
                key={index}
                className="!mb-4 break-inside-avoid"
                onClick={() => handleSeePhoto(item.id)}
              >
                <img
                  src={item.imagem_url || item.imagem}
                  alt={`Imagem ${index + 1}`}
                  className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300 !mb-2"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Screen>
  )
}

export default HomeScreen
