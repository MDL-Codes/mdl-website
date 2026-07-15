import whiteLogo from '../assets/white-logo.png'

type Props = {
  className?: string
}

export default function MDLLogo({ className = '' }: Props) {
  return (
    <img
      src={whiteLogo}
      alt="MDL"
      className={`${className} object-contain`}
    />
  )
}
