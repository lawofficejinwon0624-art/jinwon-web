
export default function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
        <div>
          <p className="eyebrow mb-6">{eyebrow}</p>
        </div>
        <div>
          <h1 className="display text-[clamp(34px,5.6vw,64px)]">{title}</h1>
        </div>
        {lede && (
          <div>
            <p className="mt-8 max-w-[54ch] text-[16px] leading-[1.85] text-body md:text-[17px]">
              {lede}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
