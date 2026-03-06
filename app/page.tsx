const products = [
  {
    name: 'SAKURA Smooth Pen',
    description: 'なめらかな書き心地と速乾インク。授業・会議・日記まで一本で。',
    price: 'CLP 6,900',
  },
  {
    name: 'Kumo Notebook',
    description: '180°フラットに開く糸綴じノート。アイデアを途切れさせません。',
    price: 'CLP 8,200',
  },
  {
    name: 'Mochi Marker Set',
    description: '柔らかな発色の12色セット。手帳や資料が直感的に見やすく。',
    price: 'CLP 11,500',
  },
];

const valuePoints = [
  {
    title: '日本品質をチリへ',
    text: '国内製造基準の文房具を厳選。耐久性、発色、握り心地まで妥協しません。',
  },
  {
    title: '直感的な使いやすさ',
    text: '誰でも迷わないデザイン。ノート、ペン、整理用品を統一コンセプトで設計。',
  },
  {
    title: '丸みのあるやさしい設計',
    text: '角を抑えたフォルムと触感。毎日使いたくなる、ストレスフリーな文具体験。',
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-100 via-orange-50 to-sky-100 p-8 shadow-lg sm:p-12">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/50 blur-2xl" />
        <div className="absolute -bottom-10 left-8 h-32 w-32 rounded-full bg-rose-200/60 blur-2xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-white/80 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-slate-500">
              JAPANESE STATIONERY FOR CHILE
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              チリで、日本の文房具を。
              <span className="block text-rose-500">毎日の書く体験をもっと心地よく。</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Chilecariは、日本の高品質な文房具をチリの日常へ届けるブランドです。
              学生・クリエイター・ビジネスパーソンまで、直感的で使いやすいラインアップをそろえました。
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                先行予約する
              </button>
              <button className="rounded-full border border-slate-300 bg-white/90 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white">
                カタログを見る
              </button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 backdrop-blur">
            <p className="text-sm font-semibold text-slate-500">人気セット</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Starter Set 2026</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="rounded-2xl bg-white p-3">SAKURA Smooth Pen × 2</li>
              <li className="rounded-2xl bg-white p-3">Kumo Notebook × 1</li>
              <li className="rounded-2xl bg-white p-3">Mochi Marker Set × 1</li>
            </ul>
            <p className="mt-5 text-xl font-bold text-slate-900">CLP 22,000</p>
            <p className="text-xs text-slate-500">Santiago配送無料 / 初回限定</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {valuePoints.map((point) => (
          <article
            key={point.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-slate-900">{point.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{point.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Products</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">おすすめ文具ラインアップ</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-rose-500 hover:text-rose-600">
            すべての商品を見る →
          </a>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
              <p className="mt-5 text-base font-bold text-slate-900">{product.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-lg sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-300">Why Chilecari</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight">
              デザインと機能を、
              <span className="block text-rose-300">ちょうどいいバランスで。</span>
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-200">
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              ✅ チリ国内倉庫から迅速配送（最短2日）
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              ✅ 日本語・スペイン語のバイリンガルサポート
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              ✅ 学校・法人向けのまとめ買いにも対応
            </li>
          </ul>
        </div>
      </section>

      <section className="rounded-[2rem] border border-rose-100 bg-rose-50/60 p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-400">Pre-Launch</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">先行登録で10%オフクーポンを配布中</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          チリでの正式リリース前に、限定価格と最新情報を受け取れます。メール登録だけで完了、1分で参加できます。
        </p>
        <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full rounded-full border border-rose-200 bg-white px-5 py-3 text-sm text-slate-700 outline-none ring-rose-200 transition focus:ring"
          />
          <button
            type="submit"
            className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            登録する
          </button>
        </form>
      </section>
    </main>
  );
}
