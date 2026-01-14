export default function Home() {
  return (
    <section className="flex flex-1 flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Next.js App Router
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">
          Chilecari starter is ready
        </h1>
        <p className="text-sm text-slate-600">
          Supabase SSR と Tailwind がセットアップ済みです。次のタスクでデータ
          ベースや認証を追加できます。
        </p>
      </header>
      <div className="space-y-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-700">次のステップ</p>
        <ul className="list-inside list-disc space-y-1">
          <li>.env.example をコピーして Supabase キーを設定</li>
          <li>npm i → npm run dev で開発を開始</li>
          <li>RLS やテーブルの作成を進める</li>
        </ul>
      </div>
    </section>
  );
}
