type SelfPRSectionProps = {
  selfPR: {
    autonomy: { title: string; content: string };
    fullstack: { title: string; content: string };
    teamwork: { title: string; content: string };
  };
};

export function SelfPRSection({ selfPR }: SelfPRSectionProps) {
  const prItems = [
    { ...selfPR.autonomy, gradient: 'from-cyan-600 to-blue-600', icon: '🚀' },
    { ...selfPR.fullstack, gradient: 'from-purple-600 to-pink-600', icon: '💻' },
    { ...selfPR.teamwork, gradient: 'from-indigo-600 to-purple-600', icon: '👥' },
  ];
  const TRANSITION_DELAY_STEP_SECONDS = 0.1;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="reveal mb-12 translate-y-8 text-center font-bold text-3xl opacity-0 transition-all duration-1000 md:text-4xl">
          My Strengths
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {prItems.map((item, index) => (
            <div
              className="reveal group translate-y-8 opacity-0 transition-all duration-1000"
              key={item.title}
              style={{ transitionDelay: `${index * TRANSITION_DELAY_STEP_SECONDS}s` }}
            >
              <div className="h-full rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl">
                <div
                  className={`mb-4 bg-gradient-to-br text-4xl ${item.gradient} inline-block bg-clip-text text-transparent`}
                >
                  {item.icon}
                </div>
                <h3
                  className={`mb-3 bg-gradient-to-r font-semibold text-xl ${item.gradient} bg-clip-text text-transparent`}
                >
                  {item.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
