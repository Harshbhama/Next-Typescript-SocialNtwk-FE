import Image from 'next/image'
import { Inter } from 'next/font/google'
import variables from "../styles/variables.module.scss";
import { Button } from "@material-tailwind/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='container'>
      <div className={variables.title}>
        Login Page
      </div>
      <Button>Button</Button>
    </div>
  )
}
