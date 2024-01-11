export default function Hyperlink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <a className="text-teal-500 underline hover:no-underline" href={href}>
      {text}
    </a>
  );
}
