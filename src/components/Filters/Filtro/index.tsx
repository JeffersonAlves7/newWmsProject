function Filtro({ title, name, options, seletorId, cb }: { title: string, name: string, options: {}, seletorId: string, cb: Function }) {
  const keys = Object.keys(options)
  return (
    <div id={title.toLowerCase()}
      className="grid gap-2 grid-cols-[4rem_9rem] h-[2.3rem] items-center border border-wmsBlack shadow-sm p-1 rounded-lg" >
      <label htmlFor={seletorId}> {title} </label>
      <select name={name} id={seletorId} className="outline-none flex text-end" onClick={(e) => cb(e)}>
        {keys.map(key => <option value={key} key={key}>{options[key as keyof typeof options]}</option>)}
      </select>
    </div>
  )
}
export default Filtro