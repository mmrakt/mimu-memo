type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-16 text-center">
      <h1 className="mb-6 animate-gradient-x bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-500 bg-clip-text font-bold font-space-grotesk text-5xl text-transparent">
        {title}
      </h1>
      <p className="text-slate-400 text-xl">{description}</p>
    </div>
  );
}
