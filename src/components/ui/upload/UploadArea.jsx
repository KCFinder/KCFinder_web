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
        'border-dashed border-2 border-gray-300 rounded-2xl',
        'w-full max-w-[996px] h-[300px] mx-auto',
        isDragging && 'border-primary-100 bg-primary-50',
        loading && 'opacity-50',
      )}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <div className='flex flex-col gap-5 items-center'>
        {uploadedImages.length > 0 ? (
          <div className='flex gap-2 flex-wrap justify-center'>
            {uploadedImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`업로드된 이미지 ${index + 1}`}
                className='w-60 h-60 object-cover rounded'
              />
            ))}
          </div>
        ) : (
          <>
            <Image />
            <p>500KB이하의 jpg, png 파일만 등록 할 수 있습니다.</p>
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
