import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TeamIndex from "@/components/members/TeamIndex";

export const metadata: Metadata = {
  title: "구성원 소개 — 변호사·손해사정사·행정사",
  description:
    "법률사무소 진원의 구성원 — 권진원 대표변호사, 정주영 대표 손해사정사, 홍성훈 행정사, 김지호 보험학개론 대표. 각 분야를 가장 깊이 아는 사람들이 사건을 맡습니다.",
  alternates: { canonical: "/members" },
  openGraph: {
    title: "구성원 소개 | 법률사무소 진원",
    description: "법률사무소 진원의 구성원 — 권진원 대표변호사, 정주영 대표 손해사정사, 홍성훈 행정사, 김지호 보험학개론 대표. 각 분야를 가장 깊이 아는 사람들이 사건을 맡습니다.",
    url: "/members",
  },
};

export default function MembersPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR TEAM"
        title={
          <>
            각 분야를 가장 깊이
            <br />
            아는 사람들
          </>
        }
        lede="진실의 근원에서 최선의 결과를 위해 함께하는 전문가들 — 변호사, 손해사정사, 행정사, 보험 전문가가 한 팀으로 사건을 봅니다."
      />

      <section className="bg-canvas pb-28 md:pb-40">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div>
            <TeamIndex />
          </div>
        </div>
      </section>
    </>
  );
}
