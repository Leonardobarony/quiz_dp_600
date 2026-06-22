interface DocLinkProps {
  url: string
}

export default function DocLink({ url }: DocLinkProps) {
  if (!url.startsWith('https://')) return null
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-blue-600 hover:underline">
      Ver documentação Microsoft →
    </a>
  )
}
