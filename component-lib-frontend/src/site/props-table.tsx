export type PropRow = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

type Props = { rows: PropRow[] };

export function PropsTable({ rows }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm dark:border-zinc-800">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
          <tr>
            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
              Prop
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
              Type
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
              Default
            </th>
            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {rows.map((row) => (
            <tr key={row.name} className="bg-white dark:bg-zinc-950">
              <td className="px-4 py-3 font-mono text-xs text-violet-600 dark:text-violet-400">
                {row.name}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                {row.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                {row.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
