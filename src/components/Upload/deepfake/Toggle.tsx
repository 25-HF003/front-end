import TooltipInfo from '../../Modal/TooltipInfo';

type Props = {
    label: string; 
    checked: boolean; 
    onToggle: (v: boolean)=> void; 
    message: string;
}
export default function Toggle({ label, checked, onToggle, message }: Props) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-lg ">{label}</span>
      <div className="mr-auto ml-2"><TooltipInfo message={message}/></div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onToggle(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-green-100' : 'bg-gray-900'}`}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white-100 transition ${checked ? 'translate-x-5' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}