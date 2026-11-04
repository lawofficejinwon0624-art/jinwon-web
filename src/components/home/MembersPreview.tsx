import Link from "next/link";
import Image from "next/image";
import Monogram from "@/components/Monogram";
import { members } from "@/data/members";

export default function MembersPreview() {
  return (
    <section className="hairline-t bg-canvas">
      <div className="mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5">MEMBERS</p>
              <h2 className="display text-[clamp(28px,4vw,44px)]">
                사건마다, 그 분야를
                <br />
                가장 깊이 아는 사람이 맡습니다
              </h2>
            </div>
            <Link
              href="/members"
              className="link-quiet mb-1 flex items-baseline gap-2.5 text-[14px] font-medium text-body-strong hover:text-ink"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-mute">
                {String(members.length).padStart(2, "0")}
              </span>
              구성원 전체 보기 →
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <div key={m.slug} className="bg-canvas">
              <Link
                href={`/members/${m.slug}`}
                className="group flex h-full flex-col bg-canvas-soft/40 transition-colors duration-300 hover:bg-canvas-soft"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {m.photo ? (
                    <>
                      <Image
                        src={m.photo}
                        alt={`${m.name} ${m.role}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="portrait-img object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      <div aria-hidden className="portrait-tint" />
                      <div aria-hidden className="portrait-glow" />
                    </>
                  ) : (
                    <Monogram initial={m.initial} className="absolute inset-0" />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                  <div>
                    <p className="text-[19px] font-medium tracking-[-0.02em] text-ink">
                      {m.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-mute">
                      {m.role}
                    </p>
                    <p className="mt-4 text-[13px] leading-relaxed text-body">
                      {m.focus}
                    </p>
                  </div>
                  <p className="mt-6 text-[13px] font-medium text-body-strong opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    프로필 보기 →
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
