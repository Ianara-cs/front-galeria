import Screen from '../../../shared/components/screen/screen'
import { PhotoType } from '../../../shared/types/PhotoType'
import { useHome } from '../hooks/useHome'

const HomeScreen = () => {
  const { photos } = useHome()

  return (
    <Screen>
      <div className="!p-4">
        <h1 className="text-3xl font-bold !mb-6">Inspiração para você</h1>

        {/* Container tipo Masonry usando columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((item: PhotoType, index: number) => (
            <div key={index} className="break-inside-avoid">
              <img
                src={item.imagem}
                alt={`Imagem ${index + 1}`}
                className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  )
}

export default HomeScreen
