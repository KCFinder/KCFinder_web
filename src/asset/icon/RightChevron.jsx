export default function RightChevron({ className }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        width='12'
        height='12'
        viewBox='0 0 13 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M1 1L12 9L1 17' stroke='white' />
      </svg>
    </div>
  );
}
