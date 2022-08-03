export default function Title(props: { text: string | number }) {
  return (
    <h1 className="text-3xl font-semibold sm:text-4xl">
      {props.text}
    </h1>
  )
}