export function DownloadCard({
  title,
  description,
  href,
  format,
}: {
  title: string
  description: string
  href: string
  format: string
}) {
  return (
    <a
      href={href}
      download
      className="my-4 flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-bold uppercase text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        {format}
      </div>
      <div className="min-w-0">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </div>
      </div>
    </a>
  )
}
