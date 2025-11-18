import { useId, useState } from "react";
import TooltipInfo from "../../Modal/TooltipInfo";

type Props = {
    label: string; 
    value: string;
    options: {value:string; label:string}[]; 
    onChange:(v:string)=>void; message: string;
}
export default function Select ({ label, value, options, onChange, message }: Props) {
    const [openSel, setOpenSel] = useState(false);
    const secId = useId();
    return (
      <div className="py-2">
        <div className="flex items-center justify-between text-lg">
          <span>{label}</span>
          <div className="mr-auto ml-2"><TooltipInfo message={message}/></div>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-2 py-1 border rounded-md text-lg"
            onClick={() => setOpenSel((s) => !s)}>
            <span className="font-medium">{value}</span>
            <svg width="12" height="12" viewBox="0 0 20 20" className={`transition ${openSel ? 'rotate-180' : ''}`}>
              <path d="M5 7l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        {openSel && (
          <ul className="mt-2 border rounded-md bg-white shadow-sm divide-y" role="listbox" aria-labelledby={secId + '-select'}>
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className={`w-full text-left px-3 py-2 text-base hover:bg-emerald-50 ${value === opt.value ? 'text-green-200 font-base' : ''}`}
                  role="option"
                  aria-selected={value === opt.value}
                  onClick={() => { onChange(opt.value); setOpenSel(false); }}>
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
}
   