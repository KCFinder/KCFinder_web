import AIFlow from '../asset/icon/AIFlow';
import Camera from '../asset/icon/Camera';
import Clock from '../asset/icon/Clock';
import File from '../asset/icon/File';
import Check from '../asset/icon/Check';
import Verify from '../asset/icon/Verify';

export const featureCards = [
  {
    icon: <Camera />,
    title: '제품 사진 등록',
    description: '본인이 인증하려는\n제품 사진을 등록합니다.',
  },
  {
    icon: <AIFlow />,
    title: 'AI 이미지 분석',
    description:
      '등록된 사진을 AI를 통해\n이미지를 분석하여 동일\n제품 여부를 확인합니다.',
  },
  {
    icon: <Clock />,
    title: '24간 이내 결과 제공',
    description: 'AI가 동일 제품을\n분석하면 24시간 이내\n결과를 제공합니다.',
  },
  {
    icon: <File />,
    title: '서류 발급',
    description: '인증에 필요한 서류를\n발급해 드립니다',
  },
  {
    icon: <Check />,
    title: '인증 진행',
    description: '동일 제품이 없다면\n신규 KC 인증을\n진행합니다.',
  },
  {
    icon: <Verify />,
    title: '인증 완료',
    description:
      '서류 발급 후 인증까지\n직접 다 진행하여\nKC인증마크를\n발급해드립니다',
  },
];
