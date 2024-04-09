export default function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="mx-2 my-3 text-2xl font-bold uppercase">{children}</h1>;
}
