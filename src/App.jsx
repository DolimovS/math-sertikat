import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [testKodiForm, setTestKodiForm] = useState(true)
  const [yorxatdanOtish, setYorxatdanOtish] = useState(false)
  const [testJavoblari,setTestJavoblari]=useState(false)

  const [valid, setValid] = useState(null)     // test kodi tekshiruvi natijasi

  const [testKodi, setTestKodi] = useState('') // foydalanuvchi kiritadi
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [region, setRegion] = useState('')
  const clickTestKodi = async (e) => {
    e.preventDefault()

    if (!testKodi) return alert("Test kodini kiriting")

    try {
      const res = await fetch('http://localhost:3000/check-test-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testCode: testKodi })
      })

      const data = await res.json()

      if (data.valid) {
        setValid(true)
        alert("✅ Test kodi mavjud, keyingi qadamga o‘ting")
        // keyingi form (ism/familiy va test) ochilishi mumkin
        setTestKodiForm(false)
      } else {
        setValid(false)
        alert("❌ Test kodi topilmadi")
      }

    } catch (err) {
      console.error(err)
      alert("Xatolik yuz berdi")
      setTestKodiForm(false)
      setYorxatdanOtish(true)
    }
  }



  const handleNext = () => {
    if (!name || !surname || !region) return alert("Barchasini kiriting");
    console.log("sdfdg")
    setYorxatdanOtish(false)
    setTestJavoblari(true)


    // onNext({ name, surname, region });
  }


  // yakunlash
  const testni_yakunlash=()=>{
    console.log("sdvfbg");
    
  }
  return (
    <div className='app'>

      {/* {Test Kodi} */}
      {testKodiForm && <div className="test_kod_form">
        <h1>Test kodini kiriting</h1>
        <input
          placeholder='Test kodini kiriting'
          value={testKodi}
          onChange={e => setTestKodi(e.target.value)}
        />
        <button onClick={clickTestKodi}>Yuborish</button>
      </div>}

      {/* {Yorhatdan o'tish} */}
      {yorxatdanOtish && <div className="yorxatdan_otish_form">
        {/* <h2>Shaxsiy ma'lumotlar</h2> */}
        <input placeholder="Ismingiz" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Familiyangiz" value={surname} onChange={e => setSurname(e.target.value)} />
        <select  value={region} onChange={e => setRegion(e.target.value)}>
          <option value="">Viloyatni tanlang</option>
          <option value="Toshkent shahar">Toshkent shahar</option>
          <option value="Qoraqalpog‘iston Respublikasi">Qoraqalpog‘iston Respublikasi</option>
          <option value="Andijon">Andijon</option>
          <option value="Buxoro">Buxoro</option>
          <option value="Farg‘ona">Farg‘ona</option>
          <option value="Jizzax">Jizzax</option>
          <option value="Xorazm">Xorazm</option>
          <option value="Namangan">Namangan</option>
          <option value="Navoiy">Navoiy</option>
          <option value="Qashqadaryo">Qashqadaryo</option>
          <option value="Samarqand">Samarqand</option>
          <option value="Sirdaryo">Sirdaryo</option>
          <option value="Surxondaryo">Surxondaryo</option>
          <option value="Toshkent">Toshkent</option>
          <option value="Nukus">Nukus</option>
        </select>
        <button onClick={handleNext}>Tasdiqlash</button>
      </div>}

        {/* Test javoblari */}
          {testJavoblari && <div className="test_javoblari">
            <h3>Test javoblarini belgilang</h3>
            <div className='test_javoblari_card'>
              <span>1</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>2</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>3</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>4</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>5</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>6</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>7</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>8</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>9</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>10</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>11</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>
            <div className='test_javoblari_card'>
              <span>12</span>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
            </div>


            <button className='yakunlash_btn' onClick={testni_yakunlash}>Testni yakunlash</button>
          </div>
          
          }
          </div>
  )
}

export default App
