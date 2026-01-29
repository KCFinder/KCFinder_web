export default function SectionWrapper({ children, className, id }) {
  return (
    <section
      id={id}
      className={`w-full px-4 lg:px-0 py-8 md:py-12 pt-12 md:pt-40 ${className}`}
    >
      <div className='container mx-auto max-w-[1280px]'>{children}</div>
    </section>
  );
}
