const ACCENTS = {
  blue: "bg-[#edf4ff] text-[#3474cb]",
  green: "bg-[#e9f8ef] text-[#159653]",
  amber: "bg-[#fff6e5] text-[#bd8016]",
  violet: "bg-[#f2edff] text-[#7953cc]",
};

export default function StatCard({ icon: Icon, label, value, detail, accent }) {
  return (
    <article className="min-w-0 rounded-[14px] border border-[#e5e9ef] bg-white p-[19px] shadow-[0_2px_4px_rgb(20_34_55/2%)] transition-[transform,box-shadow] duration-[160ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgb(20_34_55/5%)] dark:border-[#354155] dark:bg-[#1b2534] max-sm:p-[14px]">
      <div className="flex items-center justify-between gap-[7px]">
        <div
          className={`flex size-[41px] shrink-0 items-center justify-center rounded-[11px] max-sm:size-[35px] ${ACCENTS[accent]}`}
        >
          <Icon size={21} />
        </div>
        <span className="text-right text-[10px] text-[#99a2af] max-sm:text-[9px]">
          {detail}
        </span>
      </div>
      <p className="mt-[19px] text-xs font-[550] text-[#6e798b] max-sm:mt-[14px] max-sm:text-[11px]">
        {label}
      </p>
      <p className="mt-1.5 text-[29px] font-extrabold tracking-[-1px] text-[#182235] dark:text-[#eef2f7] max-sm:text-[25px]">
        {value}
      </p>
    </article>
  );
}
