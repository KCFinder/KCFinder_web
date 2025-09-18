export default function SectionWrapper({ children, className }) {
  return (
    <section className={`w-full px-4 lg:px-0 py-12  ${className}`}>
      <div className='container mx-auto max-w-[1200px]'>{children}</div>
    </section>
  );
}
