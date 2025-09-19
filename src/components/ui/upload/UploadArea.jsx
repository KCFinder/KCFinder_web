import { cn } from '../../../lib/utils';
import Image from '../../../asset/icon/Image';

export default function UploadArea({
  isDragging,
  loading,
  uploadedImages,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragOver,
  onClick,
  onFileButtonClick,
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        'border-dashed border-2 border-gray-400 rounded-2xl',
        'w-full max-w-[996px] h-[300px] max-h-[300px] mx-auto',
        isDragging && 'border-primary-100 bg-primary-50',
        loading && 'opacity-50',
      )}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <div className='flex flex-col gap-5 items-center relative'>
        {uploadedImages.length > 0 ? (
          <div className='flex gap-2 flex-wrap justify-center max-w-[500px] overflow-hidden'>
            {uploadedImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`업로드된 이미지 ${index + 1}`}
                className='w-20 h-20 md:max-w-60 md:max-h-60 object-cover rounded'
              />
            ))}
          </div>
        ) : (
          <>
            <Image />
            <p>jpg, png, webp형식의 파일을 등록 해주세요.</p>
            <button
              onClick={onFileButtonClick}
              className='border border-gray-400 text-sm py-2 px-10 font-bold text-gray-500 rounded-full'
            >
              이미지파일 업로드
            </button>
          </>
        )}
      </div>
    </div>
  );
}
