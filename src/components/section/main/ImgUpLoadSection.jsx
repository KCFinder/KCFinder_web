import { use, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useImageUpload } from '../../../hooks/useImageUpload';
import { uploadProduct, uploadProductFiles } from '../../../api/main';
import SectionWrapper from '../../../wrapper/SectionWrapper';
import UploadArea from '../../ui/upload/UploadArea';
import UploadButton from '../../ui/upload/UploadButton';
import { findKc } from '../../../api/findKc';
import { useState } from 'react';

export default function ImgUpLoadSection() {
  const [kcList, setKcList] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  console.log('🚀 ~ ImgUpLoadSection ~ user:', user);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await findKc(1);
      if (response.data) {
        setKcList(response.data.items);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  console.log('🚀 ~ ImgUpLoadSection ~ kcList:', kcList);

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
    if (uploadedImageUrls.length === 0 || !isAuthenticated) {
      alert('이미지를 먼저 업로드하고 로그인해주세요.');
      return;
    }

    const firstFile = uploadedFiles[0];
    const uploadProductData = {
      userCode: user,
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
    <SectionWrapper className='md:py-12'>
      <div className='flex flex-col md:grid grid-cols-2 gap-6 '>
        <div
          data-aos='fade-right'
          className='flex flex-col gap-5 items-center bg-yellow-200 p-4 rounded-2xl shadow-md'
        >
          <p className='font-bold text-lg text-left w-full'>
            이미지로 동일 기자재 찾기
          </p>
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

        <section
          data-aos='fade-left'
          data-aos-delay='200'
          className='col-span-1 flex flex-col justify-start items-start p-6 bg-yellow-200 rounded-2xl shadow-md w-full'
        >
          <p className='font-bold text-xl text-left w-full mb-4'>
            동일기자재 목록
          </p>

          <div className='w-full overflow-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='border-y border-gray-400'>
                  <th className='px-4 py-3 text-center font-semibold whitespace-nowrap'>
                    순번
                  </th>
                  <th className='px-4 py-3 text-center font-semibold whitespace-nowrap'>
                    인증번호
                  </th>
                  <th className='px-4 py-3 text-center font-semibold whitespace-nowrap'>
                    등록일
                  </th>
                </tr>
              </thead>
              <tbody>
                {kcList.length > 0
                  ? kcList.map((kcItem, index) => (
                      <tr key={kcItem.id} className='border-b border-gray-300'>
                        <td className='px-4 py-3 text-center whitespace-nowrap'>
                          {index + 1}
                        </td>
                        <td className='px-4 py-3 text-center whitespace-nowrap'>
                          {kcItem.matchingProductCode || '-'}
                        </td>
                        <td className='px-4 py-3 text-center whitespace-nowrap'>
                          {kcItem.createDate?.split(' ')[0] || '-'}
                        </td>
                      </tr>
                    ))
                  : Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className='border-b border-gray-300'>
                        <td className='px-4 py-3 text-center text-gray-400 whitespace-nowrap'>
                          {index + 1}
                        </td>
                        <td className='px-4 py-3 text-center text-gray-400 whitespace-nowrap'>
                          -
                        </td>
                        <td className='px-4 py-3 text-center text-gray-400 whitespace-nowrap'>
                          -
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
}
