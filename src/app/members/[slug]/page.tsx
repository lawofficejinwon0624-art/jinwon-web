import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Monogram from "@/components/Monogram";
import { getMember, members } from "@/data/members";
import { site } from "@/data/site";

export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return {};
  const description = [
    `${m.name} ${m.role} — ${m.focus}.`,
    m.tagline,
  ].filter(Boolean).join(" ");
  return {
    title: `${m.name} ${m.role}`,
    description,
    alternates: { canonical: `/members/${m.slug}` },
    openGraph: {
      type: "profile",
      title: `${m.name} ${m.role} | ${site.name}`,
      description,
      url: `/members/${m.slug}`,
      images: [{ url: m.photo ?? "/og-v6.jpg", alt: `${m.name} ${m.role}` }],
    },
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) notFound();

  const idx = members.findIndex((x) => x.slug === m.slug);
  const next = members[(idx + 1) % members.length];

  return (
    <>
      {/* 프로필 히어로 */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
          <div>
            <Link
              href="/members"
              className="link-quiet font-mono text-[12px] tracking-[0.18em] text-mute hover:text-body"
            >
              ← OUR TEAM
            </Link>
          </div>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
            <div>
              <div>
                <p className="eyebrow mb-5">{m.role}</p>
                <h1 className="display text-[clamp(40px,6.4vw,72px)]">
                  {m.name}
                </h1>
                <p className="mt-4 text-[16px] text-body-strong md:text-[18px]">
                  {m.focus}
                </p>
              </div>
              {m.quote && (
                <div>
                  <blockquote className="serif-accent mt-12 max-w-[30ch] border-l border-hairline pl-6 text-[20px] leading-[1.7] text-body-strong md:text-[23px]">
                    “{m.quote}”
                  </blockquote>
                </div>
              )}
              {m.intro.length > 0 && (
                <div>
                  <div className="mt-12 space-y-6">
                    {m.intro.map((para) => (
                      <p
                        key={para.slice(0, 12)}
                        className="max-w-[58ch] text-[15.5px] leading-[1.9] text-body"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 사이드 카드 */}
            <div>
              <div className="space-y-px overflow-hidden rounded-md border border-hairline bg-hairline lg:sticky lg:top-28">
                <div className="portrait-live relative aspect-[4/5] bg-canvas">
                  {m.photo ? (
                    <>
                      <Image
                        src={m.photo}
                        alt={`${m.name} ${m.role}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 380px"
                        priority
                        className="portrait-img object-cover object-top"
                      />
                      <div aria-hidden className="portrait-tint" />
                      <div aria-hidden className="portrait-glow" />
                    </>
                  ) : (
                    <Monogram initial={m.initial} className="absolute inset-0" />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-canvas/55 via-transparent to-transparent"
                  />
                  <div className="absolute bottom-4 left-5">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-body-strong">
                      {site.nameEn} — {m.role}
                    </p>
                  </div>
                </div>
                {m.career.length > 0 && (
                  <div className="bg-canvas-soft/50 p-6">
                    <p className="eyebrow mb-4">주요 경력</p>
                    <ul className="space-y-2.5">
                      {m.career.map((c) => (
                        <li key={c} className="text-[13.5px] leading-relaxed text-body-strong">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {m.credentials.length > 0 && (
                  <div className="bg-canvas-soft/50 p-6">
                    <p className="eyebrow mb-4">자격 · 이력</p>
                    <ul className="space-y-2.5">
                      {m.credentials.map((c) => (
                        <li key={c} className="text-[13.5px] leading-relaxed text-body-strong">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="bg-canvas-soft/50 p-6">
                  <p className="eyebrow mb-4">전문분야</p>
                  <div className="flex flex-wrap gap-2">
                    {m.fields.map((f) => (
                      <span
                        key={f}
                        className="rounded-sm border border-hairline px-2.5 py-1.5 text-[12px] text-body-strong"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-canvas-soft/50 p-6">
                  <p className="eyebrow mb-3">이 구성원과 상담</p>
                  <Link
                    href="/consult"
                    className="press block rounded-sm bg-ink px-5 py-3 text-center text-[14px] font-medium text-on-primary hover:opacity-85"
                  >
                    빠른 상담신청
                  </Link>
                  <a
                    href={`tel:${site.phone}`}
                    className="press mt-2 block rounded-sm border border-hairline px-5 py-3 text-center font-mono text-[14px] text-ink transition-colors hover:border-mute"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 다음 구성원 */}
      <section className="hairline-t bg-canvas-deep">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <Link
            href={`/members/${next.slug}`}
            className="group flex items-center justify-between py-12 md:py-16"
          >
            <div>
              <p className="eyebrow mb-3">NEXT MEMBER</p>
              <p className="display text-[clamp(24px,3.6vw,40px)] text-body-strong transition-colors group-hover:text-ink">
                {next.name} <span className="text-mute">— {next.role}</span>
              </p>
            </div>
            <span className="text-[28px] text-mute transition-transform duration-300 group-hover:translate-x-2 group-hover:text-ink">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
