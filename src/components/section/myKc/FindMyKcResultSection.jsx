export default function FindMyKcResultSection({ matchingData }) {
  const list = Array.isArray(matchingData)
    ? matchingData
    : matchingData
      ? [matchingData]
      : [];

  if (
    !list ||
    list.length === 0 ||
    (list.length === 1 && Object.keys(list[0]).length === 0)
  ) {
    return (
      <div className='pb-10'>
        <p className='font-bold'>매칭 결과</p>
        <p>매칭된 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            <img
              src={item.userProductImgPath}
              alt='userProductName'
              className='w-20 h-20'
            />
            <p>{item.userProductName}</p>
            <p>{item.userProductCode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
