export default function DataSelector(props: { cb: Function, id?: string }) {
  return <input type="date" id={props.id ? props.id : ''} onChange={(e) => props.cb(e)}
    className="border h-[2.3rem] border-wmsBlack rounded-lg p-1 flex items-center w-[10rem]"
  />
}