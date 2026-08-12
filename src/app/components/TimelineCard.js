export default function TimelineCard({ milestone }) {
  return (
    <div className={`flex items-center gap-6 md:gap-12 flex-col md:flex-row`}>
      {/* Card */}
      <div className={`flex-1`}>
        <div
          className="floral-card rounded-2xl p-6 md:p-8 relative overflow-hidden group transition-all duration-500 bg-surface-deep"
          style={{
            boxShadow:
              "0 2px 14px rgba(201,169,110,0.07), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative z-10">
            {/* Icon & Date */}
            <div className={`flex items-center justify-between gap-3 mb-3`}>
              <div className="flex items-center gap-1">
                <span className="text-2xl">{milestone.icon}</span>
                {/* Title */}
                <h3 className="font-heading text-3xl font-bold h-8 text-accent">
                  {milestone.title}
                </h3>
              </div>
              <span
                className="text-xs tracking-[0.2em] uppercase font-body font-medium"
                style={{ color: "var(--garden-gold)" }}
              >
                {milestone.date}
              </span>
            </div>

            {/* Description */}
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--garden-taupe)" }}
            >
              {milestone.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
