import { useCallback, useRef, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) {
      str += "0123456789"
    }

    if(charAllowed) {
      str += "!@#$%^&*()-_=+[]{}|;:',.<>?/~`"
    }

    for(let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, charAllowed, numberAllowed, setPassword])

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='bg-gray-800 w-full max-w-md p-4 mx-auto my-10 rounded-xl shadow-xl kode-mono-html'>
        <h1 className='text-blue-200 text-2xl'>Password Generator</h1>
      </div>

      <div className='bg-gray-800 w-full max-w-xl mx-auto rounded-xl shadow-xl p-4  kode-mono-html'>

        <div className='flex gap-x-3 p-4'>
          <input 
            type="text" 
            value={password}
            placeholder='password'
            readOnly
            ref={passwordRef}
            className='bg-pink-200 rounded-md outline-none p-2 w-full text-pink-700'
          />
          <button
            className='bg-purple-300 rounded-md outline-none p-2 w-24 text-purple-900'
            onClick={copyPasswordToClip}
          >
            COPY
          </button>
        </div>

        <div className='flex-row gap-x-5 justify-center text-blue-200 pt-2'>
          
          <div className='flex gap-x-24 justify-center pb-1'>
            <div className='flex gap-x-2 justify-center'>
              <input type="checkbox"
                defaultChecked = {numberAllowed}
                id='numberInput'
                onChange={(e) => {
                  setNumberAllowed(prev => !prev)
                }}
              />
              <label htmlFor="numberInput">
                Numbers
              </label>    
            </div>
            <div className='flex gap-x-2 justify-center'>
              <input type="checkbox"
                defaultChecked = {charAllowed}
                id='charInput'
                onChange={(e) => {
                  setCharAllowed(prev => !prev)
                }}
              />
              <label htmlFor="charInput">
                Characters
              </label> 
            </div>
          </div>

          <div className='flex gap-x-5 justify-center'>
            <label htmlFor="">
              Length: {length}
            </label>
            
            <input 
              type="range"
              value={length}
              min={8}
              max={50}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
