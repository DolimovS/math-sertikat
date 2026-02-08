import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1); // 1:test kodi, 2:registratsiya, 3:test javoblari
  const [valid, setValid] = useState(null);

  const [testKodi, setTestKodi] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [region, setRegion] = useState('');
  const [answers, setAnswers] = useState({});

  // Test kodi tekshirish
  const clickTestKodi = async (e) => {
    e.preventDefault();
    if (!testKodi) return alert("Test kodini kiriting");

    try {
      const res = await fetch('http://localhost:3000/check-test-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testCode: testKodi })
      });

      const data = await res.json();

      if (data.valid) {
        setValid(true);
        alert("✅ Test kodi mavjud, keyingi qadamga o‘ting");
        setStep(2); // Registratsiya form ochiladi
      } else {
        setValid(false);
        alert("❌ Test kodi topilmadi");
      }
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi");
      // setStep(2);
    }
  };

  // Registratsiya keyingi step
  const handleNext = () => {
    if (!name || !surname || !region) return alert("Barchasini kiriting");
    setStep(3); // Test form ochiladi
  };

  // Javoblarni state ga saqlash
  const handleAnswer = (q, value) => {
    setAnswers(prev => ({ ...prev, [q]: value }));
  };

  // Testni Telegram botga yuborish
const testni_yakunlash = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify({
      testCode: testKodi, // <-- testCode emas, testKodi
      userInfo: { name, surname, region },
      answers
    }));
    alert("✅ Javoblaringiz yuborildi!");
  } else {
    alert("❌ Telegram WebApp orqali ishlash uchun oching");
  }
};


  return (
    <div className="app">

      {/* Step 1: Test kodi */}
      {step === 1 && (
        <div className="test_kod_form">
          <h1>Test kodini kiriting</h1>
          <input
            placeholder='Test kodini kiriting'
            value={testKodi}
            onChange={e => setTestKodi(e.target.value)}
          />
          <button onClick={clickTestKodi}>Yuborish</button>
        </div>
      )}

      {/* Step 2: Registratsiya */}
      {step === 2 && (
        <div className="yorxatdan_otish_form">
          <h2>Shaxsiy ma'lumotlar</h2>
          <input placeholder="Ismingiz" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Familiyangiz" value={surname} onChange={e => setSurname(e.target.value)} />
          <select value={region} onChange={e => setRegion(e.target.value)}>
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
          <button onClick={handleNext}>Keyingi</button>
        </div>
      )}

      {/* Step 3: Test javoblari */}
      {step === 3 && (
        <div className="test_javoblari">
          <h3>Test javoblarini belgilang</h3>

          {/* 1–35 savollar */}
          {Array.from({ length: 35 }, (_, i) => (
  <div key={i+1} className='test_javoblari_card'>
    <span>{i + 1}</span>
    {['A', 'B', 'C', 'D'].map(opt => (
      <button
        key={opt}
        onClick={() => handleAnswer(`q${i+1}`, opt)}
        style={{
          backgroundColor: answers[`q${i+1}`] === opt ? '#4caf50' : '#f0f0f0',
          color: answers[`q${i+1}`] === opt ? 'white' : 'black'
        }}
      >
        {opt}
      </button>
    ))}
  </div>
))}


          {/* 36–45 savollar (input) */}
         {Array.from({length:10}, (_, i) => {
  const qNum = 36 + i;
  return (
    <div key={qNum} className='test_javoblari_card_1'>
      <span>{qNum}a</span>
      <input
        value={answers[`q${qNum}a`] || ''}
        onChange={e => handleAnswer(`q${qNum}a`, e.target.value)}
      />
      <br />
      <span>{qNum}b</span>
      <input
        value={answers[`q${qNum}b`] || ''}
        onChange={e => handleAnswer(`q${qNum}b`, e.target.value)}
      />
    </div>
  )
})}


          <button className='yakunlash_btn' onClick={testni_yakunlash}>Testni yakunlash</button>
        </div>
      )}
    </div>
  )
}

export default App;
