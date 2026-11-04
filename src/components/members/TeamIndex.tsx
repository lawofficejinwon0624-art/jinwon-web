"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Monogram from "@/components/Monogram";
import { members } from "@/data/members";

/**
 * 팀 인덱스 — 거대한 이름 리스트(좌) + 스티키 포트레이트 패널(우).
 * 이름에 호버/포커스하면 포트레이트와 메타가 크로스페이드된다.
 * 포트레이트는 웜 듀오톤으로 통일하고, 활성 시 컬러가 살아난다.
 * 모바일에서는 포트레이트 카드 스택으로 폴백.
 */
export default function TeamIndex() {
  const [active, setActive] = useState(0);
  const m = members[active];

  return (
    <>
      {/* ——— 데스크톱: 네임 인덱스 + 스티키 포트레이트 ——— */}
      <div className="hidden gap-16 lg:grid lg:grid-cols-[1.25fr_minmax(340px,420px)] xl:gap-24">
        <div>
          <div
            className="hairline-b flex items-baseline justify-between pb-5"
          >
            <p className="eyebrow">INDEX</p>
            <p className="font-mono text-[11px] tracking-[0.18em] text-mute">
              {String(members.length).padStart(2, "0")} MEMBERS
            </p>
          </div>

          <ul>
            {members.map((member, i) => {
              const isActive = active === i;
              return (
                <li
                  key={member.slug}
                  className="hairline-b"
                >
                  <Link
                    href={`/members/${member.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[56px_1fr_auto] items-center gap-6 py-9"
                  >
                    <span
                      className={`font-mono text-[13px] transition-colors duration-300 ${
                        isActive ? "text-amber" : "text-mute/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "translate-x-1.5" : "translate-x-0"
                      }`}
                    >
                      <span
                        className={`serif-accent block text-[clamp(38px,4.4vw,60px)] leading-[1.1] tracking-[-0.02em] transition-colors duration-300 ${
                          isActive ? "text-ink" : "text-mute/70"
                        }`}
                      >
                        {member.name}
                      </span>
                      <span
                        className={`mt-2 block text-[13.5px] transition-colors duration-300 ${
                          isActive ? "text-body-strong" : "text-mute/60"
                        }`}
                      >
                        <span className="font-mono text-[11px] tracking-[0.14em]">
                          {member.role}
                        </span>
                        <span className="mx-2.5 text-hairline">|</span>
                        {member.focus}
                      </span>
                    </span>
                    <span
                      className={`text-[22px] transition-[transform,color] duration-300 ${
                        isActive
                          ? "translate-x-0 text-ink"
                          : "-translate-x-2 text-mute/40"
                      }`}
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p
            className="mt-10 flex items-center gap-4 font-mono text-[11px] tracking-[0.14em] text-mute"
          >
            <span aria-hidden className="h-px w-10 bg-hairline" />
            이름 위에 마우스를 올려 구성원을 살펴보세요
          </p>
        </div>

        {/* 스티키 포트레이트 패널 */}
        <div
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <div className="portrait-live group relative aspect-[3/4] overflow-hidden rounded-md border border-hairline bg-canvas-deep">
            {members.map((member, i) => (
              <div
                key={member.slug}
                className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "scale(1)" : "scale(1.045)",
                }}
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={`${member.name} ${member.role}`}
                    fill
                    sizes="420px"
                    priority={i === 0}
                    className="portrait-img object-cover object-top"
                  />
                ) : (
                  <Monogram initial={member.initial} className="h-full w-full" />
                )}
              </div>
            ))}
            {/* 웜 듀오톤 오버레이 */}
            <div aria-hidden className="portrait-tint" />
            <div aria-hidden className="portrait-glow" />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-canvas/85 via-transparent to-canvas/25"
            />
            {/* 필름 프레임 코너 틱 */}
            <div aria-hidden className="frame-ticks absolute inset-0">
              <i /><i /><i /><i />
            </div>

            {/* 상단 라벨 */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-5">
              <p className="font-mono text-[10px] tracking-[0.24em] text-body-strong">
                PROFILE — {String(active + 1).padStart(2, "0")}
              </p>
              <p className="font-mono text-[10px] tracking-[0.14em] text-mute">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(members.length).padStart(2, "0")}
              </p>
            </div>

            {/* 하단 캡션 */}
            <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
              <p className="serif-accent text-[24px] leading-none text-ink">
                {m.name}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-body-strong">
                {m.role}
              </p>
            </div>
          </div>

          {/* 활성 구성원 인용구 */}
          <div className="relative mt-6 min-h-[92px]">
            {members.map((member, i) => (
              <blockquote
                key={member.slug}
                aria-hidden={active !== i}
                className="serif-accent absolute inset-x-0 top-0 border-l border-hairline pl-4 text-[14.5px] leading-[1.7] text-body transition-[opacity,transform] duration-500"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "translateY(0)" : "translateY(8px)",
                }}
              >
                “{member.quote}”
              </blockquote>
            ))}
          </div>

          {/* 활성 구성원 전문분야 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {m.fields.slice(0, 5).map((f) => (
              <span
                key={`${m.slug}-${f}`}
                className="rounded-sm border border-hairline px-2.5 py-1.5 font-mono text-[11px] text-body-strong"
              >
                {f}
              </span>
            ))}
          </div>

          <Link
            href={`/members/${m.slug}`}
            className="press mt-5 block rounded-sm bg-ink px-5 py-3.5 text-center text-[14px] font-medium text-on-primary hover:opacity-85"
          >
            {m.name} 프로필 보기
          </Link>
        </div>
      </div>

      {/* ——— 모바일: 포트레이트 카드 스택 ——— */}
      <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline sm:grid-cols-2 lg:hidden">
        {members.map((member, i) => (
          <Link
            key={member.slug}
            href={`/members/${member.slug}`}
            className="group flex flex-col bg-canvas-soft/40 transition-colors duration-300 hover:bg-canvas-soft"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {member.photo ? (
                <>
                  <Image
                    src={member.photo}
                    alt={`${member.name} ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="portrait-img object-cover object-top"
                  />
                  <div aria-hidden className="portrait-tint" />
                  <div aria-hidden className="portrait-glow" />
                </>
              ) : (
                <Monogram
                  initial={member.initial}
                  className="absolute inset-0"
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-canvas/75 via-transparent to-transparent"
              />
              <p className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] text-body-strong">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <div className="p-5">
              <p className="serif-accent text-[22px] text-ink">{member.name}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-mute">
                {member.role}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-body">
                {member.focus}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
