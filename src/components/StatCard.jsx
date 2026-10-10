
export default function StatCard({ icon: Icon, label, value, detail, accent }) {
  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-icon stat-icon-${accent}`}>
          <Icon size={21} />
        </div>
        <span className="stat-detail">{detail}</span>
      </div>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </article>
  );
}
