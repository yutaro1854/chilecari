export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-12">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-8 shadow-sm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Chile ⇄ Japan Import Concierge
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
              チリと日本をつなぐ輸入代行サービス
              <span className="block text-emerald-700">サービス名はこれから一緒に作ります。</span>
            </h1>
            <p className="text-base leading-relaxed text-slate-600">
              現地調達から国際輸送、通関、国内配送までワンストップで対応。言語や商習慣の違いで止まりがちな輸入プロジェクトを、透明性の高い進行と日本語サポートで前へ進めます。
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                無料相談を予約する
              </button>
              <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
                料金の目安を見る
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-500">
              <div>
                <p className="font-semibold text-slate-700">対応言語</p>
                <p>日本語 / Español / English</p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">対応カテゴリ</p>
                <p>ワイン・食品・雑貨・産業資材</p>
              </div>
              <div>
                <p className="font-semibold text-slate-700">現地ネットワーク</p>
                <p>サンティアゴ拠点 + 提携パートナー</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-sm space-y-4 rounded-2xl border border-emerald-100 bg-white p-6 text-sm shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">最短2週間で輸入開始</h2>
            <p className="text-slate-600">
              要件ヒアリングから見積り提出まで 48 時間以内。現地視察・サンプル手配にも対応します。
            </p>
            <ul className="space-y-3">
              {[
                "現地サプライヤーの選定・交渉",
                "品質検品と出荷前レポート",
                "通関書類の作成・税関対応",
                "日本国内の物流・在庫相談",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-600">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "現地調達",
            description:
              "信頼できるチリの生産者やメーカーをリサーチし、価格交渉まで代行します。",
          },
          {
            title: "輸送・通関",
            description:
              "インコタームズに合わせた最適な輸送手段を提案。通関書類も日本語で整理します。",
          },
          {
            title: "国内配送",
            description:
              "港・空港到着後の検品や国内配送までサポートし、事業開始まで伴走します。",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">ご利用の流れ</h2>
            <p className="text-sm text-slate-600">
              まずはヒアリングで目的・予算・スケジュールを整理し、最適な輸入プランをご提案します。
            </p>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "ヒアリング",
                  detail: "輸入したい商材、数量、希望納期を共有。",
                },
                {
                  step: "02",
                  title: "現地調査",
                  detail: "サプライヤー候補の調査と見積り作成。",
                },
                {
                  step: "03",
                  title: "輸送・通関",
                  detail: "スケジュールを確定し、書類を整備。",
                },
                {
                  step: "04",
                  title: "納品",
                  detail: "国内配送と到着後のフォローを実施。",
                },
              ].map((flow) => (
                <div
                  key={flow.step}
                  className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                    {flow.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{flow.title}</p>
                    <p className="text-sm text-slate-600">{flow.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">このサービスの強み</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                日本語での交渉・契約レビューを実施し、リスクを最小化。
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                進捗はオンラインで可視化し、出荷前の写真とレポートを共有。
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                初回輸入の不安を解消するため、税率・検査の事前確認を徹底。
              </li>
            </ul>
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
              <p className="font-semibold">こんな方におすすめ</p>
              <p className="mt-2">
                チリの商材を扱いたいが現地パートナーがいない方、輸入経験が浅いスタートアップ、品質チェックまで任せたい企業。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-900">サービス名・ブランドも一緒に設計します</h2>
            <p className="text-sm text-slate-600">
              立ち上げ初期はネーミングやロゴ、信頼づくりのストーリーも大切。ご要望に合わせて伴走します。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
              事例を相談する
            </button>
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              まずは問い合わせる
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
