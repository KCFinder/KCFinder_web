import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useImageUpload } from '../../../hooks/useImageUpload';
import { uploadProduct, uploadProductFiles } from '../../../api/main';
import SectionWrapper from '../../../wrapper/SectionWrapper';
import UploadArea from '../../ui/upload/UploadArea';
import UploadButton from '../../ui/upload/UploadButton';

export default function ImgUpLoadSection() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const fileInputRef = useRef(null);

  const {
    isDragging,
    uploadedImages,
    uploadedImageUrls,
    uploadedFiles,
    loading,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleFileInput,
  } = useImageUpload();

  const handleFiles = async files => {
    if (!isAuthenticated) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/login');
      return;
    }

    // useImageUpload 훅의 handleFiles를 직접 호출
    await handleFileInput({ target: { files } });
  };

  const handleFindKcBtn = async () => {
    if (uploadedImageUrls.length === 0 || !user) {
      alert('이미지를 먼저 업로드하고 로그인해주세요.');
      return;
    }

    const firstFile = uploadedFiles[0];
    const uploadProductData = {
      userCode: user.data,
      productName: firstFile.name,
    };

    try {
      const productResponse = await uploadProduct(uploadProductData);
      const productCode = productResponse;

      const uploadFileData = uploadedImageUrls.map(imageUrl => ({
        productCode: productCode.data,
        imageUrl: imageUrl,
      }));

      await uploadProductFiles(uploadFileData);

      alert('모든 파일 업로드가 완료되었습니다.');
      navigate('/my/finder');
    } catch (error) {
      console.error('백엔드 요청 실패:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <SectionWrapper className='py-12'>
      <div className='flex flex-col gap-5 items-center'>
        <UploadArea
          isDragging={isDragging}
          loading={loading}
          uploadedImages={uploadedImages}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={e => {
            handleDrop(e);
            handleFiles(Array.from(e.dataTransfer.files));
          }}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          onFileButtonClick={e => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        />

        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept='image/jpeg,image/png,image/webp'
          onChange={e => handleFiles(Array.from(e.target.files))}
          className='hidden'
        />

        <UploadButton
          onClick={handleFindKcBtn}
          disabled={uploadedImageUrls.length === 0 || loading}
          loading={loading}
        >
          이미지로 <br /> 동일 기자재 찾기
        </UploadButton>
      </div>
    </SectionWrapper>
  );
}
