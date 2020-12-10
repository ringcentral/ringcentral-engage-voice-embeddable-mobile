/**
 * link must open with in app browser
 */

export default (props) => {
  return (
    <a
      href={props.href}
      // onClick={(e) => {
      //   e.preventDefault()
      //   window.open(props.href, '_self', 'location=yes')
      // }}
    >
      {props.children}
    </a>
  )
}
